//constantes a usar

const express= require('express');
const {engine}=require ('express-handlebars');

const Handlebars=require ('express-handlebars');
//const hbs = require('express-handlebars'); //arreglar error de handlers
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const Sequelize =require('sequelize');//Primero se cambia esto por la lib de sequelize para conectar la db
const DataTypes = require('sequelize'); 

const bodyParser = require ('body-parser');
const mysql = require('mysql');
const tasksRoutes = require ('./routes/tasks');

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
    //handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');


//conexion bd
/*
app.use(myconnection (mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crudnodejs'
}, 'single'));*/

//conexion con sequelize segundo paso
const sequelize = new  Sequelize('crudnodejs', 'root', '',{
    host: 'localhost',
    dialect:'mysql'
});


//apetura de servidor
app.listen (app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});

//habilitar uso de rutas
app.use('/', tasksRoutes);

//mostrar pagina principal al entrar al servidor
app.get('/', (req, res)=>{
    res.render('home');
});

//vinculación de modelos a DB
const Tareas = require('./models/tasks')(sequelize, DataTypes);

sequelize.sync({force: false})
.then (() =>{
    console.log('tablas sincronizadas')
});

module.exports = {Tareas}



