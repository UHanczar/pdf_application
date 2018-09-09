import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config/keys';
import pdfRoutes from './routes/pdf';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api/getPdf', pdfRoutes);

app.listen(config.port, () => console.log(`Server runs on port ${config.port}`));
