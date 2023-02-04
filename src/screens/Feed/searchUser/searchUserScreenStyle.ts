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
    },
    rowContainer:{
        flexDirection: 'row',
        marginHorizontal: ms(16),
        marginVertical: ms(3),
        padding:ms(5),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor:colorPalates.AppTheme.border,
        borderWidth:1,
        backgroundColor:colorPalates.white,
        borderRadius:ms(10),
    },
    rowSecondContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        height: ms(40),
        width: ms(40),
        borderRadius: ms(20),
        margin:ms(2)
    },
    userName:{
        color: colorPalates.AppTheme.text,
        fontSize: ms(15),
        marginLeft:ms(10),
        fontWeight:'500'
    },
})