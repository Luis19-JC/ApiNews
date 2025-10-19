const express = require('express');
const api = express.Router();
const { login, register } = require('../controllers/AuthController');
const { validatorLogin, validatorRegister } = require('../validators/AuthValidator');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     description: Autentica a un usuario y devuelve un token si las credenciales son correctas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contraseña
 *             properties:
 *               correo:
 *                 type: string
 *                 description: "Correo electrónico del usuario."
 *                 example: "admin@example.com"
 *               contraseña:
 *                 type: string
 *                 description: "Contraseña del usuario."
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa, token devuelto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: "Token JWT para ser usado en rutas protegidas."
 *       401:
 *         description: Sin autorización (credenciales incorrectas).
 *       422:
 *         description: Error de validación en los datos de entrada.
 *       500:
 *         description: Error interno del servidor.
 */
api.post('/login', validatorLogin, login);

// Define the authentication routes
api.post('/register', validatorRegister, register);

module.exports = api;
