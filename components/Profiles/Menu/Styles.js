import {
    StyleSheet,
   Dimensions
  } from 'react-native'
import colors from '../../Global/colors';

  const WindowWidth = Dimensions.get('window').width
  const WindowHeight = Dimensions.get('window').height; 
  const styles = StyleSheet.create({
   ContainerI:{
      width:WindowWidth,
      height:WindowHeight,
      backgroundColor:"rgba(0,0,0,0.5)",

      justifyContent:"center"},
    
   
Container:{
   width:WindowWidth/1.3,
   height:WindowHeight/1.7,
   borderRadius:20,
   backgroundColor:"white",
   alignItems:"center",
   shadowColor:"black",
   shadowOpacity:10,
   elevation:10,
   shadowRadius:200,
   alignSelf:"center"
},
ContainerSmall:{
  width:WindowWidth/1.3,
  height:WindowHeight/3,
  borderRadius:20,
  backgroundColor:"white",
  alignItems:"center",
  shadowColor:"black",
  shadowOpacity:10,
  elevation:10,
  shadowRadius:200,
  alignSelf:"center",
  justifyContent:"center"
},
UpperPortion:{
   width:WindowWidth/1.5,
   height:WindowHeight/4.2,
   justifyContent:"center",
   alignItems:'center',
   borderRadius:20,
   borderBottomColor:'rgba(0,0,0,0.8)',
   borderBottomWidth:0.8,

},
logout: {
   alignSelf: 'center',
   backgroundColor: 'red',
   justifyContent: 'center',
   alignItems: 'center',
   height: 85,
   width: 85,
   borderRadius: 100 / 2,
 },
 TOS:{
   margin:10,
   alignItems:"center"
 },
 Text:{color:"black",fontSize:15,textDecorationLine:'underline'},
 closeModalButton: {
   backgroundColor: '#FE2905',
   borderRadius: 40,
   height: 45,
   justifyContent: 'center',
   alignItems: 'center',
   width: 120,
   alignSelf: 'center',
   margin:50
 },
 closeModalButtonI: {
  backgroundColor: '#FE2905',
  borderRadius: 40,
  height: 35,
  justifyContent: 'center',
  alignItems: 'center',
  width: 120,
  alignSelf: 'center',
},



  });

  export default styles