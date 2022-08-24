import { StyleSheet,Dimensions } from 'react-native'
import colors from '../Global/colors';

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
container:{
   width:WindowWidth,
   height:WindowHeight,
   alignItems:"center",
   backgroundColor:"white"
},
Header:{
width:WindowWidth,
height:WindowHeight/9,
backgroundColor:colors[0].primaryColor,
flexDirection:'row',
alignItems:"center",
justifyContent:"space-around",
paddingTop:30
},

OverLayScreen:{
   bottom:0,
   left:170,
   marginBottom:20,
   position:"absolute",
   flexDirection:"row",
   alignItems:"center",
},
Avatar:{
   width:45,
   height:45
},
user_infro_section:{
   width:WindowWidth/1.05,
   height:WindowHeight/4,
   backgroundColor:"black",
   justifyContent:"center"
},
SearchBtn:{
   marginLeft:30,
   shadowColor:"black",
   elevation:7,
   shadowOpacity:1,
   shadowRadius:2,
   shadowColor:"black"
}

});

  export default styles