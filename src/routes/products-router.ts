import { Router, Response, Request } from "express";
import { productsInMemoryRepository, ProductType } from "../repositories/products-db-repository";
const { body, validationResult } = require('express-validator');
export const productsRouter = Router({})
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";


productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProductsPromise : Promise<ProductType[]> = productsInMemoryRepository.findProducts(req.query.title?.toString());
    const foundProducts : ProductType[] = await foundProductsPromise
    res.send(foundProducts);
})

const titleValidation = body('title').isLength({ min: 3, max: 10}).withMessage("Title length should be from 3 to 10 symbols")


productsRouter.post('/', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newProductPromise : Promise<ProductType> = productsInMemoryRepository.createProduct(req.body.title);
    const newProduct : ProductType = await newProductPromise
    res.status(201).send(newProduct);
})

productsRouter.get('/', async (req: Request, res: Response)=> {
    let products = await productsInMemoryRepository.getAllProducts()
    res.send(products)

})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsInMemoryRepository.getProductById(+req.params.id);
    if (product){
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsInMemoryRepository.deleteProduct(+req.params.body);
    if (isDeleted){
        res.send(204)
    } else {
        res.send(404)
    }
})

productsRouter.put('/:id', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated = await productsInMemoryRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated){
        const product = await productsInMemoryRepository.getProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
