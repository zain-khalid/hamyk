import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  Alert,

} from 'react-native';
import styles from './Styles';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import colors from '../Global/colors';
import globalStyles from '../Global/GlobalStyles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import BaseUrl from '../../configuration/url';
import EndPoints from '../../configuration/EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerButton from 'react-native-spinner-button';

const Register =()=>{
const navigation = useNavigation()


 var now = new Date();

const minimum = new Date(
   now.getFullYear() - 13,
   now.getMonth(),
  now.getDate()
);



const [f_name,setF_name]=useState("")
const [l_name,setL_name]=useState("")
const [username,setUserName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [birthday,setBirthday]=useState("")
const [submitPressed,setSubmitPressed]=useState(false)
const [loading,setLoading]=useState(false)


const onSubmit =()=>{

setSubmitPressed(true)


}


const OnRegstration=()=>{
  if(email && password && f_name && l_name && birthday && username ){
    Register()
  }
  else{
    setSubmitPressed(true)
    setLoading(false)
Alert.alert("Failed","Some fields are missing.")
  }
}

const Register = () =>{

  
  var formdata = new FormData();
  formdata.append("password_confirmation", password);
  formdata.append("email", email);
  formdata.append("phone", birthday);
  formdata.append("firstname", f_name);
  formdata.append("lastname", l_name);
  formdata.append("password", password);
  formdata.append("username", username);
  formdata.append("date_of_birth", birthday);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${EndPoints.Registration}`, requestOptions)
    .then(response => 
      
      
      response.json())
    .then(result => {
      
      if(result.user){

        AsyncStorage.setItem('userid',JSON.stringify(result.user.id))
        AsyncStorage.setItem('token',result.token)
        AsyncStorage.setItem('login',JSON.stringify("true"))
        navigation.navigate("Home")

        setLoading(false)



      }
      console.log(result)})
    .catch(error => console.log('error', error));
}








return(
    <View style={styles.container}>
      <View
      style={styles.innerView}
      >

    
        <Text
        style={styles.Text_logo}
        >hamyk</Text>
        <View style={styles.Mid_View}>


<View style={styles.Input_small_cont}>
<View style={[styles.Input_two,{borderBottomColor:submitPressed ===true && f_name===""? colors[0].primaryColor:colors[0].FontColor}]}>
<TextInput 
value={f_name}
onChangeText={(e)=>setF_name(e)}
autoCapitalize={"words"}

placeholderTextColor={colors[0].FontColor}
placeholder='First name'
textAlign='center'


style={styles.InputStyleI}
/>
</View>
<View style={[styles.Input_two,{borderBottomColor:submitPressed ===true && l_name===""? colors[0].primaryColor:colors[0].FontColor}]}>
<TextInput
value={l_name}
autoCapitalize={"words"}
onChangeText={(e)=>setL_name(e)} 
placeholderTextColor={colors[0].FontColor}
placeholder='Last name'
textAlign='center'


style={styles.InputStyleI}
/>
</View>
</View>

<View style={[styles.input_container,{borderBottomColor:submitPressed ===true && username===""? colors[0].primaryColor:colors[0].FontColor}]}>
<TextInput 
value={username}
autoCapitalize={"none"}
onChangeText={(e)=>setUserName(e)}
placeholderTextColor={colors[0].FontColor}
placeholder='@handle'
textAlign='center'

style={styles.InputStyle}
/>
</View>
<View style={[styles.input_container,{borderBottomColor:submitPressed ===true && email===""? colors[0].primaryColor:colors[0].FontColor}]}>
<TextInput 
value={email}
autoCapitalize={"none"}

onChangeText={(e)=>setEmail(e)}
placeholderTextColor={colors[0].FontColor}
placeholder='Email'
textAlign='center'

style={styles.InputStyle}
/>
</View>
<View style={[styles.input_container,{borderBottomColor:submitPressed ===true && password===""? colors[0].primaryColor:colors[0].FontColor}]}>
<TextInput 
value={password}
autoCapitalize={"none"}

onChangeText={(e)=>setPassword(e)}
placeholderTextColor={colors[0].FontColor}
placeholder='Password'
textAlign='center'

style={styles.InputStyle}
/>
</View>
<View style={[styles.input_container,{borderBottomColor:submitPressed ===true && birthday===""? colors[0].primaryColor:colors[0].FontColor}]}>
<TextInput 
value={birthday}
onChangeText={(e)=>setBirthday(e)}
placeholderTextColor={colors[0].FontColor}
placeholder='Birthday'
textAlign='center'
style={styles.InputStyle}
/>
</View>


        </View>

{
  loading===false ?

<Pressable 
onPress={()=>{
  setLoading(true)
  OnRegstration()}}
style={globalStyles.LoginButton}
>
<Text style={{color:"white",fontSize:20}}>
  Register
</Text>
</Pressable>:
<SpinnerButton
                        buttonStyle={globalStyles.LoginLoading}
                        isLoading={true}
                        spinnerType='PulseIndicator'
                        indicatorCount={0}
                    
// onPress={()=>onSubmit()}
>

</SpinnerButton>

}
<Text
        onPress={()=>navigation.goBack()}

style={{color:colors[0].FontColor}}
>Login</Text>
</View>
    </View>
)

}
export default Register