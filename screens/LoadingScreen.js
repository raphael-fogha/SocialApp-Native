import React, { Component } from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import fbConfig from "../fbConfig";


export default class LoadingScreen extends Component {

    componentDidMount(){
        if(!firebase.apps.length){
            firebase.initializeApp(fbConfig);
          }
      
        firebase.auth()
                .onAuthStateChanged(user => {
                    this.props.navigation.navigate(user ? "App" : "Auth");
                })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" color="purple" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: "center"
    }
})
