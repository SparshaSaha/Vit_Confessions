const User=require("./Models/Account");
const Message=require("./Models/Message");
var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
const port=process.env.PORT || 8080;


module.exports= function(mongo){
  sequenceNumber=new Map();

  var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));

  }).listen(port, function() {
      console.log('Listening at: http://localhost:'+port);
  });

  socketio.listen(server).on('connection', function (socket) {
      socket.on('message', function (msg) {

          console.log('Message Received: ', msg);
          socket.emit('message', 1123, msg);
      });

      //Send socket function
        socket.on('send',function(dataJson){

          var id=dataJson.id;
          var data=dataJson.data;

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
            throw err;
            socket.emit('send_reply',id, "error");
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
              socket.emit('new_message',data.for_user, data);
              socket.emit('send_reply',data.from_user, "successful");
            }
          });
      });



    //Sign up user
      socket.on('signup',function(dataJson){
        var id=dataJson.id;
        var data=dataJson.data;
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
          if(err)
          socket.emit('signup_reply', id, 'error');
          else
          socket.emit('signup_reply', id, 'successful');
        })

      });

      //Update credits for a user
      socket.on('update_credits',function(dataJson){
        var id=dataJson.id;
        var data=dataJson.id;
            User.update({email:data.email},{$set:{standing_credits:data.credits}},function(err,resp1){
              if(err)
              socket.emit('update_credits_reply', id,'error');
              else {
                socket.emit('update_credits_reply', id, 'successful');
              }
            });
        });


        //Sign in user
        socket.on('signin', function(dataJson){
          var id=dataJson.id;
          var data=dataJson.data;
          User.find({email:data.email,password:data.password},function(err,resp){
            if(resp.length==0){
              socket.emit('signin_reply', id, 'error');
              }
              else {

                var temp={
                  email:resp[0].email,
                  password:resp[0].password,
                  reg_no:resp[0].reg_no,
                  username:resp[0].username,
                  recpost:resp[0].recpost,
                  senpost:resp[0].senpost,
                  name:resp[0].name,
                  standing_credits:resp[0].standing_credits,
                  photo_link:resp[0].photo_link
                };

                socket.emit('signin_reply' ,id, JSON.stringify(temp));
              }
          });
        });





        // Update profile pic link
        socket.on("updateprofilepic",(dataJson)=>{
          var id=dataJson.id;
          var data=dataJson.data;
          User.find({email:data.email},(err,resp)=>{
            if(err)
            socket.emit('updateprofilepic_reply', id, "error");
            else {
              {
                User.update({email:data.email},{$set:{photo_link:data.photo_link}},function(err,resp1){
                  if(err)
                  socket.emit('updateprofilepic_reply', id, "error");
                  else {
                    socket.emit('updateprofilepic_reply', id, "successful");
                  }
                });
              }
            }
          });
        });




      //Get received post for an User
      socket.on("getreceivedpost",(dataJson)=>{
        var id=dataJson.id;
        var data=dataJson.data;
          User.find({email:data.email},(err,resp)=>{
            if(!err){
              var temp=resp[0].recpost;
              socket.emit("getreceivedpost_reply", id, JSON.stringify(temp));
            }
            else {
              socket.emit('getreceivedpost_reply', id, "error");
            }
          });
        });


        //Search by Name or reg no. or email
        socket.on("searchuser",(dataJson)=>{
          var id=dataJson.id;
          var data=dataJson.data;
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
                          socket.emit('searchuser_reply', id, "error");

                        }
                        else {
                          var temp=new Array();
                          for(i=0;i<resp.length;i++)
                          {
                            temp.push(resp[i].email);
                          }
                          socket.emit('searchuser_reply', id, temp);

                          z=1;
                        }

                      });
                    }

                    else {
                      var temp=new Array();
                      for(i=0;i<resp.length;i++)
                      {
                        temp.push(resp[i].username);
                      }
                      socket.emit('searchuser_reply', id, temp);
                      z=1;
                    }
                  });

                }

                else {
                  var temp=new Array();
                  for(i=0;i<resp.length;i++)
                  {
                    temp.push(resp[i].reg_no);
                  }
                  socket.emit('searchuser_reply', id, temp);
                  z=1;
                }
              });
            }

            else {
              var temp=new Array();
              for(i=0;i<resp.length;i++)
              {
                temp.push(resp[i].name);
              }
              socket.emit('searchuser_reply', id, temp);
              z=1;
            }
              });
        });





        //Return email
        socket.on("getmail",(dataJson)=>{
          var id=dataJson.id;
          var data=dataJson.data;
          var x=req.query.parms;
          User.find({name:x},function(err,resp){
            if(resp.length==0){

              User.find({reg_no:x},function(err,resp){
                if(resp.length==0){

                  User.find({username:x},function(err,resp){
                    if(resp.length==0){

                      User.find({email:x},function(err,resp){
                        if(resp.length==0)
                        {
                          socket.emit('getmail_reply', id, "error");

                        }
                        else {
                          var z=resp[0].email;
                          socket.emit('getmail_reply', id ,z);
                        }

                      });
                    }

                    else {
                      var z=resp[0].email;
                      socket.emit('getmail_reply', id ,z);
            }
                  });

                }

                else {
                  var z=resp[0].email;
                  socket.emit('getmail_reply', id ,z);
        }
              });
            }

            else {
              var z=resp[0].email;
              socket.emit('getmail_reply', id ,z);
    }
              });
        });
  });

}
