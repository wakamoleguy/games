const SUIT = {
    0: 'CLUBS',
    1: 'DIAMONDS',
    2: 'HEARTS',
    3: 'SPADES',
    
    CLUBS: 0,
    DIAMONDS: 1,
    HEARTS: 2,
    SPADES: 3
};

const RANK = {
    0: 'ACE',
    1: 'TWO',
    2: 'THREE',
    3: 'FOUR',
    4: 'FIVE',
    5: 'SIX',
    6: 'SEVEN',
    7: 'EIGHT',
    8: 'NINE',
    9: 'TEN',
    10: 'JACK',
    11: 'QUEEN',
    12: 'KING',
    
    ACE: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3,
    FIVE: 4,
    SIX: 5,
    SEVEN: 6,
    EIGHT: 7,
    NINE: 8,
    TEN: 9,
    JACK: 10,
    QUEEN: 11,
    KING: 12
};

function Card(rank, suit) {
    this.rank = () => rank;
    this.suit = () => suit;
}

function rankToString(rank) {
    switch(rank) {
    case RANK.ACE:
        return 'A';
    case RANK.TWO:
        return '2';
    case RANK.THREE:
        return '3';
    case RANK.FOUR:
        return '4';
    case RANK.FIVE:
        return '5';
    case RANK.SIX:
        return '6';
    case RANK.SEVEN:
        return '7';
    case RANK.EIGHT:
        return '8';
    case RANK.NINE:
        return '9';
    case RANK.TEN:
        return 'T';
    case RANK.JACK:
        return 'J';
    case RANK.QUEEN:
        return 'Q';
    case RANK.KING:
        return 'K';
    default:
        throw new Error('Invalid rank for toString');
    }
}

function suitToString(suit) {
    return SUIT[suit].charAt(0);
}

Card.prototype = {
    toString: function () {
        return rankToString(this.rank()) + suitToString(this.suit());
    },

    withSuit: function (suit) {
        if (SUIT[suit] === undefined) {
            throw new Error('Invalid suit');
        }

        const suitNumber = typeof SUIT[suit] === 'number'?
              SUIT[suit]:
              suit;

        return new Card(this.rank(), suitNumber);
    },

    withRank: function (rank) {
        if (RANK[rank] === undefined) {
            throw new Error('Invalid rank');
        }

        const rankNumber = typeof RANK[rank] === 'number'?
              RANK[rank]:
              rank;

        return new Card(rankNumber, this.suit());
    },

    ace: function () { return this.withRank(RANK.ACE); },
    two: function () { return this.withRank(RANK.TWO); },
    three: function () { return this.withRank(RANK.THREE); },
    four: function () { return this.withRank(RANK.FOUR); },
    five: function () { return this.withRank(RANK.FIVE); },
    six: function () { return this.withRank(RANK.SIX); },
    seven: function () { return this.withRank(RANK.SEVEN); },
    eight: function () { return this.withRank(RANK.EIGHT); },
    nine: function () { return this.withRank(RANK.NINE); },
    ten: function () { return this.withRank(RANK.TEN); },
    jack: function () { return this.withRank(RANK.JACK); },
    queen: function () { return this.withRank(RANK.QUEEN); },
    king: function () { return this.withRank(RANK.KING); },

    clubs: function () { return this.withSuit(SUIT.CLUBS); },
    diamonds: function () { return this.withSuit(SUIT.DIAMONDS); },
    hearts: function () { return this.withSuit(SUIT.HEARTS); },
    spades: function () { return this.withSuit(SUIT.SPADES); }
};

function from(id) {
    if (typeof id !== 'number') {
        throw new Error('Cannot create a card from non-numeric id');
    } else if (id < 0 || id > 51) {
        throw new Error(`Cannot create card from non-standard id: ${id}`);
    }

    const rank = Math.floor(id % 13);
    const suit = Math.floor(id / 13);
    return new Card(rank, suit);
}

function create(rank, suit) {
    return new Card(rank, suit);
}

function ace() { return new Card(RANK.ACE, 0); }
function two() { return new Card(RANK.TWO, 0); }
function three() { return new Card(RANK.THREE, 0); }
function four() { return new Card(RANK.FOUR, 0); }
function five() { return new Card(RANK.FIVE, 0); }
function six() { return new Card(RANK.SIX, 0); }
function seven() { return new Card(RANK.SEVEN, 0); }
function eight() { return new Card(RANK.EIGHT, 0); }
function nine() { return new Card(RANK.NINE, 0); }
function ten() { return new Card(RANK.TEN, 0); }
function jack() { return new Card(RANK.JACK, 0); }
function queen() { return new Card(RANK.QUEEN, 0); }
function king() { return new Card(RANK.KING, 0); }

function clubs() { return new Card(0, SUIT.CLUBS); }
function diamonds() { return new Card(0, SUIT.DIAMONDS); }
function hearts() { return new Card(0, SUIT.HEARTS); }
function spades() { return new Card(0, SUIT.SPADES); }

module.exports = {
    RANK,
    SUIT,
    from,
    create,

    ace,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    jack,
    queen,
    king,

    clubs,
    diamonds,
    hearts,
    spades
};
