import React,{Component} from 'react';
import {AppRegistry,View,CameraRoll,StyleSheet,Image,Dimensions,TouchableOpacity,FlatList} from 'react-native';
import GridView from 'react-native-super-grid';

export default class SelectImage extends Component{
  static navigationOptions={
    title:'Select Image',
  }

  constructor(props){
    super(props);
    this.state = {
      photos:[],
      width:null
    }
    this.navigator = this.props.navigation;
  }

  openPicker(){
    CameraRoll.getPhotos({
      first: 1000000000,
      assetType: 'Photos',

    }).then((r)=>{this.setState({photos:r.edges})});
  }

  componentWillMount(){
    this.setState({width:Dimensions.get('window').width});
  }

  componentDidMount(){
    this.openPicker();
  }

  toCrop(uri){
    this.navigator.navigate('Crop',{imageURI:uri});
  }

  renderImage(item){
    return (
      <View style={styles.itemContainer} >
      <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>this.toCrop(item.node.image.uri)}>
        <Image source={{uri: item.node.image.uri}} style={{width:'100%',height:'100%'}} />
      </TouchableOpacity>
      </View>
    )
  }

  render(){
    return(
      <GridView
      itemDimension={this.state.width/2.3}
      items={this.state.photos}
      style={styles.gridView}
      renderItem={item => this.renderImage(item)}
    />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {

    flex: 1,
  },
  itemContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
    padding: 1,
    height: 150,
  },
});

AppRegistry.registerComponent('SelectImage',()=>SelectImage);
