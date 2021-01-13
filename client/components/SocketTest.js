import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { TextInput, Button } from 'react-native-paper';
import io from 'socket.io-client';
import dgram from 'react-native-udp'

function pressed()
{
  const socket = dgram.createSocket('udp4')
  socket.bind(12345)
  socket.once('listening', function() {
    socket.send('Hello World!', undefined, undefined, 5001, "192.168.29.212", function(err) {
      if (err) throw err
  
      console.log('Message sent!')
    })
  })
}

function SocketTest(){

    return (
      <View style={styles.container}>
      <Button icon="upload" mode="contained" onPress={() => pressed()}>
          Prev
      </Button>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  },
});
export default SocketTest;