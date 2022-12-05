import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import colorPalates from "../../theme/colorPalates";
import headerStyle from "./headerStyle";

const Header = () => {
    return(
        <SafeAreaView>
            <View style={headerStyle.container}>
                <IconAntDesign name='arrowleft' color={colorPalates.AppTheme.text} size={25}/>
                <Text style={headerStyle.headerTitle}>header</Text>
                <View style={{width: ms(30)}}/>
            </View>
        </SafeAreaView>
    )
}

export default Header;