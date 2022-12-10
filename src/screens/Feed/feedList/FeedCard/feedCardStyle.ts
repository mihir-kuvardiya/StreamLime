import { ms, ScaledSheet } from "react-native-size-matters";
import { Colors } from "react-native/Libraries/NewAppScreen";
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
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding:ms(8)
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
        marginTop: ms(5),
        padding:ms(8)
    },
    feedMainImage:{
        width:'100%',
        minHeight:ms(250),
        maxHeight:ms(500),
        borderRadius:ms(20)
        // borderRadius:ms(20)
    },
    feedDescription:{
        marginLeft:ms(8),
        marginTop:ms(10),
        fontSize:ms(14),
        color:colorPalates.AppTheme.text
    },
    FeedBottomContainer:{
        padding:ms(8),
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    likeContainer:{
        alignItems:"center",
        flexDirection:'row'
    },
    likeCount:{
        color:colors.grayShade8F,
        fontSize:ms(13),
        marginLeft:ms(5)
    }
})