import React,{Component} from 'react';
import {AppRegistry,View,Text,StyleSheet, FlatList, ScrollView,Image, ListView} from 'react-native'
import { List, ListItem, SearchBar } from "react-native-elements"
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import RoundedText from '../components/RoundedText';
import {socket} from '../utils/socket';
import {Images} from '../R'
export default class Chats extends Component{

  constructor(props){
    super(props);
    this.renderChatItem = this._renderChatItem.bind(this);
    this.state ={
      posts : []
    }
  }

  componentDidMount(){
    socket.beginReceivingFor('getreceivedpost_reply',(result)=>{
      console.log(result);
      this.setState({posts:result});
    },()=>{
      socket.send('getreceivedpost',{email:'sridhar.swain@gmail.com'})
    })
  }

  search=(text)=>{
    socket.beginReceivingFor('searchuser_reply',(result)=>{
      console.log(result);
    },()=>{
      if(text!='') socket.send('searchuser',{parms :text});
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };


  _renderChatItem(item){
    return(
      <ListItem
      roundAvatar
      title={item.from_user}
      subtitle={item.message}
      avatar={Images.background}
      containerStyle={{ borderBottomWidth: 0 }}
      hideChevron={true}>
      </ListItem>
    )
  }

  /*
  <ListView
  ref="ListView"
  dataSource = {this.state.dataSource}
  renderRow ={(rowData)=>this.renderChatItem(rowData)}
  renderSeparator={this.renderSeparator}
  />
  */

  render(){
    return(
        <View style={{flex :1, backgroundColor:'white'}}>
        <View style={styles.searchBackground}>
          <RoundedText imgSource ={Images.search}
          placeholder='Search'
          style={styles.inputView}
          inputTextStyle={styles.inputTextStyle}
          onChangeText={(text)=>{this.search(text)}}
          imageStyle = {styles.image} />
        </View>
          <FlatList
          data={this.state.posts}
          renderItem={({item})=>this.renderChatItem(item)}
          keyExtractor={(item, index) =>index}/>
        </View>
    );
    /*<FlatList
    data={this.data}
    keyExtractor={item => item.name}
    renderItem ={({item})=>this.renderChatItem(item)}
    ItemSeparatorComponent ={this.renderSeparator}
    />*/
    /*return (
      <ListView
       ref = "ListView"
       dataSource={this.dataSource}
       renderRow = {(rowData)=>this.renderChatItem(rowData)}
       renderSeparator={this.renderSeparator}
       renderScrollComponent={props => (
         <ParallaxScrollView
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={50}
          renderFixedHeader={() => (
            <RoundedText imgSource ={Images.search}
              placeholder='Search'
              style={styles.inputView}
              inputTextStyle={styles.inputTextStyle}
              onChangeText={(text)=>{this.search(text)}}
              imageStyle = {styles.image} />
            )}
          />
       )}
       />
    );*/
  }
}

const styles = StyleSheet.create({
  inputView:{
    margin :7,
    paddingHorizontal:10,
    marginHorizontal : 10,
    backgroundColor:'white',
  },
  inputTextStyle:{
    fontSize:16,
    color:'black',
    marginTop:6
  },
  image:{
    width : 20,
    height :20,
  },
  searchBackground:{
    backgroundColor:'#E0E0E0',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  }
});

AppRegistry.registerComponent('Chats',()=>Sent);
