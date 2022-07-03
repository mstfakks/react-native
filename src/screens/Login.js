import React from "react";
import { View,SafeAreaView,StyleSheet,Text,Image,TextInput,TouchableOpacity,ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Formik } from "formik"; 
import * as Yup from "yup"; 
import MainStore from "../store/MainStore";
import { observer } from "mobx-react";
@observer 

export default class Login extends React.Component{
    _handleSubmit = ()=> {
        alert('Form post edildi');
    };
    constructor(){
        super();
        this.state = {hidePassword:true} 
    }

    render(){
        return(
            <SafeAreaView style={style.body}>
                <ScrollView>
                    <View style={style.header}>
                        <Text style={style.title}>Sign In</Text>
                        <Text>{MainStore.name}</Text>
                        <TouchableOpacity onPress={()=> MainStore.setName("x_kisi")}>
                            <Text>Değiştir</Text>
                        </TouchableOpacity> 
                    </View>
                    <View style={style.logo_area}>
                        <Image resizeMode="contain" source={require('../../assets/images/home.png')}/>
                    </View>
                    <View style={style.board}>

                        <Formik initialValues={{
                            username:'',
                            password:''
                        }} onSubmit={this._handleSubmit}
                        validationSchema={Yup.object().shape({
                            username:Yup.string().required('Kullanıcı Adı zorunludur'),
                            password:Yup.string().required('Şifre gereklidir.')
                        })}
                        >
                            {({values, handleSubmit, handleChange,errors}) => ( 
                                                                                 
                            <View>
                            <View style={style.item}>
                                <TextInput value={values.username} onChangeText={handleChange('username')} 
                                style={style.input} placeholder={'Username'}/>  
                                {(errors.username) && <Text style={style.alert}>{errors.username}</Text>}

                            </View>
                            <View style={style.item}>
                                <TextInput style={style.input} placeholder={'Password'}
                                value={values.password} onChangeText={handleChange('password')} secureTextEntry={this.state.hidePassword}
                                />
                                <TouchableOpacity onPress={()=> this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute', right:10, top:15}}>
                                    <Icon name={(this.state.hidePassword) ? "eye-slash" : "eye"} size={20}/>
                                </TouchableOpacity>
                                 {(errors.password) && <Text style={style.alert}>{errors.password}</Text>}
                            </View>
                            <View style={[style.item,{flexDirection:'row', justifyContent:'flex-end'}]}>
                                <Text style={{color:'#525464', fontSize:16}}>Forgot your password?</Text>
                            </View>
                            <View style={style.item}>
                                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                                    <Text style={style.button_text}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            )
                            }
                        </Formik>

                        <View style={[style.item, {justifyContent:'center', alignItems:'center'}]}>
                            <Text style={{color:'#525464'}}>Or</Text>
                        </View>
                        <View style={style.social}>
                            <TouchableOpacity style={style.social_item}>
                                <Icon name={"facebook-f"} color={"#3b5999"} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.social_item}>
                                <Icon name={"twitter"} color={"#55acee"} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.social_item}>
                                <Icon name={"linkedin"} color={"#0077B5"} size={25}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[style.item,]}>
                            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontSize:17, fontWeight:'500', color:'#525464'}}>Don't have an account? <Text style={{color:'#FFB19D',fontWeight:'500'}}>Sign Up</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    body: {backgroundColor:'white', flex:1},
    header:{padding:13, justifyContent:'center', alignItems:'center'},
    title:{fontWeight:'500', fontSize:20, color:'#525464'},
    logo_area:{alignItems:'center', marginTop:40 },
    board:{marginTop:30, paddingHorizontal:30, },
    item:{marginBottom:20, },
    input:{backgroundColor:'#F7F7F7',paddingVertical:10, paddingHorizontal:30, height:50, borderWidth:1, borderColor:'#B0B0C3'},
    button:{backgroundColor:'#20C3AF', paddingVertical:20, borderRadius:5, justifyContent:'center', alignItems:'center', },
    button_text:{textAlign:'center', color:'white', fontSize:17, fontWeight:'700'},
    social:{flexDirection:'row', justifyContent:'space-around', marginBottom:20},
    social_item:{padding:10, borderWidth:1, borderColor:'#E2E2E0', width:100, height:60, justifyContent:'center', alignItems:'center'},
    alert:{color:'red', fontSize:15,}
})