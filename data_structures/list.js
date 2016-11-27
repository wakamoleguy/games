/**
 *
 * An immutable List, implemented as an Array
 *
 **/

function List(items) {
    const array = cloneValidListArray(items);

    this.array = () => array.concat([]);
    this.length = () => array.length;
}

List.prototype = {
    peek: function (n) {
        const index = n === undefined ? 0 : n;
        const length = this.length();
        
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
        return this.take(0);
    },

    take: function (n) {
        const index = n === undefined ? 0 : n;
        const length = this.length();
        const array = this.array();

        if (0 <= index && index < length) {
            return {
                head: array[index],
                tail: new List(array.slice(0, index).concat(array.slice(index+1)))
            };
        } else {
            throw new Error(`List take out of bounds: ${index}/${length}`);
        }
    },

    map: function (folder) {
        return new List(this.array().map(folder));
    },
    
    forEach: function (folder) {
        this.array().forEach(folder);
    },

    toString: function () {
        return array.toString();
    }
};

module.exports = {
    create: function (items) {
        return new List(items);
    }
};

/* Private helpers */
function cloneValidListArray(raw) {
    if (typeof raw.length !== 'number') {
        throw new Error('Cannot clone array with non-numeric length');
    }

    const array = new Array(raw.length);

    for (let i = 0; i < raw.length; i++) {
        array[i] = raw[i] === undefined ? null : raw[i];
    }

    return array;
}
