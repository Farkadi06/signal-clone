import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Image, Input, Button } from 'react-native-elements';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=> {
            console.log(authUser);
            if(authUser){
                navigation.replace("Home")
            }
        });

        return unsubscribe;
    },[navigation])

    const signIn = ( )=> {
        
    }
    return (
        <KeyboardAvoidingView behavior= "padding" style={styles.container}>
            <StatusBar styles ="light"/>
           <Image source={{
                   uri : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png"
               }}
               style={{width:200, height:200, borderRadius: 3, margin: 20}}/>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" onChangeText={(text)=> setEmail(text) }/>
                <Input placeholder="Password" secureTextEntry type="password" onChangeText={(text)=> setPassword(text) }/>
            </View> 
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={()=> navigation.navigate("Register")} title="Register" type="outline" />
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer :{
      width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
