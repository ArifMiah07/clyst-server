// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { postRoutes } from './app/modules/post/post.routes';

//application
const app : Application = express()


//middleware
app.use(express.json())
app.use(cors())

//application routes
app.use('/api/v1/data', postRoutes)

//home controller
const getController = async(req: Request, res: Response)=>{
    res.send('Clyst application server is running')
}

app.get('/', getController);



export default app;