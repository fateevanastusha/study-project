import express, {application, NextFunction, Request, Response} from 'express'
import { request } from 'http'
import { send } from 'process'
import bodyParser from "body-parser"
import { productsRouter } from './routes/products-router'
import { addressesRouter } from './routes/addresses-router'
import {runDb} from "./repositories/db";

const blablaMiddleware = (req:Request, res:Response, next: NextFunction) => {
    //@ts-ignore
    req.blabla = "hello"
    next();
}
const authGuardMiddleware= (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === "123"){
        next();
    } else {
        res.send(401)
    }
}

let requestCounter = 0
const requestCounterMiddleware = (req: Request, res:Response, next: NextFunction) => {
    requestCounter ++;
    next();
}


export const app = express()
const port = 654


app.use(express.json())
//app.use(authGuardMiddleware);
app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)
app.use(blablaMiddleware);
app.use(requestCounterMiddleware);

 
const tests = [{id:1, title:"test1"},{id:2,title:"test2"}]


app.get('/tests', blablaMiddleware, (req:Request, res:Response) => {
    //@ts-ignore
    const blabla = req.blabla
    res.send({value: blabla + " !!! Requests : " + requestCounter})
})
//start app
const startApp = async () => {
    await runDb()
    app.listen(port, () => {console.log(`Example app listening on port ${port}`)
    })
}
startApp()


