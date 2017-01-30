const Game = require('./game');
const Player = require('./player');
const Trick = require('./trick');
const Card = require('../../card/card');

describe('Game', () => {
    const round = 39;

    const hands = [
        [Card.ace().spades()],
        [Card.two().diamonds()]
    ];
    const players = hands.map((hand) => Player.create(hand, 0));

    const emptyTrick = Trick.create(players);

    const game = Game.create({
        players,
        tricks: [],
        currentTrick: emptyTrick,
        round
    });

    it('has players, tricks, currentTrick, and round', () => {

        expect(game.players).toBe(players);
        expect(game.tricks.length).toBe(0);
        expect(game.currentTrick).toBe(emptyTrick);
        expect(game.round).toBe(round);
    });

    describe('.playerWithCard', () => {

        it('finds the player with the card', () => {

            expect(Game.playerWithCard(
                game,
                Card.ace().spades()
            )).toBe(players[0]);

            expect(Game.playerWithCard(
                game,
                Card.two().diamonds()
            )).toBe(players[1]);
        });

        it('returns undefined if no player is found', () => {

            expect(Game.playerWithCard(
                game,
                Card.five().hearts()
            )).not.toBeDefined();
        });
    });

    describe('.playCard', () => {

        it('plays the card from the player to the trick', () => {
            const card = Card.ace().spades();
            const player = Player.withoutCard(players[0], card);
            const trick = Trick.play(emptyTrick, players[0], card);

            spyOn(Player, 'withoutCard').and.returnValue(player);
            spyOn(Trick, 'play').and.returnValue(trick);

            const gameAfterPlay = Game.playCard(
                game,
                players[0],
                card
            );

            expect(Player.withoutCard).toHaveBeenCalled();
            expect(Player.withoutCard.calls.first().args).toEqual([players[0], card]);
            expect(Trick.play.calls.first().args).toEqual([emptyTrick, players[0], card]);

            expect(gameAfterPlay.players[0].hand.length).toBe(hands[0].length - 1);
        });

        it('throws if that player does not have that card', () => {
            expect(() => Game.playCard(
                game,
                players[0],
                Card.two().hearts()
            )).toThrow();
        });

        it('throws if the player goes out of turn', () => {
            expect(() => Game.playCard(
                game,
                players[1],
                Card.two().diamonds()
            )).toThrow();
        });
    });
});
