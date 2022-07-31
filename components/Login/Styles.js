import {
    StyleSheet,
   Dimensions
  } from 'react-native'
  import colors from '../Global/colors';

  const WindowWidth = Dimensions.get('window').width
  const WindowHeight = Dimensions.get('window').height; 
  const styles = StyleSheet.create({
   container:{
    width:WindowWidth,
    height:WindowHeight,
    // justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
   },
   innerView:{marginTop:WindowHeight/6,alignItems:"center"},
   Text_logo:{
    color:'red',
    fontSize:55,
    fontWeight:"400"
   },
   Mid_View:{
    width:WindowWidth,
    height:WindowHeight/3,
    // backgroundColor:"black",
    justifyContent:'center',
    alignItems:"center"
   },
   input_container:{
    width:WindowWidth/1.4,
    height:WindowHeight/15,
    borderBottomColor:colors[0].FontColor,
    borderBottomWidth:1,
    // justifyContent:'center',
    // alignItems:"center"
   },
   InputStyle:{color:colors[0].FontColor,flex:1,fontSize:20,alignSelf:"center"}
  });

  export default styles