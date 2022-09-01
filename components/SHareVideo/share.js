import React from 'react';
import {

  Share
} from 'react-native';
import EndPoints from '../../configuration/EndPoints';
const onShare = async (video_uri) => {

    try {
      const result = await Share.share({
        message:
          `Tap To Play ${'\n'}${EndPoints.VideoBaseUrl}${video_uri}`,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared

        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed

      }
    } catch (error) {
      alert(error.message);
    }
  };


//   const ShareVideo =(videoId,AsyncData)=>{
//     var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${AsyncData.token}`);

// var formdata = new FormData();
// formdata.append("user_id",AsyncData.myId);
// formdata.append("video_id", id);

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch(`${BaseUrl}sharevideo`, requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
//   }
  export default onShare