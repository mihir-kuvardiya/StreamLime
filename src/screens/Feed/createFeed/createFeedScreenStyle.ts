import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../../../theme/colorPalates";


export default ScaledSheet.create({
    imageViewContainer:{
        margin:ms(16),
        borderColor:colorPalates.AppTheme.border,
        backgroundColor:colorPalates.white,
        borderWidth:1,
        borderRadius:ms(10),
        justifyContent:'center'
    },
    loadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    descriptionTextInput:{
        margin:ms(16),
        height:ms(100),
        borderColor:colorPalates.AppTheme.border,
        backgroundColor:colorPalates.white,
        borderWidth:1,
        color:colorPalates.AppTheme.text,
        borderRadius:ms(10),
        textAlignVertical:'top',
        padding:ms(12)
    },
    createPostButton:{
        height:ms(40),
        justifyContent:'center',
        marginHorizontal:ms(16),
        borderRadius:ms(10),
        marginVertical:ms(12),
        backgroundColor:colorPalates.white,
        borderColor:colorPalates.AppTheme.border,
        borderWidth:1
    },
    createPostText:{
        color:colorPalates.AppTheme.primary,
        fontSize:ms(16),
        textAlign:'center',
        padding:ms(8),
        fontWeight:'600'
    },
    postImage:{
        maxHeight:ms(300),
        minHeight:ms(200),
        width:'100%',
        borderRadius:ms(10),
        alignSelf:'center',
    },
    deleteIcon:{
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: 'white',
        opacity: 0.8,
        borderRadius: 20
    },
    createView:{
        height:ms(200),
        margin:ms(16),
        borderColor:colorPalates.AppTheme.border,
        backgroundColor:colorPalates.white,
        borderWidth:1,
        borderRadius:ms(10),
        alignItems:'center',
        justifyContent:"center"
    },
    addPhotoText:{
        fontFamily:'Ubuntu-Regular',
        fontSize:ms(16),
        color:colorPalates.AppTheme.text,
        marginTop:ms(10)
    }
})