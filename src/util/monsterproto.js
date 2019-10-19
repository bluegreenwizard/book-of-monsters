import * as _ from 'lodash';

const attributes = {
    name: [
        "Frank",
        "Horus",
        "Marg",
        "Hooley",
        "Borf",
        "Rolf",
        "Maggie",
        "Suzy",
        "Poo",
        "Moo"
    ],
    eyeColor: [
        'red',
        'blue',
        'yellow',
        'green',
        'orange',
        'pink'
    ],
    hairColor: [
        'red',
        'blue',
        'yellow',
        'green',
        'orange',
        'pink'
    ],
    hairType: [
        'long',
        'fuzzy',
        'curly',
        'dirty',
    ],
    bodyFeature: [
        'thin',
        'round',
        'big ears',
        'big mouth',
        'small eyes',
        'big eyes'
    ],
    favoriteSnack: [
        'peanut butter',
        'cookies',
        'little boys',
        'chocolate',
        'brocolli',
        'cheese'
    ],
}

function createMonster() {
    const newMonster = {};
    Object.keys(attributes).forEach(key => {
        newMonster[key] = _.sample(attributes[key]);
    });

    return newMonster;
}

const monsters = [];
const knownNames = [];
for (let i = 0; i < 3; i++) {
    monsters.push(createMonster());
}

function readStory() {
    const monster = _.sample(monsters);
    knownNames.push(monster.name);
    console.log(`${monster.name} is a ${monster.hairColor} haired monster who likes ${monster.favoriteSnack}.`);
}

function monsterVisits() {
    const monster = _.sample(monsters);
    console.log(`A monster visits..`);
    questionPrompt(monster);
}

function questionPrompt(current) {
    const questions = [
        'Tell me about yourself'
    ];
    questions.push(knownNames.map(name => {
        return `Tell me about ${name}`;
    }));

    questions.forEach((q, i) => {
        console.log(`${i + 1}. ${q}.`);
    });

    const choice = parseInt(prompt('Type a number.'), 10) - 1;
    if (choice === 0) {
        console.log(`Me? I like to snack on ${current.favoriteSnack}. :)`);
    } else {
        current = monsters.find(mon => {
            console.log(knownNames);
            console.log(mon.name, knownNames[choice - 1]);
            return mon.name === knownNames[choice - 1];
        });
        console.log(`${current.name}? I think they like to snack on ${current.favoriteSnack}.`);
    }
}

readStory();
monsterVisits();

export default createMonster;