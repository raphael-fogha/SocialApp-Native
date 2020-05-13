import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import Navigator from './routes/Navigator';

export default class  App extends React.Component {
  
  componentDidMount(){
    // if(!firebase.apps.length){
    //   firebase.initializeApp(fbConfig);
    // }
  }

  
  render(){
  return (
    <Navigator/>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
