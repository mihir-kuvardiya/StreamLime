import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../../../theme/colorPalates";

export default ScaledSheet.create({
    flatListContainer:{
        paddingBottom: ms(40),
        paddingTop: ms(3)
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
        borderRadius:ms(10)
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
    followingButton:{
        borderColor:colorPalates.AppTheme.primary,
        borderWidth:1,
        borderRadius:ms(5),
        marginRight:ms(10),
        width:ms(75),
        alignItems:'center'
    },
    followingText:{
        fontSize:ms(12),
        fontWeight:'500',
        color:colorPalates.AppTheme.primary,
        paddingVertical:ms(6)
    },
    followButton:{
        backgroundColor:colorPalates.AppTheme.primary,
        borderRadius:ms(5),
        marginRight:ms(10),
        width:ms(75),
        alignItems:'center'
    },
    followText:{
        fontSize:ms(12),
        fontWeight:'500',
        color:colorPalates.white,
        paddingVertical:ms(6)
    }
})