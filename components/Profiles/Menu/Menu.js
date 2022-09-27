import React from "react";
import { View,Text,Modal,Pressable } from "react-native";
import styles from "./Styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Deactivateccount from "../../functions/DeactivateAccount";
import DeleteAccount from "../../functions/DeleteAccount";
const Menu = ({showModal,OnSetModal,ChangeState}) =>{
  const navigation=useNavigation()

function onLogout (){
  AsyncStorage.clear()
  ChangeState()
}



function onDeletePressed(){
  Alert.alert('Delete Account!','Are you sure you want to delete your account? Once your account is deleted your all data will be deleted.', [
    {
      text: 'Dont delete',
      onPress: () => { },
    },

    {
      text: 'Delete',
      onPress: () => {
        DeleteAccount(ChangeState)
      },
    },
  ]);
}

function onDeactivatePresed(){
  Alert.alert('Deactivate Account!','Are you sure you want to deactivate your account? Your data will not be visible to anyone until you activate again.', [
    {
      text: `Don't deactivate`,
      onPress: () => { },
    },

    {
      text: 'Deactivate',
      onPress: () => {
        Deactivateccount(ChangeState)
      },
    },
  ]);
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

             
              <Text
              
              onPress={()=> onDeletePressed()}

              style={[styles.Text,{marginTop:10}]}>
              Delete Account
              </Text>
              <Text
              
              onPress={()=>onDeactivatePresed()}

              style={[styles.Text,{marginTop:10}]}>
              Deactivate Account
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