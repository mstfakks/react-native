import React from "react";
import { View } from "react-native";
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
export default class AuthRedirect extends React.Component{
    componentDidMount(){
        const user = firebase.auth().currentUser;
        if(user){
            console.log('User email:', user.email);
        }
        else{
            console.log('User not found');
        }
    }
    
    
    render(){
        return(
            <View></View>
        )
    }
}