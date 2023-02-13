import { Router, Response, Request } from "express";
import { addressesRepository } from "../repositories/addresses-repository";
export const addressesRouter = Router({})


addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addressesRepository.getAdressById(+req.params.id);
    if (address){
        res.send(address);
    } else{
        res.send(404);
    }
})