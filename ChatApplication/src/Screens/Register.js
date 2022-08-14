import React from "react";
import { SafeAreaView,View,TouchableOpacity,Text,StyleSheet,TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Formik } from "formik";
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth'; 
import firebase from '@react-native-firebase/app';



export default class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            checkbox:false,
            hidePassword:true
        }
    }
    _handleSubmit = (values) => {
        auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName:values.name
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }
                
                if(error.code === 'auth/weak-password'){
                    alert('Weak Password');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }

                console.error(error);
            });
    };
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{backgroundColor:'white', justifyContent:'center', alignItems:'center', padding:50, flex:1}}>
                    <View style={{alignItems:'center'}}>
                        <Text style={style.hero}>Welcome!</Text>
                        <Text style={style.hero_body}>Please provide following details for your new account</Text>
                    </View>

                    <Formik initialValues={{
                        name:'',
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
                                <TextInput value={values.name} onChangeText={handleChange('name')} style={style.input} placeholder={'Name'} placeholderTextColor={'#302D4C'}/>
                                {(errors.name) && <Text style={style.error}>{errors.name}</Text>}
                                <TextInput value={values.email} onChangeText={handleChange('email')} style={style.input} placeholder={'Email'} placeholderTextColor={'#302D4C'}
                                    keyboardType={'email-address'}/>
                                {(errors.email) && <Text style={style.error}>{errors.email}</Text>}
                                <View>
                                    <TextInput value={values.password} onChangeText={handleChange('password')} style={style.input} placeholder={'Password'} 
                                        placeholderTextColor={'#302D4C'} secureTextEntry={this.state.hidePassword} />
                                    <TouchableOpacity style={{position:'absolute', right:15, top:15}} onPress={()=> this.setState({hidePassword:!this.state.hidePassword})}>
                                        <Icon name={(this.state.hidePassword)? "eye-slash" : "eye"} size={20}/>
                                    </TouchableOpacity>
                                    {(errors.password) && <Text style={style.error}>{errors.password}</Text>}

                                    <TouchableOpacity style={style.button} disabled={!isValid || isSubmitting} onPress={handleSubmit}>
                                        <Text style={style.button_text}>Sign up My Account</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.checkbox_area}>
                                    <TouchableOpacity onPress={()=> this.setState({checkbox:!this.state.checkbox})} style={style.checkbox}>
                                        {this.state.checkbox &&
                                            <Text style={{fontSize:25,}}>✓</Text>
                                        }
                                    </TouchableOpacity>
                                    <View style={{flex:1, flexWrap:'nowrap', marginLeft:10}}>
                                        <Text style={style.checkbox_text}>By creating your account you have to agree with our Teams and Conditions.</Text>
                                    </View>
                                </View>

                                <View style={style.bottom}>
                                    <Text style={{fontSize:17, color:'#302D4C'}}>Already have an account? - </Text>
                                    <TouchableOpacity>
                                        <Text style={{fontSize:17, textDecorationLine:'underline', fontWeight:'700', color:'#302D4C'}}>Sign In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )
                        }      
                    </Formik>

                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    hero: {color:'#1C1939', fontWeight:'600', fontSize:38},
    hero_body: {color:'rgba(26,25,57,0.8)', marginTop:15, fontSize:16, fontWeight:'500', textAlign:'center', paddingHorizontal:40},
    form: {flex:1, marginTop:80},
    input: {backgroundColor:'#F7F7F7', padding:15, width:300, height:50, borderRadius:10, paddingHorizontal:25, marginBottom:10},
    forgot: {flexDirection:'row', justifyContent:'flex-end', marginTop:10, color:'#302D4C'},
    button: {backgroundColor:'#7165E3', padding:20, marginTop:45, borderRadius:15, justifyContent:'center', alignItems:'center'},
    button_text: {color:'white', fontWeight:'600', fontSize:18, textAlign:'center'},
    bottom: {flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:35},
    checkbox: {width:32, height:32, backgroundColor:'rgba(113,101,227,0.2)', borderRadius:10, borderWidth:1.5, borderColor:'#7165E3', justifyContent:'center', alignItems:'center'},
    checkbox_area: {flexDirection:'row', alignItems:'center', marginTop:10},
    checkbox_text: {color:'#656379', },
    error: {color:'red', } 
})