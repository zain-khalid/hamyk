import React from "react";
import { View,Text,Modal,Pressable ,StyleSheet,Dimensions, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import colors from "../../Global/colors";
import BaseUrl from "../../../configuration/url";
import getAsync from "../../AsynDataFolder/getAsync";
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height; 
const Delete = ({showModal,OnSetModal,DelId,getUserVideos}) =>{

const AsyncData = getAsync()




function DelVideo (){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${AsyncData.token}`);
    
    var formdata = new FormData();
    formdata.append("id", DelId);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}deletepost`, requestOptions)
      .then(response => response.json())
      .then(result => {
        getUserVideos()
        Alert.alert("Deleted!","Video deleted successfully.")
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
<View style={styles.Container}>

<Text style={styles.Title}>
    Do you want to delete the video ?
</Text>
<View style={styles.ButtonsWrapper}>

<Pressable
onPress={()=> DelVideo()}

style={styles.Button}>
<Text style={styles.ButtonText}>Yes</Text>
</Pressable>
<Pressable 
onPress={()=>{ OnSetModal()}}
style={[styles.Button,{ backgroundColor:colors[0].FontColor}]}>
<Text style={[styles.ButtonText,{color:"black"}]}>No!</Text>
</Pressable>

</View>
              
</View>
            </View>





            </Modal>
    )
}
export default Delete


const styles = StyleSheet.create({
    ContainerI:{
       width:WindowWidth,
       height:WindowHeight,
       backgroundColor:"rgba(0,0,0,0.5)",
 
       justifyContent:"center"},
     
    
 Container:{
    width:WindowWidth/1.3,
    height:WindowHeight/4,
    borderRadius:20,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    shadowColor:"black",
    shadowOpacity:10,
    elevation:10,
    shadowRadius:200,
    alignSelf:"center"
 },
Title:{
    color:"black",
    fontWeight:"bold",
    fontSize:18,
    textAlign:"center"
},
ButtonsWrapper:{
    flexDirection:"row",
    width:WindowWidth/2.7,
    alignItems:"center",
    alignSelf:"center",
    justifyContent:"space-between",
    marginTop:20

},
Button:{
    backgroundColor:colors[0].primaryColor,
    borderRadius:6
},
ButtonText:{
    fontSize:14,
    color:"white",
    marginLeft:20,
    marginRight:20,
    margin:10
}
 
 
   });
 