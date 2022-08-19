import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
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
const Login =({ChangeState})=>{
const navigation = useNavigation()


const [username,setUserName]=useState("")
const [password,setPassword]=useState("")
const [loading,setLoading]=useState(false)

const [submitPressed,setSubmitPressed]=useState(false)




const onSubmit =()=>{
  // navigation.navigate("Home")


if(username && password){
  Login()
}else{
  setSubmitPressed(true)
  setLoading(false)
}

}

const Login = () =>{
  var formdata = new FormData();
formdata.append("email", username);
formdata.append("password", password);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${EndPoints.Signin}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    AsyncStorage.setItem('userid',JSON.stringify(result.user.id))
    AsyncStorage.setItem('token',result.token)
    AsyncStorage.setItem('login',JSON.stringify("true"))
    setLoading(false)
    ChangeState()
    console.log(result)}

    )
  .catch(error => {
    setLoading(false)
    setSubmitPressed(true)
setUserName("")
setPassword("")
    console.log('error', error)});
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

<View style={[styles.input_container,{borderBottomColor:submitPressed===true && username===""?colors[0].primaryColor: colors[0].FontColor}]}>
<TextInput
placeholderTextColor={colors[0].FontColor}
placeholder='Enter your email'
autoCapitalize="none"

value={username}
onChangeText={(e)=>setUserName(e)}
style={styles.InputStyle}
/>
</View>





{submitPressed===true && username===""?
<Text style={{color:colors[0].primaryColor}}>please provide username</Text>
:
null}
<View style={[styles.input_container,{borderBottomColor:submitPressed===true && password===""?colors[0].primaryColor: colors[0].FontColor}]}>
<TextInput
placeholderTextColor={colors[0].FontColor}
placeholder='Enter password'
secureTextEntry={true}
value={password}
autoCapitalize="none"
// secureTextEntry={true}
onChangeText={(e)=>setPassword(e)}
style={styles.InputStyle}
/>
</View>
{submitPressed===true && password===""?
<Text style={{color:colors[0].primaryColor}}>please provide password</Text>
:
null}
<Text
style={{color:colors[0].FontColor,marginTop:50}}
>Forgot Password?</Text>

        </View>

{
  loading ===false?
<Pressable
onPress={()=>{
  setLoading(true)
  onSubmit()}}
  style={globalStyles.LoginButton}
>
<Text style={{color:"white",fontSize:20}}>
  Log in
</Text>
</Pressable>
:
<SpinnerButton
                        buttonStyle={globalStyles.LoginLoading}
                        isLoading={true}
                        spinnerColor=''
                        spinnerType='PulseIndicator'
                        indicatorCount={0}

// onPress={()=>onSubmit()}
>

</SpinnerButton>
}
<Text
        onPress={()=>navigation.navigate("Register")}

style={{color:colors[0].FontColor}}
>Register</Text>
</View>
    </View>
)

}
export default Login