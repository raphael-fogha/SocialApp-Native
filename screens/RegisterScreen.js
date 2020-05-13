import React, { Component } from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';
import firebase from "firebase";
import {Ionicons} from '@expo/vector-icons';

export default class RegisterScreen extends Component {
   
   state = {
       displayName:"",
       email : "",
       password : "",
       errorMessage: null
   }

   handleSignUp = () => {
        const {email, password, displayName} = this.state;

        firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCred) => {
                    userCred.user
                            .updateProfile({displayName: displayName.trim()})
                            
                })
                .catch((err) => this.setState({errorMessage : err.message}))
                // .then(() => console.log('Login successfully'))
                // .catch((err) => this.setState({errorMessage: err.message}))
   }

    render() {
        return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <StatusBar barStyle="light-content"/> 
            <Image 
                source={require('../assets/authHeader.png')}
                style={{marginTop:-160, marginLeft:-50}}/>
            <Image 
                source={require('../assets/authFooter.png')}
                style={{position:'absolute', bottom:-325, right:-225}}/>
            {/* <Image 
                source={require('../assets/loginLogo.png')}
                style={{marginTop:-160, alignSelf:"center"}}/> */}
            
            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"/>
            </TouchableOpacity>

            <View style={{position:"absolute", top:64, alignItems:"center", width:'100%'}}>
                <Text style={styles.greeting} >{"Hello There. \nSign up to get started" }</Text>
                <TouchableOpacity style={styles.avatar}>
                    <Ionicons name="ios-add" size={40} color="#FFF" style={{marginTop: 6, marginLeft: 2}}/>
                </TouchableOpacity>
            </View>


                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                   
                    <View >
                        <Text style={styles.inputTitle}>Name</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={displayName => this.setState({displayName})}
                            value={this.state.displayName}
                        />
                    </View>
                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Email Adress</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={{marginTop:32, marginBottom:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.handleSignUp()}>
                        <Text style={{color: "white", fontWeight:"bold"}}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignSelf:"center", marginTop:24}}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text>
                            Already got an account ? <Text style={{fontWeight:"bold", color:"#AE77F5"}}>Login !</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
             </View>
        </TouchableWithoutFeedback>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        
    },
    greeting:{
        marginTop: -10,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color:'white'
    },
    errorMessage:{
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:30
    },
    error:{
        color:"red",
        fontSize: 12,
        fontWeight: "600",
        textAlign:"center"
    },
    form:{
        marginTop:-15,
        marginBottom: 48,
        marginHorizontal:30
    },
    inputTitle:{
        color:"#8A8F9E",
        fontSize:10,
        textTransform: "uppercase"
    },
    input:{
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color: "#161F3D",
    
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: "#AE77F5",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back:{
        position:"absolute",
        top: 24,
        left: 24,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48,0.1)",
        alignItems:"center",
        justifyContent:"center"
    },
    avatar : {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(21,22,48,0.3)",
        marginTop: 46,
        justifyContent: "center",
        alignItems:"center"
    }
})
