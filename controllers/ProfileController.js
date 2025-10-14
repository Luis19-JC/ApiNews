// controllers/ProfileController.js
const { Profile } = require('../models/ProfileModel');
const { connection } = require('../config.db'); // Se mantiene por si se necesitan transacciones futuras

// 1. Obtener Todos los Perfiles (GET /api/profiles)
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll(); 
        res.status(200).json(profiles); 
    } catch (error) {
        console.error('Error al obtener perfiles:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al obtener perfiles', 
            error: error.message 
        });
    }
};


// 2. Obtener un Perfil por ID (GET /api/profiles/:id)
const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findByPk(id);

        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error al obtener perfil por ID:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al obtener perfil', 
            error: error.message 
        });
    }
};


// 3. Crear un Nuevo Perfil (POST /api/profiles)
const createProfile = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El campo nombre es obligatorio' });
        }
        
        const newProfile = await Profile.create({ nombre }); 
        
        res.status(201).json({ 
            message: 'Perfil creado con éxito', 
            profile: newProfile 
        });
    } catch (error) {
        console.error('Error al crear perfil:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al crear perfil', 
            error: error.message 
        });
    }
};


// 4. Actualizar un Perfil (PUT /api/profiles/:id)
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const profile = await Profile.findByPk(id);

        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        if (!nombre) {
            return res.status(400).json({ message: 'El campo nombre es obligatorio para actualizar' });
        }
        
        await profile.update({ nombre });

        res.status(200).json({ 
            message: 'Perfil actualizado con éxito', 
            profile: profile 
        });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al actualizar perfil', 
            error: error.message 
        });
    }
};


// 5. Eliminar un Perfil (DELETE /api/profiles/:id)
const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedCount = await Profile.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        res.status(200).json({ message: 'Perfil eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar perfil:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al eliminar perfil', 
            error: error.message 
        });
    }
};


module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
};