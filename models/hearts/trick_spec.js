const Trick = require('./trick');
const Player = require('./player');
const Card = require('../../card/card');

describe('Trick', () => {
    const hands = [
        [Card.ace().spades()],
        [Card.two().diamonds()]
    ];
    const players = hands.map((hand) => Player.create(hand, 0));

    const emptyTrick = Trick.create(players);

    describe('an empty trick', () => {

        it('has players with their (null) card plays', () => {

            expect(emptyTrick.plays.length).toBe(players.length);

            expect(
                emptyTrick.plays.
                    every((play, i) => play.player === players[i])
            ).toBe(true);

            expect(Trick.isTrickEmpty(emptyTrick)).toBe(true);
        });
    });

    describe('.play', () => {

        it('plays cards from players in order', () => {

            const trickAfterOnePlay = Trick.play(
                emptyTrick,
                players[0],
                Card.ace().spades()
            );

            expect(trickAfterOnePlay.plays[0].player).toBe(players[0]);
            expect(Card.equals(
                trickAfterOnePlay.plays[0].card,
                Card.ace().spades()
            )).toBe(true);
            expect(Trick.isPlayComplete(
                trickAfterOnePlay.plays[1]
            )).toBe(false);
            expect(Trick.isTrickComplete(trickAfterOnePlay)).toBe(false);

            const trickAfterTwoPlay = Trick.play(
                trickAfterOnePlay,
                players[1],
                Card.two().diamonds()
            );

            expect(trickAfterTwoPlay.plays[1].player).toBe(players[1]);
            expect(trickAfterTwoPlay.plays[0]).toBe(trickAfterOnePlay.plays[0]);
            expect(Card.equals(
                trickAfterTwoPlay.plays[1].card,
                Card.two().diamonds()
            )).toBe(true);
            expect(Trick.isTrickComplete(trickAfterTwoPlay)).toBe(true);
        });
    });
});
