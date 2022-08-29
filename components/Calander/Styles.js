import {
    StyleSheet,
   Dimensions
  } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
  import colors from '../Global/colors';

  const WindowWidth = Dimensions.get('window').width
  const WindowHeight = Dimensions.get('window').height; 
  const styles = StyleSheet.create({
 Container:{
    width:WindowWidth,
    height:WindowHeight,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"center",
    alignItems:"center"
 },
 Calander:{
    width:WindowWidth/1.5,
    height:WindowHeight/2.2,
    backgroundColor:"white",
    borderRadius:20,
    borderColor:colors[0].primaryColor,
    borderWidth:1,
       alignItems:"center",
    justifyContent:"space-evenly"
 },
 InnerCalander:{
 alignItems:"center",
width:WindowWidth/5,
height:WindowHeight/2.8,
// backgroundColor:"red",
borderColor:colors[0].FontColor,
borderWidth:0.9,
borderRadius:20,
 },
 Text:
    {fontSize:20,textDecorationLine:"underline",fontWeight:"700",alignSelf:"center"}
 

  });

  export default styles