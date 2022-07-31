import {
    StyleSheet,
   Dimensions
  } from 'react-native'
  import colors from '../Global/colors';

  const WindowWidth = Dimensions.get('window').width
  const WindowHeight = Dimensions.get('window').height; 
  const globalStyles = StyleSheet.create({

   InputStyle:{color:colors[0].FontColor,flex:1,fontSize:20},
   LoginButton:{
    width:WindowWidth/1.4,
    height:WindowHeight/15,
    backgroundColor:colors[0].primaryColor,
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
        // backgroundColor: '#ff0000',
        // borderRadius: 6,
        // paddingRight: 100,
        // paddingLeft: 100,
    margin:20
   },
   LoginLoading:{
  
        backgroundColor: '#ff0000',
        borderRadius: 6,
        // paddingRight: 100,
        // paddingLeft: 100,
   },
   input_container:{
    width:WindowWidth/1.4,
    height:WindowHeight/15,
    borderBottomColor:colors[0].FontColor,
    borderBottomWidth:1,
    justifyContent:'center',
    alignItems:"center"
   }
  });

  export default globalStyles