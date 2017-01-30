const Player = require('./player');
const Trick = require('./trick');
/**
 *
 * An game state of Hearts
 *
 */

function Game({
    players,
    tricks,
    currentTrick,
    round
}) {
    this.players = players;
    this.tricks = tricks;
    this.currentTrick = currentTrick;
    this.round = round;
}

function playerWithCard(game, card) {
    return game.players.find(
        (player) => Player.hasCard(player, card)
    );
}

function updatePlayers(players, oldPlayer, newPlayer) {
    return players.map(
        (player) =>
            player === oldPlayer ?
            newPlayer :
            player
    );
}

function playCard(game, player, card) {
    if (game.players.indexOf(player) < 0) {
        throw new Error('Player is not in this game');
    }

    const playerWithoutCard = Player.withoutCard(player, card);
    if (playerWithoutCard === player) {
        throw new Error('Player played a card they did not have');
    }

    const trick = Trick.play(game.currentTrick, player, card);

    return new Game({
        players: updatePlayers(game.players, player, playerWithoutCard),
        tricks: game.tricks,
        currentTrick: trick,
        round: game.round
    });
}

module.exports = {
    create: function ({
        players,
        tricks,
        currentTrick,
        round
    }) {
        return {
            players,
            tricks,
            currentTrick,
            round
        };
    },

    playerWithCard,
    playCard
};
