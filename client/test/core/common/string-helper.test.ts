import {StringHelper} from "../../../src/core/common/string-helper";

describe('StringWrapper Class Test', () => {
    describe('from() Method Test', () => {
        it('동일한 타입으로 부터 상태값을 복사해서 새로운 객체를 반환해야 성공한다.', () => {
            // given
            const text = 'input';
            const origin = new StringHelper(text);

            // when
            const target = StringHelper.from(origin);

            // then
            expect(target).toEqual(origin);
            expect(target).not.toBe(origin);

        });


    });

    describe('lessThan() Method Test', () => {
        it('파라미터 보다 길이가 짧은 경우, true 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const origin = new StringHelper(text);
            const length = 10;

            // when & then
            expect(origin.lessThan(length)).toBeTruthy();

        });

        it('파라미터 보다 길이가 긴 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const origin = new StringHelper(text);
            const length = 2;

            // when & then
            expect(origin.lessThan(length)).toBeFalsy();

        });

        it('파라미터 보다 길이가 같은 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const origin = new StringHelper(text);
            const length = 5;

            // when & then
            expect(origin.lessThan(length)).toBeFalsy();

        });

    });

    describe('moreThan() Method Test', () => {
        it('파라미터 보다 길이가 짧은 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const origin = new StringHelper(text);
            const length = 10;

            // when & then
            expect(origin.moreThan(length)).toBeFalsy();

        });

        it('파라미터 보다 길이가 긴 경우, true 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const origin = new StringHelper(text);
            const length = 2;

            // when & then
            expect(origin.moreThan(length)).toBeTruthy();

        });

        it('파라미터 보다 길이가 같은 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const origin = new StringHelper(text);
            const length = 5;

            // when & then
            expect(origin.moreThan(length)).toBeFalsy();

        });

    });

    describe('is() Method Test', () => {
        it('상태값이 같은 경우, true 를 반환해야 한다.', () => {
            // given
            const text = new StringHelper('input');
            const mirror = new StringHelper('input');

            // when & then
            expect(text.is(mirror)).toBeTruthy();
            expect(text).toEqual(mirror);


        });

        it('상태값이 다른 경우, false 를 반환해야 한다.', () => {
            // given
            const text = new StringHelper('input');
            const mirror = new StringHelper('difference');

            // when & then
            expect(text.is(mirror)).toBeFalsy();
            expect(text).not.toEqual(mirror);

        });


    });

});
