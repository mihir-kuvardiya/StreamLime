import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import { showToast } from "../../../helper/helper";
import screenNameEnum from "../../../helper/screenNameEnum";
import colors from "../../../theme/colors";
import forgotPasswordScreenStyle from "./forgotPasswordScreenStyle";
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = () => {

    const naviagtion:any = useNavigation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)

    const onPressSendMail = async () => {
        const trimmedEmail = email.trim();
        if(trimmedEmail === ''){
            showToast('Enter an email address');
            return;
        }
        setLoading(true);

        auth().sendPasswordResetEmail(trimmedEmail).then(()=>{
            showToast('We have sent a link in your mail to reset the password. Please check it out!')
            setLoading(false);
            naviagtion.navigate(screenNameEnum.LoginScreen)
        }).catch(()=>{
            setLoading(false);
            showToast('something went wrong! try after some time.')
        })
    }

    return(
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
        <View style={forgotPasswordScreenStyle.container}>
            <Text style={forgotPasswordScreenStyle.forgotPassword}>Forgot Password</Text>
            <View style={{marginVertical:ms(25)}}>
                <Text style={forgotPasswordScreenStyle.informationText}>
                        Enter your email and we'll send you a mail to get back into your account.
                </Text>
                <View style={forgotPasswordScreenStyle.textInputContainer}>
                <TextInput 
                    placeholder="Enter email"
                    placeholderTextColor={colors.grayShade8F}
                    style={forgotPasswordScreenStyle.textInput}
                    value={email}
                    onChangeText={val => setEmail(val)}
                />
                <ThemeButton title="Send Mail" loading={loading} onPress={onPressSendMail} containerStyle={{marginTop:ms(20)}}/>
                </View>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
    
}

export default ForgotPasswordScreen;