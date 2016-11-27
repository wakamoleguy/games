/**
 *
 * An immutable List, implemented as an Array
 *
 **/

function List(items) {
    const array = cloneValidListArray(items);

    this.length = () => {
        return array.length;
    };

    this.peek = (n) => {
        const index = n === undefined ? 0 : n;
        const length = this.length();
        
        if (0 <= index && index < length) {
            return array[index];
        } else {
            throw new Error(`List peek out of bounds: ${index}/${length}`);
        }
    };

    this.push = (item) => {
        return new List(array.concat([item]));
    };

    this.pop = () => {
        return this.take(0);
    };

    this.take = (n) => {
        const index = n === undefined ? 0 : n;
        const length = this.length();

        if (0 <= index && index < length) {
            return {
                head: array[index],
                tail: new List(array.slice(0, index).concat(array.slice(index+1)))
            };
        } else {
            throw new Error(`List take out of bounds: ${index}/${length}`);
        }
    };

    this.map = (folder) => {
        return new List(array.map(folder));
    };

    this.forEach = (folder) => {
        array.forEach(folder);
    };

    this.toString = () => array.toString();
}

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
