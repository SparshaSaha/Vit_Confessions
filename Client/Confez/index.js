import { AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation'
import SocketIOClient from 'socket.io-client';
import App from './App';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

global.socket = null;
global.channels = {};

AppRegistry.registerComponent('Confez', () =>StackNavigator({
  Home : {screen : Home},
  Splash : {screen : SplashScreen},
  Login : {screen : Login},
  Signup : {screen : Signup},
},{
  navigationOptions:{
    headerMode : 'screen'
  }
}));
