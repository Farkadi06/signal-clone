import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {AntDesign, SimpleLineIcons, Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'

const ChatScreen = ({navigation, route}) => {
    const [input,setInput] = useState('')
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: ()=>( 
                <View style={{
                    flexDirection:"row",
                    alignItems:"center"
                }}>
                    <Avatar  rounded 
                             source={{
                             uri : "https://business-on-line.fr/wp-content/uploads/2016/10/6a0120a8b67743970b01b7c7ca52af970b-500wi.jpg" }}
                             />
                    <Text style={{color: "white", marginLeft: 10, fontWeight: "700"}}>{route.params.chatName }</Text>
                </View>
            ),
            hearderLeft: ()=>(
                <TouchableOpacity 
                    style={{marginLeft: 10}}
                    onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size= {24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight: ()=> (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                      <AntDesign name="videocamera" size= {24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AntDesign name="phone" size= {24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])


    const sendMessage = ()=>{

    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding": "height"}
                style={styles.container}
                keyboardVerticalOffset = { 100}
                >
                    <>
                        <ScrollView>
                             
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder='Signal Message'
                                style={styles.textInput}
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                    />
                            <TouchableOpacity 
                                activeOpacity={0.5} 
                                onPress={sendMessage}
                            >
                                <Ionicons name="send" size={24} color="#2B68E6"/>
                            </TouchableOpacity>
                        </View>
                    </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC", 
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})
