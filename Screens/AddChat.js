import React from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input} from "react-native-elements"
import { Icon } from 'react-native-vector-icons/FontAwesome'
import { firebase } from '../firebase'

const AddChat = ({navigation}) => {
    const [input, setInput]= useState("");
    const db = firebase.firestore();

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle: "Chats"
        });
    },[navigation]);


    const createChat = async()=> {
     await db.collection('chats').add({
         chatName : input,
     }).then(()=>{
         navigation.goBack();
     }).catch((err)=> alert(err))
    }

    return (
        <View styles={styles.container}>
             <Input 
                type="text"
                value={input}
                onChangeText={(text)=> setInput(text)}
                placeholder="Image URL" />
            <Button onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container :  {

    }
})
