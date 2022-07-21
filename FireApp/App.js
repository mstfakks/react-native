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
  Image
} from 'react-native';
import axios from 'axios'; 
import {Marker} from 'react-native-maps'; 
import MapView from "react-native-map-clustering";


export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      events : [],
      loading:true
    }
  }
  componentDidMount(){
    axios.get(`https://eonet.gsfc.nasa.gov/api/v3/events`)
      .then((res)=>{
        this.setState({
          events:res.data.events,
          loading:false
        })
      })
      .catch((e)=> console.log(e));
  }
  render(){
    const{loading,events} = this.state; 
    return(
      <SafeAreaView style={{flex:1}}>
    {loading 
        ? 
        <View style = {{justifyContent:'center',alignItems:'center',flex:1}}><Text>Loadiing...</Text></View> 
        :
        <MapView initialRegion={{latitude:52.5, longitude:19.2, latitudeDelta:8.5, longitudeDelta:8.5}}
        style={{height:'100%'}}
        >
          {
            events.map(item=> {
              if(typeof item.geometry[0].coordinates[0] != 'object'){
                return <Marker key={item.id}
                title={item.title}
                description={item.description} 
                coordinate={{
                  latitude:item.geometry[0].coordinates[1], 
                  longitude:item.geometry[0].coordinates[0]
                }}>
                  <View style={{backgroundColor:'#64b5f6', justifyContent:'center', alignItems:'center', borderRadius:50, width:30, height:30}}>
                    <Text style={{fontSize:20}}>🔥</Text>
                  </View>
                  
                </Marker>
              }
            })
          }
           
        </MapView>
    }  
      </SafeAreaView>
    )
  }
}