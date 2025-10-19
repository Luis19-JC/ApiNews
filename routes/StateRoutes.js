
var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/StateController');
const {validatorStateRequire, validatorStateOptional} = require('../validators/StateValidator')
const { authenticateAdmin } = require('../middlewares/jwt')

const api = express.Router();

/**
 * @swagger
 * /estados:
 *   get:
 *     summary: Obtener todos los estados
 *     tags: [States]
 *     description: "Retorna una lista de todos los estados posibles (ej: Activo, Inactivo, Pendiente)."
 *     responses:
 *       200:
 *         description: Lista de estados obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/estados', get);

/**
 * @swagger
 * /estados/{id}:
 *   get:
 *     summary: Obtener un estado por ID
 *     tags: [States]
 *     description: "Retorna un único estado basado en su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del estado a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       404:
 *         description: Estado no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/estados/:id', getById)

/**
 * @swagger
 * /estados:
 *   post:
 *     summary: Crear un nuevo estado
 *     tags: [States]
 *     description: "Crea un nuevo estado. Requiere autenticación de administrador."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       201:
 *         description: Estado creado con éxito.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.post('/estados', authenticateAdmin, validatorStateRequire, create)

/**
 * @swagger
 * /estados/{id}:
 *   put:
 *     summary: Actualizar un estado existente
 *     tags: [States]
 *     description: "Actualiza los datos de un estado por su ID. Requiere autenticación de administrador."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del estado a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       200:
 *         description: Estado actualizado con éxito.
 *       404:
 *         description: Estado no encontrado.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.put('/estados/:id', authenticateAdmin, validatorStateOptional, update)

/**
 * @swagger
 * /estados/{id}:
 *   delete:
 *     summary: Eliminar un estado
 *     tags: [States]
 *     description: "Elimina un estado por su ID. Requiere autenticación de administrador."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del estado a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado eliminado con éxito.
 *       404:
 *         description: Estado no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
api.delete('/estados/:id', authenticateAdmin, destroy)


module.exports = api;
