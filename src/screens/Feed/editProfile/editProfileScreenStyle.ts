import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";

export default ScaledSheet.create({
    container:{
        flex:1
    },
    Image:{
        height: ms(80),
        width: ms(80),
        borderRadius: ms(40),
        alignSelf: 'center',
        marginVertical: ms(10),
        marginTop:ms(20)
    },
    secondContainer:{
        marginTop: ms(20),
        marginHorizontal: ms(16)
    },
    text:{
        marginVertical: ms(3),
        fontSize: ms(13),
        fontWeight: '400',
        color: colorPalates.AppTheme.text,
        marginLeft: ms(5)
    },
    textInput:{
        backgroundColor:colorPalates.white,
        borderRadius: ms(5),
        marginVertical: ms(2),
        paddingHorizontal: ms(15),
        shadowColor: colorPalates.AppTheme.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.65,
        elevation: 5,
    },
    bio:{
        backgroundColor:colorPalates.white,
        height: ms(100),
        borderRadius: ms(5),
        marginVertical: ms(2),
        paddingHorizontal: ms(15),
        shadowColor: colorPalates.AppTheme.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.65,
        elevation: 5,
        textAlignVertical: 'top'
    }
})