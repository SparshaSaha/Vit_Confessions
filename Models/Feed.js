var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
  f_id:{type:Number,required:true},
  user_reg:{type:String,required:true},
  caption:{type:String,required:true},
  photo_link:{type:String,required:true},
  comments:[{
    comment:{type:String}
  }],
  tag:{type:String}
});

module.exports=mongoose.model('Feed',schema);
