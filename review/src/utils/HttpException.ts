export default class HttpException extends Error {
    public status?: number;

    constructor(message: string, status?: number,) {
        super(message);
        this.status = status;
    }
}