'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    //Se crea al ejecutar la siembra
     
    let users =[
      {email: "administrador@gmail.com", name:"Administrador", password: "admin"},
      {email: "colaborador@gmail.com", name:"Colaborador", password: "colab"},
    ];

    queryInterface.bulkDelete('users', users, {});
  },

  async down (queryInterface, Sequelize) {
  
    
    queryInterface.bulkDelete('users', null, {});
   
  }
};
