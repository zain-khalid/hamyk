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
   Header:{


width:WindowWidth,
height:WindowHeight/11,
backgroundColor:colors[0].primaryColor,
flexDirection:'row',
alignItems:"center",
justifyContent:"space-around",

   },

   OverLayScreen:{

         width:WindowWidth,
         // height:WindowHeight,
         flexDirection:"row",
         position:"absolute",
         bottom:0

   },
   InnerOverLay:{alignItems:"center",alignSelf:"flex-end",width:WindowWidth,
   marginBottom:20

},
InnerOverLayII:{
   width:WindowWidth/2.85,
   flexDirection:"row",
   alignItems:"center",
   // backgroundColor:"yellow",
   justifyContent:"space-between",
   marginLeft:80


},
   Avatar:{
    width:45,height:45
   },
   user_infro_section:{
    width:WindowWidth/1.05,
    height:WindowHeight/4,
    backgroundColor:"black",
    justifyContent:"center"
   },
   SearchBtn:{marginLeft:10,shadowColor:"black",elevation:7,shadowOpacity:1,shadowRadius:2,shadowColor:"black"}

  });

  export default styles