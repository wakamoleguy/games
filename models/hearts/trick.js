/**
 *
 * An immutable Trick of one round of cards played by each Player
 *
 */

function Trick(cardsByPlayers) {
    this.cardsByPlayers = cardsByPlayers;
}

Trick.prototype = {
    getWinner: function () {
        if (this.cardsByPlayers.some(
            (cardByPlayer) => cardByPlayer.card === null
        )) {
            return null;
        } else {
            throw "Unimplemented";
        }
    }
}

module.exports = {
    create: function (players) {
        return new Trick(players.map((player) => ({
            player,
            card: null
        })));
    }
}
