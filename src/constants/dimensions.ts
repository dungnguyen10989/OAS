import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const REM = 14;

const isIPhoneX = (): boolean =>
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812 || (height === 896 || width === 896));

const getBottomSpace = (): number => (isIPhoneX() ? 34 : 0);

const getStatusBarHeight = (): number =>
  Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight
  });

export const dims = {
  DEFAULT_FONT_TEXT: REM,
  DEFAULT_FONT_INPUT: REM + 1,
  DEFAULT_COLOR_TEXT: '#333',
  DEFAULT_PADDING: 16,

  topBarButtonSize: 26,
  screenWidth: width,
  screenHeight: height,
  OS: Platform.OS,
  prefix: Platform.OS === 'android' ? 'android-' : 'ios-',
  isIPhoneX,
  getBottomSpace,
  getStatusBarHeight,
  borderWidth: 1 / PixelRatio.get(),
  fontSize: {
    tiny: REM - 6,
    smaller: REM - 4,
    small: REM - 2,
    medium: REM,
    large: REM + 2,
    larger: REM + 4,
    largest: REM + 6
  }
};
