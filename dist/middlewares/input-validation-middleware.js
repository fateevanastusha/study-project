"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const { body, validationResult } = require('express-validator');
const inputValidationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
