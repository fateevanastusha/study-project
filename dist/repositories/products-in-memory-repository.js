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
exports.productsInMemoryRepository = void 0;
const products = [{ id: 1, title: "tomato" }, { id: 2, title: "orange" }, { id: 3, title: "strawberry" }];
exports.productsInMemoryRepository = {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return products;
        });
    },
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                let fitleredProducts = products.filter(p => p.title.indexOf(title) > -1);
                return fitleredProducts;
            }
            else {
                return products;
            }
        });
    },
    getProductById(id) {
        let product = products.find(p => p.id === id);
        return product;
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = {
                id: +(new Date()),
                title: title
            };
            products.push(newProduct);
            return newProduct;
        });
    },
    updateProduct(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = products.find(p => p.id === id);
            if (product) {
                product.title = title;
                return true;
            }
            else {
                return false;
            }
            ;
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === id) {
                    products.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
    },
};
