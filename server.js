const express = require('express')
const app = express();
const cors = require('cors');
const { PORT } = require("./config");

// Importar Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(cors());
app.use(express.json({limit: '50mb'}))

//Exportar Rutas
const profile_routes = require('./routes/ProfileRoutes');
const state_routes = require('./routes/StateRoutes');
const category_routes = require('./routes/CategoryRoutes');
const new_routes = require('./routes/NewRoutes');
const user_routes = require('./routes/UserRoutes');
const auth_routes = require('./routes/AuthRoute');

//Usar las rutas
app.use('/api', profile_routes);
app.use('/api', state_routes);
app.use('/api', category_routes);
app.use('/api', new_routes);
app.use('/api', user_routes);
app.use('/api', auth_routes);

// Ruta de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;
