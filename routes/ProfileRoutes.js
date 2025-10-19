
var express = require('express');
const {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/ProfileController');
const {
    validatorProfileCreate,
    validatorProfileUpdate
} = require('../validators/ProfileValidator');


const api = express.Router();

/**
 * @swagger
 * /perfiles:
 *   get:
 *     summary: Obtener todos los perfiles
 *     tags: [Profiles]
 *     description: "Retorna una lista de todos los perfiles de usuario (ej: Administrador, Usuario)."
 *     responses:
 *       200:
 *         description: Lista de perfiles obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/perfiles', getAllProfiles);

/**
 * @swagger
 * /perfiles/{id}:
 *   get:
 *     summary: Obtener un perfil por ID
 *     tags: [Profiles]
 *     description: "Retorna un único perfil basado en su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del perfil a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Perfil obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Perfil no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
api.get('/perfiles/:id', getProfileById);

/**
 * @swagger
 * /perfiles:
 *   post:
 *     summary: Crear un nuevo perfil
 *     tags: [Profiles]
 *     description: "Crea un nuevo perfil. Requiere autenticación de administrador."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Perfil creado con éxito.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.post('/perfiles', validatorProfileCreate, createProfile);

/**
 * @swagger
 * /perfiles/{id}:
 *   put:
 *     summary: Actualizar un perfil existente
 *     tags: [Profiles]
 *     description: "Actualiza los datos de un perfil por su ID. Requiere autenticación de administrador."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del perfil a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Perfil actualizado con éxito.
 *       404:
 *         description: Perfil no encontrado.
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
api.put('/perfiles/:id', validatorProfileUpdate, updateProfile);

/**
 * @swagger
 * /perfiles/{id}:
 *   delete:
 *     summary: Eliminar un perfil
 *     tags: [Profiles]
 *     description: "Elimina un perfil por su ID. Requiere autenticación de administrador."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del perfil a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Perfil eliminado con éxito.
 *       404:
 *         description: Perfil no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
api.delete('/perfiles/:id', deleteProfile);

module.exports = api;
