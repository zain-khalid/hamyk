'use strict';

import React,{useState,useEffect,useRef, useCallback,useMemo} from 'react';
import {
  View,
  Text,

  Dimensions,

} from 'react-native';
import styles from './Styles';

import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import useLocation from '../Hooks/getLocation';
import RenderVideo from '../VideoRenderer/RenderVideo';
const itemHeight = Dimensions.get('window').height-60
const Icon_Size = 35
function VideoFeed({data,callBack,Currentindex}){
  const getLocation=useLocation()
const navigation = useNavigation()
// const [cellRefs,setCellrefs] = useState({})
const cellRefs = useRef()
const [indexx,setIndexx]=useState(0)

const [showModal,setShowModal]=useState(false)
let width = Dimensions.get('window').width;


//////////// get data ///////////////////

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
const snapToInterval = useMemo(() => Dimensions.get('window').height-100 , []);

const onViewableItemsChanged = ({ viewableItems, changed })=> {
  // console.log("Visible item", viewableItems[0].index);

  setIndexx(viewableItems[0].index)
}



const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

const viewabilityConfig = () => {


}


if(Currentindex===2){


return(
<View style={styles.Container}>



<View style={styles.ListWrapper}>
{data.length >=1 ?

<FlatList
 ref={cellRefs}
 data={data.sort((a, b) => b.id - a.id)}
 initialNumToRender={3}
 windowSize={10}
 maxToRenderPerBatch={3}
 updateCellsBatchingPeriod={10}
 renderItem={({item,index})=>

 <RenderVideo  item={item} index={index} indexx={indexx} />
}
keyExtractor={KeyExtractor}
// snapToInterval={snapToInterval}
getItemLayout={getItemLayout}
pagingEnabled={true}
// onViewableItemsChanged={onViewableItemsChanged}
viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
/>
:
<Text style={{textAlign:"center",color:"black"}}>Create your first video by pressing{'\n'} the record button now !</Text>
}
</View>

<View style={styles.Divider}>
<View style={styles.titleWrap}>
<Text style={{fontWeight:'bold',fontSize:16,color:data.length >1?'white':"black",margin:5}}>
  Following
</Text>

      </View>
</View>

</View>
)
}else{
  return(

    <View style={styles.Container}>

  </View>
)
}

}





export default VideoFeed;



// export const VideoFeed = React.memo(Feed);





////////////////////////
// 'use strict';

// import React, {Component} from 'react';
// import {View, Text} from 'react-native';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

// class VideoFeed extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       myText: 'I\'m ready to get swiped!',
//       gestureName: 'none',
//       backgroundColor: '#fff'
//     };
//   }



  // onSwipeLeft(gestureState) {
  //   this.setState({myText: 'You swiped left!'});
  // }

  // onSwipeRight(gestureState) {
  //   this.setState({myText: 'You swiped right!'});
  // }

//   onSwipe(gestureName, gestureState) {
//     const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
//     this.setState({gestureName: gestureName});
//     switch (gestureName) {
//       case SWIPE_UP:
//         this.setState({backgroundColor: 'red'});
//         break;
//       case SWIPE_DOWN:
//         this.setState({backgroundColor: 'green'});
//         break;
//       case SWIPE_LEFT:
//         this.setState({backgroundColor: 'blue'});
//         break;
//       case SWIPE_RIGHT:
//         this.setState({backgroundColor: 'yellow'});
//         break;
//     }
//   }

//   render() {



//     return (
//       <GestureRecognizer
//         onSwipe={(direction, state) => this.onSwipe(direction, state)}
//         onSwipeUp={(state) => this.onSwipeUp(state)}
//         onSwipeDown={(state) => this.onSwipeDown(state)}
//         onSwipeLeft={(state) => this.onSwipeLeft(state)}
//         onSwipeRight={(state) => this.onSwipeRight(state)}
//         config={config}
//         style={{
//           flex: 1,
//           backgroundColor: this.state.backgroundColor
//         }}
//         >
//         <Text>{this.state.myText}</Text>
//         <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
//       </GestureRecognizer>
//     );
//   }
// }

// export default VideoFeed;