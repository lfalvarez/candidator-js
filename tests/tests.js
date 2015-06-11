function TestAdapter(){
    this.topics = topics;
    this.taken_positions = taken_positions;
}
TestAdapter.prototype.get_taken_position_by = function(person, topic){
    return _.find(this.taken_positions, function(taken_position){return (taken_position.person==person)&&(taken_position.topic==topic);});
}

QUnit.module( "Comparer" );
QUnit.test( "One on one", function( assert ) {
    var comparer = new Comparer({'adapter_class': TestAdapter});
    var marihuana_position = {
        topic: marihuana_topic,
        position: marihuana_yes,
    }
    var religion_position = {
        topic: religion_topic,
        position: religion_yes,
    }
    var positions = {
        'marihuana': marihuana_position,
        'religion': religion_position
    }
    var topics = [
        self.marihuana_topic,
        self.religion_topic
    ]
    comparer.topics = topics
    var result = comparer.one_on_one(person1, positions)
    var expected_result = {
        'marihuana': {
            "topic": marihuana_topic,
            "match": true
        },
        'religion': {
            "topic": religion_topic,
            "match": false
        }
    }
    assert.equal(result['marihuana']['topic'], expected_result['marihuana']['topic'])
    assert.ok(result['marihuana']['match'])
    assert.notOk(result['religion']['match'])
    assert.equal(result['religion']['topic'], expected_result['religion']['topic'])

});
QUnit.module( "Calculator" );
QUnit.test('determine match', function(assert){
    var calculator = new CandidatorCalculator();
    assert.ok(calculator.determine_match(chamomile_yes, chamomile_yes)['match']);
    assert.notOk(calculator.determine_match(chamomile_yes, chamomile_no)['match'])

})