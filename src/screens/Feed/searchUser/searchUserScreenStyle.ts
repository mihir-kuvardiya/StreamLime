import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";

export default ScaledSheet.create({
    searchBarContainer:{
        margin:ms(10),
        borderColor:colorPalates.AppTheme.border,
        borderWidth:1,
        borderRadius:ms(10),
        flexDirection:'row',
        height:ms(35),
        alignItems:'center',
        backgroundColor:'white',
    },
    searchIconContainer:{
        marginLeft:ms(10)
    },
    searchBarTextInput:{
        padding:0,
        marginLeft:ms(10),
        color:colors.blackShade1B
    }
})