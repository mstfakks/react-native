import React,{useEffect, useState} from "react";
import { View, Text, SafeAreaView, FlatList, TextInput, StyleSheet,TouchableOpacity} from "react-native";
//import Message from "../Components/Message";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import io from 'socket.io-client/dist/socket.io'; 
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from "@react-native-firebase/database";


const connectionConfig = { 
    jsonp:false,
    reconnection:true,
    reconnectionDelay:100,
    reconnectionAttempts:1000,
    transports:['websocket'],
};

export default Chat = ({navigation,route}) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [connectedUser, setConnectedUser] = useState(0);
    
    useEffect(() => {
        const roomId = route.params.id;
        var socket = io('http://localhost:3000',connectionConfig);
        socket.emit('coonection-room',{roomId});
        socket.on('connection-room-view',() => {
            setConnectedUser(data.count)
        })
        database()
            .ref(`messages/${roomId}`)
            .on('value', snapshot =>{
                var messages = [];
                snapshot.forEach((item) => {
                    messages.push({
                        roomId:item.val().roomId,
                        text:item.val().text,
                        userName:item.val().userName,
                        userId:item.val().userId,
                        id:item.key
                    })
                })
                setMessages(messages);
            });
    },[]);
    

    const handleSend = () =>{
        navigation.navigate("Chat", {id:"id"});
        const roomId = route.params.id; 
        const user = firebase.auth().currentUser; 
        const userId = user.uid;
        const userName = user.displayName;
        var database = firebase.database().ref(`messages/${roomId}`);
        database.push({
            roomId,
            text,
            userId,
            userName
        }).then((result) => {
            setText("")
        }).catch((error) => console.log(error));
    }

    const renderItem = ({item})=>{
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        return(
            <View style={(userId != item.userId) ? style.other : style.me}>
                <View style={[style.bubble,{backgroundColor:(userId != item.userId) ? '#EAEAEA' : '#30B485'}]}>
                    <Text style={{fontSize:17, color:(userId != item.userId) ? '#575757' : 'white'}}>{item.text}</Text>
                    <Text style={{fontSize:11, color:(userId != item.userId) ? '#575757' : 'white'}}>{item.userName}</Text>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{padding:10, backgroundColor:'#ddd', justifyContent:'center', alignItems:'center'}}>
                <Text>Connected Users : {connectedUser}</Text>
            </View>
            <FlatList inverted data={messages.reverse()} renderItem={renderItem} style={style.flatlist} />
            <View style={style.input_area}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput style={style.input} placeholder={"Writing"} value={text} onChangeText={text => setText(text)}/>
                    <TouchableOpacity onPress={handleSend}>
                        <Icon style={{marginLeft:10}} color={"#30B485"} name={"paper-plane"} size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
};

const style = StyleSheet.create({
    flatlist:{
        flex:1,
        padding:15,
        backgroundColor:'#F7F9FA'
    },
    input_area:{
        flexDirection:'column',
        justifyContent:'flex-end',
        padding:15,

    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        height:40,
        backgroundColor:'white',
        paddingHorizontal:20,
        color:'black',
        flex:1,
        backgroundColor:'white'
    },
    other:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start'
    },
    me:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
    },
    bubble:{
        padding:20,
        width:150,
        marginBottom:10,
        borderRadius:10
    }
});