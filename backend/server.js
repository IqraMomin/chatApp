const server = require("./app");
const sequelize = require("./config/db-connection");

const startServer =async ()=>{
try{
  await sequelize.authenticate();
  console.log("Database Connected");
  await sequelize.sync({alter:true});
  console.log("Models Synchronized");
  server.listen(process.env.DB_PORT || 3000,()=>{
    console.log("Server is Up and Running");
  })
}catch(err){
    console.log(err);
}
}

startServer();