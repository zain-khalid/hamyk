import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  SafeAreaView

} from 'react-native';
import styles from './Styles';
import profile from '../../assets/images/Profile.png'
import { useNavigation } from '@react-navigation/native';
import colors from '../Global/colors';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Download from '../SHareVideo/Download';
import Menu from './Menu/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SinglePost from '../singlePost/SinglePost';
import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import Following from '../Follow_Data/Following';
import getAsync from '../AsynDataFolder/getAsync';
import UserData from '../Data/UserData';
import SmallMenu from './Menu/Smallmenu';
import moment from 'moment';

import GenerateFollowers from '../functions/GenerateFollowNotification';
const itemHeight = Dimensions.get('window').height/3

import SpinnerButton from 'react-native-spinner-button';

const OtherUser =({showOtherUser,HideOtherUser,Other_id})=>{
const navigation = useNavigation()
const AsyncData = getAsync()
const [paused, setPaused] = useState(true);
const [showModal,setShowModal]=useState(false)
const [isFollowing,setIsFollowing]=useState(true)

const [route , setRoute]=useState("following")


const [Single_Post , setSinglePost]=useState(false)
const [singleItem,setSingleItem]=useState([])
const [userVideos,setUserVideos]=useState([])

const [showFollwingScreen,setShowFollowingScreen]=useState(false)

const [userData,setUserData]= useState(
  {
    f_name:"",
    l_name:"",
    followed:0,
    followers:0,
    username:"",
    OtherUserr:0,
    profile:"",
    total_likes:0


}
)
const [followed,setFollowed]=useState(0)
const [followers,setfollowers]=useState(0)








//////////////MODAL SETTINGS ////////////////////

function OnSetModal  (){
  setShowModal((prev)=>!prev)

}

function OnsetSingleVideo  (){
  setSinglePost((prev)=>!prev)

}


function hideFollowing (){
setShowFollowingScreen((prev)=>!prev)
}

//////////////////////ASYNC AND USER  DATA ///////////////////////


useEffect(()=>{
  getAsyncData()

  },[])

  async function getAsyncData () {
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let user_id=JSON.parse(userid)
    if(token){
      getUserData(token,user_id)
      getUserVideos(token,user_id)

    }
  }






//////////////////////

////////////UNFOLLOW OR FOLLOW/////////////


function onFollowPress(){
  setfollowers(isFollowing==="true"?followers - 1:followers + 1)
}









function followUser(){
  setIsFollowing(isFollowing==="true"?"false":"true")

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${AsyncData.token}`);

  var formdata = new FormData();
  formdata.append("follow_to", Other_id);
  formdata.append("follow_by", AsyncData.myId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch(`${BaseUrl}${EndPoints.hitFollow}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      getAsyncData(AsyncData.token,AsyncData.myId)

 if(isFollowing !=="true"){
console.log("go run")
   GenerateFollowers(Other_id)
 }




    })
    .catch(error => {
      setIsFollowing(isFollowing==="true"?"false":"true")

      console.log('error', error)});
}


//////////////////////////////






const Buffer = require("buffer").Buffer;


/////////////Getting User Data///////////////


function getUserData (token,user_id){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("id", user_id);
  formdata.append("user_id", Other_id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch(`${BaseUrl}getotheruserprofile`, requestOptions)
.then(response => response.json())
.then(result => {

  if(result.starus==="200"){
      setUserData({
        f_name:result.data[0].firstname,
        l_name:result.data[0].lastname,
        followed:result.followed,
        followers:result.followers,
        username:result.data[0].username,
        OtherUserr:result.data[0].id,
        profile:result.data[0].profile_photo,
        total_likes:0


      })
      setFollowed(result.followed)
      setfollowers(result.followers)

      setIsFollowing(result.isfollowed)
  }
})
.catch(error => console.log('error', error));
}






function getUserVideos(token,myID){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("user_id", Other_id);

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








////////////////////////////////////////////////////////////////





const KeyExtractor=useCallback((item)=>item.id.toString(),[])
const getItemLayout = useCallback(

  (data,index)=>({
  length:itemHeight,
  offset: itemHeight*index,
  index,

  }),
  []

  );



const RenderVideo=({item,index})=>{
  const uploadedDate = moment(item.created_at).format('MM/DD/YYYY');
  var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
  const today = month+"/"+date+"/"+year
    const date1 = new Date(today);
    const date2 = new Date(uploadedDate);
   const diff= Math.abs(Number(date2) - Number(date1))


return(
  <Pressable

  onPress={()=>

  {
    setSinglePost(true)
    setSingleItem(item)
  }

  }
  style={styles.ListView}>



  <ImageBackground

source={{uri:`${EndPoints.VideoBaseUrl}${item.thumbnail}`}}

// paused={true}
  // resizeMode="stretch"             // Fill the whole screen at aspect ratio.
  style={styles.ListView}  // any style you want



  >
<View style={styles.ListBottom}>

<Text style={{color:"white",fontSize:20}}>{diff===0?"3 days Left":diff===1?"2 days Left":diff===2?"1 day Left":"3 day Left"}</Text>
</View>
<View style={styles.ListBottom}>


<View style={styles.ListBottomI}>

<View
style={{flexDirection:"row",alignItems:"center"}}

>
<Icon
                    name="heart-outline"
                    size={30}
                    color={'white'}
                    />


<Text style={{color:"white",fontSize:20}}>  {item.likes}</Text>

</View>


<MaterialIcons

onPress={()=>Download(`${EndPoints.VideoBaseUrl}${item.video}`)}

name="file-download" color="white" size={30} />
{/* <SpinnerButton
                        buttonStyle={{backgroundColor: '#ff0000',width:10,headers
                      }}

                        isLoading={false}
                        spinnerColor='red'
                        spinnerType='PulseIndicator'
                        indicatorCount={0}

// onPress={()=>onSubmit()}
/> */}

</View>

</View>


    </ImageBackground>



</Pressable>
  )
                  }

return(
  <Modal
  visible={showOtherUser}
  animationType={"slide"}

  >
  <SafeAreaView>
  <View style={styles.container}>
    <View
    style={styles.headers}
    >
<MaterialIcons
style={{margin:10}}
onPress={()=>HideOtherUser()}
name='arrow-back' size={25} color="black"/>
    </View>
   <View
   style={styles.user_infro_section}
   >
    {
userData.profile === "default"?

<Image
    source={profile}
    style={styles.Avatar}
    />:
<Image
    source={{uri:`${EndPoints.ProfileUrl}${userData.profile}`}}
    style={styles.Avatar}
    />  }

<View style={styles.user_info_inner}>

<View style={[styles.Infor_dividing_view,{borderBottomWidth:1}]}>
<Pressable
 onPress={()=>{

  setRoute("followers")
  setShowFollowingScreen(true)}}
      style={styles.followSection}>
<Text style={{color:"black",fontSize:17}}>
    {followers}
</Text>
<Text style={{fontSize:17,color:colors[0].FontColor}}>
    followers
</Text>
  </Pressable>
  <Pressable
 onPress={()=>{

  setRoute("following")
  setShowFollowingScreen(true)}}

  style={styles.followSection}>
  <Text

  style={{fontSize:17,color:"black"}}>
    {followed}
    <Text style={{color:colors[0].FontColor}}>
      /150
    </Text>
</Text>
<Text style={{fontSize:17,color:colors[0].FontColor}}>
    following
</Text>
  </Pressable>
</View>


<View style={styles.Infor_dividing_viewI}>

<Text style={{color:"black",fontSize:20}}>{userData.f_name+" "+userData.l_name}</Text>

<Text>@{userData.username}</Text>



{
 userData.OtherUserr === AsyncData.myId?null:

<Pressable
onPress={()=>{


onFollowPress()

  followUser()}}

style={styles.FollowingBtn} >
        <Text style={{margin:5,color:"white",fontSize:17}}>{isFollowing === "true"?"Following":"Follow"}</Text>
    </Pressable>
}
</View>

</View>



</View>
    <View style={styles.Options}>

    <MaterialIcons
    onPress={()=> setShowModal(true)}
    name="more-horiz" color="#A9A9AF" size={40} />
 <View
    style={{flexDirection:"row",alignItems:"center"}}
    >

    <Icon
                    name="ios-heart"
                    size={35}
                    color={'red'}
                    />
                    <Text style={{fontSize:17,marginLeft:5}}>{userData.total_likes}</Text>
                    </View>


    </View>





<FlatList
data={userVideos.sort((a, b) => b.id - a.id)}
renderItem={({item})=>

<RenderVideo  item={item} />
}
keyExtractor={KeyExtractor}
getItemLayout={getItemLayout}
// onViewableItemsChanged={onViewableItemsChanged}
/>
{/* <Menu showModal={showModal} OnSetModal={OnSetModal}/> */}


{
   userData.OtherUserr === AsyncData.myId?
null
   :

<SmallMenu

showModal={showModal}

OnSetModal={OnSetModal}

Goback={HideOtherUser}

Other_id={Other_id}

/>
}





</View>
{
  Single_Post === true ?
  <SinglePost
    Single_Post={Single_Post}
    OnsetSingleVideo={OnsetSingleVideo} i
    items={singleItem}
  />
  :null
}

{
showFollwingScreen === true ?
  <Following
    state={showFollwingScreen}
    changeState={hideFollowing}
    route={route}
    OtherId={Other_id}
  /> : null
}
</SafeAreaView>

</Modal>
)

}
export default OtherUser