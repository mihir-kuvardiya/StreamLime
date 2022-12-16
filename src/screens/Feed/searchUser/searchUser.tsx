import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../../../components/header/header";

const SearchUser = () => {
    return(
        <SafeAreaView>
            <Header isBack={true} title={'search'}/>
        </SafeAreaView>
    )
}

export default SearchUser;