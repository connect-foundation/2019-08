import {ChannelService} from "../../../src/core/service/channel-service";
import {Channel} from "../../../src/core/entity/channel";

describe('ChannelService Test', () => {
    describe('create() Method Test', () => {
        const mock = jest.fn().mockImplementation((): any => {
            return {
                create: (channel: Channel): boolean => {
                    return true;
                },

                hasByName: (name: string): boolean => {
                    return false;
                }

            };

        })();

        it('name 길이는 1보다 짧은 경우, 테스트는 실패해야 한다.', () => {
            // given
            const name = '';
            const description = 'input';
            const visibility = false;

            // when
            const channelService = new ChannelService(mock);
            const result = channelService.create(name, description, visibility);

            // then
            expect(result).toBeFalsy();

        });

        it('name 길이는 10보다 긴 경우, 테스트는 실패해야 한다.', () => {
            // given
            const name = '12345678910';
            const description = '';
            const visibility = false;

            // when
            const channelService = new ChannelService(mock);
            const result = channelService.create(name, description, visibility);

            // then
            expect(result).toBeFalsy();

        });

        it('description 길이는 30보다 긴 경우, 테스트는 실패해야 한다.', () => {
            // given
            const name = 'input';
            const description = '0123456789' + '0123456789' + '0123456789' + '1';
            const visibility = false;

            // when
            const channelService = new ChannelService(mock);
            const result = channelService.create(name, description, visibility);

            // then
            expect(result).toBeFalsy();

        });


        it('0 < name length < 11 이고 0 < description length < 31 범위인 경우, 테스트는 통과해야 한다.', () => {
            // given
            const name = 'input';
            const description = 'input';
            const visibility = false;

            // when
            const channelService = new ChannelService(mock);
            const result = channelService.create(name, description, visibility);

            // then
            expect(result).toBeTruthy();

        });

    });

});