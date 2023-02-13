import { NextFunction } from "express";
import { Response, Request } from "express";
const { body, validationResult } = require('express-validator');

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors : errors.array()})
    } else {
        next()
    }
}