//constantes a usar

const express= require('express');
const {engine}=require ('express-handlebars');

const Handlebars=require ('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const Sequelize =require('sequelize');
const DataTypes = require('sequelize'); 

const bodyParser = require ('body-parser');
const mysql = require('mysql');
const tasksRoutes = require ('./routes/tasks');

//Librerias para login
const session = require('express-session'); //sesiones
const loginRoutes = require('./routes/login'); //rutas de login
const { redirect } = require('express/lib/response');

//requeri('../db');  para vincular si se quiere manejar config de db aparte

//puerto para el servidor
const app = express();
app.set ('port', 4000);

//utlizar bodyparse para recibir metodos post y get
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  //Definicion para ejecutar vistas
app.set ('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');


//conexion bd

//conexion con sequelize segundo paso
const sequelize = new  Sequelize('loginnodejs', 'root', '',{
    host: 'localhost',
    dialect:'mysql'
});


//apetura de servidor
app.listen (app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});


//Creacion de sesiones para login
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


//habilitar uso de rutas
app.use('/', tasksRoutes);



//uso de las rutas
app.use('/', loginRoutes);

//mostrar pagina principal al entrar al servidor
app.get('/', (req, res)=>{

    
    if (req.session.loggedin==true) {
        // Output username
        if(req.session.admin == true){
            res.render('home', {usuario: req.session.name, si: '1'});
        }else{
            res.render('home', {usuario: req.session.name, no: '0'});
        }
    
    
  } else {
    res.redirect('/login');
  }
});

//vinculación de modelos a DB
const Tareas = require('./models/tasks')(sequelize, DataTypes);
const Usuario= require('./models/users')(sequelize, DataTypes);

sequelize.sync({force: false})
.then (() =>{
    console.log('tablas sincronizadas')
});

module.exports = {Tareas,Usuario}





