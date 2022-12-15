import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import colorPalates from "../../theme/colorPalates";
import headerStyle from "./headerStyle";
import IconFeather from 'react-native-vector-icons/Feather';

export interface HeaderProps {
    title?: string,
    isBack?: boolean,
    isProfileSave?: boolean,
}

const Header = ({title='Header', isBack=false, isProfileSave=false}:HeaderProps) => {
    return(
        <SafeAreaView style={headerStyle.mainContainer}>
            <View style={headerStyle.container}>
                {
                    isBack ?
                    <View style={headerStyle.iconContainer}>
                        <IconFeather name='chevron-left' color={colorPalates.AppTheme.text} size={25}/>
                    </View>
                    :
                    <Image
                        style={headerStyle.profileImage}
                        source={{
                            uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
                        }}
                        resizeMode={"cover"} 
                    />
                }
                <Text style={headerStyle.headerTitle}>{title}</Text>
                {!isProfileSave ? <View style={headerStyle.emptyView}/> :
                <View style={headerStyle.iconContainer}>
                    <IconFeather name="user-check" size={25} color={colorPalates.AppTheme.text}/>
                </View>}
            </View>
        </SafeAreaView>
    )
}

export default Header;