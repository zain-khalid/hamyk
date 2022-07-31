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

const itemHeight = Dimensions.get('window').height/1.5
const Icon_Size = 35

const SaveVideo =({shouldShow,uri,HideModal,route})=>{

console.log(route)
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
const [location,setLocation]=useState(getLoc)
const [filter,setFilter]=useState(FilterType.NOIR)
const [date,setDate]=useState()
const [tme,setTime]=useState()



const onPlayPausePress = () => {
  setPaused(!paused);
};

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
  
    if(token){
  setUserId(userID)
  setToken(token)
  
    }
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


const compressVideos = (thumbnail) =>{
  console.log("i am compressing")

if(route !="local"){
console.log("not local")
  const options = {
    width: 720,
    height: 1280,
    bitrateMultiplier: 3,
    saveToCameraRoll: false, // default is false, iOS only
    saveWithCurrentDate: false, // default is false, iOS only
    minimumBitrate: 900000,
    
    removeAudio: false, // default is false
  };
  
  ProcessingManager.compress(uri, options) // like VideoPlayer compress options
  .then((data) => 
    
    SaveVideos(data.source,thumbnail)
  )
}else{
  SaveVideos(uri,thumbnail)

}


}




///////////////////////////////////////////////////////////////



////////////////SAVING VIDEO/////////////////////////////


const SaveVideos = (uri,thumbnail) =>{
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
        { name: 'description', data: '' + id },
        // { name: 'time', data: "2022-20-20" },
        // { name: 'date', data:  "2022-20-20"},
        { name: 'latitude', data: '' + getLoc.currentLatitude },
        { name: 'longitude', data: '' + getLoc.currentLongitude },
        { name: 'area', data: '' + id },
        { name: 'likes', data: '' + id },
        { name: 'comments', data: '' + id },
        { name: 'shares', data: '' + id },


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





// const CompressDownload = () =>{
// Alert.alert("Compressing","Please wait we are compressing your video, your download will start soon")
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
// }


// function SaveDownloadVideo(uri){

//   console.log("Started saving.........")

//   const realPath =
//   Platform.OS === 'ios'
//     ? uri.replace('file://', '')
//     : uri;

  
  
//     RNFetchBlob.fetch(
//       'POST',
//       'https://hymkapp.khannburger.com/api/sendvideo',
//       {
//         // 'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//       [
    
//           {
//             name: 'video',
//             filename: 'video.mp4',
//             type: 'video/mp4',
//             data: RNFetchBlob.wrap(realPath),
//           },

      

  
//       ],
//     ).then(response => console.log(response))
     
//       .catch(err => {
//         setLoading(false)
//         console.log('err >>>', err);
    
//       });







// }




















////////////////





return(
  
<Modal
visible={shouldShow}
>


<View style={styles.Container}>




<Pressable 

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
filter={filter}
filterEnabled={true}
  repeat={true}  
     
   
  // onLoad={()=> setLoading(true)}
  // onEnd={() => setLoading(false)}
  

  /> 

<View style={styles.VideoOptionsContainer}>

{loading === false ? 


     <View
     style={styles.optionsVideo}
     >
<Pressable
// onPress={()=> CompressDownload()}

>

<MaterialIcons 

style={{marginLeft:10}}
name="file-download" color="white" size={Icon_Size} />
      

</Pressable>

<MaterialIcon 

onPress={()=> {
  setLoading(true)
  captureScreens()}}

style={{marginRight:10}}

name='check-circle'
size={Icon_Size}
color="white"

/>
     
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

</View>


</Pressable>



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