// controllers/UserController.js
const { User } = require('../models/UserModel'); 

// GET: Obtener todos los Usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.status(200).json(users); 
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// GET: Obtener Usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// POST: Crear un nuevo Usuario (¡Simplificado, la lógica real de password es más compleja!)
const createUser = async (req, res) => {
    try {
        const { nombre, email, password, profileId, stateId } = req.body;
        
        if (!nombre || !email || !password || !profileId || !stateId) {
             return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const newUser = await User.create({ nombre, email, password, profileId, stateId }); 
        
        res.status(201).json({ 
            message: 'Usuario creado con éxito', 
            user: newUser 
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// PUT: Actualizar un Usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password, profileId, stateId } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.update({ nombre, email, password, profileId, stateId });

        res.status(200).json({ 
            message: 'Usuario actualizado con éxito', 
            user: user 
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// DELETE: Eliminar un Usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedCount = await User.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};