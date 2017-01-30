const Deck = require('../card/deck');
const Card = require('../card/card');

exports.handle = function handle(event, state) {
    if (event === 'deal') {
        return;
    }
}

exports.deal = function deal(state) {
    const tricks = [];
    const round = state.round + 1;

    const shuffledDeck = Deck.shuffle(Deck.create());

    const players = exports.dealDeckToPlayers(state.players, shuffledDeck);

    const with2C = players.find((player) =>
        player.hand
            .map((card) => Card.from(card))
            .some((card) =>
                card.rank() === Card.RANK.TWO &&
                card.suit() === Card.SUIT.CLUBS
        )
    );

    const currentTrick = {
        cards: [],
        leader: with2C
    };

    return {
        players,
        tricks,
        currentTrick,
        round
    };
}

exports.dealDeckToPlayers = function dealDeckToPlayers(players, deck) {

    if (deck.length !== 52 || players.length !== 4) {
        throw new Error('Can only deal 52 card decks to 4 players');
    }

    return players.map((player, i) => {
        return {
            hand: deck.slice(i * 13, (i + 1) * 13),
            score: player.score
        };
    });
};


/* Private */
