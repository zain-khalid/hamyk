import React,{useState,useEffect,useContext,useReducer} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import recordBtn from'../../assets/images/record.png'
import Icon from 'react-native-vector-icons/AntDesign'
import Search from '../SearchScreen/Search';

const Icon_Size = 35


function BottomButton ({}){
const navigation = useNavigation()
  return(
    <View style={styles.OverLayScreen}>
      <Pressable
        onPress={()=>{navigation.navigate('Recorder')}}
      >
        <Image
          source={recordBtn}
          style={{width:75,height:75}}
        />
      </Pressable>
      <View
        style={styles.SearchBtn}
      >
        <Icon
          onPress={()=>{
            navigation.navigate("Search")
          }}
          name='search1'
          size={Icon_Size}
          color="white"
        />
      </View>
    </View>
  )
}
export default BottomButton