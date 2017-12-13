import { AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation'
import App from './App';
import SplashScreen from './src/screens/SplashScreen'
import Login from './src/screens/Login'

AppRegistry.registerComponent('Confez', () =>StackNavigator({
  Splash : {screen : SplashScreen},
  Login : {screen : Login}
}));
