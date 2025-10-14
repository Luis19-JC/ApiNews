// controllers/NewController.js
const { New } = require('../models/NewModel');
const { User } = require('../models/UserModel'); 
const { State } = require('../models/StateModel'); 
const { Category } = require('../models/CategoryModel'); 

// 1. Obtener Todas las Noticias (GET /api/news) - INCLUYE RELACIONES
const getAllNews = async (req, res) => {
    try {
        const news = await New.findAll({
            // Incluir las relaciones para obtener datos completos
            include: [
                { 
                    model: User, 
                    as: 'author', // Definido en la asociación (si lo es) o solo 'User'
                    attributes: ['nombre', 'email'] // Solo queremos nombre y email del autor
                },
                { 
                    model: State, 
                    as: 'status', // Definido en la asociación (si lo es) o solo 'State'
                    attributes: ['nombre'] 
                },
                { 
                    model: Category, 
                    as: 'category', // Definido en la asociación (si lo es) o solo 'Category'
                    attributes: ['nombre'] 
                },
            ]
        }); 
        res.status(200).json(news); 
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 2. Obtener una Noticia por ID (GET /api/news/:id) - INCLUYE RELACIONES
const getNewById = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await New.findByPk(id, {
            // Incluir las mismas relaciones
            include: [
                { model: User, as: 'author', attributes: ['nombre', 'email'] },
                { model: State, as: 'status', attributes: ['nombre'] },
                { model: Category, as: 'category', attributes: ['nombre'] },
            ]
        });

        if (!noticia) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }

        res.status(200).json(noticia);
    } catch (error) {
        console.error('Error al obtener noticia por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 3. Crear una Nueva Noticia (POST /api/news)
const createNew = async (req, res) => {
    try {
        const { title, content, image, userId, stateId, categoryId } = req.body;
        
        if (!title || !content || !userId || !stateId || !categoryId) {
             return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const newEntry = await New.create({ title, content, image, userId, stateId, categoryId }); 
        
        res.status(201).json({ 
            message: 'Noticia creada con éxito', 
            newEntry: newEntry 
        });
    } catch (error) {
        console.error('Error al crear noticia:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// 4. Actualizar una Noticia (PUT /api/news/:id)
const updateNew = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, userId, stateId, categoryId } = req.body;

        const noticia = await New.findByPk(id);

        if (!noticia) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }

        await noticia.update({ title, content, image, userId, stateId, categoryId });

        res.status(200).json({ 
            message: 'Noticia actualizada con éxito', 
            noticia: noticia 
        });
    } catch (error) {
        console.error('Error al actualizar noticia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 5. Eliminar una Noticia (DELETE /api/news/:id)
const deleteNew = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedCount = await New.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }

        res.status(200).json({ message: 'Noticia eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar noticia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllNews,
    getNewById,
    createNew,
    updateNew,
    deleteNew
};