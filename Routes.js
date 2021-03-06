const User=require("./Models/Account");
const Message=require("./Models/Message");
const Feed=require("./Models/Feed");
const nodemailer = require('nodemailer');

var gcm = require('node-gcm');
var server_key='AIzaSyCJB4YaXoW_c7h0-WMDOUFL0RHiNOkU9mA';

var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
const port=process.env.PORT || 8080;

module.exports= function(mongo){
  onlinemap=new Map();
  revonlinemap=new Map();

  require("./Send_Mail")('saha.sparsha@gmail.com','My password');


  var array;

  Feed.find().sort("f_id").limit(200).exec(function(err,resp){
    if(err)
    {
    }
    else {
      array=resp;
      console.log(resp);
    }
  });



  var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));

  }).listen(port, function() {
      console.log('Listening at: http://localhost:'+port);
  });

  socketio.listen(server).on('connection', function (socket) {

    socket.on('check_username',function(user){
      User.find({username:user},(err,resp)=>{
        if(err)
        {
          socket.emit('check_username_reply',"error");
        }
        else if(resp.length==0)
        socket.emit('check_username_reply',"available");
        else {
          socket.emit('check_username_reply',"taken");
        }
      });
    });

    socket.on('register', function(email){
      onlinemap[email]=socket;
      revonlinemap[socket]=email;
    });

    socket.on('disconnect',function(){
      onlinemap.delete(revonlinemap[socket]);
      revonlinemap.delete(socket);
    });


      socket.on('message', function (msg) {

          console.log('Message Received: ', msg);
          socket.emit('message', msg);
      });

      //Send socket function
        socket.on('send',function(dataJson){

          var data=dataJson;

          User.update({email:data.tomail},{$push:{
            recpost:
            {
              for_user:data.tomail,
              from_user:data.frommail,
              message:data.message,
              date:data.date,
              time:data.time
            }
          }},function(err){
            if(err){
            socket.emit('send_reply', "error");
          }
          });



        //Update sentmessage for the sender
          User.update({email:data.frommail},{$push:{
            senpost:
            {
              for_user:data.tomail,
              from_user:data.frommail,
              message:data.message,
              date:data.date,
              time:data.time
            }
          }
          },function(err){
            if(err)
            throw err;
            else {

              if(onlinemap[data.tomail]==null)
              {
                //TODO: Google Cloud Messaging
              }
              else {
                var soc=onlinemap[data.tomail];
                soc.emit('new_message',data);
              }
              socket.emit('send_reply', "successful");
            }
          });
      });



    //Sign up user
      socket.on('signup',function(dataJson){
        var data=dataJson;
        console.log("from signup: "+JSON.stringify(dataJson));

        var user=new User({
          email:data.email,
          password:data.password,
          reg_no:data.reg_no,
          username:data.username,
          name:data.name,
          standing_credits:0,
          photo_link:data.photo_link

        });
        user.save((err,res1)=>{
          if(err){
          socket.emit('signup_reply','error');
        }
          else{
            onlinemap[user.email]=socket;
            revonlinemap[socket]=user.email;
          socket.emit('signup_reply','successful');
        }
        })

      });



    //Update credits for a user
      socket.on('update_credits',function(dataJson){
        var data=dataJson;
            User.update({email:data.email},{$set:{standing_credits:data.credits}},function(err,resp1){
              if(err)
              socket.emit('update_credits_reply','error');
              else {
                socket.emit('update_credits_reply', 'successful');
              }
            });
        });


        //Sign in user
        socket.on('signin', function(dataJson){
          var data=dataJson;
          console.log("from signin: "+JSON.stringify(dataJson));
          User.find({email:data.email,password:data.password},function(err,resp){
            if(resp.length==0){
              socket.emit('signin_reply', 'error');
              }
              else {

                var temp={
                  email:resp[0].email,
                  password:resp[0].password,
                  reg_no:resp[0].reg_no,
                  username:resp[0].username,
                  name:resp[0].name,
                  standing_credits:resp[0].standing_credits,
                  photo_link:resp[0].photo_link
                };

                socket.emit('signin_reply' ,temp);
              }
          });
        });





        // Update profile pic link
        socket.on("updateprofilepic",(dataJson)=>{
          var data=dataJson;
          User.find({email:data.email},(err,resp)=>{
            if(err)
            socket.emit('updateprofilepic_reply', "error");
            else {
              {
                User.update({email:data.email},{$set:{photo_link:data.photo_link}},function(err,resp1){
                  if(err)
                  socket.emit('updateprofilepic_reply', "error");
                  else {
                    socket.emit('updateprofilepic_reply', "successful");
                  }
                });
              }
            }
          });
        });




    //Get received post for an User
      socket.on("getreceivedpost",(dataJson)=>{
        var data=dataJson;
          User.find({email:data.email},(err,resp)=>{
            if(!err && resp.length!=0){
              var temp=resp[0].recpost;
              socket.emit("getreceivedpost_reply", temp);
            }
            else {
              socket.emit('getreceivedpost_reply', "error");
            }
          });
        });


        //Search by Name or reg no. or email
        socket.on("searchuser",(dataJson)=>{
          var data=dataJson;
          var z=1;
          var x=data.parms;
          User.find({name:new RegExp(x)},function(err,resp){
            if(resp.length==0){

              User.find({reg_no:new RegExp(x)},function(err,resp){
                if(resp.length==0){

                  User.find({username:new RegExp(x)},function(err,resp){
                    if(resp.length==0){

                      User.find({email:new RegExp(x)},function(err,resp){
                        if(resp.length==0)
                        {
                          socket.emit('searchuser_reply', "error");

                        }
                        else {
                          var temp=new Array();
                          for(i=0;i<resp.length;i++)
                          {
                            var y={
                              res:resp[i].email,
                              photo_link:resp[i].photo_link,
                            };
                            temp.push(y);

                          }
                          var k={
                            query:x,
                            result:temp
                          };

                          socket.emit('searchuser_reply', k);
                          z=1;
                        }

                      });
                    }

                    else {
                      var temp=new Array();
                      for(i=0;i<resp.length;i++)
                      {
                        var y={
                          res:resp[i].username,
                          photo_link:resp[i].photo_link
                        };
                        temp.push(y);
                      }

                      var k={
                        query:x,
                        result:temp
                      };

                      socket.emit('searchuser_reply',k);
                      z=1;
                    }
                  });

                }

                else {
                  var temp=new Array();
                  for(i=0;i<resp.length;i++)
                  {
                    var y={
                      res:resp[i].reg_no,
                      photo_link:resp[i].photo_link
                    };
                    temp.push(y);
                  }

                  var k={
                    query:x,
                    result:temp
                  };
                  socket.emit('searchuser_reply',k);
                  console.log(temp);

                  z=1;
                }
              });
            }

            else {
              var temp=new Array();
              for(i=0;i<resp.length;i++)
              {
                var y={
                  res:resp[i].name,
                  photo_link:resp[i].photo_link
                };
                temp.push(y);
              }

              var k={
                query:x,
                result:temp
              };
              socket.emit('searchuser_reply',k);
              z=1;
            }
              });
        });





        //Return email
        socket.on("getmail",(dataJson)=>{
          var data=dataJson;
          var x=data.parms;
          User.find({name:x},function(err,resp){
            if(resp.length==0){

              User.find({reg_no:x},function(err,resp){
                if(resp.length==0){

                  User.find({username:x},function(err,resp){
                    if(resp.length==0){

                      User.find({email:x},function(err,resp){
                        if(resp.length==0)
                        {
                          socket.emit('getmail_reply', "error");

                        }
                        else {
                          var z=resp[0].email;
                          socket.emit('getmail_reply' ,z);
                        }

                      });
                    }

                    else {
                      var z=resp[0].email;
                      socket.emit('getmail_reply',z);
            }
                  });

                }

                else {
                  var z=resp[0].email;
                  socket.emit('getmail_reply',z);
        }
              });
            }

            else {
              var z=resp[0].email;
              socket.emit('getmail_reply',z);
    }
              });
        });


        //All feeds function start from here
        socket.on('addfeed',function(dataJson){
          var data=dataJson;

          var feed=new Feed({
            f_id:data.id,
            user_reg:data.reg_no,
            caption:data.caption,
            photo_link:data.photo_link,
            tag:""
          });
          feed.save((err,resp)=>{
            if(err)
            socket.emit('addfeed_reply','error');
            else {
              socket.emit('addfeed_reply','successful');
              array.unshift(feed);
              array.pop();
            }
          });

        });



      socket.on('addcomment',function(dataJson){
        User.update({user_reg:dataJson.reg_no,f_id:dataJson.id},{$push:{
          comments:
          {
          comment:dataJson.comment
          }

      }},function(err){
          if(err)
          {
            socket.emit("addcomment_reply","error");
          }
          else{
            socket.emit("addcomment_reply","successful");
            Feed.find().sort("f_id").limit(200).exec(function(err,resp){
              if(err)
              {
              }
              else {
                array=resp;
              }
            });
          }
      });
      });


      socket.on("getfeeds",function(dataJson){
        Feed.find().sort(f_id).limit(dataJson.noofposts).exec(function(err,resp){
          if(err)
          {
            socket.emit("getfeeds_reply","error");
          }
          else {
            socket.emit("getfeeds_reply",resp);
          }
        });
      });

      socket.on("forgot_password",function(mail){
        User.find({email:mail},function(err,resp){
          if(!err && resp.length!=0)
          {
            console.log(mail);
            require("./Send_Mail")(mail,resp[0].password);
            socket.emit("forgot_password_reply","success");
          }
          else {
            socket.emit("forgot_password_reply","error");
          }

        });

      });

  });




}
