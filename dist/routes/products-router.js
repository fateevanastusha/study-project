"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositories/products-repository");
const { body, validationResult } = require('express-validator');
exports.productsRouter = (0, express_1.Router)({});
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.productsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foundProductsPromise = products_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    const foundProducts = yield foundProductsPromise;
    res.send(foundProducts);
}));
const titleValidation = body('title').isLength({ min: 3, max: 10 }).withMessage("Title length should be from 3 to 10 symbols");
exports.productsRouter.post('/', titleValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductPromise = products_repository_1.productsRepository.createProduct(req.body.title);
    const newProduct = yield newProductPromise;
    res.status(201).send(newProduct);
}));
exports.productsRouter.get('/', (req, res) => {
    let products = products_repository_1.productsRepository.getAllProducts();
    res.send(products);
});
exports.productsRouter.get('/:id', (req, res) => {
    let product = products_repository_1.productsRepository.getProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.delete('/:id', (req, res) => {
    const isDeleted = products_repository_1.productsRepository.deleteProduct(+req.params.body);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.put('/:id', titleValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const isUpdated = products_repository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = products_repository_1.productsRepository.getProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
});
