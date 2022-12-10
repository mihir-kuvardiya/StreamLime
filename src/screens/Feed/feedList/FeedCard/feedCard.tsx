import React, { useState } from "react";
import { Image, Text, View, Pressable } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colorPalates from "../../../../theme/colorPalates";
import colors from "../../../../theme/colors";
import feedCardStyle from "./feedCardStyle";

const FeedCard = () => {

    const [liked, setLiked] = useState(false);
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
                <Pressable style={feedCardStyle.likeContainer} onPress={()=>setLiked(!liked)}>
                        <IconAntDesign 
                            name={liked ? "heart" : "hearto"}  
                            size={25} 
                            color={liked ? colorPalates.AppTheme.secondary : colorPalates.AppTheme.text}
                        />
                    <Text style={feedCardStyle.likeCount}>1.1k</Text>
                </Pressable>
                <Pressable style={feedCardStyle.likeContainer}>
            		<IconMaterialIcons name="comment" size={25} color={colors.blueShade00}/>
         			<Text style={feedCardStyle.likeCount}>1.1k</Text>
                </Pressable>
            <IconFontAwesome5 name="share" size={25} color={colorPalates.AppTheme.primary}/>
            </View>
        </View>
    )
}

export default FeedCard