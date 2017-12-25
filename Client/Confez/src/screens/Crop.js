import React,{Component} from 'react';
import {AppRegistry,View,TouchableOpacity,Text,Dimensions,Image} from 'react-native';
//import ImageCrop from 'react-native-image-cropper';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class Crop extends Component{

  constructor(props){
    super(props);
    this.state={
      uri:this.props.navigation.state.params.imageURI,
    }
  }

  onButtonPress() {
    /*this.refs.cropper.crop()
    .then(res =>{
      console.log(res);
      /*this.setState({
        showNew: true,
        newImage: res,
      });
    })*/
	}

  render(){
    return(
      <View style={{flex:1,backgroundColor: '#000'}}>

        <TouchableOpacity onPress={() => this.onButtonPress()}>
  					<Text>Crop</Text>
  			</TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('Crop',()=>Crop);
