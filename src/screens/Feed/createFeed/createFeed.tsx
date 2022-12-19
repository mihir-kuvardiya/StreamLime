import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header/header";
import colors from "../../../theme/colors";
import createFeedScreenStyle from "./createFeedScreenStyle";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEvilIcons from "react-native-vector-icons/EvilIcons"
import colorPalates from "../../../theme/colorPalates";

const CreateFeedScreen = () => {

    const [image, setImage] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600');

    const createPost = () => {
        console.log('create post clicked');
    }

    const removePhoto = () => {
        setImage('')
    }

    return(
        <SafeAreaView>
            <Header title="Create Post" isBack={true}/>
            <KeyboardAwareScrollView>
            {image ? 
                <View style={createFeedScreenStyle.imageViewContainer}>
                <FastImage 
                    style={createFeedScreenStyle.postImage}
                    source={{
                        uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
                    }}
                    resizeMode={"contain"}
                >
                    <TouchableOpacity 
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={removePhoto}
                    >
                    <IconIonicons 
                        name="close-sharp" 
                        size={15} 
                        color={colorPalates.AppTheme.text} 
                        style={createFeedScreenStyle.deleteIcon}
                    />
                    </TouchableOpacity>
                </FastImage>
            </View> :
            <View style={createFeedScreenStyle.createView}>
                <IconEvilIcons 
                    name="camera" 
                    size={70} 
                    color={colorPalates.AppTheme.text}
                />
                <Text style={createFeedScreenStyle.addPhotoText}>Add Photo</Text>
            </View>
            }
            <TextInput 
                placeholder="Description"
                placeholderTextColor={colors.grayShade8F}
                style={createFeedScreenStyle.descriptionTextInput}
            />
            <TouchableOpacity style={createFeedScreenStyle.createPostButton} onPress={createPost}>
                    <Text style={createFeedScreenStyle.createPostText}>Create post</Text>
            </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default CreateFeedScreen;