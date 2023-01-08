import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header/header";
import colors from "../../../theme/colors";
import createFeedScreenStyle from "./createFeedScreenStyle";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEvilIcons from "react-native-vector-icons/EvilIcons"
import colorPalates from "../../../theme/colorPalates";
import CameraModel from "../../../components/cameraModal/cameramodal";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Permission from "../../../helper/permission";
import { getUploadMediaUrl, showToast } from "../../../helper/helper";
import { useUserData } from "../../../redux/reducers/userSlice/userSlice";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from "@react-navigation/native";
import screenNameEnum from "../../../helper/screenNameEnum";

const CreateFeedScreen = () => {

    const userData = useUserData();
    const navigation = useNavigation();
    const [image, setImage] = useState('');
    const [uploadUrl, setUploadUrl] = useState('');
    const [description, setDescription] = useState('');
    const [iSModalVisible, setIsModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);

    const createPost = () => {
        if(uploadUrl === ''){
            showToast('Oops! there is not one image selected for the post.');
            return;
        }
        setUploading(true);
        let postId = `${userData?.userId}POST${new Date().getTime()}`;
        let filename= `${userData?.userId}${new Date().getTime()}`;
        let  promise = new Promise((resolve, reject) =>{
            const task = storage().ref(filename).putFile(uploadUrl);
            resolve(task);
            reject()
        })
        promise.then(()=>{
            storage().ref(filename).getDownloadURL().then((url)=>{
                firestore().collection('posts').doc(postId).set({
                    postId: postId,
                    postUrl: url,
                    postDescription: description,
                    userId: userData?.userId,
                    isLiked: false
                })
                setUploading(false);
                setUploadUrl('');
                setImage('');
                setDescription('');
                navigation.navigate(screenNameEnum.FeedList)
            })
        })
        promise.catch(()=>{
            setUploading(false);
            setUploadUrl('');
            setImage('');
            setDescription('');
            console.log('failed to create post');
        })
    }

    const removePhoto = () => {
        setImage('')
    }

    const onPressCamera = async () => {

        setIsModalVisible(false);
        const cameraPermission = await Permission.getCameraPermission();
        if(!cameraPermission){
            showToast('Please allow the camera permission');
            return;
        }

        launchCamera({
            mediaType: 'photo',
            quality: 1,
            videoQuality: 'high',
            presentationStyle: 'fullScreen',
        }).then(async (cameraResponse: any) => {
            if (cameraResponse.didCancel) {
              return;
            }
            if (cameraResponse.errorCode) {
              return;
            }
            if (cameraResponse.errorMessage) {
              return;
            }
            const resp = {
              uri: cameraResponse?.assets[0].uri,
              fileSize: cameraResponse?.assets[0].fileSize,
              filename: cameraResponse.assets[0].fileName,
              height: cameraResponse.assets[0].height,
              width: cameraResponse.assets[0].width,
              timestamp: cameraResponse.assets[0].timestamp,
              type: cameraResponse.assets[0].type,
            };
            if (resp?.fileSize / 1000000 > 10) {
                showToast('Select an Image with less then 10 MB.');
                return;
            }
            const ext = resp?.type.split('/')[1];

            if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
                const dataImage = await getUploadMediaUrl(resp);
                setImage(dataImage);
                setUploadUrl(resp?.uri);
            } else {
                showToast('select only .jpg, .jpeg and .png formate image');
                return;
            }
          });
    }

    const onPressGallery = async () => {
        
        setIsModalVisible(false);
        const storagePermission = await Permission.getStoragePermission();
        if(!storagePermission){
            showToast('Please allow the camera permission');
            return;
        }
        launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
            includeExtra: true,
            presentationStyle: 'fullScreen',
          }).then(async (cameraResponse: any) => {
            if (cameraResponse.didCancel) {
              return;
            }
            if (cameraResponse.errorCode) {
              return;
            }
            if (cameraResponse.errorMessage) {
              return;
            }
      
            const resp = {
              uri: cameraResponse?.assets[0].uri,
              fileSize: cameraResponse?.assets[0].fileSize,
              filename: cameraResponse.assets[0].fileName,
              height: cameraResponse.assets[0].height,
              width: cameraResponse.assets[0].width,
              timestamp: cameraResponse.assets[0].timestamp,
              type: cameraResponse.assets[0].type,
            };
      
            if (resp?.fileSize / 1000000 > 10) {
                showToast('Select an Image with less then 10 MB.');
                return;
            }
      
            const ext = resp?.type.split('/')[1];
      
            if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
                const dataImage = await getUploadMediaUrl(resp);
                setImage(dataImage);
                setUploadUrl(resp?.uri);
            } else {
                showToast('select only .jpg, .jpeg and .png formate image');
                return;
            }
          });
    }

    return(
        <SafeAreaView style={{flex:1}}>
            {uploading ?
                <View style={createFeedScreenStyle.loadingContainer}>
                    <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary}/>
                </View>
            :
            <>
            <Header title="Create Post" isBack={true}/>
            <KeyboardAwareScrollView>
            {image ? 
                <View style={createFeedScreenStyle.imageViewContainer}>
                <FastImage 
                    style={createFeedScreenStyle.postImage}
                    source={{uri: image}}
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
            <TouchableOpacity onPress={()=>setIsModalVisible(true)} style={createFeedScreenStyle.createView}>
                <IconEvilIcons 
                    name="camera" 
                    size={70} 
                    color={colorPalates.AppTheme.text}
                />
                <Text style={createFeedScreenStyle.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            }
            <TextInput 
                placeholder="Description"
                value={description}
                onChangeText={val=>setDescription(val)}
                maxLength={100}
                placeholderTextColor={colors.grayShade8F}
                style={createFeedScreenStyle.descriptionTextInput}
            />
            <TouchableOpacity style={createFeedScreenStyle.createPostButton} onPress={createPost}>
                    <Text style={createFeedScreenStyle.createPostText}>Create post</Text>
            </TouchableOpacity>
            <CameraModel isVisible={iSModalVisible} onClose={()=>setIsModalVisible(false)} onPressCamera={onPressCamera} onPressGallery={onPressGallery}/>
            </KeyboardAwareScrollView>
            </>
        }
        </SafeAreaView>
    )
}

export default CreateFeedScreen;