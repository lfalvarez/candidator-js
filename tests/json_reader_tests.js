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
                                "answer_id": 1
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
    


    assert.equal(expected_candidates[0].candidate_name, adapter.candidates[0].candidate_name)
    assert.equal(expected_candidates[0].name, adapter.candidates[0].name)
    assert.equal(expected_candidates[0].candidate_id, adapter.candidates[0].candidate_id)
    assert.equal(expected_candidates[0].id, adapter.candidates[0].id)


    assert.equal(expected_candidates[1].candidate_name, adapter.candidates[1].candidate_name)
    assert.equal(expected_candidates[1].name, adapter.candidates[1].name)
    assert.equal(expected_candidates[1].candidate_id, adapter.candidates[1].candidate_id)
    assert.equal(expected_candidates[1].id, adapter.candidates[1].id)


    assert.equal(expected_candidates[2].candidate_name, adapter.candidates[2].candidate_name)
    assert.equal(expected_candidates[2].name, adapter.candidates[2].name)
    assert.equal(expected_candidates[2].candidate_id, adapter.candidates[2].candidate_id)
    assert.equal(expected_candidates[2].id, adapter.candidates[2].id)

    assert.equal(expected_candidates[3].candidate_name, adapter.candidates[3].candidate_name)
    assert.equal(expected_candidates[3].name, adapter.candidates[3].name)
    assert.equal(expected_candidates[3].candidate_id, adapter.candidates[3].candidate_id)
    assert.equal(expected_candidates[3].id, adapter.candidates[3].id)


    assert.equal(expected_topics[0].question_text, adapter.topics[0].question_text)
    assert.equal(expected_topics[0].label, adapter.topics[0].label)
    assert.equal(expected_topics[0].slug, adapter.topics[0].slug)
    assert.equal(expected_topics[0].question_id, adapter.topics[0].question_id)
    assert.equal(expected_topics[0].id, adapter.topics[0].id)

    assert.equal(expected_topics[1].question_text, adapter.topics[1].question_text)
    assert.equal(expected_topics[1].label, adapter.topics[1].label)
    assert.equal(expected_topics[1].slug, adapter.topics[1].slug)
    assert.equal(expected_topics[1].question_id, adapter.topics[1].question_id)
    assert.equal(expected_topics[1].id, adapter.topics[1].id)

    assert.equal(expected_topics[2].question_text, adapter.topics[2].question_text)
    assert.equal(expected_topics[2].label, adapter.topics[2].label)
    assert.equal(expected_topics[2].slug, adapter.topics[2].slug)
    assert.equal(expected_topics[2].question_id, adapter.topics[2].question_id)
    assert.equal(expected_topics[2].id, adapter.topics[2].id)

    assert.equal(expected_topics[3].question_text, adapter.topics[3].question_text)
    assert.equal(expected_topics[3].label, adapter.topics[3].label)
    assert.equal(expected_topics[3].slug, adapter.topics[3].slug)
    assert.equal(expected_topics[3].question_id, adapter.topics[3].question_id)
    assert.equal(expected_topics[3].id, adapter.topics[3].id)
})