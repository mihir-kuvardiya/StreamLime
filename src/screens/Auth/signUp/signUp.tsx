import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import ThemeButton from "../../../components/themeButton/themeButton";
import { showToast } from "../../../helper/helper";
import screenNameEnum from "../../../helper/screenNameEnum";
import colors from "../../../theme/colors";
import signUpScreenStyle from "./signUpScreenStyle";
import auth from '@react-native-firebase/auth';
import { SvgXml } from "react-native-svg";
import svg from "../../../theme/svg/svg";
import firestore from '@react-native-firebase/firestore';
import IconFeather from "react-native-vector-icons/Feather"

const SignUpScreen = () => {

    const navigation:any = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [showRepeatPassword, setShowRepeatPassword] = useState(true);

    const OnPressLogin = () => {
        navigation.navigate(screenNameEnum.LoginScreen)
    }

    const onPressSignUp = (email:string,password:string) => {

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

        const username = `${trimmedEmail.split('@')[0]}${Math.floor(1000 + Math.random() * 9000)}`;
        setLoading(true);
        auth().createUserWithEmailAndPassword(trimmedEmail, password)
        .then((res) => {
            console.log('User account created & signed in!');
            firestore().collection('user').doc(res.user.uid)
            .set({
                userName:username,
                displayName:'',
                profilePicture:'',
                totalPosts:0,
                followers:0,
                followings:0,
                bio:'',
                userId:res.user.uid
            })
            .then(() => {
                console.log('User added!');
                setLoading(false);
                navigation.navigate(screenNameEnum.LoginScreen)
            });
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
            setLoading(false);
        });
    }

    return(
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{marginBottom: ms(16)}}>
        <View style={signUpScreenStyle.container}>
            <View style={signUpScreenStyle.svgContainer}>
                <SvgXml xml={svg.signup}/>
                <Text style={signUpScreenStyle.SignUpText}>Sign Up</Text>
            </View>
            <View style={{marginVertical:ms(10)}}>
            <TextInput 
                placeholder="Enter email"
                placeholderTextColor={colors.grayShade8F}
                style={signUpScreenStyle.textInput}
                value={email}
                onChangeText={val=>setEmail(val)}
                keyboardType={'email-address'}
            />
            <View style={signUpScreenStyle.passwordTextInputView}>
                    <TextInput 
                        placeholder="Enter password"
                        placeholderTextColor={colors.grayShade8F}
                        style={signUpScreenStyle.passwordTextInput}
                        value={password}
                        secureTextEntry={showPassword}
                        onChangeText={val=>setPassword(val)}
                    />
                    <TouchableOpacity
                        hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <IconFeather
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={ms(18)}
                            color={'#7D7D7D'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={signUpScreenStyle.passwordTextInputView}>
                    <TextInput 
                        placeholder="Re-enter password"
                        placeholderTextColor={colors.grayShade8F}
                        style={signUpScreenStyle.passwordTextInput}
                        value={repeatPass}
                        onChangeText={val=>setRepeatPass(val)}
                        secureTextEntry={showRepeatPassword}
                    />
                    <TouchableOpacity
                        hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                        <IconFeather
                            name={showRepeatPassword ? 'eye' : 'eye-off'}
                            size={ms(18)}
                            color={'#7D7D7D'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginVertical:ms(10)}}/>
            <ThemeButton title="Sign Up" loading={loading} onPress={()=>onPressSignUp(email,password)}/>
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





                