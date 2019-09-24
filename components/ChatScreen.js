import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default class ChatScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>Chat</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: "#c1c1c1",
      alignItems: "center",
      justifyContent: "center",
    },
  })