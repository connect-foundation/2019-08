import {StringHelper} from "core/utility/string-helper";

describe('StringHelp Test', () => {
    describe('lessThan() Method Test', () => {
        it('파라미터 보다 길이가 짧은 경우, true 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const length = 10;

            // when & then
            expect(StringHelper.lessThan(text, length)).toBeTruthy();
        });

        it('파라미터 보다 길이가 긴 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const length = 2;

            // when & then
            expect(StringHelper.lessThan(text, length)).toBeFalsy();
        });

        it('파라미터 보다 길이가 같은 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const length = 5;

            // when & then
            expect(StringHelper.lessThan(text, length)).toBeFalsy();
        });
    });

    describe('moreThan() Method Test', () => {
        it('파라미터 보다 길이가 짧은 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const length = 10;

            // when & then
            expect(StringHelper.moreThan(text, length)).toBeFalsy();
        });

        it('파라미터 보다 길이가 긴 경우, true 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const length = 2;

            // when & then
            expect(StringHelper.moreThan(text, length)).toBeTruthy();
        });

        it('파라미터 보다 길이가 같은 경우, false 를 반환해야 한다.', () => {
            // given
            const text = 'input';
            const length = 5;

            // when & then
            expect(StringHelper.moreThan(text, length)).toBeFalsy();
        });
    });

    describe('isInner() Method Test', () => {
        it('lessThan(), moreThan() 메소드 모두 true 리턴할 경우, true 를 반환해야 한다', () => {
            // given
            const text = "temp";
            const min = 0;
            const max = 10;

            // when
            const lessThan = jest.fn();
            lessThan.mockReturnValue(true);
            StringHelper.lessThan = lessThan;

            const moreThan = jest.fn();
            moreThan.mockReturnValue(true);
            StringHelper.moreThan = moreThan;

            const actual = StringHelper.isInner(text, min, max);

            // then
            expect(lessThan).toHaveBeenCalledWith(text, max);
            expect(moreThan).toHaveBeenCalledWith(text, min);
            expect(actual).toBeTruthy();
        });

        it('lessThan() 는 false, moreThan() 는 true 반환하는 경우, false 를 반환해야 한다', () => {
            // given
            const text = "temp";
            const min = 0;
            const max = 10;

            // when
            const lessThan = jest.fn();
            lessThan.mockReturnValue(false);
            StringHelper.lessThan = lessThan;

            const moreThan = jest.fn();
            moreThan.mockReturnValue(true);
            StringHelper.moreThan = moreThan;

            const actual = StringHelper.isInner(text, min, max);

            // then
            expect(lessThan).toHaveBeenCalledWith(text, max);
            expect(moreThan).toHaveBeenCalledWith(text, min);
            expect(actual).toBeFalsy();
        });

        it('lessThan() 는 true, moreThan() 는 false 반환하는 경우, false 를 반환해야 한다', () => {
            // given
            const text = "temp";
            const min = 0;
            const max = 10;

            // when
            const lessThan = jest.fn();
            lessThan.mockReturnValue(true);
            StringHelper.lessThan = lessThan;

            const moreThan = jest.fn();
            moreThan.mockReturnValue(false);
            StringHelper.moreThan = moreThan;

            const actual = StringHelper.isInner(text, min, max);

            // then
            expect(lessThan).not.toHaveBeenCalledWith(text, max);
            expect(moreThan).toHaveBeenCalledWith(text, min);
            expect(actual).toBeFalsy();
        });

        it('lessThan() 는 false, moreThan() 는 false 반환하는 경우, false 를 반환해야 한다', () => {
            // given
            const text = "temp";
            const min = 0;
            const max = 10;

            // when
            const lessThan = jest.fn();
            lessThan.mockReturnValue(false);
            StringHelper.lessThan = lessThan;

            const moreThan = jest.fn();
            moreThan.mockReturnValue(false);
            StringHelper.moreThan = moreThan;

            const actual = StringHelper.isInner(text, min, max);

            // then
            expect(lessThan).not.toHaveBeenCalledWith(text, max);
            expect(moreThan).toHaveBeenCalledWith(text, min);
            expect(actual).toBeFalsy();
        });
    });
});
