
const { check } = require('express-validator');

const validatorProfileCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 3, max: 50 }).withMessage('El campo debe tener entre 3 y 50 caracteres'),
];

const validatorProfileUpdate = [
    check('nombre').optional()
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 3, max: 50 }).withMessage('El campo debe tener entre 3 y 50 caracteres'),
];

module.exports = {
    validatorProfileCreate,
    validatorProfileUpdate
};
