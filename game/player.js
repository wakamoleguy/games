const List = require('../data_structures/list');

function Player(hand) {
    this.hand = () => hand;

}

Player.prototype = {
    toString: function () {
        return this.hand().toString();
    },

    drawCard: function (card) {
        return new Player(this.hand().push(card));
    }
};

function create() {
    return new Player(List.create([]));
}

module.exports = {
    create
};
