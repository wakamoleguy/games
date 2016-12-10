describe('List', () => {
    const List = require('./list');
    const A = 'a',
          B = 'b',
          C = 'c',
          D = 'd';

    describe('construction', () => {
        it('can create an empty list', () => {
            expect(List.create().size()).toBe(0);
        });

        it('can populate a list with items', () => {
            const list = List.create([A,B,C]);
            expect(list.size()).toBe(3);
            expect(list.get(0)).toBe(A);
        });

        it('should throw on explicit undefined values', () => {
            expect(() => {
                List.create([A, undefined, C]);
            }).toThrow();
        });

        it('throws on new Arrays', () => {
            expect(() => {
                List.create(new Array(3));
            }).toThrow();
        });
    });

    describe('push', () => {
        let list;
        
        beforeEach(() => {
            list = List.create([A, B, C]);
        });

        it('returns a new list', () => {
            expect(list.push(D)).not.toBe(list);
        });

        it('does not mutate the original list', () => {
            expect(list.push(D).size()).toBe(4);
            expect(list.push(D).size()).toBe(4);
        });

        it('adds items to the end of the list', () => {
            const pushedList = list.push(D);
            expect(pushedList.size()).toBe(4);
            expect(pushedList.get(0)).toBe(A);
            expect(pushedList.get(1)).toBe(B);
            expect(pushedList.get(2)).toBe(C);
            expect(pushedList.get(3)).toBe(D);
        });

        it('throws on an undefined item', () => {
            expect(() => {
                list.push(undefined);
            }).toThrow();
        });
    });

    describe('pop', () => {
        let list;

        beforeEach(() => {
            list = List.create([A, B, C]);
        });

        it('returns a new list', () => {
            expect(list.pop()).not.toBe(list);
        });

        it('does not mutate the original list', () => {
            expect(list.pop().size()).toBe(2);
            expect(list.pop().size()).toBe(2);
        });

        it('removes the last item from the list', () => {
            const poppedList = list.pop();

            expect(poppedList.size()).toBe(2);
            expect(poppedList.get(0)).toBe(A);
            expect(poppedList.get(1)).toBe(B);
        });

        it('throws on an empty list', () => {
            expect(() => {
                List.create().pop();
            }).toThrow();
        });
    });

    describe('unshift', () => {
        let list;
        
        beforeEach(() => {
            list = List.create([A, B, C]);
        });

        it('returns a new list', () => {
            expect(list.unshift(D)).not.toBe(list);
        });

        it('does not mutate the original list', () => {
            expect(list.unshift(D).size()).toBe(4);
            expect(list.unshift(D).size()).toBe(4);
        });

        it('adds items to the head of the list', () => {
            const unshiftedList = list.unshift(D);
            expect(unshiftedList.size()).toBe(4);
            expect(unshiftedList.get(0)).toBe(D);
            expect(unshiftedList.get(1)).toBe(A);
            expect(unshiftedList.get(2)).toBe(B);
            expect(unshiftedList.get(3)).toBe(C);
        });

        it('throws on an undefined item', () => {
            expect(() => {
                list.unshift(undefined);
            }).toThrow();
        });
    });

    describe('shift', () => {
        let list;

        beforeEach(() => {
            list = List.create([A, B, C]);
        });

        it('returns a new list', () => {
            expect(list.shift()).not.toBe(list);
        });

        it('does not mutate the original list', () => {
            expect(list.shift().size()).toBe(2);
            expect(list.shift().size()).toBe(2);
        });

        it('removes the last item from the list', () => {
            const poppedList = list.shift();

            expect(poppedList.size()).toBe(2);
            expect(poppedList.get(0)).toBe(B);
            expect(poppedList.get(1)).toBe(C);
        });

        it('throws on an empty list', () => {
            expect(() => {
                List.create().shift();
            }).toThrow();
        });
    });

    describe('get', () => {
        let list;

        beforeEach(() => {
            list = List.create([A, B, C]);
        });

        it('gets the first item', () => {
            expect(list.get(0)).toBe(A);
        });

        it('gets a middle item', () => {
            expect(list.get(1)).toBe(B);
        });

        it('gets the last item', () => {
            expect(list.get(2)).toBe(C);
        });

        it('throws on an empty list', () => {
            expect(() => {
                List.create().get(0);
            }).toThrow();
        });

        it('throws when index is negative', () => {
            expect(() => {
                list.get(-1);
            }).toThrow();
        });

        it('throws when index is out of bounds', () => {
            expect(() => {
                list.get(4);
            }).toThrow();
        });
    });
});
