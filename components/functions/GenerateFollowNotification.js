import React,{useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseUrl from "../../configuration/url";
import EndPoints from "../../configuration/EndPoints";
export default async function GenerateFollowers (user_id){

////////////////////  GETTING ASYNC DATA   ////////////////////////


    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let id=JSON.parse(userid) 
if(id,token){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var formdata = new FormData();
    formdata.append("title", "Follower");
    formdata.append("body", `You have got a new follower check out now!`);
    formdata.append("sender_id",id);
    formdata.append("reciever_id", user_id);
    formdata.append("sendr_username", "sarib");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}${EndPoints.makeNotification}`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        console.log("go rundds")

         console.log(result)})
      .catch(error => console.log('error', error));
}
  

  



}