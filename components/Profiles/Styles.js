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
alignItems:"center"
   },
   headers:{
width:WindowWidth,
height:WindowHeight/15,
   },
 
   Avatar:{
    width:105,height:105,marginTop:-20
   },
   user_infro_section:{
    width:WindowWidth/1.2,
    height:WindowHeight/4.7,
   //  backgroundColor:"blue",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
    marginTop:10
   },
   user_info_inner:{
      width:WindowWidth/2.2,
      height:WindowHeight/4,
      // backgroundColor:'yellow',
      // justifyContent:'center',
      alignItems:'center',
   },
   Infor_dividing_view:{
      width:WindowWidth/2.2,
      height:WindowHeight/8,
      flexDirection:"row",
      // backgroundColor:'brown',
      justifyContent:'space-between',
      alignItems:'center',
      borderBottomColor:colors[0].FontColor,
  
   },
   Infor_dividing_viewI:{
      width:WindowWidth/2.2,
      // height:WindowHeight/8,
 
  
   },
   followSection:{
      alignItems:"center"
   },
Options:{
   width:WindowWidth/1.2,
   justifyContent:"space-between",
   flexDirection:"row",
   marginTop:20
   // backgroundColor:'black'

},
ListView:{
   width:WindowWidth,
   height:WindowHeight/3,
   backgroundColor:"black",
   marginBottom:10,
alignItems:"center"},
ListBottom:{
   width:WindowWidth/1.04,
   height:WindowHeight/6,
flexDirection:'row',
   // alignSelf:'flex-end',
},
ListBottomI:{
   width:WindowWidth/1.04,
flexDirection:'row',
justifyContent:"space-between",
   alignSelf:'flex-end'
},
FollowingBtn:{
   borderRadius:8,
   backgroundColor:"#35729B",
   justifyContent:"center",
   alignItems:"center",
   marginTop:5
   
}


  });

  export default styles