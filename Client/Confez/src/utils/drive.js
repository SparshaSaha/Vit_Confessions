import {NativeModules,AsyncStorage} from 'react-native';
const client_secret = require('./client_secret.json');
import GoogleSignIn from 'react-native-google-sign-in';
const boundary = '--confez-vit--';
const delimiter = "\r\n--" + boundary + "\r\n";
const close_delim = "\r\n--" + boundary + "--";

function Token(callback){
  AsyncStorage.getItem('user')
  .then((user)=>{
    if(user!=null) callback(JSON.parse(user));
    else callback(null);
  })
}

async function getNewToken(callback){

  GoogleSignIn.configure({
        scopes: ['https://www.googleapis.com/auth/drive.appdata'],
        clientID: client_secret.installed.client_id,
    }).then(() => {
        GoogleSignIn.signInPromise().then((user) => {
          try{
            AsyncStorage.setItem('user', JSON.stringify(user))
            .then((user)=>{
              callback(user);
            });
          }
          catch(err){console.log(err);}
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}

function getFileMetadata(id,callback){

}

function getFileLink(id){
  return 'https://drive.google.com/uc?id='+id+'&export=download';
}

function upload(image,callback,token){
  var contentType =  image.mime || 'application/octet-stream';
  var metadata = {
    'title': image.path,
    'name' :image.path,
    'mimeType': contentType,
    "parents":["1SUJTUjp1ho7neYvPGD41X-On8NDcrP7v"]
  };

  NativeModules.RNImageToBase64.getBase64String(image.path, (err, base64) => {
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64 +
        close_delim;

        fetch('https://www.googleapis.com/upload/drive/v3/files?fields=id%2Cname%2CwebContentLink&uploadType=multipart',{
          method: 'POST',
          headers : {
            "content-type": "multipart/related; boundary="+boundary,
            "transfer-encoding": "chunked",
            "user-agent": "google-api-nodejs-client/0.12.0",
            "host": "www.googleapis.com",
            "authorization": "Bearer "+token,
          },
          body: multipartRequestBody
        })
        .then((response)=>response.json())
        .then((response)=>{
          callback(response);
        });
  });
}

function uploadFile(image,callback){
  Token((user)=>{
    console.log(user);
    if(user!=null) upload(image,callback,user.accessToken);
    else{
      getNewToken((user)=>{
        console.log('GOt',user.accessToken);
        if(user!=null) upload(image,callback,user.accessToken);
      });
    }
  });

}

const Drive ={
  getFileMetadata : (id,callback)=>getFileMetadata(id,callback),
  uploadFile : (image,callback)=>uploadFile(image,callback),
  getFileLink : (id)=>getFileLink(id),
  isTokenValid : ()=>Token(),
  getNewToken : ()=>getNewToken()
}

export {Drive};
