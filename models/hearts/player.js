const Card = require('../../card/card');

/*
 *
 * An immutable Player of Hearts
 *
 */
function Player({
    hand,
    score
}) {
    this.hand = hand;
    this.score = score;
}

Player.prototype = {
};

function hasCard(player, card) {
    return player.hand.some((cardInHand) => Card.equals(cardInHand, card));
};

function withoutCard(player, card) {

    if (hasCard(player, card)) {

        return new Player({
            hand: player.hand.
                filter((cardInHand) => !Card.equals(card, cardInHand)),
            score: player.score
        });

    } else {

        return player;
    }
};

function addScore(player, scoreAddend) {

    if (Number.isFinite(scoreAddend)) {

        return new Player({
            hand: player.hand,
            score: player.score + scoreAddend
        });

    } else {

        throw new Error('Score addend is NaN or not finite');
    }
}

module.exports = {
    create(hand, score) {

        if (!hand[Symbol.iterator]) {
            throw new Error('hand is not iterable');
        }
        if (!Number.isFinite(score)) {
            throw new Error('Score is NaN or not finite');
        }

        return new Player({
            hand,
            score
        });
    },

    hasCard,
    withoutCard,
    addScore
};
