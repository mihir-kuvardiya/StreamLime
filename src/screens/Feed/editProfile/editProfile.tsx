import React, { useEffect, useState } from "react"
import { Image, ScrollView, Text, TextInput, View, ActivityIndicator, TouchableOpacity} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header/header";
import { userAction, useUserData } from "../../../redux/reducers/userSlice/userSlice";
import colors from "../../../theme/colors";
import editProfileScreenStyle from "./editProfileScreenStyle";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../../../helper/helper";
import colorPalates from "../../../theme/colorPalates";
import { useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';

const EditProfileScreen = () => {

    const dispatch = useDispatch()
    const userData = useUserData();
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] =  useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    useEffect(()=>{
        setUserName(userData?.userName);
        setDisplayName(userData?.displayName);
        setBio(userData?.bio);
    },[])

    const onPressProfileSave = () => {
        setLoading(true);
        try {
            firestore().collection('user').doc(userData?.userId).update({
                userName:userName,
                displayName:displayName,
                profilePicture:'',
                bio:bio
            })
            .then(() => { 
                dispatch(userAction.setUserData({
                    ...userData,
                    userName: userName,
                    displayName: displayName,
                    bio:bio
               }))
            })
            setLoading(false);
            navigation.goBack();
            showToast('Profile saved')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const onPressLogout = () => {
        setLogoutLoading(true);
        try {
            auth().signOut().then(() =>{
                dispatch(userAction.clearUser());
                setLogoutLoading(false);
            });
        } catch (error) {
            console.log(error,'error');
            setLogoutLoading(false);
        }
    }

    return(
        <SafeAreaView style={editProfileScreenStyle.container}>
            {loading ?
                <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary}/>
            :
            <>
                <Header title="mihir_2811" isBack={true} isProfileSave={true} onPressProfileSave={onPressProfileSave}/>
                <ScrollView>
                    <Image
                        style={editProfileScreenStyle.Image}
                        source={{
                            uri:'https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg?auto=compress&cs=tinysrgb&w=600',
                        }}
                        resizeMode={"cover"} 
                    />
                    <View style={editProfileScreenStyle.secondContainer}>
                        <Text style={editProfileScreenStyle.text}>Username</Text>
                        <TextInput 
                            placeholder="Username"
                            placeholderTextColor={colors.grayShade8F}
                            style={editProfileScreenStyle.textInput}
                            value={userName}
                            onChangeText={val => setUserName(val)}
                        />
                        <View style={editProfileScreenStyle.emptyView}/>
                        <Text style={editProfileScreenStyle.text}>Disaplay name</Text>
                        <TextInput 
                            placeholder="Disaplay name"
                            placeholderTextColor={colors.grayShade8F}
                            style={editProfileScreenStyle.textInput}
                            value={displayName}
                            onChangeText={val => setDisplayName(val)}
                        />
                        <View style={editProfileScreenStyle.emptyView}/>
                        <Text style={editProfileScreenStyle.text}>Bio</Text>
                        <TextInput 
                            placeholder="Bio"
                            placeholderTextColor={colors.grayShade8F}
                            style={editProfileScreenStyle.bio}
                            multiline={true}
                            value={bio}
                            onChangeText={val => setBio(val)}
                        />
                    </View>
                    <View style={editProfileScreenStyle.logoutView}>
                        <TouchableOpacity style={editProfileScreenStyle.logoutButton} onPress={onPressLogout}>
                            {logoutLoading ?
                                <ActivityIndicator size={'small'} color={colorPalates.AppTheme.secondary}/>
                            :
                                <Text style={editProfileScreenStyle.logoutText}>Logout</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </>
            }
        </SafeAreaView>
    )
}

export default EditProfileScreen;