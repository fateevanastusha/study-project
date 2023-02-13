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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./routes/products-router");
const addresses_router_1 = require("./routes/addresses-router");
const db_1 = require("./repositories/db");
const blablaMiddleware = (req, res, next) => {
    //@ts-ignore
    req.blabla = "hello";
    next();
};
const authGuardMiddleware = (req, res, next) => {
    if (req.query.token === "123") {
        next();
    }
    else {
        res.send(401);
    }
};
let requestCounter = 0;
const requestCounterMiddleware = (req, res, next) => {
    requestCounter++;
    next();
};
exports.app = (0, express_1.default)();
const port = 6542;
exports.app.use(express_1.default.json());
//app.use(authGuardMiddleware);
exports.app.use('/products', products_router_1.productsRouter);
exports.app.use('/addresses', addresses_router_1.addressesRouter);
exports.app.use(blablaMiddleware);
exports.app.use(requestCounterMiddleware);
const tests = [{ id: 1, title: "test1" }, { id: 2, title: "test2" }];
exports.app.get('/tests', blablaMiddleware, (req, res) => {
    //@ts-ignore
    const blabla = req.blabla;
    res.send({ value: blabla + " !!! Requests : " + requestCounter });
});
//start app
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    exports.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
