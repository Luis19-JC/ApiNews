// controllers/CategoryController.js
const { Category } = require('../models/CategoryModel'); 

// 1. Obtener Todas las Categorías (GET /api/categories)
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll(); 
        res.status(200).json(categories); 
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 2. Obtener una Categoría por ID (GET /api/categories/:id)
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 3. Crear una Nueva Categoría (POST /api/categories)
const createCategory = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
             return res.status(400).json({ message: 'El campo nombre es obligatorio' });
        }

        const newCategory = await Category.create({ nombre }); 
        
        res.status(201).json({ 
            message: 'Categoría creada con éxito', 
            category: newCategory 
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// 4. Actualizar una Categoría (PUT /api/categories/:id)
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        if (!nombre) {
             return res.status(400).json({ message: 'El campo nombre es obligatorio' });
        }

        await category.update({ nombre });

        res.status(200).json({ 
            message: 'Categoría actualizada con éxito', 
            category: category 
        });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 5. Eliminar una Categoría (DELETE /api/categories/:id)
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedCount = await Category.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(200).json({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};