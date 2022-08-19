import React,{useState,useEffect,useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  Modal,
  ImageBackground
} from 'react-native';
import styles from './Styles';

import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import recordBtn from'../../assets/images/record.png'
import colors from '../Global/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EndPoints from '../../configuration/EndPoints';
import BaseUrl from '../../configuration/url';
import getAsync from '../AsynDataFolder/getAsync';
import Comment from '../Comment/Comment';
import onShare from '../SHareVideo/share';
import GenerateLikeNotification from '../functions/GenerateLike';
import Filters from '../Filters/Filters';

import VideoPlayer from 'react-native-video-player';
const itemHeight = Dimensions.get('window').height/1.5
const Icon_Size = 35


const SinglePost =({

  Single_Post,
  OnsetSingleVideo,
  items

})=>{
const  AsynData = getAsync()
const navigation = useNavigation()
const cellRefs = useRef()
////////////VIDEO CONTROL FUNCTIONS ///////////////////
const [paused, setPaused] = useState(false);
const [showModal,setShowModal]=useState(false)

const [isLiked ,setIsliked]=useState(items.liked ===null?false:true)
const [comment ,setComment]=useState(Number(items.comments))

const [filter,setFilter]=useState(Number(items.filter_type))

const [likeCount,setLikeCount]=useState(Number(items.likes))

const [Loading,setLoading]= useState(false)



////////MODAL///////////



const onchangeState=()=>{
  setShowModal(false)
  setPaused(!paused)

}

const [commentList,setCommentList]=useState([])




///////////FETCHING COMMENT LIST//////////////////


async function fetchComments(){


  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${AsynData.token}`);
  
  var formdata = new FormData();
  formdata.append("video_id", items.id);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${EndPoints.commentlist}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      setCommentList(result.comments)
      console.log(result.comments)
  
  })
    .catch(error => console.log('error', error));
}

const onComment =()=>{
  setComment(comment+1)
  // fetchComments()
}
/////////////FEATURSSS//////////
const onPlayPausePress = () => {
  setPaused(!paused);
};

const onLikedPress=()=>{
setIsliked((prev)=>!prev)
}

/////////////likes////////////

const onLike =()=>{
setLikeCount(likeCount+1)
GenerateLikeNotification(items.user_id)
LikeVide()
}

const onDislike =()=>{
if(likeCount>0){
  LikeVide()
  setLikeCount(likeCount-1)
}

}
function LikeVide(){
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${AsynData.token}`);

var formdata = new FormData();
formdata.append("user_id", AsynData.myId);
formdata.append("video_id", items.id);

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: formdata,
redirect: 'follow'
};

fetch(`${BaseUrl}like`, requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
}


 
const Buffer = require("buffer").Buffer;


return(
  <Modal visible={Single_Post} 
  
  animationType={"slide"}
  >

<ImageBackground 
  source={{uri:`${EndPoints.VideoBaseUrl}${items.thumbnail}`}}
  resizeMode="stretch"
  
style={styles.ListWrapper}>



{/* <View style={styles.ListWrapper}> */}

<Pressable 

onPress={()=>{
  onPlayPausePress()
}}

style={styles.VideoContainerWrap}>
 {/* <Video  
  source={{uri:`${EndPoints.VideoBaseUrl}${items.video}`}}        
  paused={paused}   
  posterResizeMode="stretch"
  resizeMode="stretch"            
  style={styles.backgroundVideo}  
  repeat={true}      
  // onLoad={()=> setLoading(true)}
  // onEnd={() => setLoading(false)}
  

  />  */}


<VideoPlayer
  video={{uri:`${EndPoints.VideoBaseUrl}${items.video}`}}        
  paused={paused}
  thumbnail={{uri:`${EndPoints.VideoBaseUrl}${items.thumbnail}`}}
  resizeMode="stretch"            
  style={styles.backgroundVideo} 
autoplay={true}
renderToHardwareTextureAndroid={true}
muted={false}
repeat={true}
hideControlsOnStart={true}

/>
<Filters filterType={filter}/>



<View style={styles.VideoOptionsContainer}>

<View>
  
<Text
     
     style={{marginBottom:20,color:"white",marginLeft:10,textAlign:"left",width:"50%"}}

     >{items.description}</Text>
     <View
     style={styles.optionsVideo}
     >
      <View style={styles.IconWrapper}>

      <Icon 
onPress={()=>{
  
  onLikedPress()
  isLiked===false?onLike():onDislike()

}}
name='heart'
size={Icon_Size}
color= {isLiked ===true? colors[0].primaryColor : "white"}

/>
<Text style={styles.fontStyling}>{likeCount}</Text>
      </View>
      
      <View style={styles.IconWrapper}>

<MaterialIcon 
onPress={async()=>{
  // fetchComments()
  setPaused(true)
  setShowModal(true)
  }
  
  }
name='comment-text'
size={Icon_Size}
color="white"

/>
<Text style={styles.fontStyling}>{comment}</Text>
      </View>
      






      <View style={styles.IconWrapper}>

<IonIcon 
onPress={()=>onShare(items.video)}
name='send-sharp'
size={Icon_Size}
color="white"

/>
<Text style={styles.fontStyling}>0</Text>
      </View>
      
      </View>               
      </View>



</View>
{
  Loading != false ?
<Text style={styles.LoaderView}>Loading..........</Text>:
null
}

</Pressable>

{/* </View> */}



</ImageBackground>
<MaterialIcons  
style={{margin:10,position:"absolute"}}
onPress={()=>OnsetSingleVideo()}
name='arrow-back' size={25} color="white"/>





{showModal === true ? 

<Comment 
state={showModal} 
changeState={()=>onchangeState()}   
 commentList={commentList}
  vidId={items.id}
  
  onCommentSent={onComment}
  otheruserID={items.user_id}
  />
:null
}



</Modal>

)

}
export default SinglePost