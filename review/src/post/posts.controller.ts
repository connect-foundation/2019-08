import * as express from 'express';
import Controller from '../interface/controller.interface';
import Post from './posts.interface';
import postModel from './posts.model';
 
class PostsController implements Controller {
    public path = '/posts';
    public router = express.Router();
    private post = postModel;

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);

        this.router.post(this.path, this.createPost);
        this.router.put(`${this.path}/:id`, this.modifyPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
    }

    private getAllPosts = (request: express.Request, response: express.Response) => {
        this.post.find()
            .then((posts) => {
                response.send(posts);
            });
    }

    private getPostById = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.post.findById(id)
            .then((post) => {
                response.send(post);
            });
    }

    private modifyPost = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const postData: Post = request.body;
        this.post.findByIdAndUpdate(id, postData, { new: true })
            .then((post) => {
                response.send(post);
            });
    }
    private createPost = (request: express.Request, response: express.Response) => {
        const postData: Post = request.body;
        const createdPost = new this.post(postData);
        createdPost.save()
            .then((savedPost) => {
                response.status(201).send(savedPost);
            })
    }

    private deletePost = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.post.findByIdAndDelete(id)
            .then((successResponse) => {
                if(successResponse) {
                    response.status(200).send();
                } else {
                    response.send(404);
                }
            })
    }
}

export default PostsController;