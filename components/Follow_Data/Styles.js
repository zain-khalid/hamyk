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
   //  height:WindowHeight,
    // justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
   },
   Header:{
      width:WindowWidth,
      // height:WindowHeight/18,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      margin:5,
      marginTop: 50
   },
   SearchWrapper:{
      width:WindowWidth/1.1,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:'space-between'
      // backgroundColor:"grey"
   },
   searchInput:{
      width:WindowWidth/1.3,
      height:WindowHeight/22,
      backgroundColor:"rgba(0,0,0,0.1)",
      alignItems:"center",
      flexDirection:"row",
      borderRadius:10

   },
   ListData:{
      width:WindowWidth/1.1,
      // height:WindowHeight/22,
      borderBottomColor:colors[0].FontColor,
      borderBottomWidth:1,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
   },
   FollowingBtn:{
      borderRadius:8,
      backgroundColor:"#35729B"

   }


  });

  export default styles