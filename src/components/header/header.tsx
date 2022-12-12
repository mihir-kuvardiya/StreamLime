import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import colorPalates from "../../theme/colorPalates";
import headerStyle from "./headerStyle";

export interface HeaderProps {
    title?: string,
    isBack?: boolean
}

const Header = ({title='Header', isBack=false}:HeaderProps) => {
    return(
        <SafeAreaView>
            <View style={headerStyle.container}>
                {
                    isBack ?
                    <View style={headerStyle.iconContainer}>
                        <IconAntDesign name='arrowleft' color={colorPalates.AppTheme.text} size={25}/>
                    </View>
                    :
                    <Image
                        style={headerStyle.profileImage}
                        source={{
                            uri: 'https://unsplash.it/400/400?image=1',
                        }}
                        resizeMode={"cover"} 
                    />
                }
                <Text style={headerStyle.headerTitle}>{title}</Text>
                <View style={{width: ms(30)}}/>
            </View>
        </SafeAreaView>
    )
}

export default Header;