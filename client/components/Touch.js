import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';
import Colors from './Colors';
import Draggable from 'react-native-draggable';





function changeFace()
{
  console.log("R");
}

function Touch() {
  var count = 0;
  // const [oldPosition,setOldPosition] = React.useState({x:0,z:0});
  // const [position, setPosition] = React.useState({x:0,z:0});
  const [random, setRandom] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {moveMouse()}, 100);
    console.log("Rerendered");
    return () => {
      clearInterval(interval);
    };
  }, []);
  const send = (r)=>
  {
     global.socket.emit('move',r);

  }
  const pointerMovementDetected = (event)=>{
    a = event.nativeEvent.pageX;
    b = event.nativeEvent.pageY;
    // setPosition({x:x,z:y})
    global.position_x = a;
    global.position_y = b;
  }
  const moveMouse = ()=>{
    if(global.position_x != global.oldPosition_x || global.position_y != global.oldPosition_y)
    {
      x = global.position_x - global.oldPosition_x;
      y = global.position_y - global.oldPosition_y;
      global.oldPosition_x = global.position_x;
     global.oldPosition_y =global.position_y ;
      send({x:x,z:y});
      console.log(global.position_x, global.position_y);
    }
    
  }
  const resetMouse = (event)=>{
    event.locationX = 0;
    event.locationY = 0;
    console.log("Drag relaesed");
  }
  return (

    <View style={styles.touchArea} >
      <Draggable 
            imageSource={require('../assets/target.png')} 
            renderSize={60} 
            x={100}
            y={80}
            onDrag={(event,gestureState)=>{pointerMovementDetected(event)}}
            onDragRelease={(event,gestureState, bounds)=>resetMouse(event)}
            onLongPress={()=>console.log('long press')}
            onShortPressRelease={()=>console.log('press drag')}
            onPressIn={()=>console.log('in press')}
            onPressOut={()=>console.log('out press')}
        />  
    </View>
  )
}
export default Touch;
var styles = StyleSheet.create({
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
