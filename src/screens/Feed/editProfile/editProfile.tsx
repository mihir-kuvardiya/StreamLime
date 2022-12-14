import React from "react"
import { Image, ScrollView, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header/header";
import colors from "../../../theme/colors";
import editProfileScreenStyle from "./editProfileScreenStyle";

const EditProfileScreen = () => {
    return(
        <SafeAreaView style={editProfileScreenStyle.container}>
            <Header title="Edit Profile" isBack={true} isProfileSave={true}/>
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
                    />
                    <View style={editProfileScreenStyle.emptyView}/>
                    <Text style={editProfileScreenStyle.text}>Disaplay name</Text>
                    <TextInput 
                        placeholder="Disaplay name"
                        placeholderTextColor={colors.grayShade8F}
                        style={editProfileScreenStyle.textInput}
                    />
                    <View style={editProfileScreenStyle.emptyView}/>
                    <Text style={editProfileScreenStyle.text}>Bio</Text>
                    <TextInput 
                        placeholder="Bio"
                        placeholderTextColor={colors.grayShade8F}
                        style={editProfileScreenStyle.bio}
                        multiline={true}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfileScreen;