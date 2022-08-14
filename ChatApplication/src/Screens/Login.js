import React from "react";
import { SafeAreaView,View,TouchableOpacity,Text,StyleSheet,TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";


import { Formik } from "formik";
import * as Yup from 'yup';
import Icon from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth'; 
import firebase from '@react-native-firebase/app';

export default function Root(){
    const navigation = useNavigation()
    return <Login navigation = {navigation}/>
}


class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            hidePassword:true
        }
    }

    _handleSubmit = (values) => {
        auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                //navigation.navigate('Home');
                alert('giriş yapıldı');
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong Password')
                    return;
                }

                if (error.code === 'auth/user-not-found') {
                    alert('User Not Found')
                    return;
                }

                console.error(error);
            });

    };

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{backgroundColor:'white', justifyContent:'center', alignItems:'center', padding:50, flex:1}}>
                    <View style={{alignItems:'center'}}>
                        <Text style={style.hero}>Welcome Back!</Text>
                        <Text style={style.hero_body}>Sign in to continue</Text>
                    </View>

                    <Formik initialValues={{
                        email:'',
                        password:''
                        }} 
                        onSubmit={this._handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                email:Yup.string().email().required('Email address is required'),
                                password:Yup.string().required('Password is required')
                            })
                        }
                    >
                        {
                                ({
                                  values, 
                                  handleSubmit, 
                                  isValid, 
                                  isSubmitting, 
                                  errors, 
                                  handleChange
                                }) => (
                                        <View style={style.form}>
                                            <TextInput value={values.email} onChangeText={handleChange('email')} style={style.input} placeholder={'Email'} placeholderTextColor={'#302D4C'}
                                                keyboardType={'email-address'}/>
                                            {(errors.email) && <Text style={style.error}>{errors.email}</Text>}
                                            <View>
                                                <TextInput value={values.password} onChangeText={handleChange('password')} style={style.input} placeholder={'Password'} 
                                                    placeholderTextColor={'#302D4C'} secureTextEntry={this.state.hidePassword}/>
                                                {(errors.password) && <Text style={style.error}>{errors.password}</Text>}
                                                <TouchableOpacity onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute', right:15, top:15}}>
                                                    <Icon name={(this.state.hidePassword) ? "eye-slash" : "eye"} size={20}/>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={style.forgot}>
                                                <Text>Forgot Password ?</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={style.button} disabled={!isValid} onPress={handleSubmit}>
                                                <Text style={style.button_text}>Sign in My Account</Text>
                                            </TouchableOpacity>
                                            <View style={style.bottom}>
                                                <Text style={{fontSize:17, color:'#302D4C'}}>Don't have an account? - </Text>
                                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>
                                                    <Text style={{fontSize:17, textDecorationLine:'underline', fontWeight:'700', color:'#302D4C'}}>Sign Up</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                    </Formik>
                </View>
            </SafeAreaView>
        );
    };
};

const style = StyleSheet.create({
    hero: {color:'#1C1939', fontWeight:'600', fontSize:38},
    hero_body: {color:'rgba(26,25,57,0.8)', marginTop:15, fontSize:16, fontWeight:'500'},
    form: {flex:1, marginTop:80},
    input: {backgroundColor:'#F7F7F7', padding:15, width:300, height:50, borderRadius:10, paddingHorizontal:25, marginBottom:10},
    forgot: {flexDirection:'row', justifyContent:'flex-end', marginTop:10, color:'#302D4C'},
    button: {backgroundColor:'#7165E3', padding:20, marginTop:45, borderRadius:15, justifyContent:'center', alignItems:'center'},
    button_text: {color:'white', fontWeight:'600', fontSize:18, textAlign:'center'},
    bottom: {flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:20},
    error: {color:'red'} 
});