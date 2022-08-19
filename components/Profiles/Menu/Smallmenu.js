import React from "react";
import { View,Text,Modal,Pressable, Alert } from "react-native";
import styles from "./Styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import getAsync from "../../AsynDataFolder/getAsync";
import BaseUrl from "../../../configuration/url";
const SmallMenu = ({
  showModal,
  OnSetModal,
  Goback,
  Other_id
}) =>{
  const AsyncData = getAsync()
  const navigation=useNavigation()






function onReport(){
  Goback()

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${AsyncData.token}`);

var formdata = new FormData();
formdata.append("report_by", `${AsyncData.myId}`);
formdata.append("report_to", Other_id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}reportuser`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    Alert.alert("Success","User Reported Successfully")

    console.log(result)})
  .catch(error => console.log('error', error));
}











function onBlock(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${AsyncData.token}`);
  
  var formdata = new FormData();
  formdata.append("block_by", `${AsyncData.myId}`);
  formdata.append("block_to", Other_id);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}block`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
      Alert.alert("Success","User Block Successfully")
      console.log(result)})
    .catch(error => console.log('error', error));
 
    Goback()

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
onPress={()=>onReport()}
style={styles.Text}>
                Report User
              </Text>
              <Text
              
              onPress={()=>onBlock()}

              style={[styles.Text,{marginTop:10}]}>
              Block User
              </Text>

             

              </View>
              <Pressable 
              
              onPress={()=> OnSetModal()}
              style={styles.closeModalButtonI}>
              <Text
                style={{
                  fontFamily: 'avenir',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Close
              </Text>

</Pressable>
</View>
            </View>





            </Modal>
    )
}
export default SmallMenu