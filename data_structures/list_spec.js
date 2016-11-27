describe('List', () => {
    const List = require('./list');
    const A = 'a',
          B = 'b',
          C = 'c',
          D = 'd';

    it('replaces undefineds with nulls', () => {
        const list = List.create(new Array(3));

        expect(list.peek()).toBe(null);
        expect(list.pop().tail.peek()).toBe(null);
        expect(list.pop().tail.pop().tail.peek()).toBe(null);
    });

    describe('with items', () => {
        let list;
        
        beforeEach(() => {
            list = List.create([A, B, C]);
        });

        it('peeks the first item', () => {
            expect(list.peek()).toBe(A);
        });

        it('peeks other items when asked', () => {
            expect(list.peek(0)).toBe(A);
            expect(list.peek(1)).toBe(B);
            expect(list.peek(2)).toBe(C);
        });

        it('pops items off the front', () => {
            const { head, tail } = list.pop();

            expect(head).toBe(A);
            expect(tail.peek()).toBe(B);
        });

        it('pops without mutating', () => {
            expect(list.pop().tail.peek()).toBe(B);
            expect(list.pop().tail.peek()).toBe(B);
        });

        it('pushes items on to the end', () => {
            const pushedList = list.push(D);
            expect(pushedList.length()).toBe(4);
            expect(pushedList.peek(0)).toBe(A);
            expect(pushedList.peek(1)).toBe(B);
            expect(pushedList.peek(2)).toBe(C);
            expect(pushedList.peek(3)).toBe(D);
        });

        describe('taking items', () => {

            it('can take from the beginning', () => {
                const { head, tail } = list.take(0);

                expect(head).toBe(A);
                expect(tail.length()).toBe(2);
                expect(tail.peek(0)).toBe(B);
                expect(tail.peek(1)).toBe(C);
            });

            it('can take from the middle', () => {
                const { head, tail } = list.take(1);
                expect(head).toBe(B);
                expect(tail.length()).toBe(2);
                expect(tail.peek(0)).toBe(A);
                expect(tail.peek(1)).toBe(C);
            });

            it('cant take from the end', () => {
                const { head, tail } = list.take(2);
                expect(head).toBe(C);
                expect(tail.length()).toBe(2);
                expect(tail.peek(0)).toBe(A);
                expect(tail.peek(1)).toBe(B);
            });

            it('does not mutate the list', () => {
                expect(list.take(1).head).toBe(B);
                expect(list.peek(1)).toBe(B);
            });
        });

        it('maps', () => {
            const mapped = list.map((v, i) => {
                return v.repeat(i);
            });

            expect(mapped.peek(0)).toBe('');
            expect(mapped.peek(1)).toBe(B);
            expect(mapped.peek(2)).toBe(C + C);
        });
    });

    describe('with no items', () => {
        let list;
        
        beforeEach(() => {
            list = List.create([]);
        });

        it('cannot be peeked', () => {
            expect(list.peek).toThrow();
        });

        it('cannot pop', () => {
            expect(list.pop).toThrow();
        });
    });
});
