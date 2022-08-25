
import React,{useState,useEffect,useReducer,useMemo,useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  useWindowDimensions ,
  BackHandler
} from 'react-native';
import styles from './Styles';
import profile from '../../assets/images/Profile.png'
import group from '../../assets/images/Group.png'

import { useNavigation } from '@react-navigation/native';

import UserProfile from '../Profiles/UserProfile';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import VideoFeed from '../Feed/VideoFeed';
import Explore from '../Explore/Explore';
import GetAsyncData from '../Notifications/Notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import BottomButton from './BottomButton';
import useLocation from '../Hooks/getLocation';
import { TabView, SceneMap } from 'react-native-tab-view';
import moment from 'moment';
const Icon_Size = 35
import { useIsFocused } from '@react-navigation/native';
export const PausedContext = React.createContext()

function backButtonHandler() {
  console.log("bnack btn pressed")
  BackHandler.exitApp()
}

const Home =({ChangeState})=>{

  const getLocation = useLocation()

  console.log(">> get location << ",getLocation);
  const Focused = useIsFocused()
const navigation = useNavigation()
const [myId,setMyId]=useState("")
const [token,setToken]=useState("")
const [newVideos,setNewVideos]=useState([])

const [topVideos,setTopVideos]=useState([])
const [index,setIndex]=useState(1)
const [followingData,setFollowingData]= useState([])
const [userVideos,setUserVideos]= useState([])

const[isUser,setIsUser]=useState(false)


// useEffect(() => {
//   BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

//   return () => {
//     BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
//   };
// }, [backButtonHandler]);

const [userData,setUserData]= useState(
    {
        f_name:"",
        l_name:"",
        followed:0,
        followers:0,
        username:"",
        id:"",
        profile:"default",
        total_likes:0
    }
)

//////////////////Action for Pausing Videos////////////////////


////////////DATA CALLERS/////////////////////




useEffect(()=>{

if(index===1){

  getAsyncData()

}
else if(index===2){

  getingFollowingVideos()
}else{
  getUserData()

  getUserVideos()
}


},[index])







function getAlluserDATA(){
  getUserData()
  getUserVideos()
}


useEffect(()=>{
  GetAsyncData();
},[])


////////////////////  GETTING ASYNC DATA   ////////////////////////

// useEffect(()=>{
//     getAsyncData()
//     },[Focused])


async function getAsyncData () {
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let user_id=JSON.parse(userid)

    if(token){
      setMyId(user_id)
      setToken(token)
      Manager(token,user_id)
    }
    // location lat and long getting from async
    const lat = await AsyncStorage.getItem('lat')
    const long = await AsyncStorage.getItem('long')

    console.log(" >> location from async << ",lat, long)
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
            id:result.data[0].id,
            profile:result.data[0].profile_photo,
            total_likes:result.likes
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



///////////////// GET NEW VIDEOS///////////////////////

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

console.log("new videos")
      setNewVideos(result.posts)
    }

  })
  .catch(error => console.log('error', error));
}







////////////SCREEN RENDERER   //////////////////////







function _renderTabBar(){
  return(
    <View
    style={styles.Header}
    >
     <Pressable

     onPress={()=>{

       setIndex(0)}}
     >

 {userData.profile === "default"?

 <Image
 source={profile}
 style={{  width:index===0?62:45,height:index===0?62:45,borderWidth:1}}
 />
:

<Image
 source={{uri:`${EndPoints.ProfileUrl}${userData.profile}`}}
 style={{  width:index===0?62:45,height:index===0?62:45,borderWidth:1,borderColor:"white",borderRadius:1000}}
 />

}
     </Pressable>

 <Text
 onPress={()=>setIndex(1)}
 style={{color:index!=1?'rgba(255,255,255,0.6)':"white",fontWeight:'bold',fontSize:index===1?25:22}}
 >hamyk</Text>

 <Pressable
     onPress={()=>{
         setIndex(2)
         }}
 >


     <Image
     source={group}
     style={{  width:index===2?62:45,height:index===2?62:45}}
     />
     </Pressable>





    </View>
  )

}


/////////////// SWIPE ABLE DATA /////////////





const renderScene = SceneMap({
  first:  () =>

  <UserProfile
  userData={userData}


  userVideos={userVideos}

  getUserVideos={getUserVideos}

  Currentindex={index}
  getUserData={getUserData}
  ChangeState={ChangeState}
  />
  ,
  second: ()=>  <Explore TopVideos={topVideos} newVideos={newVideos} Currentindex={index}

  />
  ,
  third: ()=><VideoFeed data={followingData} Currentindex={index}/>

});




const layout = useWindowDimensions();

const [routes] = React.useState([
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },

  { key: 'third', title: 'third' },
]);





return(
<>
  <TabView
    renderTabBar={_renderTabBar}
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}

  />
  <BottomButton/>
</>
)

}
export default Home


///////////////
















//import React,{useState,useEffect,useReducer,useMemo,useCallback } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   Image
// } from 'react-native';
// import styles from './Styles';
// import profile from '../../assets/images/Profile.png'
// import group from '../../assets/images/Group.png'

// import { useNavigation } from '@react-navigation/native';

// import UserProfile from '../Profiles/UserProfile';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

// import VideoFeed from '../Feed/VideoFeed';
// import Explore from '../Explore/Explore';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BaseUrl from '../../configuration/url';
// import EndPoints from '../../configuration/EndPoints';
// import BottomButton from './BottomButton';
// import useLocation from '../Hooks/getLocation';
// const Icon_Size = 35
// import { useIsFocused } from '@react-navigation/native';
// export const PausedContext = React.createContext()
// const Home =()=>{
//   const getLocation = useLocation()
//   const Focused = useIsFocused()
// const navigation = useNavigation()
// const [myId,setMyId]=useState("")
// const [token,setToken]=useState("")
// const [newVideos,setNewVideos]=useState([])

// const [topVideos,setTopVideos]=useState([])
// const [index,setIndex]=useState(3)
// const [followingData,setFollowingData]= useState([])
// const [userVideos,setUserVideos]= useState([])

// const [userData,setUserData]= useState(
//     {
//         f_name:"",
//         l_name:"",
//         followed:0,
//         followers:0,
//         username:"",
//         id:""
//     }
// )

// //////////////////Action for Pausing Videos////////////////////







// useEffect(()=>{
//     getAsyncData()
//     },[Focused])


// async function getAsyncData () {
//     const userid = await AsyncStorage.getItem('userid')
//     const token = await AsyncStorage.getItem('token')
//     let user_id=JSON.parse(userid)

//     if(token){
//       setMyId(user_id)
//       setToken(token)
//       Manager(token,user_id)
//     }
//   }
// ///////////// RESPONSE MANAGER /////////////////////////

// function Manager (token,user_id) {

//   getTopVideos(token,user_id)
// getNewvideos(token,user_id)


// }



//   /////////////Getting User Data///////////////


// function getUserData (){
//     var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${token}`);



// var formdata = new FormData();
// formdata.append("id", myId);

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch(`${BaseUrl}${EndPoints.GetUserData}`, requestOptions)
//   .then(response => response.json())
//   .then(result => {

//     if(result.starus==="200"){
//         setUserData({
//             f_name:result.data[0].firstname,
//             l_name:result.data[0].lastname,
//             followed:result.followed,
//             followers:result.followers,
//             username:result.data[0].username,
//             id:result.data[0].id

//         })
//     }
// })
//   .catch(error => console.log('error', error));
// }

// function getUserVideos(){
//   var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${token}`);

// var formdata = new FormData();
// formdata.append("user_id", myId);

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch(`${BaseUrl}${EndPoints.UserS_Videos}`, requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     setUserVideos(result.posts)

//   })
//   .catch(error => console.log('error', error));
// }


// //////////////Getting Following Video////////////////




// function getingFollowingVideos (){

// if(followingData.length >=1){

// }
// else{

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${token}`);
//   var formdata = new FormData();
//   formdata.append("user_id", myId);
//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: formdata,
//     redirect: 'follow'
//   };
//   fetch(`${BaseUrl}${EndPoints.followingList}`, requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     setFollowingData(result.posts)
//   })
//     .catch(error => console.log('error', error))
//   }
//   }



//   /////////////////GET TOP VIDEOS /////////////////////


// function getTopVideos(token,userId){


//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${token}`);

//   var formdata = new FormData();
//   formdata.append("user_id", userId);

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: formdata,
//     redirect: 'follow'
//   };

//   fetch(`${BaseUrl}${EndPoints.TopVideos}`, requestOptions)
//     .then(response => response.json())
//     .then(result => {




//     if(topVideos.length != result.posts.length){


//       setTopVideos(result.posts)
//     }

//     })
//     .catch(error => console.log('error', error));
// }



// /////////////////NEW VIDEOS///////////////////////

// function getNewvideos (token,userId){
//   var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${token}`);

// var formdata = new FormData();
// formdata.append("user_id", userId);

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch(`${BaseUrl}${EndPoints.NewVideos}`, requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     if(newVideos.length != result.posts.length){


//       setNewVideos(result.posts)
//     }

//   })
//   .catch(error => console.log('error', error));
// }







// ////////////SCREEN RENDERER //////////////////////
// function RenderScreen(){
//     if(index===1){
// return(
//     <UserProfile

//     userData={userData}


//     userVideos={userVideos}

//     getUserVideos={getUserVideos}

//     />
//     )

//     }
//     else if(index===2){
//         return(

//             <VideoFeed data={followingData} />
//         )
//     }
//     else if(index===3){
//         return(

//             <Explore TopVideos={topVideos} newVideos={newVideos}/>
//         )
//     }

// }


// return(


//     <View style={styles.container}>
//    <View
//    style={styles.Header}
//    >
//     <Pressable

//     onPress={()=>{
//       getUserData()
//       getUserVideos()
//       setIndex(1)}}
//     >


//     <Image
//     source={profile}
//     style={{  width:index===1?62:45,height:index===1?62:45,borderWidth:1}}
//     />
//     </Pressable>

// <Text
// onPress={()=>setIndex(3)}
// style={{color:index!=3?'rgba(255,255,255,0.6)':"white",fontWeight:'bold',fontSize:index===3?25:22}}
// >hamyk</Text>

// <Pressable
//     onPress={()=>{
//       getingFollowingVideos()
//         setIndex(2)
//         }}
// >


//     <Image
//     source={group}
//     style={{  width:index===2?62:45,height:index===2?62:45}}
//     />
//     </Pressable>





//    </View>

// <RenderScreen />
// <BottomButton />


// {/* <Text style={{position:"absolute"}} >Button</Text> */}

//     </View>
// )

// }
// export default Home

















