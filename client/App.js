import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';
import Colors from './components/Colors';
import Connect_Screen from './components/Connect_Screen';
import Control_Screen from './components/Control_Screen';
import Draggable from 'react-native-draggable';
import SocketTest from './components/SocketTest';

global.socket = undefined;
global.uri = undefined;
global.notes = undefined;
global.position_x = 0;
global.position_y = 0;
global.oldPosition_x = 0;
global.oldPosition_y = 0;
function App() {

  const [ip,setIp] = React.useState("test ip");
  const [connected,setConnected] = React.useState(false);
  if(!connected)
  {
    return (
      <Connect_Screen ip={ip} setIp={(ip_new)=>{setIp(ip_new);}} connected={()=>{setConnected(true)}} />
      );
  }
  return (
    <Control_Screen />  
  )
}

/*
function App(){
  return(
    <SocketTest />
  );
}
*/
export default App;
var styles = StyleSheet.create({

});
