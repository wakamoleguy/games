const FSM = require('./fsm');
const Deck = require('../card/deck');

describe('FSM', () => {

    describe('deal', () => {

        let initialPlayers;
        let initialCurrentTrick;
        let initialState;

        let afterState;

        beforeEach(() => {

            initialPlayers = [
                { hand: [], score: 12 },
                { hand: [], score: 23 },
                { hand: [], score: 34 },
                { hand: [], score: 45 }
            ];

            initialCurrentTrick = {
                cards: [
                    { card: 1, player: initialPlayers[0] },
                    { card: 4, player: initialPlayers[1] },
                    { card: 6, player: initialPlayers[2] },
                    { card: 2, player: initialPlayers[3] }
                ],
                leader: initialPlayers[0]
            }

            initialState = {
                players: initialPlayers,
                tricks: [initialCurrentTrick],
                currentTrick: initialCurrentTrick,
                round: 3
            }

            afterState = FSM.deal(initialState);
        });

        it('increments round by one', () => {
            expect(afterState.round).toBe(initialState.round + 1);
        });

        it('deals fresh cards to all players', () => {
            initialState.players.forEach((player, i) => {
                expect(afterState.players[i].hand.length).toBe(13);
            });
        });

        it('preserves player\'s scores', () => {
            initialState.players.forEach((player, i) => {
                expect(afterState.players[i].score).toBe(player.score);
            });
        });

        it('resets tricks', () => {
            expect(afterState.tricks.length).toBe(0);
        });

        it('sets the current trick leader to whomever has the 2C', () => {
            expect(afterState.currentTrick.leader).toBeDefined();
            expect(afterState.currentTrick.leader).not.toBe(null);

            expect(
                afterState.currentTrick.leader.hand.some((card) => card === 1)
            ).toBe(true);
        });

    });

    describe('dealDeckToPlayers', () => {
        it('only handles 4 players', () => {
            expect(() => {
                FSM.dealDeckToPlayers([], Deck.create());
            }).toThrow();
        });

        it('only handles 52 cards', () => {
            expect(() => {
                FSM.dealDeckToPlayers([
                    { hand: [], score: 0 },
                    { hand: [], score: 0 },
                    { hand: [], score: 0 },
                    { hand: [], score: 0 }
                ], Deck.create(48));
            }).toThrow();
        });

        it('deals each card precisely in deck order', () => {
            const players = FSM.dealDeckToPlayers([
                { hand: [], score: 0 },
                { hand: [], score: 0 },
                { hand: [], score: 0 },
                { hand: [], score: 0 }
            ], Deck.create());

            let i = 0;
            players.forEach((player) => {
                expect(player.hand.length).toBe(13);

                player.hand.forEach((card) => {
                    expect(card).toBe(i);
                    i++;
                });
            });
        });

    });
});
