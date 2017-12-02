const User=require("./Models/Account");
const Message=require("./Models/Message");

module.exports= function(app,mongo){

// TODO: Chnage sign in sent parameters and configure in android accordingly
//Sign up user
  app.get("/signup",(req,res)=>{
    var user=new User({
      email:req.query.email,
      password:req.query.password,
      reg_no:req.query.reg_no,
      username:req.query.username,
      name:req.query.name,
      standing_credits:0,
      photo_link:req.query.photo_link

    });
    user.save((err,res1)=>{
      if(err)
      res.send("0");
      else
      res.json("1");
    })

  });

//Update credits for a user
app.get("update_credits",(req,res)=>{
      User.update({email:req.query.email},{$set:{standing_credits:req.query.credits}},function(err,resp1){
        if(err)
        res.send("0");
        else {
          res.send("1");
        }
      });
  });



//Sign in user
app.get("/signin",(req,res)=>{
  User.find({email:req.query.email,password:req.query.password},function(err,resp){
    if(resp.length==0){
      res.send('0');
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

        res.send(JSON.stringify(temp));
      }
  });
});



// Update profile pic link
app.get("/updateprofilepic",(req,res)=>{
  User.find({email:req.query.email},(err,resp)=>{
    if(err)
    res.send("0");
    else {
      {
        User.update({email:req.query.email},{$set:{photo_link:req.query.photo_link}},function(err,resp1){
          if(err)
          res.send("0");
          else {
            res.send("1");
          }
        });
      }
    }
  });
});


app.get("/getreceivedpost",(req,res)=>{
  User.find({email:req.query.email},(err,resp)=>{
    if(!err){
      var temp=resp[0].recpost;
      res.send(JSON.stringify(temp));
    }
    else {
      res.send("0");
    }
  });
});



//Send a new post
app.get("/send",(req,res)=>{
  //Update for user for whom the message is meant for
  User.update({email:req.query.tomail},{$push:{
    recpost:
    {
      for_user:req.query.tomail,
      from_user:req.query.frommail,
      message:req.query.message,
      date:req.query.date,
      time:req.query.time
    }
  }},function(err){
    if(err){
    throw err;
    res.send("0");
  }
  });

//Update sentmessagefor the sender
  User.update({email:req.query.frommail},{$push:{
    senpost:
    {
      for_user:req.query.tomail,
      from_user:req.query.frommail,
      message:req.query.message,
      date:req.query.date,
      time:req.query.time
    }
  }
  },function(err){
    if(err)
    throw err;
    else {
      res.send("1");
    }
  });


});

app.get("/seeall",(req,res)=>{
  User.find(function(err,resp){
    res.json(resp);
  });
});

//Search by Name or reg no. or email
app.get("/searchuser",(req,res)=>{
  var z=1;
  var x=req.query.parms;
  User.find({name:new RegExp(x)},function(err,resp){
    if(resp.length==0){

      User.find({reg_no:new RegExp(x)},function(err,resp){
        if(resp.length==0){

          User.find({username:new RegExp(x)},function(err,resp){
            if(resp.length==0){

              User.find({email:new RegExp(x)},function(err,resp){
                if(resp.length==0)
                {
                  res.send("0");

                }
                else {
                  var temp=new Array();
                  for(i=0;i<resp.length;i++)
                  {
                    temp.push(resp[i].email);
                  }
                  res.send(temp);

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
              res.send(temp);
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
          res.send(temp);
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
      res.send(temp);
      z=1;
    }
      });
});






//Return email
app.get("/getmail",(req,res)=>{
  var z=1;
  var x=req.query.parms;
  User.find({name:new RegExp(x)},function(err,resp){
    if(resp.length==0){

      User.find({reg_no:new RegExp(x)},function(err,resp){
        if(resp.length==0){

          User.find({username:new RegExp(x)},function(err,resp){
            if(resp.length==0){

              User.find({email:new RegExp(x)},function(err,resp){
                if(resp.length==0)
                {
                  res.send("0");

                }
                else {
                  res.json(resp[0].email+"");
                }

              });
            }

            else {
              res.json(resp[0].email+"");
            }
          });

        }

        else {
          res.json(resp[0].email+"");
        }
      });
    }

    else {
      res.json(resp[0].email+"");
    }
      });
});


}
