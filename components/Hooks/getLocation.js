import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function useLocation () {
    const [location, setLocation] = useState("Ss");

  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        // subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            // subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(requestLocationPermission);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        AsyncStorage.setItem("lat",JSON.stringify(currentLatitude))
AsyncStorage.setItem("long",JSON.stringify(currentLongitude))
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
        setLocation({currentLatitude,currentLongitude})

      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

//   const subscribeLocationLocation = () => {
//     watchID = Geolocation.watchPosition(
//       (position) => {
//         //Will give you the location on location change

//         setLocationStatus('You are Here');
//         console.log(position);

//         //getting the Longitude from the location json
//         const currentLongitude =
//           JSON.stringify(position.coords.longitude);

//         //getting the Latitude from the location json
//         const currentLatitude =
//           JSON.stringify(position.coords.latitude);

//         //Setting Longitude state
//         setCurrentLongitude(currentLongitude);
// AsyncStorage.setItem("lat",JSON.stringify(currentLatitude))
// AsyncStorage.setItem("long",JSON.stringify(currentLongitude))

//         //Setting Latitude state
//         setCurrentLatitude(currentLatitude);

//         setLocation({currentLatitude,currentLongitude})

//       },
//       (error) => {
//         setLocationStatus(error.message);
//       },
//       {
//         enableHighAccuracy: false,
//         maximumAge: 1000
//       },
//     );
//   };
  return location

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
});

