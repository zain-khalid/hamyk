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
    backgroundColor:"black"
   },
   Header:{
      width:WindowWidth/1.2,
      height:WindowHeight/10,
      // backgroundColor:"yellow",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"

   },
   CommentWrap:{
      width:WindowWidth/1.1,
      height:WindowHeight/12,
      backgroundColor:"white",
      borderRadius:15,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
   },
   commeninput:{
      width:WindowWidth/1.2,
      height:WindowHeight/12,
      borderRadius:15,
   },
   ListData:{
      width:WindowWidth/1.05,
      // height:WindowHeight/9,
      // backgroundColor:"blue",

      flexDirection:"row",
      // alignItems:"center",
      marginTop:5
   },
   ListInner:{
      marginLeft:10,
      justifyContent:"space-between"
   },
   ListWrapper:{
      height:WindowHeight/1.3
   }



  });

  export default styles