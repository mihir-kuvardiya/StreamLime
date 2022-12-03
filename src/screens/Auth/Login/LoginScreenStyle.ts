import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";

export default ScaledSheet.create({
    container:{
        flex:1,
        marginHorizontal:ms(16),
        marginTop:ms(180)
    },
    loginText:{
        color:colorPalates.AppTheme.primary,
        fontSize:ms(25),
        fontWeight:'600',
        textAlign:'center',
        marginVertical:ms(20)
    },
    textInput:{
        height: ms(50),
        padding: ms(14),
        marginTop: ms(16),
        paddingHorizontal:ms(20),
        paddingVertical: ms(12),
        borderColor: '#CCCED2',
        borderWidth: ms(1),
        borderRadius: ms(50),
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
    }
})