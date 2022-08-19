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
      backgroundColor:"transparent",
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
   height:WindowHeight-60,
   // flex:'strech'
},

Buttons:{
   width:WindowWidth/2,
   // height:WindowHeight/1.,
   backgroundColor:"black",

},
VideoContainerWrap:{
width:WindowWidth,
height:WindowHeight-60,
// marginBottom:10,
backgroundColor:"black",
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
   height:WindowHeight-60,
   backgroundColor:"black",
},
VideoOptionsContainer:{
   position:"absolute",

   // flexDirection: 'row',
   // height:WindowHeight-60,
   bottom:0,
   width:'100%',
   backgroundColor:"rgba(0,0,0,0)",
   justifyContent:"space-between",
},
optionsVideo:{
   // bottom:0,
   position:"absolute",
   width:WindowWidth,
   flexDirection:"row",
   justifyContent:"space-between",
   marginBottom:20
},
OptionsVideoInnerWrapper:{
   width:WindowWidth/3,
   flexDirection:"row",
   alignItems:"center",
   // backgroundColor:"yellow",
   justifyContent:"space-between"

},
OptionsVideoInnerWrapperI:{
   width:WindowWidth/3,
   flexDirection:"row",
   alignItems:"center",
   // backgroundColor:"yellow",
   // justifyContent:"space-between"

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
   height:WindowHeight-60,
// backgroundColor:"brown",
   position:"absolute"
},
LoaderView:{position:"absolute",marginTop:WindowHeight/2,color:"white"}


  });

  export default styles