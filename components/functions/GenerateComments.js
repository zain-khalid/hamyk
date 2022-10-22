import React,{useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseUrl from "../../configuration/url";
import EndPoints from "../../configuration/EndPoints";
export default async function GenerateCommentNotification (user_id,Comment){

////////////////////  GETTING ASYNC DATA   ////////////////////////
console.log(user_id)
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let id=JSON.parse(userid) 
if(id){
sendIOS()
SendAndroid()
}



function SendAndroid(){



  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 68A06CABD89016E09CDF76E302782E1A1BCB8C3117015F084A09CC13759C9754");
  
  var raw = JSON.stringify({
    "interests": [
      `${user_id}`
    ],
    "fcm": {
      "notification": {
        "title": "Comment",
        "body": `Someone Commented "${Comment}" on your post`
      }
    }
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://09aff3a0-3b9f-4add-86d4-fb01cb84f27a.pushnotifications.pusher.com/publish_api/v1/instances/09aff3a0-3b9f-4add-86d4-fb01cb84f27a/publishes", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function sendIOS(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer 68A06CABD89016E09CDF76E302782E1A1BCB8C3117015F084A09CC13759C9754");

var raw = JSON.stringify({
  "interests": [
    `${user_id}`
  ],
  "apns": {
    "aps": {
      "alert": {
        "title": "Comment",
        "body": `Someone Commented "${Comment}" on your post`
      }
    }
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://09aff3a0-3b9f-4add-86d4-fb01cb84f27a.pushnotifications.pusher.com/publish_api/v1/instances/09aff3a0-3b9f-4add-86d4-fb01cb84f27a/publishes", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}




}




