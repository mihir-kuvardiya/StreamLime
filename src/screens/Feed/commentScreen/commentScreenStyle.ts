import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";

export default ScaledSheet.create({
    mainContainer:{
        marginHorizontal:ms(16)
    },
    totalComments:{
        color:colorPalates.AppTheme.text,
        fontFamily:'Ubuntu-Rgular',
        fontSize:ms(16),
        marginTop:ms(10)
    }
})