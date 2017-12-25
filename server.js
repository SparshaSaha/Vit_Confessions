"use strict"
const express = require("express");
const mongoose = require("mongoose");

//mongodb://heroku_f0sjv5j4:f2son00gvrf3d0mhq8u62k4upk@ds161793.mlab.com:61793/heroku_f0sjv5j4

//'mongodb://127.0.0.1:27017/Confessionsdatabase'

var db = mongoose.connection.openUri('mongodb://heroku_f0sjv5j4:f2son00gvrf3d0mhq8u62k4upk@ds161793.mlab.com:61793/heroku_f0sjv5j4');


mongoose.connection.once('connected',function(){
  console.log("Connected to database");
});


const port=process.env.PORT || 8080;

require("./Routes")(db);
