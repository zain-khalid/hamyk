import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,

  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getAsync =()=>{
    useEffect(()=>{
        getAsyncData()
        },[])
      
      const [Asyndata,setAsyndata]=useState({
        token:"",
        myId:0
      })
      
      
      
      async function getAsyncData () {
        const userid = await AsyncStorage.getItem('userid')
        const token = await AsyncStorage.getItem('token')
        let user_id=JSON.parse(userid) 
        if(token){
      
      setAsyndata({
        token:token,
        myId:user_id
      })
      
      
        }
      }
      return Asyndata
      
}
export default getAsync