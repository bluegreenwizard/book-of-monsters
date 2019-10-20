import { remove, shuffle, sample, random as randInt } from 'lodash';

//Load monster features and names from JSON
async function fetchMonsterFeatures() {
    const res = await fetch('./assets/monster-features.json');
    const features = await res.json();
    return features;
}
async function fetchMonsterNames() {
    const res = await fetch('./assets/monster-names.json');
    const names = await res.json();
    return names;
}

async function generateMonster(level, similarity) {
    const [ features, names ] = await Promise.all([
        fetchMonsterFeatures(), 
        fetchMonsterNames()
    ]);

    const favorites = features.favoriteSnack.concat(features.favoriteToy);

    //Min level 1, Max level 3
    if (level > 3) {
        level = 3;
    } else if (level < 1) {
        level = 1;
    }

    const monster = {
        name: sample(names),
        furColor: sample(features.colors),
        eyeColor: sample(features.colors),
        numEyes: sample([1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8]),
        bodyType: sample(features.bodyType),
        armType: sample(features.armType),
        mouthType: sample(features.mouthType),
        favoriteSnack: sample(features.favoriteSnack),
        favoriteToy: sample(features.favoriteToy),
        personality: sample(features.personality),
        hates: null,
        //Give monster 1-3 weaknesses based on level.
        weaknesses: shuffle(features.weakness).slice(0, Math.abs(level - 4))
    }

    //Monster hates something different from it's favorite toy or snack
    const favoritesMinusLikes = remove(favorites, fav => {
        return fav !== monster.favoriteSnack || fav !== monster.favoriteToy;
    });
    monster.hates = sample(favoritesMinusLikes)

    return monster;
}

generateMonster(3).then(monster => {
    console.log(monster);
    
});