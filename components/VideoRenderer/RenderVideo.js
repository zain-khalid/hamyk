
'use strict';

import React,{useState,useReducer,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import styles from './Styles';

import Video from 'react-native-video';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import recordBtn from'../../assets/images/record.png'
import colors from '../Global/colors';
import Comment from '../Comment/Comment';
import onShare from '../SHareVideo/share';
import { useNavigation } from '@react-navigation/native';
import Search from '../SearchScreen/Search';
import { reducer,initialState } from '../Hooks/UpdqateGlobal';
import getAsync from '../AsynDataFolder/getAsync';
import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import {getDistance, getPreciseDistance} from 'geolib';
import profile from '../../assets/images/Profile.png'
import OtherUser from '../Profiles/OtherUser';
import ReportVideo from '../Profiles/Menu/ReportVideo';
import useLocation from '../Hooks/getLocation';
import Filters from '../Filters/Filters';
import VideoPlayer from 'react-native-video-player';
import GenerateLikeNotification from '../functions/GenerateLike';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const Icon_Size = 35

  const RenderVideo=({item,index,indexx})=>{
    // console.log(getLocation.currentLatitude)
    const navigation = useNavigation()
    const AsynData=getAsync()
    const [showModal,setShowModal]=useState(false)
    const [showReport,setShouldShowReport]=useState(false)
    const [videoId,setvideoId]=useState("")
    const [state, dispatch] = useReducer(reducer, initialState)
    const [showSearchModal,setSearchModal]=useState(false)
    const [paused, setPaused] = useState(false);
    const [isLiked ,setIsliked]=useState(item.liked ===null?false:true)
    const [vidId ,setVidId]=useState("")
    const [likeCount,setLikeCount] =useState(Number(item.likes))
    const [comments,setComments]=useState(Number(item.comments))
    const [commentList,setCommentList]=useState([])
    const [showOtherUser,setOtherUser]=useState(false)
    const [filter,setFilter]=useState(Number(item.filter_type))


///////////FETCHING COMMENT LIST//////////////////

async function fetchComments(id){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${AsynData.token}`);

  var formdata = new FormData();
  formdata.append("video_id", id);

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

  })
    .catch(error => console.log('error', error));
}



//////////////////     MODALS    //////////////////////////


    const onchangeState=()=>{
        setShowModal(false)
        setPaused(!paused)

      }

      function HideOtherUser (){
        setOtherUser((prev)=>!prev)
        setPaused(!paused)

      }


      function onSetReport(){
        setShouldShowReport(!showReport)
        setPaused(!paused)
      }






      const Buffer = require("buffer").Buffer;
const images= Buffer.from((item.thumbnail), 'base64').toString('ascii')




///////FEATURES  ////////////////////

    const onPlayPausePress = () => {
      setPaused(!paused);
    };

    const onLikedPress=()=>{
    setIsliked((prev)=>!prev)
    }


    const onComment =()=>{
      setComments(comments+1)
      // fetchComments()

  }



  const onLike =()=>{
    GenerateLikeNotification(item.user_id)
    setLikeCount(likeCount+1)
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
formdata.append("video_id", item.id);
formdata.append("vuser_id", item.user_id);


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

  //////////////////////////////////




function VideoOptionsAll(){
  return(
    <>
      <View
      style={[styles.optionsVideo,{top:5, alignItems: 'center'}]}
      >
      <View style={styles.OptionsVideoInnerWrapperI}>
  {

    item.image ==="default"?
    <Image source={profile}

    style={{width:30,height:30,marginLeft:10}}
    />
  :

  <Image source={{uri:`${EndPoints.ProfileUrl}${item.image}`}}

  style={{width:30,height:30,marginLeft:10,borderRadius:1000}}
  />

  }
    <Text
    onPress={()=>HideOtherUser()}

    style={{color:"white",fontSize:18,marginLeft:10}}>{item.username}</Text>
  </View>



      <View style={[styles.IconWrapper,{marginRight:10,}]}>
  <Pressable
  onPress={() => {
    setShouldShowReport(true)
    setPaused(true)

    }}
  >
  <MaterialIcons

  name="more-vert" color="white" size={30} />
  </Pressable>

      </View>

      </View>
      {/* <Text
      style={{marginBottom:20,color:"white",marginLeft:10,textAlign:"left",width:"50%",position:"absolute",bottom:0}}
      >{item.description}</Text> */}
      <View
        style={[styles.optionsVideo, {bottom:50,}]}
      >
        <View style={styles.OptionsVideoInnerWrapper}>
          <View
            style={[styles.IconWrapper,{marginLeft:10}]}
          >
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
              // fetchComments(item.id)
                setVidId(item.id)
                setPaused(true)
                setShowModal(true)
              }}
              name='comment-text'
              size={Icon_Size}
              color="white"
            />
            <Text style={styles.fontStyling}>{comments}</Text>
          </View>
        </View>
        <View style={[styles.IconWrapper,{marginRight:10}]}>
          <IonIcon
            onPress={()=> onShare(item.video,item.id)}
            name='send-sharp'
            size={Icon_Size}
            color="white"
          />
          <Text style={styles.fontStyling}>{state.Global_Paused === true ?1:0}</Text>
        </View>
      </View>
    </>
  )
}







  return(

    <Pressable
      onPress={()=>{
        onPlayPausePress()
      }}
    >

  <ImageBackground
  source={{uri:`${EndPoints.VideoBaseUrl}${item.thumbnail}`}}
  resizeMode="stretch"

  >

   <Video
    source={{uri:`${EndPoints.VideoBaseUrl}${item.video}`}}
    paused={paused===true?paused:indexx===index?false:true}
    playInBackground={false}
    resizeMode="stretch"
    style={styles.backgroundVideo}
    repeat={true}
    />


{/* <VideoPlayer
  repeat={true}
  muted={false}
  autoplay={true}
  resizeMode="stretch"
  hideControlsOnStart={true}
  style={styles.backgroundVideo}
  video={{uri:`${EndPoints.VideoBaseUrl}${item.video}`}}
  paused={paused===true?paused:indexx===index?false:true}
  thumbnail={{uri:`${EndPoints.VideoBaseUrl}${item.thumbnail}`}}
/> */}



<Filters filterType={filter}/>


  <VideoOptionsAll/>
 {showModal === true ?

 <Comment
 state={showModal}
 changeState={()=>onchangeState()}
  commentList={commentList}
   vidId={vidId}

   onCommentSent={onComment}
   otheruserID={item.user_id}
   />
:null
}

{showOtherUser === true ?

        <OtherUser showOtherUser={showOtherUser} HideOtherUser={HideOtherUser} Other_id={item.user_id}/>
     :
     null }


<ReportVideo

showModal={showReport}

OnSetModal={onSetReport}

videoId={item.id}


/>

  </ImageBackground>

  </Pressable>



    )
                    }
  export default RenderVideo