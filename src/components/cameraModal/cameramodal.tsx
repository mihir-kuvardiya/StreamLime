import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

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
            onSwipeComplete={onClose}
            swipeDirection={'down'}
            propagateSwipe={true}
            animationIn={'slideInUp'}
            animationOut={'slideInDown'}
        >
            <View>
                <Text style={{color:'red'}}>Hello world</Text>
            </View>
        </Modal>
    )
}

export default CameraModel;