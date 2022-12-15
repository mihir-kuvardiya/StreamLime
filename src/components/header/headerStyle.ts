import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../theme/colorPalates";

export default ScaledSheet.create({
    mainContainer: {
        padding:ms(8)
    },
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:ms(15),
        paddingVertical: ms(6),
        // borderBottomLeftRadius: ms(20),
        // borderBottomRightRadius: ms(20),
        borderRadius:ms(10),
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
        fontFamily: 'Niconne-Regular',
        color:colorPalates.AppTheme.primary,
        fontSize:ms(28),
        // fontWeight:'900',
    },
    profileImage:{
        height: ms(40),
        width: ms(40),
        borderRadius: ms(20)
    },
    iconContainer:{
        height: ms(40),
        width: ms(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyView:{
        width: ms(30)
    }
})