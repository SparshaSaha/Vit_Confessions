import React,{Component} from 'react';
import {AppRegistry,StyleSheet,View,Dimensions,Text,Image} from 'react-native';
import {Bar} from 'react-native-progress';
import {Colors,Images} from '../R';

export default class StepIndicator extends Component{
  constructor(props){
    super(props);
    this.state = {
      width : null
    }
  }
  componentWillMount(){
    var window= Dimensions.get('window');
    this.setState({width:window.width*0.85});
  }
  render(){
    return(
      <View style={[this.props.style,{alignItems:'center',justifyContent :'center'}]}>
        <Bar borderWidth={2} progress={(this.props.current-1)*0.33} width={this.state.width} borderColor={Colors.primary} color={Colors.primary}/>
        <View style={[styles.stepStyle,{left :0,backgroundColor : (this.props.current>=1?Colors.primary:'white')}]}>
          <Image style={[styles.innerStyle,{tintColor :(this.props.current>=1?'white':'#878787') }]} source={Images.personal}/>
        </View>

        <View style={[styles.stepStyle,{left :((this.state.width)/3.33),backgroundColor : (this.props.current>=2?Colors.primary:'white')}]}>
            <Image style={[styles.innerStyle,{tintColor :(this.props.current>=2?'white':'#878787') }]} source={Images.finger}/>
        </View>

        <View style={[styles.stepStyle,{right :((this.state.width)/3.33),backgroundColor : (this.props.current>=3?Colors.primary:'white')}]}>
            <Image style={[styles.innerStyle,{tintColor :(this.props.current>=3?'white':'#878787') }]} source={Images.pass}/>
        </View>

        <View style={[styles.stepStyle,{right :0,backgroundColor : (this.props.current>=4?Colors.primary:'white')}]}>
            <Image style={[styles.innerStyle,{tintColor :(this.props.current>=4?'white':'#878787') }]} source={Images.camera}/>
        </View>
      </View>

    );
  }
}

const styles =  StyleSheet.create({
  stepStyle : {
    width :35,
    height : 35,
    borderWidth:2,
    borderStyle:'solid',
    borderRadius:100,
    borderColor:Colors.primary,
    position: 'absolute',
    justifyContent :'center',
    alignItems:'center'
  },
  innerStyle :{
    width : '60%',
    height : '60%',
  }
});

AppRegistry.registerComponent('StepIndicator',()=>StepIndicator);
