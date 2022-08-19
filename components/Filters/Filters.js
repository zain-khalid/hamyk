import React from "react";
import { View,Text,TextInput } from "react-native";
import styles from "./Styles";



function Filters (filterType){
const color = filterType.filterType === 1?"rgba(0,0,0,0.0)":
filterType.filterType === 2?"rgba(0,0,0,0.6)":filterType.filterType === 3?"rgba(234,55,10,0.1)":filterType.filterType === 4?

"rgba(0, 88, 143, 0.2)":filterType.filterType ===5?

"rgba(5, 2, 29, 0.41)":filterType.filterType ===6?

"rgba(0, 118, 41, 0.1)":"rgba(0,0,0,0.0)"

return(

<View style={[styles.container,{

backgroundColor:color,


}]
}>
 
   
 </View>
)



}
export default Filters