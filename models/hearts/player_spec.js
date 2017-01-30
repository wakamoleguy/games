const Player = require('./player');
const Card = require('../../card/card');

describe('Player', () => {
    const hand = [Card.ace().spades()];
    const score = 17;

    const player = Player.create(hand, score);

    it('has a hand and score', () => {

        expect(player.hand).toBe(hand);
        expect(player.score).toBe(score);
    });

    it('throws if you give it bad data on create', () => {
        expect(Player.create).toThrow();
        expect(() => Player.create([], {})).toThrow();
        expect(() => Player.create(null, 0)).toThrow();
        expect(() => Player.create({ hand: [], score: 0 })).toThrow();
    });

    describe('.hasCard', () => {

        it('finds a card that is there', () => {
            expect(Player.hasCard(player, Card.ace().spades())).toBe(true);
        });

        it('does not find a card that is not there', () => {
            expect(Player.hasCard(player, Card.two().spades())).toBe(false);
            expect(Player.hasCard(player, Card.ace().hearts())).toBe(false);
        });
    });

    describe('.withoutCard', () => {

        it('returns a new player without the card', () => {

            const playerWithoutCard = Player.withoutCard(player, Card.ace().spades());

            expect(playerWithoutCard).not.toBe(player);
            expect(playerWithoutCard.score).toBe(score);
            expect(playerWithoutCard.hand.length).toBe(hand.length-1);
        });

        it('returns the same player if they did not have the card', () => {

            const playerWithoutCard = Player.withoutCard(player, Card.two().diamonds());

            expect(playerWithoutCard).toBe(player);
        });
    });

    describe('.addScore', () => {
        const addend = 5;

        it('returns a new player with added score', () => {

            const playerWithAddedScore = Player.addScore(player, addend);

            expect(playerWithAddedScore).not.toBe(player);
            expect(playerWithAddedScore.hand).toBe(player.hand);
            expect(playerWithAddedScore.score).toBe(score + addend);
        });

        it('can add a negative number', () => {
            const playerWithAddedScore = Player.addScore(player, -addend);

            expect(playerWithAddedScore.score).toBe(score - addend);
        });

        it('throws if passed a string, object, or undefined', () => {

            expect(() => Player.addScore(player, 'hello')).toThrow();
            expect(() => Player.addScore(player, {})).toThrow();
            expect(() => Player.addScore(player, null)).toThrow();
            expect(() => Player.addScore(player, undefined)).toThrow();
            expect(() => Player.addScore(player)).toThrow();
        });
    });
});
