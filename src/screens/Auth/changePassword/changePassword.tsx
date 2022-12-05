import React from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import colors from "../../../theme/colors";
import changePasswordScreenStyle from "./changePasswordScreenStyle";

const ChangePasswordScreen = () => {

    const onPressChangePassword = () => {
        console.log('change password clicked');
    }
    
    return(
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
        <View style={changePasswordScreenStyle.container}>
            <Text style={changePasswordScreenStyle.changePassword}>Change Password</Text>
            <View style={{marginVertical:ms(25)}}>
            <TextInput 
                placeholder="Password"
                placeholderTextColor={colors.grayShade8F}
                style={changePasswordScreenStyle.textInput}
            />
            <TextInput 
                placeholder="Re-Enter password"
                placeholderTextColor={colors.grayShade8F}
                style={changePasswordScreenStyle.textInput}
            />
            </View>
            <ThemeButton title="Change Password" onPress={onPressChangePassword}/>
        </View>
        </KeyboardAwareScrollView>
    )
}

export default ChangePasswordScreen;