import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";

export default ScaledSheet.create({
    container:{
        flex:1,
        marginHorizontal:ms(16),
        marginTop:ms(80)
    },
    SignUpText:{
        fontFamily:'Ubuntu-Medium',
        color:colorPalates.AppTheme.text,
        fontSize:ms(25),
        textAlign:'center',
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
    loginText:{
        textAlign:'center',
        color:colors.grayShadeAB,
        marginVertical:ms(15),
        marginRight:ms(10),
        fontSize:ms(14)
    },
    LoginTextBlackButton:{
        color:colorPalates.AppTheme.text
    },
    svgContainer:{
        alignItems:'center'
    }
})