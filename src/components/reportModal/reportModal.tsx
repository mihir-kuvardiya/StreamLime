import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import colorPalates from '../../theme/colorPalates';
import { ms, ScaledSheet } from "react-native-size-matters";

export interface ReportModalProps {
    isVisible?: boolean;
    onPressReport?: () => void;
    onClose?: () => void;
}

const ReportModal = ({isVisible,onPressReport,onClose}:ReportModalProps) => {
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
            <View style={style.container}>
                <View style={style.secondContainer}>
                    <TouchableOpacity style={style.deleteContainer} onPress={onPressReport}>
                        <Text style={style.deleteText}>Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.cancelContainer} onPress={onClose}>
                        <Text style={style.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ReportModal;


const style = ScaledSheet.create({
    container:{
        bottom:0,
        left:0,
        right:0,
        margin:0,
        position:'absolute',
        justifyContent:'flex-end',
        backgroundColor:colorPalates.white,
        borderTopLeftRadius:ms(20),
        borderTopRightRadius:ms(20)
    },
    secondContainer:{
        alignItems:'center',
        marginVertical:ms(8)
    },
    deleteContainer:{
        borderWidth:1,
        borderColor:colorPalates.AppTheme.secondary,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:ms(8),
        paddingVertical:ms(8),
        width:'80%',
        borderRadius:ms(10),
        height:ms(45)
    },
    cancelContainer:{
        borderWidth:1,
        borderColor:colorPalates.AppTheme.primary,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:ms(8),
        paddingVertical:ms(8),
        width:'80%',
        borderRadius:ms(10),
        height:ms(45)
    },
    deleteText:{
        color:colorPalates.AppTheme.secondary,
        fontSize:ms(16),
        marginTop:ms(5),
    },
    cancelText:{
        color:colorPalates.AppTheme.primary,
        fontSize:ms(16),
        marginTop:ms(5),
    }
})