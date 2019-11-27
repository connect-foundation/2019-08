import axios from 'axios';

export class AxiosWrapper {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if(process.env.NODE_ENV !== "development") {
      axios.defaults.baseURL = process.env.REACT_APP_API_SERVER_HOST;
    }

    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  }

  public getAxios() {
    return axios.create();
  }
}