import MockAdapter from "axios-mock-adapter";
import {ChannelApi} from "data/http/api/channel-api";
import {Channel} from "core/entity/channel";
import {ResponseEntity} from "data/http/api/response/ResponseEntity";
import {AxiosWrapper} from "data/http/api/axios-wrapper";

describe("ChannelApi Test", () => {
    describe("create() Method Test", () => {
        const axios = new AxiosWrapper();
        let mock: MockAdapter;
        beforeEach(() => {
            mock = new MockAdapter(axios.getAxios(), {delayResponse: 100});
        });

        beforeEach(() => {
            mock.resetHandlers();
        });

        it("채널 올바르게 생성한 경우, 상태코드는 201 이다.", async () => {
            // given
            const channel = {
                title: "test-channel-title",
                description: "test-channel-description",
                privacy: false
            };

            const mockStatus = 201;
            const mockData = {
                message: "channel을 생성하였습니다.",
                payload: channel
            };

            mock.onPost(`/api/channels/${channel.title}`)
                .reply(mockStatus, mockData);

            // when
            const channelApi = new ChannelApi(axios);
            const responseData = await channelApi.create(channel);
            const {message, payload} = responseData as ResponseEntity<Channel>;

            // then
            expect(message).toEqual(mockData.message);
            expect(payload).toMatchObject(mockData.payload);
            expect(payload as Channel).toBeTruthy();

        });

        it("동일한 채널명이 존재하는 경우, 상태코드는 403 이다.", async () => {
            // given
            const channel = {
                title: "test-channel-title",
                description: "test-channel-description",
                privacy: false
            };

            const mockStatus = 403;
            const mockData = {
                message: "동일한 channel 이 이미 존재합니다.",
                payload: {}
            };

            mock.onPost(`/api/channel/${channel.title}`)
                .reply(mockStatus, mockData);

            // when
            const channelApi = new ChannelApi(axios);
            const responseData = await channelApi.create(channel);

            // then
            expect(responseData).toBeFalsy();
        });
    });

    describe("findByTitle() Method Test", () => {
        const axios = new AxiosWrapper();
        let mock: MockAdapter;
        beforeEach(() => {
            mock = new MockAdapter(axios.getAxios(), {delayResponse: 100});
        });

        afterEach(() => {
            mock.resetHandlers();
        });

        it("채널이 존재하지 않는 경우, 상태코드는 403 이다.", async () => {
            // given
            const channelTitle = "test-channel-title";
            const mockStatus = 403;
            const mockData = {
                message: "해당하는 채널이 존재하지 않습니다.",
                payload: {}

            };

            mock.onGet(`/api/channels/${channelTitle}`)
                .reply(mockStatus, mockData);

            // when
            const channelApi = new ChannelApi(axios);
            const responseData = await channelApi.findByTitle(channelTitle);

            // then
            expect(responseData).toBeFalsy();
        });

        it("채널이 존재하는 경우, 상태코드는 200 이다.", async () => {
            // given
            const channelTitle = "test-channel-title";
            const mockStatus = 200;
            const mockData = {
                message: "channel 이 존재합니다.",
                payload: {
                    // channel 정보는 이후 추가 가능하며,
                    // 해당 테스트에서는 영향을 받지 않는다.
                    title: "test-title",
                    description: "test-description",
                    privacy: false
                }
            };

            mock.onGet(`/api/channels/${channelTitle}`)
                .reply(mockStatus, mockData);

            // when
            const channelApi = new ChannelApi(axios);
            const responseData = await channelApi.findByTitle(channelTitle);
            const {message, payload} = responseData as ResponseEntity<Channel>;

            // then
            expect(message).toEqual(mockData.message);
            expect(payload).toMatchObject(mockData.payload);
        });

        it("네트워크 에러가 발생하는 경우, 에러를 반환한다.", async () => {
            // given
            const channelTitle = "test-channel-title";
            mock.onGet(`/api/channels/${channelTitle}`).networkError();

            // when & then
            const channelApi = new ChannelApi(axios);
            await expect(channelApi.findByTitle(channelTitle)).rejects.toThrowError(new Error(`${channelTitle} 조회 과정에서 예기치 못한 에러가 발생했습니다.`));
        });
    });
});