import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/header/header";

const CreateFeedScreen = () => {
    return(
        <SafeAreaView>
            <Header title="Create Post" isBack={true}/>
        </SafeAreaView>
    )
}

export default CreateFeedScreen;