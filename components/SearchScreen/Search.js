import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Modal
} from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import UserData from '../Data/UserData';
import profile from '../../assets/images/Profile.png'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import OtherUser from '../Profiles/OtherUser';
import getAsync from '../AsynDataFolder/getAsync';
import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Search =({})=>{
const navigation = useNavigation()
const [searchInput,setSearchInput]=useState("")
const [showOtherUser,setOtherUser]=useState(false)
const [data,setData]=useState([])

const [Other_id,setOtherUserId]=useState("")




function HideOtherUser (){
  setOtherUser((prev)=>!prev)
}




useEffect(async()=>{
  getAsyncData()
  },[])


  
  async function getAsyncData () {
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let user_id=JSON.parse(userid) 
    if(token){
      getAllUsers(token,user_id)
  
  
    } 
  }


function getAllUsers(token){
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
   
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
    
  fetch(`${BaseUrl}${EndPoints.allUser}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setData(result.users)
     
      console.log(result)})
    .catch(error => console.log('error', error));

}














const renderUser =({item})=>(
<Pressable 
onPress={()=>{
  setOtherUserId(item.id)
  setOtherUser(true)
}}
style={styles.ListData}>
  <Image
  source={profile}
  style={{width:38,height:38,margin:10}}
  />
  <View style={{flexDirection:'column'}}>
    <Text style={{color:"rgba(0,0,0,0.7)"}}>
{item.firstname}
 
{item.lastname}
  </Text>
    <Text style={{fontSize:12}}>
@{item.username}
  </Text>
  </View>

</Pressable>
)
return(


    <View style={styles.container}>
<View style={styles.Header}>
    </View>
    <View style={styles.SearchWrapper}>
    <View style={styles.searchInput}>

<AntDesign
style={{marginLeft:10}}
name='search1'
size={19}
color="grey"
/>
<TextInput
placeholder='Search any user'
style={{flex:1}}
value={searchInput}
onChangeText={(e)=>setSearchInput(e)}
/>
      
</View>

<Text
onPress={()=> {navigation.goBack()}}
style={{fontSize:20,color:"rgba(0,0,0,0.6)"}}
>Back</Text>
    </View>
{data.length>=1?
    <View style={{marginTop:20}}>

    <FlatList
    data={data.filter((items) => searchInput!==""? items.username.includes(searchInput):items.username.includes("##^^hhkd992"))}
    renderItem={renderUser}
    
    />
    </View>

 :
 null }
    {showOtherUser === true ? 
        
        <OtherUser showOtherUser={showOtherUser} HideOtherUser={HideOtherUser} Other_id={Other_id}/>
     :
     null }
    
        </View>
     
)

}
export default Search