import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Modal,
  SafeAreaView
} from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import UserData from '../Data/UserData';
import profile from '../../assets/images/Profile.png'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import OtherUser from '../Profiles/OtherUser';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Following =({
  state,
  changeState,
  route,
  OtherId
})=>{

const navigation = useNavigation()
const [searchInput,setSearchInput]=useState("")
const [myId,setMyid]=useState("")
const [Other_id,setOtherUserId]=useState("")
const [token,setToken]=useState("")

const [showOtherUser,setOtherUser]=useState(false)
const [followings,setFollowings]=useState([])

  function HideOtherUser (){
    setOtherUser((prev)=>!prev)
  }

  //////////////FETCHING USER DATA////////////////
  useEffect(()=>{
    getAsyncData()
  },[])

  async function getAsyncData () {
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let user_id=JSON.parse(userid)
    if(token){
      setToken(token)
      setMyid(user_id)
      GetFollowingList(token,user_id)
    }
  }

  ///////////getting list////////////////////
  function GetFollowingList(token,user_id){
    const endPoint = route==="following"?EndPoints.following:EndPoints.followers
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("user_id", OtherId);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${BaseUrl}${endPoint}`, requestOptions)
      .then(response => response.json())
      .then(result => {

        setFollowings(result)
        console.log(result)})
      .catch(error => console.log('error', error));
  }

  ////////folloing or unfollowing user///////////////
  function followUser(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("follow_to", id);
    formdata.append("follow_by", myId);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${BaseUrl}${EndPoints.hitFollow}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        GetFollowingList(token,myId)
        console.log(result)
      })
      .catch(error => {
        setIsfollowing(!is_following)
        console.log('error', error)
      });
  }

  const renderUser =({item})=>(
    <Pressable
      onPress={()=>{
        setOtherUser(true)
        setOtherUserId(item.id)
      }}
      style={styles.ListData}
    >
      <View style={{alignItems:"center",flexDirection:"row"}}>
        {
          item.profile_photo ==="default"?
            <Image
              source={profile}
              style={{width:38,height:38,margin:10}}
            />:
            <Image
              source={{uri:`${EndPoints.ProfileUrl}${item.profile_photo}`}}
              style={{width:38,height:38,margin:10,borderRadius:1000}}
            />
        }
        <View style={{flexDirection:'column'}}>
          <Text style={{color:"rgba(0,0,0,0.7)"}}>
            {item.firstname}
            {item.lastname}
          </Text>
          <Text style={{fontSize:12}}>
            @{item.username}
          </Text>
        </View>
      </View>
      {
        route==="following" ? item.id === String(myId) ? null :
          <Pressable
            onPress={()=>{
            setIsfollowing(!is_following)
            followUser(item.id)}}
            style={styles.FollowingBtn}
          >
            <Text style={{margin:8,color:"white",fontSize:12}}>{is_following === true ?"Following":"Follow"}</Text>
          </Pressable> : null
      }
    </Pressable>
  )

  return(
    <Modal
      animationType={"slide"}
      visible={state}
    >
      <SafeAreaView>

        <View style={styles.container}>
          <View style={styles.Header}>
            <MaterialIcons
              style={{marginLeft:20}}
              onPress={()=>changeState()}
              name='arrow-back' size={25} color="black"
            />
            <Text style={{marginRight:25,color:"black"}}>{route==="following"?"Followings":"Followers"}</Text>
          </View>
          <View style={{marginTop:10}}>
            <FlatList
              data={followings}
              renderItem={renderUser}
            />
          </View>
        </View>
        { showOtherUser === true ? <OtherUser showOtherUser={showOtherUser} HideOtherUser={HideOtherUser} Other_id={Other_id}/> : null }
      </SafeAreaView>
    </Modal>
  )

}
export default Following