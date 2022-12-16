import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import screenNameEnum from "../../../helper/screenNameEnum";
import colors from "../../../theme/colors";
import forgotPasswordScreenStyle from "./forgotPasswordScreenStyle";

const ForgotPasswordScreen = () => {

    const naviagtion = useNavigation();
    const [confirmation, setConfirmation] = useState(false)

    const onPressGetOtp = () => {
        console.log('get otp clicked')
    }

    const onPressVerifyOtp = () => {
        naviagtion.navigate(screenNameEnum.ChangePasswordScreen);
    }

    const onPressReSendOtp = () => {
        console.log('resend otp clicked')
    }

    if(!confirmation){
        return(
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
            <View style={forgotPasswordScreenStyle.container}>
                <Text style={forgotPasswordScreenStyle.forgotPassword}>Forgot Password</Text>
                <View style={{marginVertical:ms(25)}}>
                    <Text style={forgotPasswordScreenStyle.informationText}>
                         Enter your email and we'll send you a code to get back into your account.
                    </Text>
                    <View style={forgotPasswordScreenStyle.textInputContainer}>
                    <TextInput 
                        placeholder="Enter email"
                        placeholderTextColor={colors.grayShade8F}
                        style={forgotPasswordScreenStyle.textInput}
                    />
                    <ThemeButton title="Get OTP" onPress={onPressGetOtp} containerStyle={{marginTop:ms(20)}}/>
                    </View>
                </View>
            </View>
            </KeyboardAwareScrollView>
        )
    }else{
        return(
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
            <View style={forgotPasswordScreenStyle.container}>
                <Text style={forgotPasswordScreenStyle.forgotPassword}>Forgot Password</Text>
                <View style={{marginVertical:ms(25)}}>
                    <Text style={forgotPasswordScreenStyle.informationText}>
                         Verify your email using otp that given in your email account.
                    </Text>
                    <View style={forgotPasswordScreenStyle.textInputContainer}>
                    <TextInput 
                        placeholder="Enter OTP"
                        placeholderTextColor={colors.grayShade8F}
                        style={forgotPasswordScreenStyle.textInput}
                    />
                    <Text onPress={onPressReSendOtp} style={forgotPasswordScreenStyle.reSendOtp}>Resend OTP</Text>
                    <ThemeButton title="Verify OTP" onPress={onPressVerifyOtp} containerStyle={{marginTop:ms(20)}}/>
                    </View>
                </View>
            </View>
            </KeyboardAwareScrollView>
        )
    }
}

export default ForgotPasswordScreen;