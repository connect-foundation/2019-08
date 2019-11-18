import axios from 'axios';

export class AxiosWrapper {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    axios.defaults.baseURL = process.env.SERVER_DOMAIN;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  }

  public getAxios() {
    return axios;
  }
}