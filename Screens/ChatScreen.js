import React from 'react'
import { useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

const ChatScreen = ({navigation, route}) => {
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
            )
        })
    },[navigation])
    return (
        <View>
            <Text>{route.params.chatName}</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
