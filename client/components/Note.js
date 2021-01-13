import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';
import Colors from './Colors';




function Note(props) {

  const [notes, setNotes] = React.useState();
  React.useEffect(()=>{fetch(`${global.uri}/slides/notes.json`)
        .then(response => response.json())
        .then(data => {setNotes(data); console.log(global.notes);});},[]);
  if(notes == undefined)
  {
     return (
    <View style={styles.notes_container}>
    <ScrollView>
      <Text >
       Loading
      </Text>
    </ScrollView>
    </View>
  )
  }

  return (
    <View style={styles.notes_container}>
    <ScrollView>
      <Text >
       {notes[props.slideNo].note}
      </Text>
    </ScrollView>
    </View>
  )
}
export default Note;
var styles = StyleSheet.create({

  notes_container:{
    height:100,
    backgroundColor:"#EAEDED",
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    padding:10,
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
