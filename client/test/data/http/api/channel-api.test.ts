import MockAdapter from 'axios-mock-adapter';
import {ChannelApi} from "../../../../src/data/http/api/channel-api";
import axios from 'axios';

describe('ChannelApi Test', () => {
    describe('findByName() Method Test', () => {
        let mock: MockAdapter;

        beforeEach(() => {
            mock = new MockAdapter(axios, {delayResponse: 100});

        });

        afterEach(() => {
            mock.resetHandlers();

        });

        it('채널이 존재하지 않는 경우, 상태코드는 403 이다.', async () => {
            // given
            const channelName = 'test-channel-name';
            const mockStatus = 403;
            const mockData = {
                message: '해당하는 채널이 존재하지 않습니다.',
                payload: {}

            };

            mock.onGet(`/api/channels/${channelName}`)
                .reply(mockStatus, mockData);

            // when
            const channelApi = new ChannelApi(axios);
            const {status, data} = await channelApi.findByName(channelName);
            const {message, payload} = data;

            // then
            expect(status).toEqual(mockStatus);
            expect(message).toEqual(mockData.message);
            expect(payload).toMatchObject(mockData.payload);

        });

        it('채널이 존재하는 경우, 상태코드는 200 이다.', async () => {
            // given
            const channelName = 'test-channel-name';
            const mockStatus = 200;
            const mockData = {
                message: 'channel 이 존재합니다.',
                payload: {
                    // channel 정보는 이후 추가 가능하며,
                    // 해당 테스트에서는 영향을 받지 않는다.
                    name: 'test-name',
                    description: 'test-description',
                    visibility: false

                }

            };

            mock.onGet(`/api/channels/${channelName}`)
                .reply(mockStatus, mockData);

            // when
            const channelApi = new ChannelApi(axios);
            const {status, data} = await channelApi.findByName(channelName);
            const {message, payload} = data;

            // then
            expect(status).toEqual(mockStatus);
            expect(message).toEqual(mockData.message);
            expect(payload).toMatchObject(mockData.payload);

        });

        it('네트워크 에러가 발생하는 경우, 에러를 반환한다.', async () => {
            // given
            const channelName = 'test-channel-name';
            mock.onGet(`/api/channels/${channelName}`).networkError();

            // when & then
            const channelApi = new ChannelApi(axios);
            await expect(channelApi.findByName(channelName)).rejects.toThrowError(new Error(`${channelName} 조회 과정에서 예기치 못한 에러가 발생했습니다.`));

        });

    });

});