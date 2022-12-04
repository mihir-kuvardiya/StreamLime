import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";

export default ScaledSheet.create({
    container:{
        flex:1,
        marginHorizontal:ms(16),
        marginTop:ms(180)
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
    changePassword:{
        color:colorPalates.AppTheme.text,
        fontSize:ms(25),
        fontWeight:'600',
        textAlign:'center',
        marginVertical:ms(20)
    }
})