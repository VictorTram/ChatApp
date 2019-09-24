import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {GiftedChat } from 'react-native-gifted-chat';
import {MessageVideo} from 'react-native-video';

import Firebase from'../Firebase';


export default class ChatScreen extends React.Component{

    static navigationOptions = (navigation) => ({
        title: "LCO Chat Room",
        headerStyle: {
          backgroundColor: "#fd0759"
        },
        headerTintColor: "#FFF",
    })

    state = {
        messages: []
    }

    get user(){
        return {
            name: this.props.navigation.state.params.name,
            _id: Firebase.shared.uid,
        }
    }

    componentDidMount(){
        Firebase.shared.on(message => 
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message)
            }))
        );
    }

    render(){
        return (
        <GiftedChat
        messages= {this.state.messages}
        user = {this.user}
        onSend={Firebase.shared.send}
        />
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      padding: 10,
    },
  })