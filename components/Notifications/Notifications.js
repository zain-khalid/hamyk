import AsyncStorage from "@react-native-async-storage/async-storage";

import BaseUrl from "../../configuration/url";
import EndPoints from '../../configuration/EndPoints';
import { Notifications } from 'react-native-notifications';
import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';


const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));


export default async function GetAsyncData () {
    const userid = await AsyncStorage.getItem('userid')
    const token = await AsyncStorage.getItem('token')
    let user_id=JSON.parse(userid)
    if(token){
      Start(user_id,token)
    }
  }





  function Start(id,token)

  {
  const Options = {
    taskName: 'hamyk',
    taskTitle: 'hamyk Running',
    taskDesc: 'hamyk',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 5000,
        id:id,
        token:token
    },
    actions: '["Exit"]'
  };

    BackgroundService.start(VeryIntensiveTask, Options);
  }





  async function VeryIntensiveTask(taskDataArguments)
  {
      const { delay } = taskDataArguments;
      const { id } = taskDataArguments;
      const { token } = taskDataArguments;


      await new Promise(async (resolve) => {
          var i = 0;
          for (let i = 0; BackgroundJob.isRunning(); i++) {
              // })

              Fetch_Notification(id,token)

//   Notifications.postLocalNotification({
//     title: "Welcome !",
//     body: "Welcome to hamyk a platform where you will be entertained",
//     extra: "data"
// });

             await sleep(delay);
            }
      });
  }
  function Fetch_Notification (id,token){
if(id&& token){
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("user_id", 11);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${EndPoints.getNotif}`, requestOptions)
  .then(response => response.json())
  .then(result => {

    if(result.status === "300"){

return null
    }else{
sendNotification(result.data)
    }
  })
  .catch(error => console.log('error', error));
}else{
}
  }

function sendNotification (data){


data.map((item)=>{

console.log('notification',item)
Notifications.registerRemoteNotifications();

Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
  data.map((item)=>{
    return(
      Notifications.postLocalNotification({
        title: item.title,
        body: item.body,
        extra: "data"
      })
    )
  }

)
  completion({alert: false, sound: false, badge: false});
});

Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
  console.log(`Notification opened: ${notification.payload}`);
  completion();
});
// return(

//     Notifications.postLocalNotification({
//         title: item.title,
//         body: item.body,
//         extra: "data"
//     })

//     )
})

}




