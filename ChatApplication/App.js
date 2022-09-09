/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PushNotification from "react-native-push-notification";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import Route from './src/Route';
//UYGULAMA İKON VE SPLASH SCREEN
//Uygulamamıza hem splash screen hem de ikon eklemek için paket --> "npm install -D @bam.tech/react-native-make"



export default class App extends React.Component{
  render(){
    return(
      <Route/>
    )
  }
}






