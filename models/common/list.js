/**
 *
 * An immutable List, implemented as an Array
 *
 **/

function List(items) {
    const array = cloneValidListArray(items);

    this.array = () => array.concat([]);
    this.size = () => array.length;
}

List.prototype = {
    get: function (index) {
        const length = this.size();

        if (0 <= index && index < length) {
            return this.array()[index];
        } else {
            throw new Error(`List peek out of bounds: ${index}/${length}`);
        }
    },

    push: function (item) {
        return new List(this.array().concat([item]));
    },

    pop: function () {
        if (this.size() > 0) {
            return new List(this.array().slice(0, -1));
        } else {
            throw new Error('Cannot pop empty List');
        }
    },

    unshift: function (item) {
        return new List([item].concat(this.array()));
    },

    shift: function () {
        if (this.size() > 0) {
            return new List(this.array().slice(1));
        } else {
            throw new Error('Cannot shift empty List');
        }
    },

    map: function (folder) {
        return new List(this.array().map(folder));
    },

    sort: function (compareFunction) {
        return new List(this.array().sort(compareFunction));
    },

    forEach: function (folder) {
        this.array().forEach(folder);
    },

    toString: function () {
        return this.array().toString();
    }
};

module.exports = {
    create: function (items) {
        return new List(items === undefined ? [] : items);
    }
};

/* Private helpers */
function cloneValidListArray(raw) {
    if (typeof raw.length !== 'number') {
        throw new Error('Cannot clone array with non-numeric length');
    }

    const array = new Array(raw.length);

    for (let i = 0; i < raw.length; i++) {
        if (raw[i] === undefined) {
            throw new Error(`Cannot clone array with undefined value (${i})`);
        } else {
            array[i] = raw[i];
        }
    }

    return array;
}
