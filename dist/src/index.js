"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./routes/products-router");
const addresses_router_1 = require("./routes/addresses-router");
exports.app = (0, express_1.default)();
const port = 654;
exports.app.use(express_1.default.json());
exports.app.use('/products', products_router_1.productsRouter);
exports.app.use('/addresses', addresses_router_1.addressesRouter);
const tests = [{ id: 1, title: "test1" }, { id: 2, title: "test2" }];
exports.app.get('/tests', (req, res) => {
    res.send(tests);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
