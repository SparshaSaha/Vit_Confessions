import React,{Component} from 'react';
import {AppRegistry,Image,Icon,StyleSheet} from 'react-native'
import {TabNavigator} from 'react-navigation';
import Chats from './Chats';
import Feeds from './Feeds';
import Settings from './Settings';
import {Images, Colors} from '../R';

const styles = StyleSheet.create({
  tabIcon : {
    width :22,
    height : 22
  }
})

export default Home = TabNavigator({
  feeds : {
    screen : Feeds,
    navigationOptions:{
      title : "Feeds",
      tabBarLabel : "Feeds",
      tabBarIcon: ({ tintColor }) => (<Image source={Images.home} style={[styles.tabIcon,{tintColor: tintColor}]}/>),
    }
  },
  chats : {
    screen : Chats,
    navigationOptions :{
          title: 'Chats',
          tabBarLabel:'Chats',
          tabBarIcon: ({ tintColor }) => (<Image source={Images.chats} style={[styles.tabIcon,{tintColor: tintColor}]}/>),
      }
    },
    settings : {
      screen : Settings,
      navigationOptions :{
            title: 'Settings',
            tabBarLabel:'Settings',
            tabBarIcon: ({ tintColor }) => (<Image source={Images.settings} style={[styles.tabIcon,{tintColor: tintColor}]}/>),
        }
      },
},{
  tabBarPosition : 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor : 'grey',
    showIcon:true,
    showLabel:false,
    style:{
      backgroundColor : 'white'
    },
    indicatorStyle: {
      backgroundColor: Colors.primary,
    },
  },
});

AppRegistry.registerComponent('Home',()=>page);
