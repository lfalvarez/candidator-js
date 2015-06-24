function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function JSONAdapter(json){
    this.json = json;
    this.categories = [];
    this.topics = [];
    this.candidates = [];
    this.positions = [];
    _.each(json.categories, function(category, index, list){
        _.each(category.questions, function(topic, index, list){
            _.each(topic.answers, function(answer, index, list){
                this.positions.push({
                    answer_value: answer.answer_value, 
                    answer_text: answer.answer_text, 
                    label: answer.answer_text, 
                    answer_id: answer.answer_id, 
                    id: answer.answer_id, 
                })
            }, this)
            this.topics.push({
                question_text: topic.question_text,
                label: topic.question_text,
                slug: slugify(topic.question_text),
                question_id: topic.question_id,
                id: topic.question_id,
            })
        }, this);

        this.categories.push({
            category_id: category.category_id,
            id: category.category_id,
            name: category.name,
            slug: slugify(category.name)
        })
    }, this)
    _.each(json.candidates, function(candidate, index, list){
        this.candidates.push({
            candidate_name: candidate.candidate_name,
            name: candidate.candidate_name,
            candidate_id: candidate.candidate_id,
            id: candidate.candidate_id
        })
    }, this)
}


function CandidatorCalculator(){
    this.final_results_key = 'percentage'
}
CandidatorCalculator.prototype.determine_match = function(person_position, external_position){
    var match = false;
    if(person_position==external_position){
        match = true;
    }
    return {'match': match};

}

CandidatorCalculator.prototype.determine_points_per_person_per_category = function(explanation){
    var points =  0;
    _.each(explanation, function(topic, index, list){
        if(topic.match){
            points++;
        }
    }, this)
    return points;
}

CandidatorCalculator.prototype.determine_total_result_per_person = function(points_per_person, total_comparisons){
    var percentage = 0
    if (total_comparisons){
        percentage = points_per_person / total_comparisons
    }
    var result = {}
    result[this.final_results_key] = percentage
    return result
}

function InformationHolder(adapter){
    this.adapter = adapter;
}
InformationHolder.prototype.positions = {};
InformationHolder.prototype.persons = [];
InformationHolder.prototype.topics = [];
InformationHolder.prototype.categories = [];
InformationHolder.prototype.add_position = function(position){
    this.positions[position.topic.slug] = position
}
InformationHolder.prototype.add_person = function(person){
    this.persons.push(person)
}
InformationHolder.prototype.add_topic = function(topic){
    this.topics.push(topic)
}
InformationHolder.prototype.add_category = function(category){
    this.categories.push(category)
    var topics = this.adapter.get_topics_per_category(category)
    _.each(topics, function(topic, index, list){
        this.topics.push(topic)
    }, this)
}
InformationHolder.prototype.positions_by = function(category){
    var result = {};

    var filtered = _.filter(this.positions, function(position){ return position.topic.category==category; }, this)
    _.each(filtered, function(position, index, list){
        result[position.topic.slug] = position;
    })
    return result
}

function Comparer(options){
    var adapter_class = options.adapter_class || undefined;
    var calculator_class = options.calculator_class || CandidatorCalculator;
    this.calculator = new calculator_class();
    this.adapter = new adapter_class();
}

Comparer.prototype.one_on_one = function(person, positions, topics){
    var comparison = {}
    if(topics === undefined){
        topics = this.topics;
    }
    _.each(topics, function(topic, index, list){
        var person_taken_positions = this.adapter.get_taken_position_by(person, topic);
        comparison[topic.slug] = {
            "topic": topic
        }
        _.extend(comparison[topic.slug], 
            this.calculator.determine_match(person_taken_positions.position, positions[topic.slug].position))
    }, this)
    return comparison

}
Comparer.prototype.compare = function(information_holder){
    return this.compare_information_holder(information_holder);
}
Comparer.prototype.compare_information_holder = function(information_holder){

    var result = {}
    var persons = information_holder.persons;
    var categories = information_holder.categories;
    _.each(persons, function(person, index, list){
        var points_per_person = 0
        var comparisons_per_category = 0
        var explanations_per_person = {}
        _.each(categories, function(category, index, list){
            var positions = information_holder.positions_by(category)
            var explanation = this.one_on_one(person, positions, this.adapter.get_topics_per_category(category))
            explanations_per_person[category.slug] = explanation
            points_per_person += this.calculator.determine_points_per_person_per_category(explanation)
            comparisons_per_category += _.keys(explanation).length;

        }, this)

        result[person.id] = {"person": person,
                             "explanation": explanations_per_person};
        _.extend(result[person.id], this.calculator.determine_total_result_per_person(points_per_person, comparisons_per_category))
    }, this)
    return _.sortBy(result, function(person){ return -person.percentage; }, this);
    
}
Comparer.prototype.topics = null;

