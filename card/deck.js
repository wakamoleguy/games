
/*
 * Deck Model
 */
const List = require('../models/common/list');

/*
 * Deck Mutations
 */
function create(n) {
    const length = n === undefined ? 52 : n;

    return identityArray(length);
}

function shuffle(deck) {
    return deck.
        map((card) => ({
            card,
            sort: Math.random()
        })).
        sort((a, b) => (b.sort - a.sort)).
        map((compoundCard) => compoundCard.card);
};
module.exports = {
    create,
    shuffle
};

/*
 * Private helpers
 */

function identityArray(n) {
    /* 'Should' be `new Array(n).map((_,i) => i)` */
    let a = [];
    for (let i = 0; i < n; i++) {
        a.push(i);
    }
    return a;
}
