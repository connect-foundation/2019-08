import 'dotenv/config';
import App from './app';
import PostsController from './post/posts.controller';

const app = new App([
    new PostsController()
]);

app.listen();