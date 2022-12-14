import React,{useState,useEffect,useRef, useCallback,useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  FlatList
} from 'react-native';
import styles from './Styles';
import IonIcon from 'react-native-vector-icons/Ionicons'
const WindowHeight = Dimensions.get('window').height; 
const Icon_Size = 20
import profile from '../../assets/images/Profile.png'

import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import colors from '../Global/colors';
import { Colors } from 'react-native-paper';
import getAsync from '../AsynDataFolder/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenerateCommentNotification from '../functions/GenerateComments';

const Comment =({
  state,
  changeState,
  commentList,
  vidId,
  onCommentSent,
  otheruserID
})=>{
const [keyBoardOpen,setKeyBoardOpen]=useState(false)
const [Comment,setComment]=useState("")
const [CommentId,setCommentId]=useState(0)

const [commentData,setCommentData]=useState([])



const [commentReplies,setCommentReplies]=useState([])




const AsynData = getAsync()






///////////////////////COMMENT REPLIES//////////////////////////////



useEffect(()=>{

  
if(Comment === ""){
setCommentId(0)
}
  

  },[Comment])





async function SendReply(){
  
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${AsynData.token}`);

var formdata = new FormData();
formdata.append("user_id", AsynData.myId);
formdata.append("comment_id", CommentId);
formdata.append("comment", Comment);
formdata.append("video_id", vidId);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}commentreply`, requestOptions)
  .then(response => {
    
    FetchReplies(AsynData.token)
    response.text()})
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


async function FetchReplies(token){

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  
  var formdata = new FormData();
  formdata.append("video_id", vidId);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}replylist`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
      setCommentReplies(result.comments)
      console.log("these are replies",result.comments)})
    .catch(error => console.log('error', error));


}







function Reply({commentID}){

const [showReply,setShowReply]=useState(false)


const commentlendgth = commentReplies.filter((item)=>item.comment_id === commentID )

if(showReply === true){


  return(
    <View>

   
{

  commentReplies.map((item)=>{
    return(
      <>
      {item.comment_id === commentID ?
      <Pressable 
      onPress={()=>{
   
      }}
      style={[styles.ListData,{left:60}]}>
     
          <Image
        source={profile}
        style={{width:35,height:35,marginLeft:10}}
        />
        
        <View style={styles.ListInner}>
          <Text style={{color:"white"}}>
      {item.comment}
      </Text>
      <Text style={{color:colors[0].FontColor,marginTop:5,marginBottom:5}}>
      @{item.username}
      </Text>
     <View style={{flexDirection:"row",alignItems:"center"}}>
     {/* <IonIcon
                      name="heart"
                      size={13}
                      color={'white'}
                      />
                      <Text style={{color:"white",marginLeft:5,marginRight:5}}>0</Text> */}
                      
     </View>
 
        </View> 
         
      
      </Pressable>
:
null      }

</>
    )
  })
}


<Text 
onPress={()=>setShowReply(false)}
style={{color:"yellow",fontSize:15,marginLeft:70}} >Hide Replies</Text>


</View>
  )
}else{
  if(commentlendgth.length !=0){
    return(
      <Text 
      
      onPress={()=>setShowReply(true)}
      style={{color:"yellow",fontSize:15,marginLeft:70}} >Show Replies {`(${commentlendgth.length})`}</Text>
  
    )
  }
  else{
    return null
  }
 
}

}



///////////////////////////////////////////////////////////////////



    const KeyExtractor=useCallback((item,index)=>index.toString(),[])


function addFollow(){
  if(Comment !=""){

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${AsynData.token}`);

var formdata = new FormData();
formdata.append("user_id", AsynData.myId);
formdata.append("video_id", vidId);
formdata.append("comment", Comment);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${EndPoints.addComments}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    onCommentSent()
    fetchComments(AsynData.token)
    GenerateCommentNotification(otheruserID,Comment)
  })
  .catch(error => console.log('error', error));
}
}








useEffect(()=>{

  getAsyncData()
  
  },[])



  async function getAsyncData () {
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let user_id=JSON.parse(userid) 

    if(token){
      fetchComments(token)
      FetchReplies(token)
    }
  }


///////////FETCHING COMMENT LIST//////////////////


async function fetchComments(token){


  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  
  var formdata = new FormData();
  formdata.append("video_id", vidId);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${EndPoints.commentlist}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setCommentData(result.comments)
      console.log(result)
  
  })
    .catch(error => console.log('error', error));


}






const renderUser =({item,index})=>(
  <View style={{flexDirection:"column"}}>

    <Pressable 
    onPress={()=>{
 
    }}
    style={styles.ListData}>
      {index===0&&
         <Text style={{fontSize:20,fontWeight:"bold",color:"yellow"}}>1st</Text> 
      }
       {index===1&&
         <Text style={{fontSize:20,fontWeight:"bold",color:colors[0].FontColor}}>2nd</Text> 
      }
        <Image
      source={profile}
      style={{width:35,height:35,marginLeft:10}}
      />
      
      <View style={styles.ListInner}>
        <Text style={{color:"white"}}>
    {item.comment}
    </Text>
    <Text style={{color:colors[0].FontColor,marginTop:5,marginBottom:5}}>
    @{item.username}
    </Text>
   <View style={{flexDirection:"row",alignItems:"center"}}>
   {/* <IonIcon
                    name="heart"
                    size={13}
                    color={'white'}
                    />
                    <Text style={{color:"white",marginLeft:5,marginRight:5}}>0</Text> */}
                    <Text
                    
                    onPress={()=>{
                      
                      setCommentId(item.id)
                      setComment("@"+item.username)}}
                    style={{color:colors[0].FontColor}}>Reply </Text>
   </View>
    {/* {item.lastname}
      </Text>
        <Text style={{fontSize:12}}>
    @{item.username}
      </Text> */}
      </View> 
       
    
    </Pressable>
    <Reply commentID={item.id}/>

    </View>

    )








return(
    

<Modal

animationType={"slide"}


// transparent={false}
visible={state}

>

<View style={styles.container}>
<View style={styles.Header}>
<Text style={{color:"white",fontWeight:"500",fontSize:18}}>
    Comment
</Text>
<Text 
onPress={()=>changeState()}
style={{color:"white",fontWeight:"500",fontSize:18}}>
    Close
</Text>
</View>


<View style={[styles.ListWrapper,{marginBottom:keyBoardOpen===true? -WindowHeight/2.5:0}]}>
  {
    commentData.length >=1?
<FlatList
keyExtractor={KeyExtractor}
data={commentData}
renderItem={renderUser}

/> 
:null}
</View>




















<View style={[styles.CommentWrap]}>
    <View style={styles.commeninput}>
    <TextInput
placeholder='hop on it'
value={Comment}
style={{flex:1,marginLeft:10}}
onChangeText={(e)=>setComment(e)}
onPressIn={()=>setKeyBoardOpen(true)}
onEndEditing={()=>setKeyBoardOpen(false)}

/>
    </View>

<IonIcon 
onPress={()=> {
  if(Comment !=""){

  if( CommentId !=0)
  {
    
    SendReply()
  setComment("")

}
  
  else{
    addFollow()
  setComment("")
  }
}

}}
style={{marginRight:10}}
name='send-sharp'
size={Icon_Size}
color="black"

/>
</View>



</View>


</Modal>
    
)

}
export default Comment