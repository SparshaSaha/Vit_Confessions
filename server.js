"use strict"
const express = require("express");
const mongoose = require("mongoose");

//mongodb://heroku_cpwbzfrf:avb8nsib2n1l7me56jjlkba6ok@ds145303.mlab.com:45303/heroku_cpwbzfrf
//'mongodb://127.0.0.1:27017/Confessionsdatabase'

var db = mongoose.connection.openUri('mongodb://heroku_cpwbzfrf:avb8nsib2n1l7me56jjlkba6ok@ds145303.mlab.com:45303/heroku_cpwbzfrf'); 


mongoose.connection.once('connected',function(){
  console.log("Connected ot database");
});

const app=express();

const port=process.env.PORT || 8080;

require("./Routes")(app,db);
app.listen(port);
