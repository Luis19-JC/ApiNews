const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
    }).then(entitie => {
            if (entitie) {
                response.status(201).json({message: "Login con éxito"});
            }
            else {
                response.status(401).json({message: "Sin autorización"});

            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    request.body.perfil_id = 2
    request.body.status = true

    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

module.exports = {
    login,
    register,
};