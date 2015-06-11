var person1 = {
    'id': 'person1',
    'name': 'Person1'
};
var person2 = {
    'id': 'person2',
    'name': 'Person2'
};
var person3 = {
    'id': 'person3',
    'name': 'Person3'
};

var herbs_category = {
        id: 1,
        name: 'Herbs',
        slug: 'herbs'
    };
var others_category = {
        id: 2,
        name: 'Others',
        slug: 'others'
    };

var marihuana_topic = {id: 1, label: "Marihuana"};
marihuana_topic.slug = 'marihuana';
var marihuana_yes = {
    id: 1, 
    topic: marihuana_topic,
    label: "MarihuanaYes"
};
var marihuana_no = {
    id: 2, 
    topic: marihuana_topic,
    label: "MarihuanaNo"
};
var chamomile_topic = {id: 2, lab: "Chamomile"};
chamomile_topic.slug = 'chamomile';

var chamomile_yes = {
    id: 3,
    topic: chamomile_topic,
    label: "ChamomileYes"
};
var chamomile_no = {
    id: 4, 
    topic: chamomile_topic,
    label: "ChamomileNo"
};
var religion_topic = {id: 3, label: "Religion"};
religion_topic.slug = 'religion';

var religion_yes = {
    id: 5,
    topic: religion_topic,
    label: "ReligionYes"
};
var religion_no = {
    id: 6, 
    topic: religion_topic,
    label: "ReligionNo"
};
var gay_marriage_topic = {id: 4, label: "GayMarriage"};
gay_marriage_topic.slug = 'gay_marriage';

var gay_marriage_yes = {
    id: 7,
    topic: gay_marriage_topic,
    label: "GayMarriageYes"
};
var gay_marriage_no = {
    id: 8, 
    topic: gay_marriage_topic,
    label: "GayMarriageNo"
};

/*
   topic\person   |  person1 |  person2  |  person3
===================================================
   marihuana      |    y     |    n      |    n
   chamomille     |    y     |    n      |    n
   religion       |    n     |    y      |    n
   gay marriage   |    y     |    y      |    y
*/

var person1_chamomile_yes = {
    id: 1, 
    topic: chamomile_topic,
    position: chamomile_yes,
    person: person1
};

var person1_marihuana_yes = {
    id: 2, 
    topic: marihuana_topic,
    position: marihuana_yes,
    person: person1
};

var person1_religion_no = {
    id: 3, 
    topic: religion_topic,
    position: religion_no,
    person: person1
};

var person1_gay_marriage_yes = {
    id: 4, 
    topic: gay_marriage_topic,
    position: gay_marriage_yes,
    person: person1
};

var person2_chamomile_no = {
    id: 5, 
    topic: chamomile_topic,
    position: chamomile_no,
    person: person2
};

var person2_marihuana_no = {
    id: 6, 
    topic: marihuana_topic,
    position: marihuana_no,
    person: person2
};

var person2_religion_yes = {
    id: 7, 
    topic: religion_topic,
    position: religion_yes,
    person: person2
};

var person2_gay_marriage_yes = {
    id: 8, 
    topic: gay_marriage_topic,
    position: gay_marriage_yes,
    person: person2
};

var person3_chamomile_no = {
    id: 9, 
    topic: chamomile_topic,
    position: chamomile_no,
    person: person3
};

var person3_marihuana_no = {
    id: 10, 
    topic: marihuana_topic,
    position: marihuana_no,
    person: person3
};

var person3_religion_no = {
    id: 11, 
    topic: religion_topic,
    position: religion_no,
    person: person3
};

var person3_gay_marriage_yes = {
    id: 12, 
    topic: gay_marriage_topic,
    position: gay_marriage_yes,
    person: person3
};


var candidates = [
    person1,
    person2,
    person3
]

var categories = [
    herbs_category,
    others_category
]

var topics = [
    marihuana_topic,
    chamomile_topic,
    religion_topic,
    gay_marriage_topic
]

var positions = [
    marihuana_yes,
    marihuana_no,
    chamomile_yes,
    chamomile_no,
    religion_yes,
    religion_no,
    gay_marriage_yes,
    gay_marriage_no
]
var taken_positions = [
    person1_chamomile_yes,
    person1_marihuana_yes,
    person1_religion_no,
    person1_gay_marriage_yes,
    person2_chamomile_no,
    person2_marihuana_no,
    person2_religion_yes,
    person2_gay_marriage_yes,
    person3_chamomile_no,
    person3_marihuana_no,
    person3_religion_no,
    person3_gay_marriage_yes
]
