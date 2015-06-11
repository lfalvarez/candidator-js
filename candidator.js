function CandidatorCalculator(){

}
CandidatorCalculator.prototype.determine_match = function(person_position, external_position){
    var match = false;
    if(person_position==external_position){
        match = true;
    }
    return {'match': match};

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
    console.log(comparison )
    return comparison

}
Comparer.prototype.topics = null;