function TestAdapter(){
    this.topics = topics;
    this.taken_positions = taken_positions;
    this.categories = categories;
    this.topics = topics;
}
TestAdapter.prototype.get_taken_position_by = function(person, topic){
    return _.find(this.taken_positions, function(taken_position){return (taken_position.person==person)&&(taken_position.topic==topic);});
}
TestAdapter.prototype.get_topics_per_category = function(category){
    return _.filter(this.topics, function(topic){ return topic.category==category; })
}
TestAdapter.prototype.is_topic_category_the_same_as = function(topic, category){
    return topic.category == category
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
        marihuana_topic,
        religion_topic
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

QUnit.module( "Information Holder" );
QUnit.test('instanciate', function(assert){
    var information_holder = new InformationHolder()
    var marihuana_position = {
        topic: marihuana_topic,
        position: marihuana_yes,
    }
    var religion_position = {
        topic: religion_topic,
        position: religion_yes,
    }
    information_holder.add_position(marihuana_position)
    information_holder.add_position(religion_position)
    assert.equal(information_holder.positions[marihuana_topic.slug], marihuana_position)
    assert.equal(information_holder.positions[religion_topic.slug], religion_position)

    information_holder.add_person(person1)
    assert.equal(information_holder.persons[0], person1)
    information_holder.add_person(person2)
    assert.equal(information_holder.persons[0], person1)
    assert.equal(information_holder.persons[1], person2)
    information_holder.add_person(person3)
    assert.equal(information_holder.persons[0], person1)
    assert.equal(information_holder.persons[1], person2)
    assert.equal(information_holder.persons[2], person3)

    information_holder.add_topic(marihuana_topic)
    assert.equal(information_holder.topics[0], marihuana_topic)

})
QUnit.test('Information holder with categories', function(assert){
    marihuana_topic.category = herbs_category
    religion_topic.category = others_category
    var information_holder = new InformationHolder(new TestAdapter())
    information_holder.add_category(herbs_category)
    information_holder.add_category(others_category)
    assert.ok(_.contains(information_holder.categories, herbs_category))
    assert.ok(_.contains(information_holder.categories, others_category))
    assert.ok(_.contains(information_holder.topics, marihuana_topic))
    assert.ok(_.contains(information_holder.topics, religion_topic))

})

QUnit.test('split positions in categories', function(assert){
    marihuana_topic.category = herbs_category
    chamomile_topic.category = herbs_category
    religion_topic.category = others_category
    gay_marriage_topic.category = others_category
    var information_holder = new InformationHolder(new TestAdapter())
    var marihuana_position = {
        topic: marihuana_topic,
        position: marihuana_yes
    }
    var religion_position = {
        topic: religion_topic,
        position: religion_yes
    }
    var chamomile_position = {
        topic: chamomile_topic,
        position: chamomile_no
        }
    var gay_marriage_position = {
        topic: gay_marriage_topic,
        position: gay_marriage_yes
        }
    information_holder.add_position(marihuana_position)
    information_holder.add_position(religion_position)
    information_holder.add_position(chamomile_position)
    information_holder.add_position(gay_marriage_position)
    var positions_by_herbs = information_holder.positions_by(herbs_category)
    assert.equal(positions_by_herbs[marihuana_topic.slug], marihuana_position)
    assert.equal(positions_by_herbs[chamomile_topic.slug], chamomile_position)

    var positions_by_others = information_holder.positions_by(others_category)

    assert.equal(positions_by_others[religion_topic.slug], religion_position)
    assert.equal(positions_by_others[gay_marriage_topic.slug], gay_marriage_position)
})
QUnit.test('compare_categories_with_information_holder', function(assert){
    marihuana_topic.category = herbs_category
    chamomile_topic.category = herbs_category
    religion_topic.category = others_category
    gay_marriage_topic.category = others_category
    var information_holder = new InformationHolder(new TestAdapter())
    var marihuana_position = {
        topic: marihuana_topic,
        position: marihuana_no
    }
    var religion_position = {
        topic: religion_topic,
        position: religion_no
    }
    var chamomile_position = {
        topic: chamomile_topic,
        position: chamomile_no
        }
    var gay_marriage_position = {
        topic: gay_marriage_topic,
        position: gay_marriage_yes
        }
    information_holder.add_position(marihuana_position)
    information_holder.add_position(religion_position)
    information_holder.add_position(chamomile_position)
    information_holder.add_position(gay_marriage_position)
    information_holder.add_person(person1)
    information_holder.add_person(person2)
    information_holder.add_person(person3)
    information_holder.add_category(herbs_category)
    information_holder.add_category(others_category)
    var comparer = new Comparer({'adapter_class': TestAdapter});
    result = comparer.compare(information_holder)
    expected_result = [{"person": person3,
                            "explanation": {
                                "herbs": {

                                    "marihuana": {
                                        "topic": marihuana_topic,
                                        "match": true
                                    },
                                    "chamomile": {
                                        "topic": chamomile_topic,
                                        "match": true
                                    },
                                },
                                "others": {
                                    "religion": {
                                        "topic": religion_topic,
                                        "match": true
                                    },
                                    "gay_marriage": {
                                        "topic": gay_marriage_topic,
                                        "match": true
                                    }
                                }
                            },
                            "percentage": 1.0
                            },
                           {"person": person2,
                            "explanation": {
                                "herbs": {

                                    "marihuana": {
                                        "topic": marihuana_topic,
                                        "match": true
                                    },
                                    "chamomile": {
                                        "topic": chamomile_topic,
                                        "match": true
                                    },
                                },
                                "others": {
                                    "religion": {
                                        "topic": religion_topic,
                                        "match": false
                                    },
                                    "gay_marriage": {
                                        "topic": gay_marriage_topic,
                                        "match": true
                                    }
                                }
                            },
                            "percentage": 0.75
                            },
                           {"person": person1,
                            "explanation": {
                                "herbs": {

                                    "marihuana": {
                                        "topic": marihuana_topic,
                                        "match": false
                                    },
                                    "chamomile": {
                                        "topic": chamomile_topic,
                                        "match": false
                                    },
                                },
                                "others": {

                                    "religion": {
                                        "topic": religion_topic,
                                        "match": true
                                    },
                                    "gay_marriage": {
                                        "topic": gay_marriage_topic,
                                        "match": true
                                    }
                                }
                            },
                            "percentage": 0.5
                            }]
        
        assert.ok(_.isEqual(result, expected_result));
})