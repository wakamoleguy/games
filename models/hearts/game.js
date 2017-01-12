/**
 *
 * An game state of Hearts
 *
 */
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
    }
};
