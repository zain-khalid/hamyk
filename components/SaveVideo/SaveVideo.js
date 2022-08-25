'use strict';


import React,{useState,useEffect,useRef, useCallback,useContext,createContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  Platform,
  Alert,
  PanResponder,
  Animated

} from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Video, {FilterType} from 'react-native-video';
import { Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { ProcessingManager } from 'react-native-video-processing';
import { captureScreen } from "react-native-view-shot";
import useLocation from '../Hooks/getLocation';
import getAsync from '../AsynDataFolder/getAsync';
import SpinnerButton from 'react-native-spinner-button';
import Download from '../SHareVideo/Download';
import EndPoints from '../../configuration/EndPoints';
import Filters from '../Filters/Filters';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Video as VideoCompress } from 'react-native-compressor';
const itemHeight = Dimensions.get('window').height
const Icon_Size = 35

const SaveVideo =({shouldShow,uri,HideModal,route})=>{
  const getLoc = useLocation()
  const useAsync=getAsync()
  const navigation = useNavigation()
  const VideRef = useRef()
const vid = useRef()
////////////VIDEO CONTROL FUNCTIONS ///////////////////
const [paused, setPaused] = useState(false);
const [loading, setLoading] = useState(false);

const [token, setToken] = useState("");
const [user_id,setUserId]=useState()
const [location,setLocation]=useState("")
const [latitude,setLatitude] = useState("")
const [filter,setFilter]=useState(1)
const [date,setDate]=useState()
const [tme,setTime]=useState()
const [keyBoardOpen,setKeyBoardOpen]=useState(false)
const [description,setDescription]=useState("")
const [isActive,setIsActive]=useState(false)




const onPlayPausePress = () => {
  setPaused(!paused);
};


///////anomated caption////////////////
// let pan = new Animated.ValueXY();
// const  panResponder = PanResponder.create({
//    onMoveShouldSetPanResponder: () => true,
//    onPanResponderGrant: () => {
//      pan.setOffset({
//        x: pan.x._value,
//        y: pan.y._value
//      });
//    },
//    onPanResponderMove: Animated.event([
//      null,
//      { dx: pan.x, dy:pan.y }
//    ]),
//    onPanResponderRelease: () => {
//      pan.flattenOffset();
//    }
//  });

function OnKeyBoardOpen(){
  setKeyBoardOpen(!keyBoardOpen)
  
}
function onkeyBoardClose(){
  setKeyBoardOpen(!keyBoardOpen)
  setIsActive(false)
}





///////////////////// Getting AsynDATA /////////////////////

useEffect(()=>{
  getAsyncData()
  getDatAndTime()

  },[])
function getDatAndTime (){
  let today = new Date();
  let datee = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
  let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
  let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
  setDate(datee);

  const properTime= hours + ':' + minutes + ':' + seconds;
  setTime(properTime)
}



  async function getAsyncData () {
    const token = await AsyncStorage.getItem('token')
    const userid = await AsyncStorage.getItem('userid')
    let userID = JSON.parse(userid)
    const lat=await AsyncStorage.getItem("lat")
  const _lat= JSON.parse(lat)
  const long=await AsyncStorage.getItem("long")
  const _long= JSON.parse(long)
    if(token ){
  setUserId(userID)
  setToken(token)
  
    }
    if(_lat){
      setLatitude(_lat)
      setLocation(_long)
    }
  }
  

/////////TEXT EDITING//////////




var captionLayout = {
  width: 0,
  height: 0
}


function OnLayoutCaption (nativeEvent){
    // let target = nativeEvent.target;

    // if (this.captionLayout.width !== nativeEvent.layout.width ||
    //     this.captionLayout.height !== nativeEvent.layout.height) {

    //     this.captionLayout = nativeEvent.layout;

    //     this.setCaptionStyle();

    // } else {

    //     this.captionLayout = nativeEvent.layout;

    // }
    console.log(nativeEvent.layout)
}








////////////////////////////////////////////




//////////// BELOW IS SETUP FOR SENDING VIDEO /////////////////////////

/////////////video compressing and capturing ////////////////////

const captureScreens =()=>{
  console.log("i am captur9ing")

  captureScreen({
    format: "jpg",
    quality: 0.5,
  }).then(
    (uri) => {
      

      // console.log(Buffer.from("", 'base64').toString('ascii'))
compressVideos(uri)
    }
      ,
    (error) => {
      setLoading(false)

      console.error("Oops, snapshot failed", error)}
  );
}




////////////////// COMPRESSING ///////////////////////////


const compressVideos = async(thumbnail) =>{
  console.log("i am compressing",uri)
  Alert.alert("Compressing","Please wait we are preparing your video to upload")


  await VideoCompress.compress(
    uri,
    {

bitrate:6000000000
    },
    (progress) => {
      console.log(progress)

    }
  ).then(async (compressedFileUrl) => {
    console.log("uri",compressedFileUrl)
    compressVideosII(compressedFileUrl,thumbnail)
    });
}



const compressVideosII = async(url,thumbnail) =>{
  console.log("i am compressing again bro",url)

  var new_str = url.replace("file://", 'file:///')
    
console.log(new_str)
  await VideoCompress.compress(
    new_str,
    {
bitrate:6000000000
    },
    (progress) => {
      console.log(progress)
    
    }
  ).then(async (compressedFileUrl) => {
    console.log("uri",compressedFileUrl)
    SaveVideos(compressedFileUrl,thumbnail)

    });

}





///////////////////////////////////////////////////////////////



////////////////SAVING VIDEO/////////////////////////////


const SaveVideos = (uri,thumbnail) =>{
  Alert.alert("Uploading","Your video is being uploaded.")

  console.log("i am on it",thumbnail)
  const realPath =
  Platform.OS === 'ios'
    ? uri.replace('file://', '')
    : uri;
  const id = 0
    RNFetchBlob.fetch(
      'POST',
      'https://hymkapp.khannburger.com/api/createpost',
      {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      [
    
          {
            name: 'video',
            filename: 'video.mp4',
            type: 'video/mp4',
            data: RNFetchBlob.wrap(realPath),
          },

        { name: 'user_id', data: '' + useAsync.myId },
        { name: 'description', data: '' + description },
        // { name: 'time', data: "2022-20-20" },
        // { name: 'date', data:  "2022-20-20"},
        { name: 'latitude', data: '' + latitude },
        { name: 'longitude', data: '' + location },
        { name: 'area', data: '' + id },
        { name: 'likes', data: '' + id },
        { name: 'comments', data: '' + id },
        { name: 'shares', data: '' + id },
        { name: 'filter_type', data: '' + filter },



        // {name: 'thumbnail', data:Img}
   
        {
          name: "thumbnail",
          filename: "thumbnail.jpg",
          type: "image/jpg",
          data:  RNFetchBlob.wrap(thumbnail),
        },

      ],
    ).then(response => response.json())
      .then(res => {
        console.log("das",res.data[0].status);
        if(res.data[0].status==="200"){
          setLoading(false)
          Alert.alert("Congratulations","Your Video Is Posted Successfully.")
          HideModal()
          navigation.goBack()
        }
        else{
          alert("Some unknown error please try again later")
        }
     
        
      })
      .catch(err => {
        setLoading(false)
        console.log('err >>>', err);
    
      });





}



////////////////////////////////////////////////////////////

///////////////////////SETUP FOR DOWNLOADING VIDEO ////////////////////////////////





const CompressDownload = async() =>{
  setLoading(true)
Alert.alert("Compressing","Please wait we are compressing your video, your download will start soon")
// if(route !="local"){
// console.log("not local")
//   const options = {
//     width: 720,
//     height: 1280,
//     bitrateMultiplier: 3,
//     saveToCameraRoll: false, // default is false, iOS only
//     saveWithCurrentDate: false, // default is false, iOS only
//     minimumBitrate: 900000,
    
//     removeAudio: false, // default is false
//   };
//   ProcessingManager.compress(uri, options) // like VideoPlayer compress options
//   .then((data) => 
//   SaveDownloadVideo(data.source)
//   )
// }else{
//   SaveDownloadVideo(uri)
// }



await VideoCompress.compress(
  uri,
  {

bitrate:6000000000
  },
  (progress) => {
    console.log(progress)
    // if (backgroundMode) {
    //   console.log('Compression Progress: ', progress);
    // } else {
    //   console.log(progress);
    // }
  }
).then(async (compressedFileUrl) => {
  console.log("uri",compressedFileUrl)
  SaveDownloadVideo(compressedFileUrl)
  });









}


function SaveDownloadVideo(uri){

  console.log("Started saving.........")

  const realPath =
  Platform.OS === 'ios'
    ? uri.replace('file://', '')
    : uri;

  
  
    RNFetchBlob.fetch(
      'POST',
      `https://hymkapp.khannburger.com/api/sendvideo`,
      {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      [
    
          {
            name: 'video',
            filename: 'video.mp4',
            type: 'video/mp4',
            data: RNFetchBlob.wrap(realPath),
          },

      

  
      ],
    ).then(response => response.json())
    .then(result => {
     
      if(result.path){
Download(`${EndPoints.VideoDownloadUrl}${result.path}`)


setTimeout(() => {setLoading(false)
}, 9000)


      }

  
    })
     
      .catch(err => {
        setLoading(false)
        console.log('err >>>', err);
    
      });







}















///////setting filters/////////////






function onSwipeLeft(gestureState) {
if(filter < 6){

  setFilter(filter+1)
}else{
  setFilter(1)
}
}
function onSwipeRight(gestureState) {
  if(filter >1 ){
  
    setFilter(filter-1)
  }else{
    setFilter(6)
  }
  }


const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

////////////////














return(
  
<Modal
visible={shouldShow}
>


<View style={styles.Container}>




<View 

onPress={()=>{
  onPlayPausePress()
}}



>
  
 <Video  
 ref={vid}
  source={{uri:uri}}        
  paused={paused}   
  resizeMode="cover"            
//   style={[styles.backgroundVideo,{transform:[{rotateY:'180deg'}]}]}  
  style={styles.backgroundVideo}  
  repeat={true}  
     
   
  // onLoad={()=> setLoading(true)}
  // onEnd={() => setLoading(false)}
  

  /> 

<Filters filterType={filter}/>


<GestureRecognizer
    //         onSwipe={(direction, state) => this.onSwipe(direction, state)}
    //         onSwipeUp={(state) => this.onSwipeUp(state)}
    //         onSwipeDown={(state) => this.onSwipeDown(state)}
            onSwipeLeft={(state) => onSwipeLeft(state)}
         onSwipeRight={(state) => onSwipeRight(state)}
            config={config}

            style={styles.VideoOptionsContainer}
        >
   
   {loading === false ? 
 <View>


  
{
isActive === true ? 
<TextInput 

placeholder='Type Something here....'
placeholderTextColor={"white"}
style={{marginBottom:keyBoardOpen === false ? 20:itemHeight/3,color:"white",marginLeft:10,textAlign:"left"}}
onPressIn={()=>OnKeyBoardOpen()}
onEndEditing={()=>onkeyBoardClose()}
onChangeText={(e)=>setDescription(e)}
numberOfLines={3}
value={description}


/>:
<Text

onPress={()=>setIsActive(true)}
style={{marginBottom:20,color:"white",marginLeft:10,textAlign:"left",width:"50%"}}


>
{description !=""?description:"Type something here...."}
</Text>
}


 




     <View
     style={styles.optionsVideo}
     >
<Pressable
onPress={()=> CompressDownload()}

>

<MaterialIcons 

style={{marginLeft:10}}
name="file-download" color="white" size={Icon_Size} />
      

</Pressable>

<MaterialIcon 

onPress={()=> {
  if(latitude !=""){
    setLoading(true)

    captureScreens()
  
  }
  else{
    Alert.alert("Warning !","Location permission is required to upload video.")
  }

  
  }
  }
style={{marginRight:10}}

name='check-circle'
size={Icon_Size}
color="white"

/>
     
      </View> 
  
</View>
:           
<SpinnerButton
                  buttonStyle={{marginBottom:20,width:50,height:50,        backgroundColor: '#ff0000',
                }}
                  isLoading={true}
                  size={1}
                  spinnerType='PulseIndicator'
                  indicatorCount={0}
              
// onPress={()=>onSubmit()}
>

</SpinnerButton> 

}
</GestureRecognizer>






</View>



<View style={styles.TopOptions}>
<MaterialIcons  
style={{margin:10}}
onPress={()=>HideModal()}
name='arrow-back' size={25} color="white"/>
</View>


</View>
</Modal>


)

}
export default SaveVideo