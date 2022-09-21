const tasks = require("../models/tasks");
const Sequelize     = require('sequelize');
const { raw } = require("body-parser");


//MOSTRAR TAREAS
async function index(req,res){
 
  if(req.session.loggedin==true){
    const {Tareas} = require('../app'); //toma el modelo para usar en el create, delete y show
    const task = await Tareas.findAll({
      raw:true, //codigo hdp que permite ver los datos en la tabla
    });
  
      if(req.session.admin==true){
        res.render('tasks/index', {task,usuario: req.session.name,si: '1'});
      }else{
        res.render('tasks/index', {task,usuario: req.session.name,no: '0'});
      }
  }else{
    res.redirect('/login');
  }

}

function create(req,res){
  if(req.session.loggedin==true){
    if(req.session.admin==true){
      res.render('tasks/create', {usuario: req.session.name,si: '1'});
    }else{
      res.redirect('/tasks');
    }
    
  }else{
    res.redirect('/login');
  }
    
}

//INSERTAR TAREA
async function store(req, res) {
    const data = req.body;
    const {Tareas} = require('../app'); //toma el modelo para usar en el create, delete y show
  
    /*req.Sequelize((err, conn) => {
      conn.query('INSERT INTO tasks SET ?', [data], (err, rows) => {
        res.redirect('/tasks');
      });
    });*/

    const task = await Tareas.create(data);
    res.redirect('/tasks');
   
  }


  //ELIMINAR TAREAS CON BOTON
  async function destroy(req, res) {
    const id = req.body.id;
    const {Tareas} = require('../app'); //toma el modelo para usar en el create, delete, show y update
    
    if(req.session.admin==true){
      await Tareas.destroy({
        where: {
          id: id
        }
      });
      res.redirect('/tasks');
    }else{
      res.redirect('/tasks');
    }
    
  }

  //MODIFICAR TAREA
  async function edit(req, res) {
    const id = req.params.id;
    const {Tareas} = require('../app'); //toma el modelo para usar en el create, delete, show y update
  
    if(req.session.admin==1){
      const task = await Tareas.findAll({
        where: {
          id: id
        },
        raw: true,
      });
      res.render('tasks/edit', {task});
    }else{
      res.redirect('/tasks');
    }
    
        
  }
 
  //ACTUALIZAR TAREAS
  async function update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const {Tareas} = require('../app'); //toma el modelo para usar en el create, delete, show y update
    
    const task = await Tareas.update(data, {
      where: {
        id: id
      },
      raw: true,
    });
        res.redirect('/tasks');
     
   
  }


module.exports ={
    index:index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}