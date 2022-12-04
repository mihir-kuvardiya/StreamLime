import React from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton";
import colors from "../../../theme/colors";
import verifyEmailScreenStyle from "./verifyEmailScreenStyle";

const VerifyEmailScreen = () => {

    const onPressVerifyOtp = () => {
        console.log('verify otp clickdd in verify emial screen')
    }
    const onPressReSendOtp = () => {
        console.log('resend otp clicked in verify email screen')
    }
    return(
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
            <View style={verifyEmailScreenStyle.container}>
                <Text style={verifyEmailScreenStyle.verifyEmail}>Verify Email</Text>
                <View style={{marginVertical:ms(25)}}>
                    <Text style={verifyEmailScreenStyle.informationText}>
                         Verify your email to surfing app and share your things using app features and connect to the new community.
                    </Text>
                    <View style={verifyEmailScreenStyle.textInputContainer}>
                    <TextInput 
                        placeholder="Enter OTP"
                        placeholderTextColor={colors.grayShade8F}
                        style={verifyEmailScreenStyle.textInput}
                    />
                    <Text onPress={onPressReSendOtp} style={verifyEmailScreenStyle.reSendOtp}>Resend OTP</Text>
                    <ThemeButton title="Verify OTP" onPress={onPressVerifyOtp} containerStyle={{marginTop:ms(20)}}/>
                    </View>
                </View>
            </View>
            </KeyboardAwareScrollView>
    )
}

export default VerifyEmailScreen;