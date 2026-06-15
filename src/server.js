import express from 'express';
import dotenv from 'dotenv';
import studentRouter from './routes/studentRoutes.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(studentRouter);

app.use((req, res) => res.status(404).type('text/plain; charset=utf-8').send('Not Found'));

app.listen(port,  () => console.log(`Server is running on port ${port}. Press Ctrl-C to quit.`));