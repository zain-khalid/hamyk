import React,{useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseUrl from "../../configuration/url";
import EndPoints from "../../configuration/EndPoints";
import { Alert } from "react-native";
export default async function DeleteAccount (ChangeState){
   
////////////////////  GETTING ASYNC DATA   ////////////////////////
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let id=JSON.parse(userid) 
if(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var formdata = new FormData();
    formdata.append("user_id", id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}deleteuser`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status==="200"){
            ChangeState()
            AsyncStorage.clear()
        
            Alert.alert("Success","Your account is deleted Sucessfully.")
        }
        console.log(result)})
      .catch(error => console.log('error', error));
}
}



