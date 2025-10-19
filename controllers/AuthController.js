const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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
                const payload = {
                    usuario: {
                        id: entitie.id,
                        correo: entitie.correo,
                        perfil_id: entitie.perfil_id
                    }
                }
                const token = jwt.sign(payload, 'mi_llave_secreta', {
                    expiresIn: '1h'
                });
                response.status(200).json({ token: token });
            }
            else {
                response.status(401).json({message: "Sin autorización: Credenciales incorrectas"});

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