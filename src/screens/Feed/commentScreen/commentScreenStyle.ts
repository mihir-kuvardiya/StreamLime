import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";

export default ScaledSheet.create({
    mainContainer:{
        marginHorizontal:ms(16),
        marginBottom:ms(8)
    },
    totalComments:{
        color:colorPalates.AppTheme.text,
        fontFamily:'Ubuntu-Rgular',
        fontSize:ms(16),
        marginTop:ms(10)
    },
    CommentTextInputView:{
        flexDirection:'row',
        borderColor:colorPalates.AppTheme.primary,
        borderWidth:0.5,
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        marginHorizontal:ms(16),
        marginBottom:ms(16),
        borderRadius:ms(10),
        backgroundColor:colorPalates.white,
        alignItems:'center'
    },
    CommentTextInput:{
        flex:1,
        marginHorizontal:ms(16),
        color:colorPalates.AppTheme.text,
        fontSize:ms(16)
    },
    sendButton:{
        marginRight:ms(16),
    }
})