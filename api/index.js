const express = require("express");
const bodyParser = require('body-parser');
const { requireAuth, checkUser } = require('./middleware/auth.middleware')
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const userPreferencesRoutes = require("./routes/userPreferences.routes");
const userKeywordsRoutes = require("./routes/userKeywords.routes");
const keywordsRoutes = require("./routes/keywords.routes");
const userCryptoListRoutes = require("./routes/userCryptoList.routes");
const cryptoCoinsRoutes = require("./routes/cryptoCoins.routes");
const popularCryptoRoutes = require("./routes/popularCrypto.routes");

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/auth.routes.js', 
    './routes/user.routes.js', 
    './routes/userPreferences.routes.js', 
    './routes/userKeywords.routes.js', 
    './routes/keywords.routes.js', 
    './routes/userCryptoList.routes.js', 
    './routes/cryptoCoins.routes.js', 
    './routes/popularCrypto.routes.js'
];

const doc = {
    info: {
      title: 'Count of Money API',
    },
    host: 'localhost:8080/api',
    schemes: ['http'],
    apis: endpointsFiles,
  };


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
});


app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/user-preferences/', userPreferencesRoutes);
app.use('/api/user-keywords/', userKeywordsRoutes);
app.use('/api/keywords/', keywordsRoutes);
app.use('/api/user-crypto-list/', userCryptoListRoutes);
app.use('/api/crypto-coins/', cryptoCoinsRoutes);
app.use('/api/popular-crypto/', popularCryptoRoutes);

//server
app.listen(process.env.PORT, () => console.log('serveur started :' + process.env.PORT));

const open = require('open');
open("http://localhost:" + process.env.PORT + "/api-docs");