import React,{useState} from "react";
import { View,Text,Pressable,TouchableOpacity,Modal,FlatList } from "react-native";

import styles from "./Styles";
import years from "./Years";
import Month from "./Month";
import days from "./Days";
import colors from "../Global/colors";
const Calander =({getCalanderData,showCalander})=>{

const [Day,setDays] = useState(0)
const [month,setmonth] = useState(0)
const [year,setYear] = useState(0)



    function Days({item}){
        return(
            <Text
            
            onPress={()=>setDays(item.days)}
            style={[styles.Text,{color:Day===item.days?colors[0].FontColor:"rgba(0,0,0,0.7)"}]}            
            >{item.days}</Text>
        )
        }
        function Year({item}){
            return(
                <Text
                
                onPress={()=>setYear(item.year)}

                style={[styles.Text,{color:year===item.year?colors[0].FontColor:"rgba(0,0,0,0.7)"}]}>{item.year}</Text>
            )
            }
            function Months({item}){
                return(
                    <Text 
                    onPress={()=>setmonth(item.month)}

                    style={[styles.Text,{color:month===item.month?colors[0].FontColor:"rgba(0,0,0,0.7)"}]}                    
                    >{item.month}</Text>
                )
                }
        

    return(
        <Modal
        visible={showCalander}
        transparent={true}
        animationType={"slide"}
        >
            
           

        <View style={styles.Container}>
            
        <View style={styles.Calander}>
<View style={{flexDirection:"row"}}>


<View style={styles.InnerCalander}>
<Text style={{color:colors[0].primaryColor,fontWeight:"bold",margin:5}}>Months</Text>
<FlatList
data={Month}
renderItem={Months}
showsVerticalScrollIndicator={false}
/>

</View>


<View style={styles.InnerCalander}>
<Text style={{color:colors[0].primaryColor,fontWeight:"bold",margin:5}}>Days</Text>

<FlatList
data={days}
renderItem={Days}
showsVerticalScrollIndicator={false}

/>

</View>




<View style={styles.InnerCalander}>
<Text style={{color:colors[0].primaryColor,fontWeight:"bold",margin:5}}>Years</Text>

<FlatList
data={years}
renderItem={Year}
showsVerticalScrollIndicator={false}

/>




</View>


</View>

<Pressable
onPress={()=>getCalanderData(Day,year,month)}
style={{backgroundColor:colors[0].primaryColor,borderRadius:10}}> 
<Text style={{margin:10,color:"white"}}>OK</Text>

</Pressable>

</View>

        </View>
       

        </Modal>
    )
}
export default Calander