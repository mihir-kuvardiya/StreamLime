import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../../theme/colorPalates";
import colors from "../../../../theme/colors";


export default ScaledSheet.create({
    image:{
        width: ms(40), 
        height: ms(40), 
        borderRadius: ms(20),
        margin:ms(2)
    },
    container:{
        flexDirection:'row',
        marginHorizontal:ms(16),
        padding:ms(4),
        marginVertical:ms(3),
        alignItems:'center',
        borderColor:colorPalates.AppTheme.border,
        borderWidth:1,
        borderRadius:ms(10),
        backgroundColor:colorPalates.white
    },
    mainTextContainer:{
        marginLeft:ms(6),
        flex:1
    },
    userNameContainer:{
        flexDirection:"row",
        alignItems:'center',
    },
    userNameText:{
        color: colorPalates.AppTheme.text,
        fontSize: ms(14),
        fontWeight: '500'
    },
    timeStamp:{
        color: colors.grayShade8F,
        fontSize: ms(12),
    },
    commentTextContainer:{
        flexDirection:'row',
        marginTop:ms(2),
    },
    commentText:{
        flex:1,
        flexWrap:'wrap',
        color: colorPalates.AppTheme.text,
        fontSize: ms(13),
        marginLeft: ms(5)
    }
})