
const express = require('express');

const { getAllNews: get, getNewById: getById, createNew: create, updateNew: update, deleteNew: destroy } = require('../controllers/NewController');
const { validatorNewCreate, validatorNewUpdate } = require('../validators/NewValidator');
const { authenticateAdmin, authenticateAny } = require('../middlewares/jwt')

const api = express.Router();

/**
 * @swagger
 * /noticias:
 *   get:
 *     summary: Obtener todas las noticias
 *     tags: [News]
 *     description: "Retorna una lista de todas las noticias, incluyendo datos del autor, estado y categoría."
 *     responses:
 *       200:
 *         description: Lista de noticias obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/New'
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/noticias', get);

/**
 * @swagger
 * /noticias/{id}:
 *   get:
 *     summary: Obtener una noticia por ID
 *     tags: [News]
 *     description: "Retorna una única noticia basada en su ID, con datos del autor, estado y categoría."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la noticia a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Noticia obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/New'
 *       404:
 *         description: Noticia no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/noticias/:id', getById)

/**
 * @swagger
 * /noticias:
 *   post:
 *     summary: Crear una nueva noticia
 *     tags: [News]
 *     description: "Crea una nueva noticia. Requiere autenticación."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/New'
 *     responses:
 *       201:
 *         description: Noticia creada con éxito.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.post('/noticias', authenticateAny, validatorNewCreate, create)

/**
 * @swagger
 * /noticias/{id}:
 *   put:
 *     summary: Actualizar una noticia existente
 *     tags: [News]
 *     description: "Actualiza los datos de una noticia por su ID. Requiere autenticación."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la noticia a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/New'
 *     responses:
 *       200:
 *         description: Noticia actualizada con éxito.
 *       404:
 *         description: Noticia no encontrada.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.put('/noticias/:id', authenticateAny, validatorNewUpdate, update)

/**
 * @swagger
 * /noticias/{id}:
 *   delete:
 *     summary: Eliminar una noticia
 *     tags: [News]
 *     description: "Elimina una noticia por su ID. Requiere autenticación."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la noticia a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Noticia eliminada con éxito.
 *       404:
 *         description: Noticia no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
api.delete('/noticias/:id', authenticateAny,  destroy)

module.exports = api;
