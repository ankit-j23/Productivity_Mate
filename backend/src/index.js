import express from 'express';
import { connectToMOngo } from './lib/db.js';
import authRoutes from './routes/auth.routes.js'
import todosRoutes from './routes/todos.routes.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
connectToMOngo();

const app = express();
const port = process.env.PORT;

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth' , authRoutes)
app.use('/api/todos' , todosRoutes)

app.listen(port , ()=>{
    console.log(`App is successfully listening on port ${port}`)
})

