import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../../theme/colorPalates";
import colors from "../../../../theme/colors";


export default ScaledSheet.create({
    feedContainer:{
        backgroundColor:"white",
        margin: ms(8),
        borderRadius:ms(20),
        shadowColor: colorPalates.AppTheme.text,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    feedHeaderContainer:{
        padding:ms(8),
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    feedHeaderSecondContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    feedHeaderImage:{
        width: 50, 
        height: 50, 
        borderRadius: 25
    },
    feedHeaderTextContainer:{
        flexDirection: 'column', 
        marginLeft: 15
    },
    feedHeaderUserName:{
        color: colorPalates.AppTheme.text, 
        fontSize: 16, 
        fontWeight: '500'
    },
    feedHeaderTime:{
        color: colors.grayShade8F, 
        fontSize: 13, 
        marginTop:ms(2)
    },
    mainFeedContainer:{
        marginTop: ms(5)
    },
    feedMainImage:{
        width:'100%',
        minHeight:ms(250),
        maxHeight:ms(500),
        // borderRadius:ms(20)
    },
    feedDescription:{
        paddingHorizontal:ms(8),
        marginTop:ms(10),
        fontSize:ms(14),
        color:colorPalates.AppTheme.text
    },
    FeedBottomContainer:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})