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
marginBottom:40

// justifyContent:"center"

},

backgroundVideo:{
   width:WindowWidth,
   height:WindowHeight,
   // flex:'strech
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
   justifyContent:"space-between",
   marginBottom:20
},

TopOptions:{
   width:WindowWidth,
   position:"absolute"
}


  });

  export default styles