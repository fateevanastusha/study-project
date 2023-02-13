import {MongoClient} from "mongodb";
import {ProductType} from "./products-db-repository";

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);
const db = client.db ("shop")
export const productsCollection = db.collection<ProductType>("products");

export async function runDb() {
    try{
        await client.connect();
        await client.db("products").command({ping: 1});
        console.log("Connected succefully to mongo server");
    } catch {
        await client.close()
    }
}
