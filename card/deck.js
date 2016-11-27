
/*
 * Deck Model
 */
const List = require('../data_structures/list');

/*
 * Deck Mutations
 */
function create(n) {
    const length = n === undefined ? 52 : n;

    return List.create(identityArray(length));
}

function shuffle(deck) {
    let remaining = deck;
    let shuffled = create(0);
    while (remaining.length()) {
        const i = Math.floor(Math.random() * remaining.length());
        const { head, tail } = remaining.take(i);
        shuffled = shuffled.push(head);
        remaining = tail;
    }

    return shuffled;
}

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
