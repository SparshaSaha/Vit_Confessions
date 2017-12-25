import React,{Component} from 'react';
import {AppRegistry, View, Text, StyleSheet,Dimensions,
  Image,ListView,PixelRatio, TouchableOpacity} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import RoundedText from '../components/RoundedText'
import {Images,Colors} from '../R';

const isBlank=(str)=> {
  return (!str || /^\s*$/.test(str));
}
export default class Feeds extends Component{

  constructor(props) {
    super(props);
    this.state =  {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([
        'Simplicity Matters',
        'Hammock Driven Development',
        'Value of Values',
        'Are We There Yet?',
        'The Language of the System',
        'Design, Composition, and Performance',
        'Clojure core.async',
        'The Functional Database',
        'Deconstructing the Database',
        'Hammock Driven Development',
        'Value of Values'
      ]),
      post:'',
      isPostButtonShown:false,
    };
  }

  shouldShowPost(post){
    this.setState({post});
    this.setState({isPostButtonShown:!isBlank(post)});
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <ListView
        ref="ListView"
        style={styles.container}
        dataSource={ this.state.dataSource }
        renderRow={(rowData) => (
          <View key={rowData} style={ styles.row }>
            <Text style={ styles.rowText }>
              { rowData }
            </Text>
          </View>
         )}
        renderScrollComponent={props => (
          <ParallaxScrollView
            backgroundColor={Colors.backgroundGrey}
            onScroll={onScroll}

            headerBackgroundColor="#333"
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}

            renderBackground={() => (
              <View key="background">
                <Image source={Images.background} style={{width: window.width,height: PARALLAX_HEADER_HEIGHT}}/>

              </View>
            )}

            renderForeground={() => (
              <View style={styles.paraHeader}>
                <RoundedText imgSource ={Images.write}
                placeholder="Write something..."
                multiline={true}
                style={[styles.inputView,{alignItems:'flex-start',paddingVertical:10}]}
                inputTextStyle={styles.inputTextStyle}
                imageStyle = {[styles.image,{marginTop:6}]}
                onChangeText={(post)=>{this.shouldShowPost(post)}}
                value={this.state.post}
                renderRight={(this.state.isPostButtonShown)?(
                  <View style={{alignSelf:'center'}}>
                    <TouchableOpacity>
                      <Text style={{fontSize:17,color:Colors.primary,}}>Post</Text>
                    </TouchableOpacity>
                  </View>
                ):null} />

                <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center'}}>

                  <Text style={{fontSize:18}}>Add to your Post</Text>
                  <TouchableOpacity>
                   <Image source={Images.photo} style={styles.stickyOptions}/>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={Images.location} style={styles.stickyOptions}/>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={Images.mask} style={[styles.stickyOptions,{tintColor:Colors.primary}]}/>
                  </TouchableOpacity>
                </View>

              </View>
            )}

            renderStickyHeader={() => (
              <View style={styles.searchBackground}>
                <RoundedText imgSource ={Images.write}
                placeholder="Write something..."
                style={styles.inputView}
                inputTextStyle={styles.inputTextStyle}
                imageStyle = {styles.image}
                onChangeText={(post)=>this.setState({post})}
                value={this.state.post}
                renderRight={
                  (this.state.isPostButtonShown)?(
                    <View style={{alignSelf:'center'}}>
                      <TouchableOpacity>
                        <Text style={{fontSize:17,color:Colors.primary,}}>Post</Text>
                      </TouchableOpacity>
                    </View>
                  ):null
                } />


                <TouchableOpacity>
                 <Image source={Images.photo} style={styles.stickyOptions}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={Images.mask} style={[styles.stickyOptions,{tintColor:Colors.primary}]}/>
                </TouchableOpacity>
              </View>
            )}

            />
        )}
      />
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const STICKY_HEADER_HEIGHT = 53;
const PARALLAX_HEADER_HEIGHT = STICKY_HEADER_HEIGHT+150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  },
  inputView:{
    margin : 5,
    paddingHorizontal:10,
    paddingVertical : 4,
    backgroundColor:'white',
    flex:1,
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
    backgroundColor:'#E7E7E7',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  paraHeader:{
    flex: 1,

    justifyContent:'center',
    alignItems :'center',
    padding:2,
    marginTop:STICKY_HEADER_HEIGHT
  },
  stickyOptions:{
    height:30,
    width:30,
    margin :5
  }
});

AppRegistry.registerComponent('Feeds',()=>Feed);
