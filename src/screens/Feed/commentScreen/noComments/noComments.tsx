import React, { Text, View } from 'react-native';
import colorPalates from '../../../../theme/colorPalates';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { ms, ScaledSheet } from 'react-native-size-matters';

const NoCommentsView = () => {
    return(
        <View style={style.container}>
            <IconIonicons name="ios-chatbox-ellipses-outline" size={100} color={colorPalates.AppTheme.primary}/>
            <Text style={style.noCommentText}>No Comments...</Text>
        </View>
    )
}

export default NoCommentsView;

const style = ScaledSheet.create({
    container:{
        height:ms(700),
        justifyContent:'center',
        alignItems:'center'
    },
    noCommentText:{
        fontSize:ms(22),
        fontFamily:'Ubuntu-Regular',
        marginTop:ms(20),
        color:colorPalates.AppTheme.primary
    }
})