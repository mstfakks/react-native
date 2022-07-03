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
  useColorScheme,
  View,
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import MainStore from './src/store/MainStore'; 
export default class App extends React.Component{

  componentDidMount = async ()=> {
    console.log(MainStore.getName());
  }
  render(){
    return(
      <View>
        <Text>Merhaba</Text>
      </View>
    )
  }
}

