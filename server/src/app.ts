import dotenv from 'dotenv';
import express from 'express';
import { Express, Request, Response } from 'express';
import cors from 'cors';
import expressLayout from 'express-ejs-layouts';
import main from './server/routes/main.js';
import admin from './server/routes/admin.js';
import connectDB from './server/config/db.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(expressLayout);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  }),
);

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
connectDB();

app.set('view engine', 'ejs');
app.use('', main);
app.use('', admin);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
