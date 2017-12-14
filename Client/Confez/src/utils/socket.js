import SocketIOClient from 'socket.io-client';
import {Strings} from '../R';

class socket {

  static connectToServer(callback){
    global.socket = SocketIOClient(Strings.wsLink);
    console.log("Connecting to Server");
    global.socket.on('connect',(socket)=>{
      console.log("Connected");
      callback();
    });
  }

  static beginReceivingFor(channel,callback,onComplete){
    console.log("Begining Receive For "+channel);
    if(!global.socket){
      this.connectToServer(()=>{
        global.socket.on(channel,(result)=>{
          callback(result);
        });
        global.channels[channel] = true;
        console.log(global.channels);
        onComplete();
      });
    }
    else if(global.socket.connected){
      if(!global.channels[channel]){
        global.socket.on(channel,(result)=>{
          callback(result);
        });
        global.channels[channel]=true;
      }
      console.log(global.channels);
      onComplete();
    }
  }

  static send(channel,message){
    if(!global.socket){
        this.connectToServer(()=>{
          global.socket.emit(channel,message);
        });
    }
    else if(global.socket.connected){
      console.log("Sending For "+channel);
        global.socket.emit(channel,message);
    }
  }
}

export {socket};
