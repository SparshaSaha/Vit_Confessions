import React,{Component} from 'react';
import {AppRegistry,View,Text,StyleSheet, FlatList, ScrollView,Image, ListView,TouchableOpacity,ActivityIndicator} from 'react-native'
import { List, ListItem, SearchBar } from "react-native-elements"
import RoundedText from '../components/RoundedText';
import Socket from '../utils/socket';
import {Images,Colors} from '../R';

export default class Chats extends Component{

  constructor(props){
    super(props);
    this.renderChatItem = this._renderChatItem.bind(this);
    this.renderQueriedUsers=this._renderQueriedUsers.bind(this);
    this.state ={
      posts : [],
      originalPosts : [],
      foundUsers :[],
      searchQuery:"",
      isQueryError :false,
      isSearching : false
    }

    Socket.addChannel('getreceivedpost_reply',(response)=>{
      console.log(response);
      this.setState({posts:response,originalPosts:response});
    });

    Socket.addChannel('searchuser_reply',(response)=>{
      console.log(response);
      this.setState({isSearching:false});
      if(response=='error'){
        this.setState({isQueryError:true,foundUsers:[]});
        return;
      }
      if(this.state.searchQuery.length>0) this.setState({isQueryError:false,foundUsers:response});
    });
    console.log(global.channels);
  }

  componentDidMount(){
    Socket.send('getreceivedpost',{email:'sridhar.swain@gmail.com'})
  }

  search=(text)=>{
    if(text!=''){
      filteredPost = this.state.originalPosts.filter((post)=>{
        return (post.message.toLowerCase().indexOf(text.toLowerCase())!==-1)
      });
      Socket.send('searchuser',{parms :text});
      this.setState({posts:filteredPost,isSearching:true});
    }
    else{
      this.setState({posts:this.state.originalPosts,isQueryError:false,foundUsers:[]});
    }
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

  _renderQueriedUsers(item){
    return(
      <ListItem
        roundAvatar
        title={item}
        subtitle='Hello'
        avatar={Images.background}
        containerStyle={{ borderBottomWidth: 0 }}
        hideChevron={true}>
      </ListItem>
    );
  }

  resetQuery(){
    this.refs.query.clearText();
    this.setState({posts:this.state.originalPosts,searchQuery:'',foundUsers:[],isQueryError:false})
  }


  render(){
    return(
        <View style={{flex :1, backgroundColor:'white'}}>
        <View style={styles.searchBackground}>
          <RoundedText imgSource ={Images.search}
          placeholder='Search'
          ref='query'
          style={styles.inputView}
          inputTextStyle={styles.inputTextStyle}
          onChangeText={(text)=>{this.setState({searchQuery:text}),this.search(text);}}
          imageStyle = {styles.image}
          renderRight={(this.state.searchQuery.length>0)?(
            <TouchableOpacity onPress={()=>{this.resetQuery()}}>
              <Image source={Images.cancel}  style={{marginRight:5,width:20,height:20}}/>
            </TouchableOpacity>
          ):null} />

        </View>
        {(this.state.posts.length>0)?(
          <FlatList
          data={this.state.posts}
          style={{flex:1}}
          renderItem={({item})=>this.renderChatItem(item)}
          keyExtractor={(item, index) =>index}/>
        ):null}

          <View style={[styles.searchResultView,{borderWidth:((this.state.searchQuery.length>0)?1:0)}]} >
            {(this.state.searchQuery.length>0)?(
              (this.state.isSearching)?(
                <View style={[{flexDirection:'row'},styles.resultStatus]}>
                  <ActivityIndicator size='small' color={Colors.primary} style={{paddingHorizontal:7}} animating={this.state.isSearching}></ActivityIndicator>
                  <Text>Searching For Users...</Text>
                </View>
              ):(
                <Text style={styles.resultStatus}>People you may know...</Text>
              )
            ):null}
            {(this.state.isQueryError==true)?(<Text style={styles.resultStatus}>No Search Results</Text>):null}

            {(this.state.foundUsers.length>0)?(
              <View style={{flex:1}}>
                <FlatList
                  data={this.state.foundUsers}
                  renderItem={({item})=>this.renderQueriedUsers(item)}
                  keyExtractor={(item, index) =>index}/>
              </View>
              ):null}
          </View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
  inputView:{
    margin :7,
    paddingHorizontal:10,
    marginHorizontal : 10,
    paddingVertical : 4,
    backgroundColor:'white',
  },
  inputTextStyle:{
    fontSize:16,
    color:'black',
  },
  image:{
    width : 20,
    height :20,
  },
  searchBackground:{
    backgroundColor:'#E0E0E0',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    flex:0
  },
  searchResultView:{
    flex:2,
    borderStyle:'solid',
    borderTopColor:'#D0D0D0',
    borderBottomColor:'transparent',
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
  },
  resultStatus:{
    marginHorizontal:4,
    marginVertical:10
  }
});

AppRegistry.registerComponent('Chats',()=>Sent);
