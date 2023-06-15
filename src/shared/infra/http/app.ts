import "reflect-metadata"
import "express-async-errors"
import * as dotenv from 'dotenv'
import express, { NextFunction, Response, Request } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'

dotenv.config();


import { router } from './routes'

import {createConnection } from '@shared/infra/typeorm'

import '@shared/container'
import { AppError } from "@shared/errors/AppError"

const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
     if(err instanceof AppError){

        return response.status(err.statusCode).json({
            message: err.message
        })
     }

     return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
     })
})

createConnection()



export { app }