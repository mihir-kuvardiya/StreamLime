import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../theme/colors';

export default ScaledSheet.create({
  container: {
    height: ms(48),
    minWidth: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackShade20,
    borderRadius: ms(25),
    overflow: 'hidden',
  },
  linearGradientContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: colors.white,
    fontSize: ms(16),
  },
});