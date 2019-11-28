export default class ResponseForm<T> {
    private message: string;
    private payload: T;

    private constructor(message: string, payload: T) {
        this.message = message;
        this.payload = payload;
    }

    static of <T> (message: string, payload?: T) {
        return new ResponseForm(message, payload || {});
    }
}