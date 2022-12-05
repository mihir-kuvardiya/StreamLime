import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import screenNameEnum from "../../../helper/screenNameEnum";
import colors from "../../../theme/colors";
import LoginScreenStyle from "./LoginScreenStyle";

const LoginScreen = () => {

    const navigation = useNavigation()

    const onPressLogin = () => {
        console.log('login button clicked');
    }

    const onPressForgotPassword = () => {
        navigation.navigate(screenNameEnum.ForgotPasswordScreen)
    }

    const onPressSignUp = () => {
        navigation.navigate(screenNameEnum.SignUpScreen)
    }

    return(
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
        <View style={LoginScreenStyle.container}>
            <Text style={LoginScreenStyle.loginText}>Login</Text>
            <View style={{marginVertical:ms(25)}}>
            <TextInput 
                placeholder="Enter email"
                placeholderTextColor={colors.grayShade8F}
                style={LoginScreenStyle.textInput}
            />
            <TextInput 
                placeholder="Enter password"
                placeholderTextColor={colors.grayShade8F}
                style={LoginScreenStyle.textInput}
            />
                <Text onPress={onPressForgotPassword} style={LoginScreenStyle.forgotPasswordText}>Forgot Password ?</Text>
            </View>
            <ThemeButton title="Log in" onPress={onPressLogin}/>
            <View style={{alignItems:'center',marginTop:ms(50)}}>
            <Text style={LoginScreenStyle.signupText}>I Don't have an acoount 
                    <Text 
                        style={LoginScreenStyle.signUpBlackButtonText} 
                        onPress={onPressSignUp}
                    > SignUp</Text>
            </Text>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen;