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
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { db,auth, firebase } from '../firebase'

const ChatScreen = ({navigation, route}) => {
    const [input,setInput] = useState('')
    const [messages,setMessages] = useState([])
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
                             uri : messages[0]?.data.photoURL || "https://business-on-line.fr/wp-content/uploads/2016/10/6a0120a8b67743970b01b7c7ca52af970b-500wi.jpg"}}
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
    },[navigation, messages])


    const sendMessage = ()=>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL
        })

        setInput("")
    }

    useLayoutEffect(()=> {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(
            snapShot => setMessages(
                snapShot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );
        return unsubscribe;
    },[route])
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding": "height"}
                style={styles.container}
                keyboardVerticalOffset = { 100}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                            <ScrollView contentContainerStyle={{paddingTop:15}}>
                                {
                                    messages.map(({id, data}) =>(
                                        data.email === auth.currentUser.email ? (
                                                <View style={styles.reciever}>
                                                    <Avatar 
                                                    containerStyle={{
                                                        position: "absolute",
                                                        bottom:-15,
                                                        right:-5
                                                    }}
                                                    rounded
                                                    size={30}
                                                    bottom={-15}
                                                    right={-5}
                                                        source={{
                                                            uri: data?.photoURL || "https://business-on-line.fr/wp-content/uploads/2016/10/6a0120a8b67743970b01b7c7ca52af970b-500wi.jpg",
                                                        }}/>
                                                    <Text style={styles.recieverText} > {data.message}</Text>
                                                </View>
                                        ):(
                                                <View style={styles.sender}>
                                                    <Avatar 
                                                    containerStyle={{
                                                        position: "absolute",
                                                        bottom:-15,
                                                        right:-5
                                                    }}
                                                    rounded
                                                    size={30}
                                                    bottom={-15}
                                                    right={-5}
                                                        source={{
                                                            uri: data?.photoURL || "https://business-on-line.fr/wp-content/uploads/2016/10/6a0120a8b67743970b01b7c7ca52af970b-500wi.jpg",
                                                        }}/>
                                                    <Text style={styles.senderText} > {data.message}</Text>
                                                    <Text style={styles.senderName} > {data.diplayName}</Text>
                                                </View>
                                        )
                                    ))
                                }
                            </ScrollView>
                            <View style={styles.footer}>
                                <TextInput
                                    placeholder='Signal Message'
                                    style={styles.textInput}
                                    value={input}
                                    onChangeText={(text) => setInput(text)}
                                    onSubmitEditing={sendMessage}
                                        />
                                <TouchableOpacity 
                                    activeOpacity={0.5} 
                                    onPress={sendMessage}
                                >
                                    <Ionicons name="send" size={24} color="#2B68E6"/>
                                </TouchableOpacity>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
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
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"

    },
    sender: {
        padding: 15,
        backgroundColor: "#2C68ED",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderText:{
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    }
})
