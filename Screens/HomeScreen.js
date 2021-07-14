import React from 'react'
import { useLayoutEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons';


const HomeScreen = ({navigation}) => {

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
    },[])

    return (
        <SafeAreaView>
            <CustomListItem/>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
