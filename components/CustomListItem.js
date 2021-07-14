import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        <ListItem key={id} bottomDivider>
            <Avatar 
                rounded 
                source={{
                    uri:  "https://business-on-line.fr/wp-content/uploads/2016/10/6a0120a8b67743970b01b7c7ca52af970b-500wi.jpg"
                }}/>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    Yoooooooo
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
