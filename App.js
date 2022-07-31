/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   StyleSheet,
 } from 'react-native';
 
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import SaveVideo from './components/SaveVideo/SaveVideo';

 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import Login from './components/Login/login';
 import Register from './components/Registeration/Registeration';
 import Home from './components/Home/Home';

 import SinglePost from './components/singlePost/SinglePost';
import Search from './components/SearchScreen/Search';
import OtherUser from './components/Profiles/OtherUser';
import Recorder from './components/Recorder/Recorder';
import TOS from './components/TOS/TOS';
import Policies from './components/TOS/Policies';
const Stack = createNativeStackNavigator();
 
 const Tab = createBottomTabNavigator();
 
 const App =() => {
 return( 
   <NavigationContainer>
   <Stack.Navigator initialRouteName="Login"   screenOptions={{
       headerShown: false
     }} >
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="Register" component={Register} />
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="SinglePost" component={SinglePost} />
     <Stack.Screen name="Search" component={Search} />
     <Stack.Screen name="Recorder" component={Recorder} />
     <Stack.Screen name="SaveVideo" component={SaveVideo} />
     <Stack.Screen name="OtherUser" component={OtherUser} />
     <Stack.Screen name="Tos" component={TOS} />
     <Stack.Screen name="Policies" component={Policies} />
   </Stack.Navigator>
 </NavigationContainer>
 )
 
 };
 

 
 export default App;
 