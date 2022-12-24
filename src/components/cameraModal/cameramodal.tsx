import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import cameraModalStyle from './cameraModalStyle';
import colorPalates from '../../theme/colorPalates';

export interface cameraModelProps {
    isVisible?: boolean;
    onPressCamera?: () => void;
    onPressGallery?: () => void;
    onClose?: () => void;
}

const CameraModel = ({isVisible,onPressCamera,onPressGallery,onClose}:cameraModelProps) => {
    return(
        <Modal  
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            onDismiss={onClose}
            coverScreen={true}
            swipeDirection={'down'}
            useNativeDriver={true}
            style={{margin:0}}
        >
            <View style={cameraModalStyle.container}>
                <View style={cameraModalStyle.secondContainer}>
                    <TouchableOpacity style={cameraModalStyle.touchableView} onPress={onPressCamera}>
                        <IconIonicons name='camera-outline' size={50} color={colorPalates.AppTheme.text}/>
                        <Text style={cameraModalStyle.text}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={onPressGallery}>
                        <IconAntDesign name='picture' size={50} color={colorPalates.AppTheme.text}/>
                        <Text style={cameraModalStyle.text}>Gallery</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CameraModel;