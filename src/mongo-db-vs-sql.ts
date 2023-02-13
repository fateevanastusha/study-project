//MONGODB structure

//collection
type UserMongo = {
    id: number, // auto inc -db task
    firstName: string,
    lastName: string
    profile : {
        hobby: string,
        education: string
    }, //1..1
    sharedWalletsIds: string[]
}
type WalletMongo = {
    id : string, // PK
    title: string,
    userId : number // FK
}

//SQL structure

//collection
type User = {
    id: number, // PK
    firstName: string,
    lastName: string,
    passportNumber: string,
}
type Wallet = {
    id : string, // PK
    title: string,
    userId : number // FK
}
type Profile = {
    hobby: string,
    education: string
    userId: number // FK
}
type WalletSharing = {
    walletId: string,
    userId: number,
    limitPerDay: number
}