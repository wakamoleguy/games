const Player = require('./player');

/**
 *
 * An immutable Trick of one round of cards played by each Player
 *
 */

function Trick(plays) {
    this.plays = plays;
}

Trick.prototype = {
    getWinner: function () {
        throw new Error('Aggressively deprecated');

        /*
        if (this.cardsByPlayers.some(
            (cardByPlayer) => cardByPlayer.card === null
        )) {
            return null;
        } else {
            throw "Unimplemented";
        }
        */
    }
};

function isPlayComplete(play) {
    return play.card !== null;
}

function isTrickEmpty(trick) {
    return !trick.plays.some(isPlayComplete);
}

function isTrickComplete(trick) {
    return trick.plays.every(isPlayComplete);
}

function play(trick, player, card) {
    const nextPlay = trick.plays.find((play) => !isPlayComplete(play));

    if (nextPlay === undefined) {
        throw new Error('Cannot play to completed trick');
    }

    if (nextPlay.player !== player) {
        throw new Error('Player playing out of turn');
    }

    if (!Player.hasCard(player, card)) {
        throw new Error('Player does not have requested card');
    }

    return new Trick(
        trick.plays.
            map((play) =>
                play.player === player ?
                { player, card } :
                play
            )
    );
}

module.exports = {
    create: function (players) {
        return new Trick(players.map((player) => ({
            player,
            card: null
        })));
    },

    isPlayComplete,
    isTrickEmpty,
    isTrickComplete,
    play
};
