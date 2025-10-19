
var express = require('express');

const { getAllUsers: get, getUserById: getById, createUser: create, updateUser: update, deleteUser: destroy } = require('../controllers/UserController');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     description: "Retorna una lista de todos los usuarios. Requiere autenticación de administrador."
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/usuarios', authenticateAdmin, get);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     description: "Retorna un único usuario basado en su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del usuario a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/usuarios/:id', authenticateAdmin, getById)

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     description: "Crea un nuevo usuario en la base de datos."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *       422:
 *         description: "Error de validación (campos incorrectos o faltantes)."
 *       500:
 *         description: Error interno del servidor.
 */
api.post('/usuarios', validatorUserCreate, create)

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     description: "Actualiza los datos de un usuario existente por su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del usuario a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.put('/usuarios/:id',authenticateAdmin, validatorUserUpdate, update)

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     description: "Elimina un usuario de la base de datos por su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del usuario a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
api.delete('/usuarios/:id', authenticateAdmin, destroy)


module.exports = api;
