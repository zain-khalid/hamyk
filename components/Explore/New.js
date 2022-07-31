import React,{useState,useRef, useCallback,useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
 
} from 'react-native';
import styles from './Styles';

import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import RenderVideo from '../VideoRenderer/RenderVideo';
import {getDistance, getPreciseDistance} from 'geolib';

import useLocation from '../Hooks/getLocation';
const itemHeight = Dimensions.get('window').height-60
const Icon_Size = 35


function New ({newVideos}){
  const getLocation = useLocation()

const navigation = useNavigation()
// const [cellRefs,setCellrefs] = useState({})
const cellRefs = useRef()
const [indexx,setIndexx]=useState(0)
// const[myLat,setMyLat]=useState(Number(getLocation.currentLatitude))
// const[myLong,setMyLong]=useState(Number(getLocation.currentLongitude))







/////////Flat list optimizing  functions ////////////////



const KeyExtractor=useCallback((item)=>item.id.toString(),[])
const getItemLayout = useCallback(

(data,index)=>({
length:itemHeight,
offset: itemHeight*index,
index,
        
}),
[]

);

const onViewableItemsChanged = ({ viewableItems, changed })=> {
  console.log("Visible item", viewableItems[0].index);
  
  setIndexx(viewableItems[0].index)
}



const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

const viewabilityConfig = () => {


}









return(
<View style={styles.Container}>
<View style={styles.ListWrapper}>
  {newVideos.length >= 1 ?
<FlatList
 ref={cellRefs}
 data={newVideos}
 initialNumToRender={3}
 windowSize={10}
 maxToRenderPerBatch={3}
 updateCellsBatchingPeriod={10}
 renderItem={({item,index})=>
 
 <RenderVideo  item={item} index={index} indexx={indexx} />
}
keyExtractor={KeyExtractor}
getItemLayout={getItemLayout}
pagingEnabled={true}
viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
/> 
:
<Text style={{textAlign:"center",color:"black"}}>Create your first video by pressing{'\n'} the record button now !</Text>

}
</View>



</View>
)

}
export default New