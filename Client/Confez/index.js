import { AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation'
import SocketIOClient from 'socket.io-client';
import App from './App';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import SelectImage from './src/screens/SelectImage';
import Crop from './src/screens/Crop';

global.socket = null;
global.channels = {};

AppRegistry.registerComponent('Confez', () =>StackNavigator({
  Splash : {screen : SplashScreen},
  Login : {screen : Login},
  Signup : {screen : Signup},
  Home : {screen : Home},
  SelectImage : {screen : SelectImage},
  Crop : {screen : Crop},
},{
  navigationOptions:{
    headerMode : 'screen'
  }
}));
