import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../theme/colorPalates";

export default ScaledSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:ms(15),
        backgroundColor: colorPalates.white,
        shadowColor: colorPalates.grayShade8F,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    secondContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin: ms(15)
    },
    headerTitle:{
        color:colorPalates.AppTheme.primary,
        fontSize:ms(18),
        fontWeight:'600',
    }
})