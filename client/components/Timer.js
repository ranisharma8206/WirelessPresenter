import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';
import Colors from './Colors';
import Slide from './Slide';
import Note from './Note';
import Draggable from 'react-native-draggable';





function Timer() {
 const [btnColor,setBtnColor] = React.useState(Colors.green);
 const [btnText,setBtnText] = React.useState("Start");
 const [btnState,setBtnState] = React.useState(false);
 const [timeMain, setTimeMain] =React.useState(0);
 const [timeSeconds, setTimeSeconds] =React.useState("00");
 const [timeMinutes, setTimeMinutes] =React.useState("00");
  React.useEffect(() => {
    const interval = setInterval(() => {updateTime()}, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeMain, btnState]);
 const updateTimeState =()=>{
  seconds = Math.round(timeMain%60);
  minutes = Math.round(timeMain/60);
  if(seconds <= 9 )
  {
    seconds = `0${seconds}`
  }
  if(minutes <= 9)
  {
    minutes =`0${minutes}`
  }
   setTimeSeconds(seconds);
   setTimeMinutes(minutes);
 }
 const updateTime=()=>{
   if(btnState =="started")
   {
     setTimeMain(timeMain+1);
     updateTimeState();
     console.log(timeMain);
   }
 }
 const btnPress = ()=>{
   if(btnState == "stopped")
   {
     setBtnState("started");
     setBtnColor(Colors.red);
     setBtnText("Stop");
   }else
   {
     setBtnState("stopped");
      setBtnColor(Colors.green);
      setBtnText("Start");
   }
 }
  return (  
    <View style={styles.timer_container}>
      <View style={styles.timer_time_container}><Text style={styles.timer_time}>{timeMinutes}:{timeSeconds}</Text></View>
      <Button icon="clock" mode="contained" color={btnColor} onPress={()=>{btnPress()}}>
          {btnText}
      </Button>
    </View>  
  )
}
export default Timer;
var styles = StyleSheet.create({

  timer_container: {
    paddingLeft:20,
    paddingRight: 20,
    marginTop:20,
    justifyContent:'space-between',
    alignItems:"center",
    flexDirection:"row",
  },
  timer_time:
  {
    fontSize:50,
    margin:"auto"
  },
  timer_time_container:
  {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
  },
});
