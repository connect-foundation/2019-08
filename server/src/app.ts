import express from "express";
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import "dotenv/config";

import indexRouter from './routes/index';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/', indexRouter);

const server = app.listen(3000, () => {
    console.log('listen port 3000');
});