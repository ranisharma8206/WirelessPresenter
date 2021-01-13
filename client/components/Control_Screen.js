import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';
import Colors from './Colors';
import Slide from './Slide';
import Note from './Note';
import Timer from './Timer';
import Touch from './Touch';
import Draggable from 'react-native-draggable';
import {ImagePicker} from 'expo';
import { Camera } from 'expo-camera';




function changeFace()
{
  console.log("R");
}
function toggleSpotLight(c,setc)
{
  
  if( c == Colors.grey){
    global.socket.emit('startDarkMode','hello'); 
    setc(Colors.black);
  }else{
    global.socket.emit('stopDarkMode','hello'); 
    setc(Colors.grey)
  }
}


function Control_Screen(props) {
  const [spotlightBtnColor,changeSpotlightBtnColor] = React.useState(Colors.grey);
  const [notes,setNotes] = React.useState([]);
  const [slideNo, setSlideNo] = React.useState(0);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [camera, setCamera] = React.useState(undefined);
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const snap =async()=>{
    console.log("snaping pic");
     let photo = await camera.takePictureAsync({quality:0.2});
    let filename = photo.uri.split('/').pop();

  // Infer the type of the image
     let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
     let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append('photo', { uri: photo.uri, name: "test.jpg", type});
     let f = await fetch("https://wirelessproject.000webhostapp.com/abhi/upload.php", {
      method: 'POST',
      body: formData,
      headers: {
      'content-type': 'multipart/form-data',
      },
      });
      console.log(f);
      let text = await f.text();
      console.log(text);
      global.socket.emit('presentImage','hello');
  }
  
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log(props);
  
  return (
    <View style={styles.container}>
    <Slide setSlideNo={setSlideNo}/>
    <Note notes={notes} slideNo={slideNo}/>
    <Timer />

    <View style={styles.btn_container}>
      <Button icon="upload" mode="contained" style={{backgroundColor:Colors.green}} onPress={() => snap()}>
          Upload
      </Button>
      <Button icon="flashlight" mode="contained" color={spotlightBtnColor} onPress={() => {toggleSpotLight(spotlightBtnColor,changeSpotlightBtnColor)}}>
          Spotlight mode
      </Button>
    </View>
    <Touch />
    <Camera style={{height:50}} type={type} ref={ref => {setCamera(ref);}}></Camera>
    </View>
  )
}
export default Control_Screen;
var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
  },
  
  btn_container:
  {
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    flexDirection:"row",
   justifyContent:"space-between"
  },
  touchArea:
  {
    flex:1,
    backgroundColor:"#EAEDED",
    margin:50,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

elevation: 9,
  }
});
