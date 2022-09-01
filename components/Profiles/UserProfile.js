import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  PermissionsAndroid,

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
import Following from '../Follow_Data/Following';
import EndPoints from '../../configuration/EndPoints';
import Delete from './Menu/Delete';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

import TOS from '../TOS/TOS';
import * as ImagePicker from 'react-native-image-picker';
import getAsync from '../AsynDataFolder/getAsync';

const itemHeight = Dimensions.get('window').height/3


const UserProfile =({userData,userVideos,getUserVideos,Currentindex,getUserData,ChangeState})=>{
const navigation = useNavigation()

const [paused, setPaused] = useState(true);

const [showModal,setShowModal] = useState(false)

const [OtherId,setOtherId]=useState("")

const [ShowDelModal,setShowDelModal]=useState(false)

const [DelId,setDelId]=useState("")



const [Single_Post , setSinglePost]=useState(false)
const [route , setRoute]=useState("following")

const [singleItem,setSingleItem]=useState([])
const [showFollwingScreen,setShowFollowingScreen]=useState(false)



const asyndata= getAsync()



//////////// get data ///////////////////







//////////////MODAL SETTINGS ////////////////////

function OnSetModal  (){
  setShowModal((prev)=>!prev)

}

function OnSetDelModal  (){
  setShowDelModal((prev)=>!prev)

}


function OnsetSingleVideo  (){
  setSinglePost((prev)=>!prev)

}


function hideFollowing (){
setShowFollowingScreen((prev)=>!prev)
}

//////////////////////ASYNC DATA ///////////////////////








/////////////////Download File/////////////////////////////////




const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';







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

  const Buffer = require("buffer").Buffer;

  let today = new Date();

  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


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
  onLongPress={()=>{
    setDelId(item.id)
    setShowDelModal(true)
  }}
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

</View>

</View>


    </ImageBackground>



</Pressable>
  )
                  }







//////////Select from gallery/////////




const permissionForGallery=async ()=>{


  if (Platform.OS === 'ios') {
      SelectFromGallery();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );


        const grantedRead = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to upload file',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          SelectFromGallery();

alert("Download started please wait")

        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
 }

 async function SelectFromGallery(){
  ImagePicker.launchImageLibrary({ mediaType: 'image', includeBase64: false, }, (response) => {
      if(response.didCancel !=true){

  UpdatePicture(response.assets[0].uri)

      }
      else{
          console.log("jedhfk")
      }

  })
 }







 const UpdatePicture = (uri) =>{
  const realPath =
  Platform.OS === 'ios'
    ? uri.replace('file://', '')
    : uri;



    RNFetchBlob.fetch(
      'POST',
      `https://hymkapp.khannburger.com/api/updateprofile/${asyndata.myId}`,
      {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${asyndata.token}`,
      },
      [
       {
          name: "profile_photo",
          filename: "profile_photo.jpg",
          type: "image/jpg",
          data:  RNFetchBlob.wrap(realPath),
        },

      ],
    ).then(response => response.json())
      .then(res => {
        if(res.result){
          if(res.result==="data saved"){
            getUserData()
          }
        }

      })
      .catch(err => {
        setLoading(false)
        console.log('err >>>', err);

      });

}














return(
  <View style={styles.container}>
   <View
   style={styles.user_infro_section}
   >
    <Pressable
    onPress={()=>permissionForGallery()}
    >
{
  userData.profile==="default"?
<Image
    source={profile}
    style={styles.Avatar}
    />:
    <Image
    source={{uri:`${EndPoints.ProfileUrl}${userData.profile}`}}
    style={styles.Avatar}
    />

  }
    </Pressable>
<View style={styles.user_info_inner}>

<View style={[styles.Infor_dividing_view,{borderBottomWidth:1}]}>
  <Pressable
  onPress={()=>{

    setRoute("followers")
    setShowFollowingScreen(true)}}
  style={styles.followSection}>
<Text style={{color:"black",fontSize:17}}>
    {userData.followers}
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
  <Text style={{fontSize:17,color:"black"}}>
    {userData.followed}
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

<Text style={{color:"black",fontSize:20}}>{userData.f_name} {userData.l_name}</Text>

<Text>@{userData.username}</Text>





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




  {Currentindex === 0?
<FlatList
data={userVideos.sort((a, b) => b.id - a.id)}
renderItem={({item})=>

<RenderVideo  item={item} />
}
keyExtractor={KeyExtractor}
getItemLayout={getItemLayout}
// onViewableItemsChanged={onViewableItemsChanged}
/>
:null

}
<Menu
showModal={showModal}
OnSetModal={OnSetModal}
ChangeState={ChangeState}

/>
{
  ShowDelModal === true ?
<Delete

showModal={ShowDelModal}
OnSetModal={OnSetDelModal}

DelId={DelId}
getUserVideos={getUserVideos}
/>
:
null
}


{
                      Single_Post === true ?
                      <SinglePost Single_Post={Single_Post} OnsetSingleVideo={OnsetSingleVideo} items={singleItem} />
:
null
                    }
                    {
showFollwingScreen === true ?
<Following
state={showFollwingScreen}
changeState={hideFollowing}
route={route}
OtherId={userData.id}
/>:
null



                    }


                    </View>
)

}
export default UserProfile