import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';
import Colors from './Colors';
import dgram from 'react-native-udp'
import io from 'socket.io-client';


function validateIP(ip)
{
  const regex = RegExp(/http:\/\/[\d]+\.[\d]+\.[\d]+\.[\d]+:[\d]+\/?/);
  if(regex.test(ip))
  {
    console.log("match");
    styles.connect_btn.backgroundColor=Colors.green;
    return true;
  }else
  {
    styles.connect_btn.backgroundColor=Colors.orange;
    return false;
  }
}
function getNotes()
{
  fetch(`${global.uri}/slides/notes.json`)
        .then(response => response.json())
        .then(data => {global.notes=data; console.log(global.notes);});
}
function btn_press(props,ip)
{
  if(validateIP(ip))
  {
  props.setIp(ip);
  global.socket = io.connect(ip, {
    transports: ['websocket'],
    reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
  });
  global.uri = ip;
  getNotes();
  props.connected();
  }else
  {
  alert("Invaild Ip");
  }
}

function Connect_Screen(props){
  const [text, setText] = React.useState('http://192.168.29.212:5000');

  return (
    <View style={styles.container}>
      <TextInput
      label="Server IP address:port"
      value={text}
      onChangeText={text => {setText(text); validateIP(text);} }
      style={styles.ip_input}
    />
    <Button icon="cast" mode="contained" style={styles.connect_btn} onPress={() => {btn_press(props,text)}}>
      Connect
    </Button>
    </View>
  );
}


export default Connect_Screen;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  ip_input:{
    width: '80%'
  },
  connect_btn:{
    marginTop:30,
    padding:10,
    backgroundColor: Colors.orange
  }
});
