const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path'); 

const options = {
    // Definición de la API (Metadatos)
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API News Documentation',
            version: '1.0.0',
            description: 'Documentación CRUD para la API de Noticias usando Express y Sequelize.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        
        // Definición de Esquemas (Componentes)
        components: {
            schemas: {
                // ESQUEMA 1: PROFILE
                Profile: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID del perfil.', example: 1 },
                        nombre: { type: 'string', description: 'Nombre del perfil.', example: 'Administrador' }
                    }
                },
                
                // ESQUEMA 2: USER
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID del usuario.', example: 1 },
                        nombre: { type: 'string', description: 'Nombre completo del usuario.', example: 'Luis Jimenez' },
                        email: { type: 'string', description: 'Correo electrónico único.', example: 'luis.j@example.com' },
                        password: { type: 'string', description: 'Contraseña del usuario (solo en peticiones POST/PUT).', example: 'password123' },
                        profileId: { type: 'integer', description: 'ID del perfil asociado (e.g., 1=Admin).', example: 1 },
                        stateId: { type: 'integer', description: 'ID del estado del usuario (e.g., 1=Activo).', example: 1 },
                    }
                },

                // ESQUEMA 3: STATE
                State: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID del estado.', example: 1 },
                        nombre: { type: 'string', description: 'Nombre del estado (e.g., Activo, Inactivo).', example: 'Activo' }
                    }
                },

                // ESQUEMA 4: CATEGORY
                Category: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID de la categoría.', example: 1 },
                        nombre: { type: 'string', description: 'Nombre de la categoría (e.g., Deportes, Política).', example: 'Deportes' }
                    }
                },

                // ESQUEMA 5: NEW (Noticia)
                New: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID de la noticia.', example: 101 },
                        title: { type: 'string', description: 'Título de la noticia.', example: 'Descubren nuevo planeta con atmósfera respirable.' },
                        content: { type: 'string', description: 'Contenido completo de la noticia.', example: 'Científicos de la NASA confirmaron hoy la existencia de...' },
                        image: { type: 'string', description: 'URL o path de la imagen principal.', example: 'http://example.com/imagen.jpg' },
                        userId: { type: 'integer', description: 'ID del autor de la noticia.', example: 5 },
                        stateId: { type: 'integer', description: 'ID del estado de la noticia (e.g., 1=Publicada).', example: 1 },
                        categoryId: { type: 'integer', description: 'ID de la categoría de la noticia (e.g., 2=Ciencia).', example: 2 },
                        // Propiedades adicionales para lectura (incluidas por Sequelize)
                        author: { type: 'object', properties: { nombre: { type: 'string' }, email: { type: 'string' } } },
                        status: { type: 'object', properties: { nombre: { type: 'string' } } },
                        category: { type: 'object', properties: { nombre: { type: 'string' } } },
                    }
                }
            }
        }
    },
    // Archivos donde Swagger debe buscar la documentación.
    apis: [
        path.resolve(__dirname, 'routes/*.js')
    ], 
};

// Genera la especificación OpenAPI
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;