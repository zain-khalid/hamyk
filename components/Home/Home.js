import React,{useState,useEffect,useReducer,useMemo,useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import styles from './Styles';
import profile from '../../assets/images/Profile.png'
import group from '../../assets/images/Group.png'

import { useNavigation } from '@react-navigation/native';

import UserProfile from '../Profiles/UserProfile';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import VideoFeed from '../Feed/VideoFeed';
import Explore from '../Explore/Explore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import BottomButton from './BottomButton';
import useLocation from '../Hooks/getLocation';
const Icon_Size = 35
import { useIsFocused } from '@react-navigation/native';
export const PausedContext = React.createContext()
const Home =()=>{
  const getLocation = useLocation()
  const Focused = useIsFocused()
const navigation = useNavigation()
const [myId,setMyId]=useState("")
const [token,setToken]=useState("")
const [newVideos,setNewVideos]=useState([])

const [topVideos,setTopVideos]=useState([])
const [index,setIndex]=useState(3)
const [followingData,setFollowingData]= useState([])
const [userVideos,setUserVideos]= useState([])

const [userData,setUserData]= useState(
    {
        f_name:"",
        l_name:"",
        followed:0,
        followers:0,
        username:"",
        id:""
    }
)

//////////////////Action for Pausing Videos////////////////////







useEffect(()=>{
    getAsyncData()
    },[Focused])

    
async function getAsyncData () {
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let user_id=JSON.parse(userid) 

    if(token){
      setMyId(user_id)
      setToken(token)
      Manager(token,user_id)
    }
  }
///////////// RESPONSE MANAGER /////////////////////////

function Manager (token,user_id) {

  getTopVideos(token,user_id)
getNewvideos(token,user_id)


}

  
  
  /////////////Getting User Data///////////////
  
  
function getUserData (){
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);



var formdata = new FormData();
formdata.append("id", myId);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${EndPoints.GetUserData}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    if(result.starus==="200"){
        setUserData({
            f_name:result.data[0].firstname,
            l_name:result.data[0].lastname,
            followed:result.followed,
            followers:result.followers,
            username:result.data[0].username,
            id:result.data[0].id

        })
    }
})
  .catch(error => console.log('error', error));
}

function getUserVideos(){
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("user_id", myId);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${EndPoints.UserS_Videos}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    setUserVideos(result.posts)
  
  })
  .catch(error => console.log('error', error));
}


//////////////Getting Following Video////////////////




function getingFollowingVideos (){

if(followingData.length >=1){

}
else{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  var formdata = new FormData();
  formdata.append("user_id", myId);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  fetch(`${BaseUrl}${EndPoints.followingList}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    setFollowingData(result.posts)
  })
    .catch(error => console.log('error', error))
  }
  }
  
  
  
  /////////////////GET TOP VIDEOS /////////////////////
  
  
function getTopVideos(token,userId){
  
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  
  var formdata = new FormData();
  formdata.append("user_id", userId);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${EndPoints.TopVideos}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      



    if(topVideos.length != result.posts.length){


      setTopVideos(result.posts)
    }
    
    })
    .catch(error => console.log('error', error));
}



/////////////////NEW VIDEOS///////////////////////

function getNewvideos (token,userId){
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("user_id", userId);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${EndPoints.NewVideos}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(newVideos.length != result.posts.length){


      setNewVideos(result.posts)
    }

  })
  .catch(error => console.log('error', error));
}







////////////SCREEN RENDERER //////////////////////
function RenderScreen(){
    if(index===1){
return(
    <UserProfile 
    
    userData={userData} 
    
    
    userVideos={userVideos}
    
    getUserVideos={getUserVideos}
    
    />
    )
    
    }
    else if(index===2){
        return(

            <VideoFeed data={followingData} />
        )
    }
    else if(index===3){
        return(

            <Explore TopVideos={topVideos} newVideos={newVideos}/>
        )
    }

}


return(


    <View style={styles.container}>
   <View
   style={styles.Header}
   >
    <Pressable
    
    onPress={()=>{
      getUserData()
      getUserVideos()
      setIndex(1)}}
    >
        

    <Image  
    source={profile}
    style={{  width:index===1?62:45,height:index===1?62:45,borderWidth:1}}
    />
    </Pressable>

<Text
onPress={()=>setIndex(3)}
style={{color:index!=3?'rgba(255,255,255,0.6)':"white",fontWeight:'bold',fontSize:index===3?25:22}}
>hamyk</Text>

<Pressable
    onPress={()=>{
      getingFollowingVideos()
        setIndex(2)
        }}
>
        

    <Image  
    source={group}
    style={{  width:index===2?62:45,height:index===2?62:45}}
    />
    </Pressable>





   </View>

<RenderScreen />
<BottomButton />


{/* <Text style={{position:"absolute"}} >Button</Text> */}

    </View>
)

}
export default Home