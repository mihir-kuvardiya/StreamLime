import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import { showToast } from "../../../helper/helper";
import screenNameEnum from "../../../helper/screenNameEnum";
import colors from "../../../theme/colors";
import signUpScreenStyle from "./signUpScreenStyle";
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const OnPressLogin = () => {
        navigation.navigate(screenNameEnum.LoginScreen)
    }

    const onPressSignUp = (email:string,password:string) => {
        // navigation.navigate(screenNameEnum.VerifyEmailScreen)
        console.log(email,password);
        const trimmedEmail = email.trim();

        if(trimmedEmail === ''){
            showToast('Enter an email address');
            return;
        }
        if(password.length < 6){
            showToast('password must be six character long');
            return;
        }
        if(password !== repeatPass){
            showToast('password and Repeat password does not match');
            return;
        }

        auth().createUserWithEmailAndPassword(trimmedEmail, password)
        .then((res) => {
            console.log(res,'rrrrrrrrr')
            console.log(res.user.metadata,'rrrrrrrrr')
            console.log(res.user.uid,'rrrrrrrrr')
            console.log(res.additionalUserInfo?.isNewUser,'rrrrrrrrr')
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                showToast('That email address is already in use!')
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                showToast('That email address is invalid!')
                console.log('That email address is invalid!');
            }
            console.log(error);
        });
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
                value={email}
                onChangeText={val=>setEmail(val)}
                keyboardType={'email-address'}
            />
            <TextInput 
                placeholder="Enter password"
                placeholderTextColor={colors.grayShade8F}
                style={signUpScreenStyle.textInput}
                value={password}
                onChangeText={val=>setPassword(val)}
            />
            <TextInput 
                placeholder="Re-enter password"
                placeholderTextColor={colors.grayShade8F}
                style={signUpScreenStyle.textInput}
                value={repeatPass}
                onChangeText={val=>setRepeatPass(val)}
            />
            </View>
            <ThemeButton title="Sign Up" onPress={()=>onPressSignUp(email,password)}/>
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