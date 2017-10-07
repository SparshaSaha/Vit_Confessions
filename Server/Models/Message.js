var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema=new Schema({
  for_user:{type:String,required:true},
  from_user:{type:String,required:true},
  message:{type:String,required:true},
  date:{type:String,required:true},
  time:{type:String,required:true}
});
 module.exports=mongoose.model('Message',schema);
