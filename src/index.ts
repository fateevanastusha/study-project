import express, {application, NextFunction, Request, Response} from 'express'
import { request } from 'http'
import { send } from 'process'
import bodyParser from "body-parser"
import { productsRouter } from './routes/products-router'
import { addressesRouter } from './routes/addresses-router'

export const app = express()
const port = 654


app.use(express.json())

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

const tests = [{id:1, title:"test1"},{id:2,title:"test2"}]
app.get('/tests', (req:Request, res:Response) => {
    res.send(tests)
})
//start app
app.listen(port, () => {    console.log(`Example app listening on port ${port}`)
})


