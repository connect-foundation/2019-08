import {ChannelService} from "core/service/channel-service";
import {Channel} from "core/entity/channel";

describe('ChannelService Test', () => {
    describe('create() Method Test', () => {
        const channelRepositoryMock = jest.fn().mockImplementation((): any => {
            return {
                create: (channel: Channel): Promise<boolean> => {
                    return Promise.resolve<boolean>(true);
                },
                hasByTitle: (title: string): Promise<boolean> => {
                    return Promise.resolve<boolean>(false);
                }
            };
        })();

        it('title 길이는 1보다 짧은 경우, 테스트는 실패해야 한다.', async () => {
            // given
            const title = '';
            const description = 'input';
            const privacy = false;

            // when
            const channelService = new ChannelService(channelRepositoryMock);
            const result = await channelService.create(title, description, privacy);

            // then
            expect(result).toBeFalsy();
        });

        it('title 길이는 10보다 긴 경우, 테스트는 실패해야 한다.', async () => {
            // given
            const title = '12345678910';
            const description = '';
            const privacy = false;

            // when
            const channelService = new ChannelService(channelRepositoryMock);
            const result = await channelService.create(title, description, privacy);

            // then
            expect(result).toBeFalsy();
        });

        it('description 길이는 30보다 긴 경우, 테스트는 실패해야 한다.', async () => {
            // given
            const title = 'input';
            const description = '0123456789' + '0123456789' + '0123456789' + '1';
            const privacy = false;

            // when
            const channelService = new ChannelService(channelRepositoryMock);
            const result = await channelService.create(title, description, privacy);

            // then
            expect(result).toBeFalsy();
        });

        it('0 < title length < 11 이고 0 < description length < 31 범위인 경우, 테스트는 통과해야 한다.', async () => {
            // given
            const title = 'input';
            const description = 'input';
            const privacy = false;

            // when
            const channelService = new ChannelService(channelRepositoryMock);
            const result = await channelService.create(title, description, privacy);

            // then
            expect(result).toBeTruthy();
        });
    });
});