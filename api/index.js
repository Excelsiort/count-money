const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//routes
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);

//server
app.listen(process.env.PORT, () => console.log('serveur started :' + process.env.PORT));
