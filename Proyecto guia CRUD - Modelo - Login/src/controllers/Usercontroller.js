
const bcrypt=require('bcrypt'); //Proteger mas las contraseñas

function login(req, res) {
    if (req.session.loggedin==true) {
          // Output username
          if(req.session.admin == true){
      res.render('/',{usuario: req.session.name, si: '1'});
          }else{
            res.render('/',{usuario: req.session.name, no: '0'});
          }
    } else {
      res.render('login/login');
    }
  }
  
  function register(req, res) {
    if (req.session.loggedin==true) {
      // Output username
      if(req.session.admin==true){
        res.render('login/register',{usuario: req.session.name, si: '1'});
      }else{
        res.redirect('/tasks')
      }
  
} else {
  res.redirect('/tasks');
  
}
    
  }
  
 async function storeUser(req, res) {

    const {Usuario} = require('../app'); //toma el modelo para usar en el create, delete y show
      const data= req.body;  
      
        bcrypt.hash(data.password, 12).then(hash=>{ //encripta la contraseña
          data.password=hash;  
          Usuario.create(data) //Guarda usuario   
          .then(function(user){
            res.redirect('/');  //Si guarda correctamente
          })
          .catch(function (error){ //sino muestra esto en el formulario
            res.render('login/register',{error: 'El email ya a sido registrado'});  
          }); 
        });      
               
  }

 async function auth(req,res){
    const {Usuario} = require('../app'); //toma el modelo para usar en el create, delete y show
      const data= req.body; 
      
     const exist= await Usuario.findOne({ //Ver si existe usuario este devuelve error si no hay no como findAll
        where: {
          email: data.email
        },
        raw: true,
      }) ;
      if(exist===null){
        
        res.render('login/login',{error: 'El email no esta registrado'}); //sino lo encuentra
      }else{
        bcrypt.compare(data.password, exist.password, (error, isMatch)=>{ //Verifica contraseña correcta
          if(!isMatch){
            res.render('login/login',{error: 'La contraseña es incorrecta'}); //Contraseña no coincide
          }else{

            req.session.loggedin=true;
            req.session.name=exist.name;
            if(exist.isAdmin==1){
              req.session.admin=true;
            }else{
              req.session.admin=false;
            }
            
            res.redirect('/');  
            //contraseña y usuario correctos
          }
        });
        
      }
          

  }
  
  function logout(req, res) {
    if (req.session.loggedin == true) {
      req.session.destroy();
    }
    res.redirect('/');
  }
  
  
  module.exports = {
    login: login,
    register: register,
    storeUser: storeUser,
    logout: logout,
    auth, auth,
  }