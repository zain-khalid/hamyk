import React ,{useEffect, useState} from "react";
import { Text,View,Image } from "react-native";
import splash from '../../assets/images/splash.jpg'
 import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
 import Home from "../Home/Home";
 import Login from "../Login/login";
 import Register from "../Registeration/Registeration";
 import { useIsFocused } from "@react-navigation/native";
export default function Splash(){
    const isFocused=useIsFocused()
    const navigation = useNavigation()
    const [loading,setLoading]=useState(true)
    const [Loggedin,setLogin]=useState(false)
    const [shouldReload,setShouldReload]=useState(false)


    useEffect(()=>{

        GetAsyncData()


        const timer = setTimeout(() => {
           
            setLoading(false)
            
        }, 4000);
        return () => clearTimeout(timer);


        },[])
        useEffect(()=>{

            GetAsyncData()
            },[shouldReload])
        

            useEffect(()=>{

                GetAsyncData()
           
                },[isFocused])
            


async function GetAsyncData(){

  const isLogin =await  AsyncStorage.getItem("login")
const _isLogin = JSON.parse(isLogin)
if(_isLogin ==="true"){
   setLogin(true)
}
}
function ChangeState(){
    setLogin(false)
    setShouldReload(true)
}
function ChangeLoginState(){
    GetAsyncData(true)
}


if(loading===true){

    return(
        <Image
        source={splash}
        style={{width:"100%",height:"100%"}}
        />
        )
}else if(loading === false && Loggedin === true){
    return (
        <Home ChangeState={ChangeState}/>
    )
}
else if(loading === false && Loggedin === false){
    return (

    // <Login  ChangeState={ChangeLoginState}/>
    <Register  ChangeState={ChangeLoginState}/>
    )
}

}