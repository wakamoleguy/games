const Deck = require('../card/deck');
const Card = require('../card/card');
const Player = require('./player');
const List = require('../models/common/list');

/** Initialize game **/
const players = List.create([
    Player.create(),
    Player.create(),
    Player.create(),
    Player.create()
]);

const deck = Deck.shuffle(Deck.create());

const playersWithCards = deal(deck, players);

function deal(deck, players) {
    let playersWithCards = players;
    const numPlayers = players.size();

    deck.forEach((card, card_index) => {
        console.log('dealing card:', Card.from(card).toString(), card_index);
        playersWithCards = playersWithCards.map((player, player_index) => {
            console.log('to player', player_index);
            if (card_index % playersWithCards.size() === player_index) {
                console.log('drawing card');
                return player.drawCard(card);
            } else {
                return player;
            }
        });
    });

    return playersWithCards;
}

module.exports = {
    playersWithCards,
    deal
};
