const express = require("express");
const bodyParser = require('body-parser');
const { requireAuth, checkUser } = require('./middleware/auth.middleware')
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const userRoutes = require("./routes/user.routes");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes);

//server
app.listen(process.env.PORT, () => console.log('serveur started :' + process.env.PORT));
