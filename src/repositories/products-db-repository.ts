import {productsCollection} from "./db";
//Product Type
export type ProductType = {
    id: number
    title: string
}

export const productsInMemoryRepository = {
    async getAllProducts() : Promise<ProductType[]>{
        return productsCollection.find({}).toArray()
    },
    //FIND PRODUCT BY TITLE
    async findProducts(title: string | undefined | null) : Promise <ProductType []> {
        const filter: any = {}
        if (title){
            filter.title = {$regex : title}
        }
        return productsCollection.find(filter).toArray()
    },
    //FIND PRODUCT BY ID
    async getProductById(id: number) : Promise <ProductType | null> {
        let product : ProductType | null = await productsCollection.findOne({id: id})
        return product;
    },
    //CREATE PRODUCT WITH TITLE
    async createProduct(title: string) : Promise<ProductType>{
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        const result = await productsCollection.insertOne(newProduct)
        return newProduct
    },
    //UPDATE PRODUCT BY ID
    async updateProduct(id: number, title: string) : Promise<boolean>{
        const result = await productsCollection.updateOne({id : id}, { $set: {title: title}})
        return result.matchedCount === 1
    },
    //DELETE PRODUCT BY ID
    async deleteProduct(id: number) : Promise<boolean>{
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
}
