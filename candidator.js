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
    this.persons = this.candidates;
    this.positions = [];
    this.taken_positions = [];
    _.each(json.categories, function(category, index, list){
        var current_category = {
            category_id: category.category_id,
            id: category.category_id,
            name: category.name,
            slug: slugify(category.name)
        }
        _.each(category.questions, function(topic, index, list){
            var current_topic = {
                question_text: topic.question_text,
                label: topic.question_text,
                slug: slugify(topic.question_text),
                question_id: topic.question_id,
                category: current_category,
                id: topic.question_id,
            };
            _.each(topic.answers, function(answer, index, list){
                this.positions.push({
                    answer_value: answer.answer_value, 
                    answer_text: answer.answer_text, 
                    label: answer.answer_text, 
                    answer_id: answer.answer_id,
                    topic: current_topic,
                    id: answer.answer_id, 
                })
            }, this)
            this.topics.push(current_topic)
        }, this);

        this.categories.push(current_category)
    }, this)
    _.each(json.candidates, function(candidate, index, list){
        var person = {
            candidate_name: candidate.candidate_name,
            name: candidate.candidate_name,
            candidate_id: candidate.candidate_id,
            id: candidate.candidate_id
        }
        this.candidates.push(person)
        _.each(candidate.positions, function(taken_position, index, list){
            var the_position = this.build_position_from_object(taken_position)
            the_position.candidate_id = candidate.candidate_id
            the_position.person = person
            this.taken_positions.push(the_position)
        }, this);

    }, this)
}

JSONAdapter.prototype.getById= function(collection, id) {
    return _.find(collection, function(element){return (element.id==id);});
}
JSONAdapter.prototype.getCategoryByID = function(id){
    return this.getById(this.categories, id);
}
JSONAdapter.prototype.getCandidateByID = function(id){
    return this.getById(this.candidates, id);
}
JSONAdapter.prototype.getTopicByID = function(id){
    return this.getById(this.topics, id);   
}
JSONAdapter.prototype.getPositionById = function(id){
    return this.getById(this.positions, id);      
}
JSONAdapter.prototype.get_taken_position_by = function(person, topic){
    return _.find(this.taken_positions, function(taken_position){return (taken_position.person==person)&&(taken_position.topic==topic);});
}
JSONAdapter.prototype.get_topics_per_category = function(category){
    return _.filter(this.topics, function(topic){ return this.is_topic_category_the_same_as(topic, category);}, this)
}
JSONAdapter.prototype.is_topic_category_the_same_as = function(topic, category){
    return topic.category.category_id == category.category_id
}
JSONAdapter.prototype.build_position_from_object = function(position){
    var the_position = {
        "answer_id": position.answer_id,
        "position": this.getPositionById(position.answer_id),
        "question_id": position.question_id,
        "topic": this.getTopicByID(position.question_id),
    }
    
    return the_position;
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
    if(adapter){
        this.positions = this.adapter.positions || {};
        this.persons = this.adapter.persons || [];
        this.topics = this.adapter.topics || [];
        this.categories = this.adapter.categories || [];
    }
    else{
        this.positions = {};
        this.persons = [];
        this.topics = [];
        this.categories = [];
    }
}
InformationHolder.prototype.add_position = function(position){
    if (position.topic != undefined && position.topic.slug == undefined && position.topic.question_text != undefined){
        position.topic.slug = slugify(position.topic.question_text)
    }
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
    if (options.information_holder){
        this.adapter = options.information_holder.adapter;
    }
    else {
        var adapter_class = options.adapter_class || undefined;
        this.adapter = new adapter_class();
    }
    var calculator_class = options.calculator_class || CandidatorCalculator;
    this.calculator = new calculator_class();
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
        var external_position = positions[topic.slug].position || positions[topic.slug]

        _.extend(comparison[topic.slug], 
            this.calculator.determine_match(person_taken_positions.position, external_position))
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

