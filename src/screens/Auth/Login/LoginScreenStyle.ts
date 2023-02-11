import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";

export default ScaledSheet.create({
    container:{
        flex:1,
        marginHorizontal:ms(16),
        marginTop:ms(80)
    },
    loginText:{
        fontFamily:'Ubuntu-Medium',
        color:colorPalates.AppTheme.text,
        fontSize:ms(25),
        marginVertical:ms(20)
    },
    textInput:{
        height: ms(45),
        padding: ms(14),
        marginTop: ms(16),
        paddingHorizontal:ms(20),
        paddingVertical: ms(12),
        borderColor: '#CCCED2',
        borderWidth: ms(1),
        borderRadius: ms(10),
        fontSize: ms(13),
        color: colorPalates.AppTheme.text
    },
    passwordTextInputView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor: '#CCCED2',
        borderWidth: ms(1),
        borderRadius: ms(10),
        height: ms(45),
        marginTop: ms(16),
        paddingHorizontal:ms(10)
    },
    passwordTextInput:{
        width:'90%',
        paddingHorizontal:ms(10),
        paddingVertical: ms(12),
        fontSize: ms(13),
        color: colorPalates.AppTheme.text
    },
    forgotPasswordText:{
        color:colors.grayShadeAB,
        textAlign:'right',
        marginVertical:ms(15),
        marginRight:ms(10),
        fontSize:ms(14)
    },
    signupText:{
        textAlign:'center',
        color:colors.grayShadeAB,
        marginVertical:ms(15),
        marginRight:ms(10),
        fontSize:ms(14)
    },
    signUpBlackButtonText:{
        color:colorPalates.AppTheme.text
    },
    svgContainer: {
        alignItems:'center'
    }
})