var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create Account Schema
var schema=new Schema({
  email:{ type:String ,required:true , unique:true},
  password:{type:String,required:true},
  reg_no:{type:String,required:true},
  recpost:[{
    for_user:{type:String},
    from_user:{type:String},
    message:{type:String},
    date:{type:String},
    time:{type:String}
  }],
  senpost:[{
    for_user:{type:String},
    from_user:{type:String},
    message:{type:String},
    date:{type:String},
    time:{type:String}
  }],
  name:{type:String,required:true},
  standing_credits:{type:Number,required:true},
  photo_link:{type:String,required:true}

});

module.exports=mongoose.model('User_profile',schema);
