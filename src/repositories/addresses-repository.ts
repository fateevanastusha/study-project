const addresses = [{id: 1, value: "Nazelejnasty 12"}, {id: 2, value: "Selikaga 11"}]
export const addressesRepository = {
    getAdressById(id: number){
        let address = addresses.find(p => p.id === id);
        return address;
    }
}