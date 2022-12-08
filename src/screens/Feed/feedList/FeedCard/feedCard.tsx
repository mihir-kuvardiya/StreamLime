import React from "react";
import { Image, Text, View } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colorPalates from "../../../../theme/colorPalates";
import colors from "../../../../theme/colors";
import feedCardStyle from "./feedCardStyle";

const FeedCard = () => {
    return(
        <View style={feedCardStyle.feedContainer}>
            <View style={feedCardStyle.feedHeaderContainer}>
                <View style={feedCardStyle.feedHeaderSecondContainer}>
                    <Image
                        style={feedCardStyle.feedHeaderImage}
                        source={{
                            uri: 'https://unsplash.it/400/400?image=1',
                        }}
                        resizeMode={"cover"} 
                    />
                    <View style={feedCardStyle.feedHeaderTextContainer}>
                        <Text style={feedCardStyle.feedHeaderUserName}>mihirKuvardiyait3</Text>
                        <Text style={feedCardStyle.feedHeaderTime}>2 days ago </Text>
                    </View>
                </View>
                <IconEntypo name="dots-three-vertical" size={20} color={colors.grayShade8F} />
            </View>
            <View style={feedCardStyle.mainFeedContainer}>
                <Image
                    style={feedCardStyle.feedMainImage}
                    source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                    }}
                    resizeMode={"cover"} 
                />
                <Text style={feedCardStyle.feedDescription}>
                    hello this is description
                </Text>
            </View>
            <View style={feedCardStyle.FeedBottomContainer}>
            <IconEntypo name="flash" size={25} color={colorPalates.AppTheme.secondary}/>
            <IconMaterialIcons name="comment" size={25} color={colors.blueShade00}/>
            <IconFontAwesome5 name="share" size={25} color={colorPalates.AppTheme.primary}/>
            </View>
        </View>
    )
}

export default FeedCard