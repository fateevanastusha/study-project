"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRepository = void 0;
const addresses = [{ id: 1, value: "Nazelejnasty 12" }, { id: 2, value: "Selikaga 11" }];
exports.addressesRepository = {
    getAdressById(id) {
        let address = addresses.find(p => p.id === id);
        return address;
    }
};
