import SocketIOClient from 'socket.io-client';
import {Strings} from '../R';


function initiate(){
  global.socket = SocketIOClient(Strings.wsLink);
  console.log("Connecting to Server");
  global.socket.on('connect',(socket)=>{
    console.log("Connected");
  });
}

function isConnected(){
  return global.socket.connected;
}

function addChannel(channel,callback){
  if(!global.channels[channel]){
    global.socket.on(channel,(result)=>{
      callback(result);
    });
    global.channels[channel]=true;
  }
}

function send(channel,message){
    global.socket.emit(channel,message);
}

const Socket={
  send :  (channel,message)=>send(channel,message),
  addChannel : (channel,callback)=>addChannel(channel,callback),
  isConnected :()=>isConnected(),
  initiate : ()=>initiate(),
}

export default Socket;
