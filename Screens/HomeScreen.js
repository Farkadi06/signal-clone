import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons';
import { useEffect } from 'react'
import { db } from '../firebase'
import { ScrollView } from 'react-native'


const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace('Login');
        })
    }

    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot=> (
            setChats(snapshot.docs.map(doc =>( {
                id : doc.id,
                data : doc.data()
            })))
        ));

        return unsubscribe;
    },[]);

    useLayoutEffect(()=>{
        console.log(auth.currentUser)
        navigation.setOptions({
            title: "Signal",
            headerStyle: {backgroundColor:"#fff"},
            headerTitleStyle: {color: "black"},
            headerTintColor: "black",
            headerLeft: () => 
                (<View style={{marginLeft:20}}>
                    <Avatar 
                        rounded
                        onPress={signOutUser}
                        source= {{uri: auth?.currentUser?.photoURL}}/>
                </View>),
            headerRight: () => (
                <View 
                    style={{
                            flexDirection: "row",
                            justifyContent:"space-between",
                            width:80,
                            marginRight:20,
                                }}>
                   <TouchableOpacity activeOpacity={0.5}>
                       <AntDesign name="camerao" size={24} color="black"/>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=> navigation.navigate('AddChat')} activeOpacity={0.5}>
                       <SimpleLineIcons name="pencil" size={24} color="black"/>
                   </TouchableOpacity>
                </View>
            )
            
        })
    },[navigation])

    const enterChat = (id, chatName)=> {
        navigation.navigate('Chat', {
            id,
            chatName
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map(({id,data : {chatName}})=> (
                        <CustomListItem 
                            key={id}
                            id={id}
                            chatName={chatName}
                            enterChat={enterChat}
                                />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container :{
        height: "100%"
    }
})
