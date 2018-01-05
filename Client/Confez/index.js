import { AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation'
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import SelectImage from './src/screens/SelectImage';
import Crop from './src/screens/Crop';
import Socket from './src/utils/socket';

global.socket = null;
global.channels = {};
Socket.initiate();


AppRegistry.registerComponent('Confez', () =>StackNavigator({
  Home : {screen : Home},
  Splash : {screen : SplashScreen},
  Login : {screen : Login},
  Signup : {screen : Signup},
  SelectImage : {screen : SelectImage},
  Crop : {screen : Crop},
},{
  navigationOptions:{
    headerMode : 'screen'
  }
}));
