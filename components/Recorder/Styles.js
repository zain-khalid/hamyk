import {
    StyleSheet,
   Dimensions
  } from 'react-native'
import { Divider } from 'react-native-paper';
  import colors from '../Global/colors';
  const WindowWidth = Dimensions.get('window').width
  const WindowHeight = Dimensions.get('window').height; 
  const styles = StyleSheet.create({
   Container:{
      width:WindowWidth,
      height:WindowHeight,
      backgroundColor:"brown"
 

},
cameraRecording:{
   width:WindowWidth,
   height:WindowHeight,
},
CameraOptions:{
   position:"absolute",
   width:WindowWidth,
   height:WindowHeight,
   backgroundColor:"rgba(0,0,0,0.2)",
   flexDirection:"row"
},



BottomOptions:{
width:WindowWidth/1.75,
// height:WindowHeight/7,
// backgroundColor:"grey",
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
alignSelf:"flex-end",
marginBottom:40
},
TopOptions:{
   width:WindowWidth,
position:"absolute",
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center",
   }


  });

  export default styles