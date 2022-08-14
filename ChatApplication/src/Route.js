
import { TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import { NavigationContainer,useNavigation} from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Home from "./Screens/Home";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome5";
import Create from "./CreateChat";
import Chat from "./Screens/ChatScreen";
import { navigationRef } from './Components/RootNavigation';



function AddButton(){
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('Create')}>
           <Icon name={"plus"} size={25} color={"#ddd"}/> 
        </TouchableOpacity>
    );
}


const Stack = createNativeStackNavigator();


const Route = () =>{
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    function onAuthStateChanged(user){
        setUser(user);
        if(initializing) setInitializing(false);
    }
    useEffect(()=>{
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    if (initializing) return null;
    if(!user) {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name='Login' component={Login}/>
                    <Stack.Screen name='Register' component={Register}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    return(
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} options={{title:'Rooms', headerTitleAlign:'center',
                headerLeft:()=> (<AddButton/>), 
                headerRight:()=> (<TouchableOpacity onPress={()=>{
                    auth()
                        .signOut()
                        .then(()=> console.log('User Signed out'));
                }} 
                style={{marginRight:10,padding:5}}><Icon name={"sign-out-alt"} size={25} color={"#ddd"}/></TouchableOpacity>)} }/>
                <Stack.Screen name='Create' component={Create} options={{title:'New Chat Room', headerTitleAlign:'center'}}/>
                <Stack.Screen name="Chat" component={Chat} options={{headerRight:() => (<TouchableOpacity style={{marginRight:15, padding:5}}>
                    <Icon name={'trash'} size={17} color={'red'} />
                </TouchableOpacity>)}}/> 
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Route;
