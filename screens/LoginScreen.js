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
    StatusBar,
    LayoutAnimation
} from 'react-native';
import firebase from "firebase";

export default class LoginScreen extends Component {
   
   state = {
       email : "",
       password : "",
       errorMessage: null
   }

   handleLogin = () => {
        const {email, password} = this.state;

        firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => console.log('Login successfully'))
                .catch((err) => this.setState({errorMessage: err.message}))
   }

    render() {

        LayoutAnimation.easeInEaseOut()

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
            <Image 
                source={require('../assets/loginLogo.png')}
                style={{marginTop:-160, alignSelf:"center"}}/>
            


                <Text style={styles.greeting} >{"Hello again. \nWelcome back" }</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Adress</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>

                    <View style={{marginTop:32, marginBottom:24}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.handleLogin()}>
                        <Text style={{color: "white", fontWeight:"bold"}}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignSelf:"center", marginTop:24}}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        <Text>
                            New to SocialApp ? <Text style={{fontWeight:"bold", color:"#AE77F5"}}>Sign Up !</Text>
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
        textAlign: "center"
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
    }
})
