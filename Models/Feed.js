var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
  user_reg:{type:String,required:true},
  caption:{type:String,required:true},
  photo_link:{type:String,required:true},
  date:{type:String,required:true},
  time:{type:String,required:true},
  comments:[{
    comment:{type:String}
  }]
});

module.exports=mongoose.model('Feed',schema);
