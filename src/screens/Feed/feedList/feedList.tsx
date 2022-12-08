import React from "react"
import { Text, View } from "react-native"
import Header from "../../../components/header/header";
import FeedCard from "./FeedCard/feedCard";

const FeedList = () => {
    return(
        <View>
            <Header/>
            <FeedCard/>
            
        </View>
    )
}

export default FeedList;