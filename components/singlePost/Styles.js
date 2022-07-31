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
      backgroundColor:"black",
alignItems:"center",

// justifyContent:"center"

},
titleWrap:{
   // marginTop:10,
   // marginBottom:10,
width:WindowWidth/2.3,
borderRadius:25,
borderColor:colors[0].FontColor,
borderWidth:1,
justifyContent:"center",
alignItems:'center',


},
wrapper:{
width:WindowWidth,
backgroundColor:'rgba(255,255,255,0)',
alignItems:"center" ,
},
backgroundVideo:{
   width:WindowWidth,
   height:WindowHeight,
   // flex:'strech
},

Buttons:{
   width:WindowWidth/2,
   // height:WindowHeight/1.,
   backgroundColor:"black",

},
VideoContainerWrap:{
width:WindowWidth,
height:WindowHeight,
// marginBottom:10,
backgroundColor:"transparent",
justifyContent:"center",
alignItems:"center"



}, 
Divider:{
   width:WindowWidth,
   height:WindowHeight/17,
   backgroundColor:"rgba(0,0,0,0)",
   justifyContent:"center",
   alignItems:"center",
   position:"absolute"

},
ListWrapper:{
   width:WindowWidth,
   height:WindowHeight,
},
VideoOptionsContainer:{
   position:"absolute",
   flexDirection: 'row',
   height:WindowHeight,
   width:'100%',
   backgroundColor:"rgba(0,0,0,0)",
   alignItems:"flex-end"
},
optionsVideo:{
   width:WindowWidth,
   flexDirection:"row",
   justifyContent:"space-around",
   marginBottom:20
},
IconWrapper:{
   alignItems:"center"
},
fontStyling:{
   color:"white",
   fontWeight:'400',
   fontSize:20
},
OverLay_Wrapper:{
   width:WindowWidth,
   height:WindowHeight,
// backgroundColor:"brown",
   position:"absolute"
},
LoaderView:{position:"absolute",marginTop:WindowHeight/2,color:"white"}


  });

  export default styles