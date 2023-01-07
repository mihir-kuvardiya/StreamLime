import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../theme/colorPalates";

export default ScaledSheet.create({
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
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:ms(30),
        paddingHorizontal:ms(80),
        alignItems:'center'
    },
    touchableView:{
        alignItems:'center'
    },
    text:{
        color:colorPalates.AppTheme.text,
        fontSize:ms(16),
        marginTop:ms(5),
        fontFamily:'RougeScripu-Regular'
    }
})