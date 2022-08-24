/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useEffect} from 'react';
 import {
   StyleSheet,

 } from 'react-native';

 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import SaveVideo from './components/SaveVideo/SaveVideo';

 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import Login from './components/Login/login';
 import Register from './components/Registeration/Registeration';

 import Home from './components/Home/Home';
 import SinglePost from './components/singlePost/SinglePost';
import Search from './components/SearchScreen/Search';
import OtherUser from './components/Profiles/OtherUser';
import Recorder from './components/Recorder/Recorder';
import TOS from './components/TOS/TOS';
import Policies from './components/TOS/Policies';
import { Notifications } from 'react-native-notifications';
import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';
import BaseUrl from './configuration/url';
import EndPoints from './configuration/EndPoints';
import useLocation from './components/Hooks/getLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetAsyncData from './components/Notifications/Notifications';

import Splash from './components/Splash/Splash';

const Stack = createNativeStackNavigator();
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
 const Tab = createBottomTabNavigator();

 const App = () => {
const getLocation=useLocation()
  useEffect(()=>{
    Notifications.postLocalNotification({
      title: "welcome",
      body: "You are using hamyk world's most famous platform",
      extra: "data"
  });
  GetAsyncData()
  Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      Notifications.postLocalNotification({
        title: "welcome",
        body: "You are using hamyk world's most famous platform",
        extra: "data"
    });
      completion({alert: false, sound: false, badge: false});
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened: ${notification.payload}`);
      completion();
    });
  // Notifications.registerRemoteNotifications();

    // getAsyncData()
    },[])
    async function getAsyncData () {
      const userid = await AsyncStorage.getItem('userid')
      const token = await AsyncStorage.getItem('token')
      let user_id=JSON.parse(userid)
      if(token){
        Start(user_id,token)
      }
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


    Notifications.postLocalNotification({
      title: item.title,
      body: item.body,
      extra: "data"
    })

  })

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

 return(
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash"   screenOptions={{
       headerShown: false
    }} >
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="Register" component={Register} />
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="SinglePost" component={SinglePost} />
     <Stack.Screen name="Search" component={Search} />
     <Stack.Screen name="Recorder" component={Recorder} />
     <Stack.Screen name="SaveVideo" component={SaveVideo} />
     <Stack.Screen name="OtherUser" component={OtherUser} />
     <Stack.Screen name="Splash" component={Splash} />

     <Stack.Screen name="Tos" component={TOS} />
     <Stack.Screen name="Policies" component={Policies} />
   </Stack.Navigator>
 </NavigationContainer>
 )

 };



 export default App;
