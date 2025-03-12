import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';



// Creating an Express Application
const app = express();


// Configuring Environment Variables
dotenv.config();
console.log("SECRET_KEY:", process.env.SECRET_KEY); 

// here we call our DBConnection function
connectDB();



// here all middleware are defined
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// we can we this alos
// app.use(express.urlencoded({ extended: true }));



// Defining Routes for register and login and logout
app.use("/api/v1/user", userRouter);

// Defining Routes for todo
app.use("/api/v1/todo", todoRouter);



// api end-point
// http://localhost:8000/api/v1/user/
// http://localhost:8000/api/v1/todo/

const PORT  = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})
