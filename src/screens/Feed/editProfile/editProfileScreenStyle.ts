import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";

export default ScaledSheet.create({
    container:{
        flex:1
    },
    Image:{
        height: ms(80),
        width: ms(80),
        borderRadius: ms(40),
        alignSelf: 'center',
        marginVertical: ms(10),
        marginTop:ms(20)
    },
    secondContainer:{
        marginTop: ms(20),
        marginHorizontal: ms(16)
    },
    text:{
        marginVertical: ms(3),
        fontSize: ms(13),
        fontWeight: '400',
        color: colorPalates.AppTheme.text,
        marginLeft: ms(5)
    },
    textInput:{
        backgroundColor:colorPalates.white,
        borderRadius: ms(5),
        marginVertical: ms(2),
        paddingHorizontal: ms(15),
        shadowColor: colorPalates.AppTheme.text,
        color: colorPalates.AppTheme.text,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.65,
        elevation: 2,
    },
    bio:{
        backgroundColor:colorPalates.white,
        height: ms(100),
        borderRadius: ms(5),
        marginVertical: ms(2),
        paddingHorizontal: ms(15),
        shadowColor: colorPalates.AppTheme.text,
        color: colorPalates.AppTheme.text,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.65,
        elevation: 2,
        textAlignVertical: 'top'
    },
    emptyView:{
        marginTop: ms(10)
    },
    logoutView:{
        alignItems:'center',
        marginTop:ms(150)
    },
    logoutButton:{
        backgroundColor:colorPalates.white,
        borderColor:colorPalates.AppTheme.border,
        borderWidth:1,
        width:'40%',
        borderRadius: ms(10),
        height:ms(35),
        justifyContent:'center'
    },
    logoutText:{
        color: colorPalates.AppTheme.secondary,
        fontSize: ms(16),
        marginVertical:ms(6),
        textAlign:'center',
        fontWeight:'500'
    }
})