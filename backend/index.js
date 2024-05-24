import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());
// Middleware for handling CORS policy
// option 1: allow all origins with default of cors(*)
app.use(cors());
// option 2: allow custom origins
// app.use(cors({
//   origin:'http://localhost:3000',
//   methods:['GET','POST','PUT','DELETE'],
//   allowedHeaders:['Content-Type'],
// }))
app.use('/books',booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
