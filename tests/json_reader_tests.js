QUnit.module( "Reading JSON" );
QUnit.test('read the json elements', function(assert){
    var adapter = new JSONAdapter(fixtures2);
    var expected_categories = [{
        category_id: 1,
        id:1,
        name: "Preguntas presidente",
        slug: "preguntas-presidente"
    }]
    var expected_topics = [
    {
        "question_text": "¿Estás de acuerdo con la tenencia de drogas para consumo personal?",
        "label": "¿Estás de acuerdo con la tenencia de drogas para consumo personal?",
        "slug": "ests-de-acuerdo-con-la-tenencia-de-drogas-para-consumo-personal",
        "answers": [], // is an array of objects
        "question_id": 1,
        "id": 1
    },
    {
        "question_text": "¿Creés que se deben instalar más cámaras de seguridad en la vía pública?",
        "label": "¿Creés que se deben instalar más cámaras de seguridad en la vía pública?",
        "slug": "cres-que-se-deben-instalar-ms-cmaras-de-seguridad-en-la-va-pblica",
        "answers": [], // is an array of objects
        "question_id": 2,
        "id": 2
    },
    {
        "question_text": "la inseguridad se combate aumentando las penas de los delitos?",
        "label": "la inseguridad se combate aumentando las penas de los delitos?",
        "slug": "la-inseguridad-se-combate-aumentando-las-penas-de-los-delitos",
        "answers": [], // is an array of objects
        "question_id": 3,
        "id": 3
    },
    {
        "question_text": "¿Creés que se debe bajar la edad de imputabilidad?",
        "label": "¿Creés que se debe bajar la edad de imputabilidad?",
        "slug": "cres-que-se-debe-bajar-la-edad-de-imputabilidad",
        "answers": [], // is an array of objects
        "question_id": 4,
        "id": 4
    },
    ]
    var expected_candidates = [{
        candidate_name: "Daniel Scioli",
        name: "Daniel Scioli",
        candidate_id: "daniel-scioli",
        id: "daniel-scioli"
        },
        {
        candidate_name: "Margarita Stolbizer",
        name: "Margarita Stolbizer",
        candidate_id: "margarita-stolbizer",
        id: "margarita-stolbizer"
        },
        {
        candidate_name: "Mauricio Macri",
        name: "Mauricio Macri",
        candidate_id: "mauricio-macri",
        id: "mauricio-macri"
        },
        {
        candidate_name: "Sergio Massa",
        name: "Sergio Massa",
        candidate_id: "sergio-massa",
        id: "sergio-massa"
        }
    ]
    var expected_positions = [{
                                "answer_value": -2,
                                "answer_text": "Sí",
                                "label": "Sí",
                                "answer_id": 1,
                                "id": 1
                                },
                                {
                                "answer_value": -1,
                                "answer_text": "Sí, pero sólo en el caso de marihuana",
                                "label": "Sí, pero sólo en el caso de marihuana",
                                "answer_id": 2,
                                "id": 2
                                },
                                {
                                "answer_value": 1,
                                "answer_text": "No, salvo con usos medicinales",
                                "label": "No, salvo con usos medicinales",
                                "answer_id": 3,
                                "id": 3
                                },
                                {
                                "answer_value": 2,
                                "answer_text": "No",
                                "label": "No",
                                "answer_id": 4,
                                "id": 4
                                },
                                {
                                "answer_value": -2,
                                "answer_text": "Sí",
                                "label": "Sí",
                                "answer_id": 5,
                                "id": 5
                                },
                                {
                                "answer_value": 0,
                                "answer_text": "Sí, pero que sólo sean observadas por la autoridad pública",
                                "label": "Sí, pero que sólo sean observadas por la autoridad pública",
                                "answer_id": 6,
                                "id": 6
                                },
                                {
                                "answer_value": 1,
                                "answer_text": "No, salvo en lugares de gran concentración de gente (como estaciones de tren, aeropuertos, parques, etc)",
                                "label": "No, salvo en lugares de gran concentración de gente (como estaciones de tren, aeropuertos, parques, etc)",
                                "answer_id": 7,
                                "id": 7
                                },
                                {
                                "answer_value": 2,
                                "answer_text": "No",
                                "label": "No",
                                "answer_id": 8,
                                "id": 8
                                },
                                {
                                "answer_value": -2,
                                "answer_text": "Sí",
                                "label": "Sí",
                                "answer_id": 9,
                                "id": 9
                                },
                                {
                                "answer_value": -1,
                                "answer_text": "Sí, pero también hay que mejorar las cárceles y con re-educación del delincuente",
                                "label": "Sí, pero también hay que mejorar las cárceles y con re-educación del delincuente",
                                "answer_id": 10,
                                "id": 10
                                },
                                {
                                "answer_value": 1,
                                "answer_text": "No, pero los procesos judiciales deberían ser más rápidos",
                                "label": "No, pero los procesos judiciales deberían ser más rápidos",
                                "answer_id": 11,
                                "id": 11
                                },
                                {
                                "answer_value": 2,
                                "answer_text": "No, las penas más severas no son la solución",
                                "label": "No, las penas más severas no son la solución",
                                "answer_id": 12,
                                "id": 12
                                },
                                {
                                "answer_value": -2,
                                "answer_text": "Sí, hasta los 14 años",
                                "label": "Sí, hasta los 14 años",
                                "answer_id": 13,
                                "id": 13
                                },
                                {
                                "answer_value": -1,
                                "answer_text": "Sí, pero hasta los 16 años",
                                "label": "Sí, pero hasta los 16 años",
                                "answer_id": 14,
                                "id": 14
                                },
                                {
                                "answer_value": 1,
                                "answer_text": "No, salvo que se le aplique una pena que no sea de prisión",
                                "label": "No, salvo que se le aplique una pena que no sea de prisión",
                                "answer_id": 15,
                                "id": 15
                                },
                                {
                                "answer_value": 2,
                                "answer_text": "No",
                                "label": "No",
                                "answer_id": 16,
                                "id": 16
                                }]

    for (i = 0; i < expected_positions.length; i++) {
        assert.equal(expected_positions[i].answer_value, adapter.positions[i].answer_value);
        assert.equal(expected_positions[i].answer_text, adapter.positions[i].answer_text);
        assert.equal(expected_positions[i].label, adapter.positions[i].label);
        if (expected_positions[i].label != adapter.positions[i].label){
            console.log(expected_positions[i])
            console.log(adapter.positions[i])
        }
        assert.equal(expected_positions[i].answer_id, adapter.positions[i].answer_id);
        assert.equal(expected_positions[i].id, adapter.positions[i].id);

    }
    for (i = 0; i < expected_candidates.length; i++) {
        assert.equal(expected_candidates[i].candidate_name, adapter.candidates[i].candidate_name)
        assert.equal(expected_candidates[i].name, adapter.candidates[i].name)
        assert.equal(expected_candidates[i].candidate_id, adapter.candidates[i].candidate_id)
        assert.equal(expected_candidates[i].id, adapter.candidates[i].id)
        
    }

    for (i = 0; i < expected_topics.length; i++) {
        assert.equal(expected_topics[i].question_text, adapter.topics[i].question_text)
        assert.equal(expected_topics[i].label, adapter.topics[i].label)
        assert.equal(expected_topics[i].slug, adapter.topics[i].slug)
        assert.equal(expected_topics[i].question_id, adapter.topics[i].question_id)
        assert.equal(expected_topics[i].id, adapter.topics[i].id)
    }

})
QUnit.test('Adapter get by id', function(assert){
    var adapter = new JSONAdapter(fixtures2);
    assert.equal(adapter.getCandidateByID('margarita-stolbizer').name, "Margarita Stolbizer")
    assert.equal(adapter.getCategoryByID(1).name, "Preguntas presidente")
    assert.equal(adapter.getTopicByID(2).label, "¿Creés que se deben instalar más cámaras de seguridad en la vía pública?")
    assert.equal(adapter.getPositionById(10).label, "Sí, pero también hay que mejorar las cárceles y con re-educación del delincuente")
})

QUnit.test('Get the taken positions right', function(assert){
    
    var taken_positions = [
                {
                "answer_id": 3,
                "question_id": 1,
                "candidate_id": "daniel-scioli"
                },
                {
                "answer_id": 5,
                "question_id": 2,
                "candidate_id": "daniel-scioli"
                },
                {
                "answer_id": 11,
                "question_id": 3,
                "candidate_id": "daniel-scioli"
                },
                {
                "answer_id": 15,
                "question_id": 4,
                "candidate_id": "daniel-scioli"
                }
                ,
                {
                "answer_id": 2,
                "question_id": 1,
                "candidate_id": "margarita-stolbizer"
                },
                {
                "answer_id": 7,
                "question_id": 2,
                "candidate_id": "margarita-stolbizer"
                },
                {
                "answer_id": 12,
                "question_id": 3,
                "candidate_id": "margarita-stolbizer"
                },
                {
                "answer_id": 15,
                "question_id": 4,
                "candidate_id": "margarita-stolbizer"
                },
                {
                "answer_id": 2,
                "question_id": 1,
                "candidate_id": "mauricio-macri"
                },
                {
                "answer_id": 6,
                "question_id": 2,
                "candidate_id": "mauricio-macri"
                },
                {
                "answer_id": 10,
                "question_id": 3,
                "candidate_id": "mauricio-macri"
                },
                {
                "answer_id": 13,
                "question_id": 4,
                "candidate_id": "mauricio-macri"
                },
                {
                "answer_id": 2,
                "question_id": 1,
                "candidate_id": "sergio-massa"
                },
                {
                "answer_id": 6,
                "question_id": 2,
                "candidate_id": "sergio-massa"
                },
                {
                "answer_id": 10,
                "question_id": 3,
                "candidate_id": "sergio-massa"
                },
                {
                "answer_id": 14,
                "question_id": 4,
                "candidate_id": "sergio-massa"
                }
                ]
    var expected_taken_positions = []
    var adapter = new JSONAdapter(fixtures2);
    _.each(taken_positions, function(taken_position, index, list){
        var answer = adapter.getPositionById(taken_position.answer_id)
        var topic = adapter.getTopicByID(taken_position.question_id)
        var person = adapter.getCandidateByID(taken_position.candidate_id)
        expected_taken_positions.push({
            "answer_id": taken_position.answer_id,
            'position': answer,
            "question_id": taken_position.question_id,
            "topic": topic,
            "candidate_id": taken_position.candidate_id,
            "person": person
        })
    }, this)
    for (i = 0; i < expected_taken_positions.length; i++) {
        assert.equal(expected_taken_positions[i].answer_id, adapter.taken_positions[i].answer_id)
        assert.equal(expected_taken_positions[i].position, adapter.taken_positions[i].position)
        assert.equal(expected_taken_positions[i].question_id, adapter.taken_positions[i].question_id)
        assert.equal(expected_taken_positions[i].topic, adapter.taken_positions[i].topic)
        assert.equal(expected_taken_positions[i].candidate_id, adapter.taken_positions[i].candidate_id)
        assert.equal(expected_taken_positions[i].person, adapter.taken_positions[i].person)
        
    }

})