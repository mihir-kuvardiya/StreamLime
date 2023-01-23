import React, { Text, View } from 'react-native';
import colorPalates from '../../../../theme/colorPalates';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ms, ScaledSheet } from 'react-native-size-matters';
const NoCommentsView = () => {
    return(
        <View style={style.container}>
            <IconMaterialIcons name="comment" size={150} color={colorPalates.AppTheme.primary}/>
            <Text style={style.noCommentText}>No Comments...</Text>
        </View>
    )
}

export default NoCommentsView;

const style = ScaledSheet.create({
    container:{
        flex:1,
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