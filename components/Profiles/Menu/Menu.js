import React from "react";
import { View,Text,Modal,Pressable } from "react-native";
import styles from "./Styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Menu = ({showModal,OnSetModal}) =>{
  const navigation=useNavigation()

function onLogout (){
  AsyncStorage.setItem('login',JSON.stringify("true"))
navigation.navigate("Login")
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
    <View style={styles.UpperPortion}>

<Pressable 
onPress={()=>onLogout()}
style={styles.logout}>
<Icon
              name="ios-log-out"
              style={{marginLeft: 8}}
              size={80}
              color="white"
            />
</Pressable>



    </View>

    <View style={styles.TOS}>
<Text 

onPress={()=>navigation.navigate("Tos")}
style={styles.Text}>
                Terms of Service
              </Text>
              <Text
              
              onPress={()=>navigation.navigate("Policies")}

              style={[styles.Text,{marginTop:10}]}>
              Privacy Policy
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
                Close
              </Text>

</Pressable>
</View>
            </View>





            </Modal>
    )
}
export default Menu