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
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/reducers/userSlice/userSlice";
import { followFollowingAction } from "../../../redux/reducers/followFollowingSlice/followFollowingSlice";
import IconFeather from "react-native-vector-icons/Feather"

const LoginScreen = () => {

    const navigation:any = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')
    const [loading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

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
        setIsLoading(true);
        auth().signInWithEmailAndPassword(trimmedEmail, pass)
        .then(async (res) => {
            const user:any = await firestore().collection('user').doc(res.user.uid).get();
            const followings = await firestore().collection('followFollowing').where('userId','==',res.user.uid).get();
            let followingUsers : any[] = [];
            followings.forEach(element => {
                followingUsers = [...followingUsers,element.data().oppositeUserId];
            });
            followingUsers = [...followingUsers,res.user.uid];
            console.log(followingUsers,'uuuuuuuuuuuu')
            dispatch(followFollowingAction.setMyFollowingList(followingUsers));
            dispatch(userAction.setUserData(user._data));
            setIsLoading(false);
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
            setIsLoading(false);
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
            <View style={{marginVertical:ms(20)}}>
            <TextInput 
                placeholder="Enter email"
                placeholderTextColor={colors.grayShade8F}
                style={LoginScreenStyle.textInput}
                value={email}
                onChangeText={val=>setEmail(val)}
            />
            <View style={LoginScreenStyle.passwordTextInputView}>
                <TextInput 
                    placeholder="Enter password"
                    placeholderTextColor={colors.grayShade8F}
                    style={LoginScreenStyle.passwordTextInput}
                    value={pass}
                    secureTextEntry={showPassword}
                    onChangeText={val=>setPass(val)}
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
                <Text onPress={onPressForgotPassword} style={LoginScreenStyle.forgotPasswordText}>Forgot Password ?</Text>
            </View>
            <ThemeButton loading={loading} title="Login" onPress={()=>onPressLogin(email,pass)}/>
            <View style={{alignItems:'center',marginTop:ms(50)}}>
            <Text style={LoginScreenStyle.signupText}>Don't have an acoount 
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