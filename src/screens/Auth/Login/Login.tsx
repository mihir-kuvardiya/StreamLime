import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import { showToast } from "../../../helper/helper";
import screenNameEnum from "../../../helper/screenNameEnum";
import colors from "../../../theme/colors";
import LoginScreenStyle from "./LoginScreenStyle";
import auth from '@react-native-firebase/auth';
import { SvgXml } from "react-native-svg";
import svg from "../../../theme/svg/svg";

const LoginScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')

    const onPressLogin = (email:string,pass:string) => {

        const trimmedEmail = email.trim();
        if(trimmedEmail === ''){
            showToast('Enter an email address');
            return;
        }
        if(pass.length < 6){
            showToast('password must be six character long');
            return;
        }
        console.log('login button clicked');
        auth().signInWithEmailAndPassword(trimmedEmail, pass)
        .then((res) => {
            console.log(res,'rrrrrrrrr')
            // console.log(res.user.uid,'rrrrrrrrr')
            console.log('User signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/wrong-password') {
                showToast('The password is invalid')
                console.log('The password is invalid');
            }
            if (error.code === 'auth/user-not-found') {
                showToast('User does not exist')
                console.log('User does not exist');
            }
            if (error.code === 'auth/invalid-email') {
                showToast('That email address is invalid!')
                console.log('That email address is invalid!');
            }
            console.log(error);
        });
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
            <View style={LoginScreenStyle.svgContainer}>
                <SvgXml xml={svg.login} />
                <Text style={LoginScreenStyle.loginText}>Login</Text>
            </View>
            <View style={{marginVertical:ms(10)}}>
            <TextInput 
                placeholder="Enter email"
                placeholderTextColor={colors.grayShade8F}
                style={LoginScreenStyle.textInput}
                value={email}
                onChangeText={val=>setEmail(val)}
            />
            <TextInput 
                placeholder="Enter password"
                placeholderTextColor={colors.grayShade8F}
                style={LoginScreenStyle.textInput}
                value={pass}
                onChangeText={val=>setPass(val)}
            />
                <Text onPress={onPressForgotPassword} style={LoginScreenStyle.forgotPasswordText}>Forgot Password ?</Text>
            </View>
            <ThemeButton title="Login" onPress={()=>onPressLogin(email,pass)}/>
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