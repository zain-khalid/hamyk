import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { View,Text,PermissionsAndroid,Platform,Image,Alert } from 'react-native'
import { Camera, sortDevices } from 'react-native-vision-camera'
import styles from './Styles'
import recordBtn from'../../assets/images/record.png'
import recordStarted from'../../assets/images/recording_start.jpg'
import { captureScreen } from "react-native-view-shot";
import { createThumbnail } from "react-native-create-thumbnail";


import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as ImagePicker from 'react-native-image-picker';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import { useNavigation } from '@react-navigation/native'
import SaveVideo from '../SaveVideo/SaveVideo'

const Recorder = () => {
    const navigation = useNavigation()
    const camera = React.useRef(null)
    const [devices, setDevices] = useState([])
    const [camType,setCamType]=useState("back")
    const [camChanged,setCamChanged]=useState(0)
    const [isRecording,setIsRecording]=useState(false)
    const [route,setRoute]=useState("live")
    const [screenShortImage, setScreenShortImage] = useState(null)


    const [counter,setCounter]=useState()
    const [flash,setFlash]=useState("off")
    const [reset,setReset]=useState(false)
        const [shouldShow,setShouldShow]=useState(false)
        const [video,setVideo]=useState(false)

        const[uri,setUri] = useState("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4")



    const device = useMemo(() => devices.find((d) => d.position === camType), [devices])
    const [permissons, setPermissons] = useState(false)

    useEffect(() => {


        loadDevices()
    }, [camChanged])




    useEffect(() => {
        permission()
    }, [])



//////////HIDE MODAL //////////////////




const HideModal =()=>{
    setShouldShow((prev)=>!prev)
    setUri("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4")
}




/////// configuration for video ///////////////////////

    const permission = async()=>{

        if (Platform.OS === 'ios') {
            getPermissons()

        } else {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'Camera Permission Required',
                  message:
                    'Application needs access to your Camera',
                }
              );

              const RecordGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                  title: 'Recording Permission Required',
                  message:
                    'Application needs access to your Recording',
                }
              );



              if (granted === PermissionsAndroid.RESULTS.GRANTED ) {
                // Start downloading
                getPermissons()


              } else {
                // If permission denied then show alert
                Alert.alert('Error','Storage Permission Not Granted');
              }
            } catch (err) {
              // To handle permission related exception
              console.log("++++"+err);
            }
          }




    }



////////////////////SET UP FOR SELECTING VIDEO FROM GALLERY////////////////////
   const permissionForGallery=async ()=>{


    if (Platform.OS === 'ios') {
        SelectFromGallery();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to download File',
            }
          );


          const grantedRead = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to upload file',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
            // Start downloading
            SelectFromGallery();

alert("Download started please wait")

          } else {
            // If permission denied then show alert
            Alert.alert('Error','Storage Permission Not Granted');
          }
        } catch (err) {
          // To handle permission related exception
          console.log("++++"+err);
        }
      }
   }

   async function SelectFromGallery(){
    ImagePicker.launchImageLibrary({ mediaType: 'video', includeBase64: true, }, (response) => {
        if(response.didCancel !=true){

if(response.assets[0].duration > 3 && response.assets[0].duration<=60){
    console.log(response);
    setUri(response.assets[0].uri)
    setRoute("local")
    setShouldShow(true)
}else{
    Alert.alert("Failed","Please upload video more than 3 seconds and lesser than 60 seconds")
}

        }
        else{
            console.log("jedhfk")
        }

    })
   }

/////////////////////////////////////////////////////








    const getPermissons = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus()
        const microphonePermission = await Camera.getMicrophonePermissionStatus()
        if (microphonePermission === 'authorized' && cameraPermission === 'authorized') {
            setPermissons(true)
            loadDevices()
        }
    }

    const loadDevices = async () => {
        try {
            const availableCameraDevices = await Camera.getAvailableCameraDevices()
            const sortedDevices = availableCameraDevices.sort(sortDevices)
            setDevices(sortedDevices)
        } catch (e) {
            console.error('Failed to get available devices!', e)
        }
    }

///////////////////////////////////////////////////////

///////////////START RECORDING/////////////////////////
    const StartRecodingHandler = async()=> {
        // captureScreen({
        //     format: "jpg",
        //     quality: 0.5,
        // })
        // .then((uri) => {
        //     console.log(" >> The screen Short << ", uri)
        //     setScreenShortImage({uri})
        //     // compressVideos(uri)
        // },
        // (error) => {
        //     setLoading(false)
        //     console.error("Oops, snapshot failed", error)}
        // );
        setCounter(0)
        setReset(false)
        setIsRecording(true)

        camera.current.startRecording({
            flash: flash,
            onRecordingFinished: (video) => {
                if(video.duration <= 3){
                    Alert.alert("Too Short","Please Make Video upto 3 seconds")
                } else {
                    setUri(video.path)
                    setShouldShow(true)
                }

                setIsRecording(false)
                setReset(true)
                setCounter()

                console.log(video)

            },
            onRecordingError: (error) => console.error(error, 'videoerror'),
        })
    }





/////////// Counting ///////////////////

useEffect(() => {
    if(reset === false){

        if (counter < 60) {
            const timer = setTimeout(() => {
                setCounter(counter + 1)
                console.log(counter + 1)


            }, 1000);
            return () => clearTimeout(timer);
        }
        else if(counter >=60){
            stopRecodingHandler()
        }
    }
  }, [counter])

//////////////////////////////////////////
//////////STOP RECORDING///////////////////////////////
    async function stopRecodingHandler() {
        await camera.current.stopRecording()
    }
////////////// NO CAMERA CONDITION////////////////////////
    if (device == null) {
        return <Text>Loading......</Text>
    }

    return (
<View>




<View style={styles.Container}>


    {
        screenShortImage ? <Image source={screenShortImage} style={styles.cameraRecording} /> :
        <Camera
            ref={camera}
            style={styles.cameraRecording}
            device={device}
            isActive={true}
            video={true}
            audio={true}
            enableZoomGesture={true}
        />
    }

    <View style={styles.CameraOptions}>






<View style={styles.BottomOptions}>


<FontAwesome
onPress={()=> permissionForGallery()}
style={{marginLeft:20}}
name='photo' size={30} color="white"/>
{
    isRecording === false ?
    <Pressable
onPress={()=>{

    StartRecodingHandler()
    }}
>
<Image
    source={recordBtn}
    style={{width:64,height:64}}

    />
</Pressable>:
<Pressable
onPress={()=>{

    stopRecodingHandler()
    }}
>
<Image
    source={recordStarted}
    style={{width:64,height:64}}

    />
</Pressable>
}






</View>

    </View>
    <View style={styles.TopOptions}>


<MaterialIcons
onPress={() => navigation.goBack()}
style={{marginLeft:10}}
name='arrow-back' size={32} color="white"/>

   {/* <Text style={{color:"white",fontSize:20}}>{counter?counter+":00":"0:00"}</Text> */}
<View style={{flexDirection:"row"}}>
<Ionicons
onPress={()=>{
    if(isRecording ===false){
        camType === "front"?  setCamType("back"):setCamType("front")
        setCamChanged(camChanged+1)
    }

}}
// style={{marginLeft:20}}
name='camera-reverse-outline' size={32} color="white"/>
<MaterialIcons
onPress={()=>{
console.log("fresh")
    flash === "off"? setFlash("on") : setFlash("off")
}}
style={{marginLeft:10,marginRight:10}}
name={flash === "off"?'flash-off':"flash-on"} size={32} color="white"/>

</View>




</View>

        </View>
        {
            shouldShow ===true?
<SaveVideo shouldShow={shouldShow} uri={uri} HideModal={HideModal} route={route} />
        :null}
        </View>
    )
}
export default Recorder
