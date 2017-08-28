const User=require("./Models/Account");
const Message=require("./Models/Message");

module.exports= function(app,mongo){

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

//Sign in user
app.get("/signin",(req,res)=>{
  User.find({email:req.query.email,password:req.query.password},function(err,resp){
    if(resp.length==0){
      res.send('0');
      }
      else {
        res.json(resp[0]);
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
      res.send(resp[0].recpost);
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
                  res.json(resp);
                  z=1;
                }

              });
            }

            else {
              res.json(resp);
              z=1;
            }
          });

        }

        else {
          res.json(resp);
          z=1;
        }
      });
    }

    else {
      res.json(resp);
      z=1;
    }
      });
});

app.get("/dummy",(req,res)=>{
  var Kol={
    username="Sparsha",
    password="cool a.f"
  }

  res.json(Kol);
});





}
