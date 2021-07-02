import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    },[navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://business-on-line.fr/wp-content/uploads/2016/10/6a0120a8b67743970b01b7c7ca52af970b-500wi.jpg"
            })
        } )
        .catch((error)=> alert(error.message))
    };

    return (
        <KeyboardAvoidingView behavior= "padding" style={styles.container}>
                <StatusBar style="light"/>
               <Text h3 style={{marginBottom:50}}>Create a Signal account </Text>
               <View style={styles.inputContainer}>
                   <Input 
                        
                        type="text"
                        value={name}
                        placeholder="UserName"
                        onChangeText={(text) => setName(text)} />
                   <Input 
                       
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChangeText={(text)=> setEmail(text)} />
                   <Input 
                         
                        type= "password" 
                        value={password}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)} />
                   <Input 
                        
                        type="text"
                        value={imageUrl}
                        onChangeText={(text)=> setImageUrl(text)}
                        placeholder="Image URL" />
               </View>
               <Button 
                    containerStyle={styles.button} 
                    raised
                    title="Register"
                    onPress={register}
                    />
                <View style={{height:50}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },   
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer :{
        width: 300,
      }
})
