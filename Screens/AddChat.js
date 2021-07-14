import React from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input} from "react-native-elements"
import { Icon } from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const AddChat = ({navigation}) => {
    const [input, setInput]= useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle: "Chats"
        });
    },[navigation]);


    const createChat = async()=> {
        
    }

    return (
        <View styles={styles.container}>
            <Input 
                placeholder="Enter a chat name"
                value={input}
                onChange={(text) => setInput(text)}
                onSubmitEditing={createChat}
                />
            <Button onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container :  {

    }
})
