import express from 'express';
import { connectToMOngo } from './lib/db.js';
import authRoutes from './routes/auth.routes.js'
import todosRoutes from './routes/todos.routes.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();
connectToMOngo();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/auth' , authRoutes)
app.use('/api/todos' , todosRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*" , ( req,res ) => {
        res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
    })
}

app.listen(PORT , ()=>{
    console.log(`App is successfully listening on port ${PORT}`)
})

