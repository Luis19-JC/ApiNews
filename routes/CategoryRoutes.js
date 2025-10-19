var express = require('express');
const { 
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/CategoryController');

const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/CategoryValidator');
const { authenticateAdmin } = require('../middlewares/jwt');

const api = express.Router();

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     description: "Retorna una lista de todas las categorías de noticias (ej: Deportes, Política, Tecnología)."
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/categorias', getAllCategories);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     description: "Retorna una única categoría basada en su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la categoría a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/categorias/:id', getCategoryById);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     description: "Crea una nueva categoría. Requiere autenticación de administrador."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada con éxito.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.post('/categorias', authenticateAdmin, validatorCategoryCreate, createCategory);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Categories]
 *     description: "Actualiza los datos de una categoría por su ID. Requiere autenticación de administrador."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la categoría a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito.
 *       404:
 *         description: Categoría no encontrada.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.put('/categorias/:id', authenticateAdmin, validatorCategoryUpdate, updateCategory);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
 *     description: "Elimina una categoría por su ID. Requiere autenticación de administrador."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico de la categoría a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
api.delete('/categorias/:id', authenticateAdmin, deleteCategory);

module.exports = api;