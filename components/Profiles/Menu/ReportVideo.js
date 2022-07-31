import React from "react";
import { View,Text,Modal,Pressable, Alert } from "react-native";
import styles from "./Styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import BaseUrl from "../../../configuration/url";
import getAsync from "../../AsynDataFolder/getAsync";
const ReportVideo = ({
  showModal,
  OnSetModal,
  videoId
  

}) =>{
  const navigation=useNavigation()
const AsyncData = getAsync()






function onBlock(){


  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${AsyncData.token}`);
  
  var formdata = new FormData();
  formdata.append("user_id", AsyncData.myId);
  formdata.append("video_id", videoId);
  formdata.append("message", "message");
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}reportvideo`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      Alert.alert("Success","Video is reported, we are looking into it, thankyou for letting us know.")

      
      console.log(result)
    
    })
    .catch(error => console.log('error', error));


    OnSetModal()
    }
    





    return(
        <Modal
        visible={showModal}
        animationType={"slide"}
        transparent={true}
        >
            <View
             style={styles.ContainerI}
            >
<View style={styles.ContainerSmall}>
    

    <View style={styles.TOS}>
<Text 
style={[styles.Text,{textAlign:"center"}]}>
                Do you want to report that video?
              </Text>
              <Text
              
              onPress={()=>onBlock()}

              style={[styles.Text,{marginTop:10,textDecorationLine: 'underline'}]}>
              Yes report it.
              </Text>

             

              </View>
              <Pressable 
              
              onPress={()=> OnSetModal()}
              style={styles.closeModalButton}>
              <Text
                style={{
                  fontFamily: 'avenir',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'white',
                }}>
                NO
              </Text>

</Pressable>
</View>
            </View>





            </Modal>
    )
}
export default ReportVideo