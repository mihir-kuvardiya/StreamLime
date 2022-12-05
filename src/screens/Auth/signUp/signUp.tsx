import { useNavigation } from "@react-navigation/native";
import React from "react"
import { Text, TextInput, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import screenNameEnum from "../../../helper/screenNameEnum";
import colors from "../../../theme/colors";
import signUpScreenStyle from "./signUpScreenStyle";

const SignUpScreen = () => {

    const navigation = useNavigation();

    const OnPressLogin = () => {
        navigation.navigate(screenNameEnum.LoginScreen)
    }

    const onPressSignUp = () => {
        navigation.navigate(screenNameEnum.VerifyEmailScreen)
    }

    return(
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
        <View style={signUpScreenStyle.container}>
            <Text style={signUpScreenStyle.SignUpText}>SignUp</Text>
            <View style={{marginVertical:ms(25)}}>
            <TextInput 
                placeholder="Enter email"
                placeholderTextColor={colors.grayShade8F}
                style={signUpScreenStyle.textInput}
            />
            <TextInput 
                placeholder="Enter password"
                placeholderTextColor={colors.grayShade8F}
                style={signUpScreenStyle.textInput}
            />
            <TextInput 
                placeholder="Re-enter password"
                placeholderTextColor={colors.grayShade8F}
                style={signUpScreenStyle.textInput}
            />
            </View>
            <ThemeButton title="Sign Up" onPress={onPressSignUp}/>
            <View style={{alignItems:'center',marginTop:ms(50)}}>
            <Text style={signUpScreenStyle.loginText}>Already have an acoount 
                    <Text 
                        style={signUpScreenStyle.LoginTextBlackButton} 
                        onPress={OnPressLogin}
                    > Login</Text>
            </Text>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}

export default SignUpScreen;