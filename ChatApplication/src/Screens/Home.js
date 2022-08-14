import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView,FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from "@react-native-firebase/database";
import firebase from "@react-native-firebase/app";
import RoomItem from '../Components/RoomItem';




export default class Home extends React.Component{
    constructor(){ 
        super();
        this.state = {
            rooms: [] 
        }
    }

    getData = () => {
        database()
            .ref('/rooms') 
            .on('value', snapshot =>{ 
                var rooms = [];
                snapshot.forEach((item)=>{ 
                    rooms.push({
                        name:item.val().name,
                        userName:item.val().userName,
                        userId:item.val().userId,
                        id:item.key
                    })
                })
                this.setState({rooms: rooms});  
            });
    }

    componentDidMount(){
        const user = firebase.auth().currentUser;
        this.getData();
    }

    renderItem = ({item}) => { 
        return <RoomItem item={item}/> 
    }



    render(){
        console.log(this.state.rooms)
        return(
            <SafeAreaView style={{flex:1}}>
                <FlatList
                    style={{flex:1, padding:5}} 
                    data={this.state.rooms} 
                    renderItem={this.renderItem}/>


            </SafeAreaView>
        )
    }
}