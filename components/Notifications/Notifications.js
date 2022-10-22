import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import { Notifications } from 'react-native-notifications';

import RNPusherPushNotifications from 'react-native-pusher-push-notifications';


const id = "09aff3a0-3b9f-4add-86d4-fb01cb84f27a"
const donutsInterest = 'debugg-';
export default async function GetAsyncData () {
  const userid = await AsyncStorage.getItem('userid')
  let user_id=JSON.parse(userid) 

  if(user_id){

    init(user_id)


  }

  }
  // Initialize notifications
   const init = (user_id) => {
    console.log(user_id)
    // Set your app key and register for push
    RNPusherPushNotifications.setInstanceId(id);
  
    // Init interests after registration
    RNPusherPushNotifications.on('registered', () => {
      if (Platform.OS === 'ios') {
        setSubscriptions(`${user_id}`);

      }
      else{
        subscribe(`${user_id}`);

      }

    });
    // Setup notification listeners
    RNPusherPushNotifications.on('notification', handleNotification);
    // Optionally you can assign the listeners to variables so you can clean them up later.
    //    const listener = RNPusherPushNotifications.on('registered', () => {});
    //    listener.remove();
  };
  // Handle notifications received
  const handleNotification = notification => {
    console.log(notification)
    // console.log(notification);
    // iOS app specific handling
    if (Platform.OS === 'ios') {
      switch (notification.appState) {
        case 'inactive':
    
        // inactive: App came in foreground by clicking on notification.
        //           Use notification.userInfo for redirecting to specific view controller
        case 'background':
          console.log('back ground',notification);

        // background: App is in background and notification is received.
        //             You can fetch required data here don't do anything with UI
        case 'active':
          Notifications.postLocalNotification({
            title: notification.title,
            body: notification.body,
            extra: "data"
        })
        // App is foreground and notification is received. Show a alert or something.
        default:
          break;
      } 
    }
    else {

      Notifications.postLocalNotification({
        title: notification.title,
        body: notification.body,
        extra: "data"
    })

  }
  };
  // Subscribe to an interest
  const subscribe = interest => {
    // Note that only Android devices will respond to success/error callbacks
    RNPusherPushNotifications.subscribe(
      interest,
      (statusCode, response) => {
        console.error(statusCode, response);
      },
      () => {
        console.log('Success');
      }
    );
  };






  const setSubscriptions = interest => {
    // Note that only Android devices will respond to success/error callbacks
    RNPusherPushNotifications.setSubscriptions(
      interest,
      (statusCode, response) => {
        console.error(statusCode, response);
      },
      () => {
        console.log('Success');
      }
    );
  };




  // Unsubscribe from an interest
  const unsubscribe = interest => {
    RNPusherPushNotifications.unsubscribe(
      interest,
      (statusCode, response) => {
        console.tron.logImportant(statusCode, response);
      },
      () => {
        console.tron.logImportant('Success');
      }
    );
  };  