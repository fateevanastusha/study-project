import {productsRouter} from "../routes/products-router";

const products = [{id: 1, title: "tomato"}, {id: 2, title: "orange"}, {id: 3, title: "strawberry"}];
export type ProductType = {
    id: number
    title: string
}

export const productsInMemoryRepository = {
    async getAllProducts() : Promise<ProductType[]>{
      return products
    },
    async findProducts(title: string | undefined | null) : Promise <ProductType []> {
        if (title){
            let fitleredProducts = products.filter(p => p.title.indexOf(title) > -1);
            return fitleredProducts;
        } else {
            return products;
        }
    },
    getProductById(id: number){
        let product = products.find(p => p.id === id);
        return product;
    },
    async createProduct(title: string) : Promise<ProductType>{
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string) : Promise<boolean>{
        let product = products.find(p => p.id === id);
        if (product) {
            product.title = title;
            return true;
        } else {
            return false;
        };
    },
    async deleteProduct(id: number) : Promise<boolean>{
    for (let i = 0; i<products.length; i++){
        if (products[i].id === id){
            products.splice(i,1);
            return true;
        }
    }
    return false;
    },
}
