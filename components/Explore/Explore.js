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


const itemHeight = Dimensions.get('window').height-60
const Icon_Size = 35


const Explore =({TopVideos,newVideos})=>{

const navigation = useNavigation()
const [index,setIndex]=useState(1)



const lighColor = newVideos.length >=1 ?"rgba(255,255,255,0.7)": "rgba(0,0,0,0.7)"
const darkColor=TopVideos.length >=1? "white":"black"

return(
<View style={styles.Container}>


{
  index===1?
  <New newVideos={newVideos}/>:
  <Top TopVideos={TopVideos}/>
}

<View style={styles.Divider}>
<View style={styles.titleWrap}>
<Text 

onPress={()=>{
  setIndex(1)}}
style={{fontWeight:'bold',fontSize:index===2? 16:20,color:index===2?lighColor:darkColor,margin:5}}>
  New
</Text>
<Text style={{color:"white",fontWeight:'bold',fontSize:25}}>|</Text>

<Text 

onPress={()=>setIndex(2)}

style={{fontWeight:'bold',fontSize:index===1? 16:20,color:index===1?lighColor:darkColor,margin:5}}>
    
    Top</Text>

      </View>
</View>

</View>
)

}
export default Explore