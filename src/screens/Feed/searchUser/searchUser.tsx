import React from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import Header from "../../../components/header/header";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";
import searchUserScreenStyle from "./searchUserScreenStyle";

const SearchUser = () => {
    return(
        <>
            <SafeAreaView>
                <Header isBack={true} title={'search user'}/>
            </SafeAreaView>
            <View style={searchUserScreenStyle.searchBarContainer}>
                <View style={searchUserScreenStyle.searchIconContainer}>
                    <IconFeather name="search" size={20} color={colorPalates.AppTheme.border}/>
                </View>
                <TextInput 
                    placeholder="username" 
                    placeholderTextColor={colors.blackShade1B}
                    style={searchUserScreenStyle.searchBarTextInput}
                />
            </View>
        </>
    )
}

export default SearchUser;