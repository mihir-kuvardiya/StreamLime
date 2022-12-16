import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../../../components/header/header";
import commentScreenStyle from "./commentScreenStyle";

const CommentScreen = () => {
    return(
        <>
            <SafeAreaView>
                <Header isBack={true} title={'comments'}/>
            </SafeAreaView>
            <View style={commentScreenStyle.mainContainer}>
                <Text style={commentScreenStyle.totalComments}>
                    25.k Comments
                </Text>
            </View>
        </>
    )
}

export default CommentScreen;