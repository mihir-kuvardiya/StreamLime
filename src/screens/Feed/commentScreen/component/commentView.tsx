import moment from "moment";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { showToast, timeStampComment } from "../../../../helper/helper";
import images from "../../../../theme/images";
import commentViewStyle from "./commentViewStyle";
import IconEntypo from "react-native-vector-icons/Entypo";
import DeleteModal from "../../../../components/deleteModal/deleteModal";
import ReportModal from "../../../../components/reportModal/reportModal";
import colors from "../../../../theme/colors";
import { useUserData } from "../../../../redux/reducers/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { feedAction } from "../../../../redux/reducers/feedSlice/feedSlice";
import firestore from '@react-native-firebase/firestore';

export interface commentViewProps{
    item:any;
}
const CommentView = ({item}:commentViewProps) =>{

    const userData = useUserData();
    const dispatch = useDispatch();
    const [visible, setIsVisible] = useState(false);
    const [reportVisible, setReportVisible] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const onPressMenu = () => {
        if(item?.userId === userData?.userId){
            setIsVisible(true);
        }else{
            setReportVisible(true);
        }
    }
    const onPressDelete = () => {
        setDeleteLoading(true);
        dispatch(feedAction.deleteComment({
            id:item?.commentId,
            postId: item?.postId
        }))
        firestore().collection('comment').doc(item?.commentId).delete()
        .then(()=>{
            console.log('comment deleted');
            setIsVisible(false);
            setDeleteLoading(false);
        })
        .catch((e)=>{
            console.log(e,'error in get comments');
            setDeleteLoading(false);
        })
    }

    const onPressReport = () => {
        setReportVisible(false);
        showToast('comment has been reported!')
    }

    return(
        <>
        <View style={commentViewStyle.container}>
            <Image
                 style={commentViewStyle.image}
                 source={item?.profilePicture ? {
                     uri: item?.profilePicture,
                 } : images.dp} 
                 resizeMode={"cover"} 
            />
            <View style={commentViewStyle.mainTextContainer}>
                <View style={commentViewStyle.userNameContainer}>
                    <Text style={commentViewStyle.commentText}>
                    <Text style={commentViewStyle.userNameText}>{item?.userName}</Text> {item?.commentText}
                    </Text>
                </View>
                <View style={commentViewStyle.commentTextContainer}>
                    <Text style={commentViewStyle.timeStamp}>{moment(item?.createdAt).local().startOf('seconds').fromNow() || ''}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onPressMenu} hitSlop={{bottom:10,left:10,right:10,top:10}}>
                <IconEntypo name="dots-three-vertical" size={20} color={colors.grayShade8F} />
            </TouchableOpacity>
        </View>
        <DeleteModal loading={deleteLoading} isVisible={visible} onClose={()=>setIsVisible(false)} onPressDelete={onPressDelete}/>
        <ReportModal isVisible={reportVisible} onClose={()=>setReportVisible(false)} onPressReport={onPressReport}/>
        </>
    )
}

export default CommentView;