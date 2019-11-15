import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interface/controller.interface';


class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.initialzeMiddlewares();
        this.initializeController(controllers);
        this.connectToDatabase();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }

    private initialzeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private initializeController(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private connectToDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env;

        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}:27017/admin`, {
            dbName: 'test',
            useNewUrlParser: true
        }, (error) => {
            if(error){
                console.error('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
        mongoose.connection.on('error', (error) => {
            console.error('몽고디비 연결 에러', error);
        });
        mongoose.connection.on('disconnected', () => {
            console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        });
    }
}

export default App;