import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import colorPalates from "../../theme/colorPalates";
import headerStyle from "./headerStyle";
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import screenNameEnum from "../../helper/screenNameEnum";

export interface HeaderProps {
    title?: string,
    isBack?: boolean,
    isProfileSave?: boolean,
}

const Header = ({title='Header', isBack=false, isProfileSave=false}:HeaderProps) => {
    
    const naviagtion = useNavigation();

    const onPressProfile = () => {
        naviagtion.navigate(screenNameEnum.UserProfileScreen);
    }

    const onPressBack = () => {
        naviagtion.goBack();
    }
    
    return(
        <SafeAreaView style={headerStyle.mainContainer}>
            <View style={headerStyle.container}>
                {
                    isBack ?
                    <TouchableOpacity style={headerStyle.iconContainer} onPress={onPressBack}>
                        <IconFeather name='chevron-left' color={colorPalates.AppTheme.text} size={25}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={onPressProfile}>
                        <Image
                            style={headerStyle.profileImage}
                            source={{
                                uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
                            }}
                            resizeMode={"cover"} 
                        />
                    </TouchableOpacity>
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