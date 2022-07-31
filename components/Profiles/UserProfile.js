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
import videosdata from '../Feed/data/videoData';
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
import TOS from '../TOS/TOS';
const itemHeight = Dimensions.get('window').height/3


const UserProfile =({userData,userVideos,getUserVideos})=>{
const navigation = useNavigation()

const [paused, setPaused] = useState(true);
const [showModal,setShowModal]=useState(false)
const [OtherId,setOtherId]=useState("")
const [ShowDelModal,setShowDelModal]=useState(false)
const [DelId,setDelId]=useState("")



const [Single_Post , setSinglePost]=useState(false)
const [route , setRoute]=useState("following")

const [singleItem,setSingleItem]=useState([])
const [showFollwingScreen,setShowFollowingScreen]=useState(false)


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


const RenderVideo=({item,index})=>{


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

    <Text style={{color:"white",fontSize:20}}>3 days</Text>
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

return(
  <View style={styles.container}>
   <View
   style={styles.user_infro_section}
   >
<Image  
    source={profile}
    style={styles.Avatar}
    />

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
    <Icon
                    name="ios-heart"
                    size={35}
                    color={'red'}
                    />
    
    
    </View>





<FlatList
data={userVideos}
renderItem={({item})=>

<RenderVideo  item={item} />
}
keyExtractor={KeyExtractor}
getItemLayout={getItemLayout}
// onViewableItemsChanged={onViewableItemsChanged}
/> 
<Menu 
showModal={showModal} 
OnSetModal={OnSetModal}/>
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