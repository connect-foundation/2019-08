export class AxiosConfig {
    static initialize(axios: any): void {
        axios.defaults.baseURL = process.env.SERVER_DOMAIN;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';

    }

}