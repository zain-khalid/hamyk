import React,{useState,useEffect,useRef, useCallback,useMemo} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  Modal
} from 'react-native';
import styles from './Styles';

import { useNavigation } from '@react-navigation/native';

import New from './New'
import Top from './Top';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getAsync from '../AsynDataFolder/getAsync';
const itemHeight = Dimensions.get('window').height-60
const Icon_Size = 35


export default  function Explore({TopVideos,
  newVideos,
  Currentindex
}){

const navigation = useNavigation()
const [index,setIndex]=useState(1)
const[latitude,setLat]=useState("")
const[longitutde,setLong]=useState("")


useEffect(()=>{


  getLocalData()
  
  },[])
  
  
async function getLocalData(){
  const lat= await AsyncStorage.getItem("lat")
  const long= await AsyncStorage.getItem("long")
  const _lat = JSON.parse(lat)
  const _long = JSON.parse(long)
  if(_lat){
    setLong(_long)
    setLat(_lat)
  }
}



// const lighColor = newVideos.length >=1 ?"rgba(255,255,255,0.7)": "rgba(0,0,0,0.7)"
// const darkColor=TopVideos.length >=1? "white":"black"
const lighColor = "rgba(0,0,0,0.7)"
const darkColor="black"


if(Currentindex === 1 ){


return(
<View style={styles.Container}>


{latitude != "" ?
  index===1?
  <New newVideos={newVideos} lat={Number(latitude)} long={Number(longitutde)}/>:
  <Top TopVideos={TopVideos} lat={Number(latitude)} long={Number(longitutde)}/>:<Text> </Text>
}

<View style={styles.Divider}>
<View style={styles.titleWrap}>
<Text 

onPress={()=>{
  setIndex(1)}}
style={{fontWeight:'bold',fontSize:index===2? 16:20,color:index===2?lighColor:darkColor,margin:5}}>
  New
</Text>
<Text style={{color:"rgba(0,0,0,0.3)",fontWeight:'bold',fontSize:25}}>|</Text>

<Text 

onPress={()=>setIndex(2)}

style={{fontWeight:'bold',fontSize:index===1? 16:20,color:index===1?lighColor:darkColor,margin:5}}>
    
    Top</Text>

      </View>
</View>

</View>
)
}else{
  return <View style={styles.Container}>

  </View>
}
}
// export default Explore