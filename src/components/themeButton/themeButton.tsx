import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import themeButtonStyle from './themeButtonStyle';

export interface themeButtonProps{
    title?: string;
    loading?: boolean;
    containerStyle?: any;
    titleStyle?: any;
    onPress: () => void;
}
  
const ThemeButton = ({
  title = 'Button',
  loading = false,
  containerStyle = themeButtonStyle.container,
  titleStyle = themeButtonStyle.titleTextStyle,
  onPress,
}: themeButtonProps) => {
  return (
    <TouchableOpacity
      style={[themeButtonStyle.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      <LinearGradient
        start={{x: 0.0, y: 2.5}}
        end={{x: 1.5, y: 2.5}}
        locations={[0, 0.5]}
        colors={[colors.greenShade2A, colors.greenShade59]}
        style={themeButtonStyle.linearGradientContainer}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={colors.white}
          />
        ) : (
          <Text style={[themeButtonStyle.titleTextStyle, titleStyle]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default ThemeButton;