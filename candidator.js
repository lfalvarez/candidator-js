function CandidatorCalculator(){

}
CandidatorCalculator.prototype.determine_match = function(person_position, external_position){
    var match = false;
    if(person_position==external_position){
        match = true;
    }
    return {'match': match};

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
Comparer.prototype.topics = null;

