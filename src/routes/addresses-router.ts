import { Router, Response, Request } from "express";
export const addressesRouter = Router({})

const addresses = [{id: 1, value: "Nazelejnasty 12"}, {id: 2, value: "Selikaga 11"}]

addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addresses.find(p => p.id === +req.params.id)
    if (address){
        res.send(address)
    } else {
        res.send(404)
    }
})