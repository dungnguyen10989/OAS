declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.ComponentClass<SvgProps, any>;
  export default content;
}

declare module 'react-native-spinkit' {
  import React from 'react';

  export type SpinnerType =
    | 'CircleFlip'
    | 'Bounce'
    | 'Wave'
    | 'WanderingCubes'
    | 'Pulse'
    | 'ChasingDots'
    | 'ThreeBounce'
    | 'Circle'
    | '9CubeGrid'
    | 'WordPress'
    | 'FadingCircle'
    | 'FadingCircleAlt'
    | 'Arc'
    | 'ArcAlt'
    | 'Plane';

  export interface SpinnerProps {
    isVisible: boolean;
    color?: string;
    size?: number;
    type?: SpinnerType;
  }

  const Spinner: React.ComponentType<SpinnerProps>;
  export default Spinner;
}

declare module 'c-redux' {
  import { Immutable } from 'seamless-immutable';
  export interface AppState {
    app: Immutable<any>;
    auth: Immutable<any>;
    task: Immutable<any>;
    openingRequest: Immutable<any>;
    requestDetail: Immutable<any>;
    myApproved: Immutable<any>;
    filter: Immutable<any>;
    units: Immutable<any>;
  }

  export type FetchingStatus = 'fetch' | 'refresh' | 'more';

  interface FetchRequestParams {
    type?: string;
    isOverDeadline?: boolean;
    status?: 'Open' | 'Waiting' | 'Approved' | 'Cancelled' | 'Return' | 'Pending';
    pageNumber?: number;
    pageSize?: number;
    userName?: string;
    keyword?: string;
  }

  export interface Action {
    type: string;
    payload?: any;
  }

  export interface ActionEnhance {
    type: string;
    payload: any;
    onSuccess: Function;
    onError: Function;
  }

  export interface HTTPResponseCode<ResponseType> {
    status: boolean;
    code:
      | 200 // OK
      | 201 // Created
      | 202 // Accepted
      | 204 // No Content
      | 301 // Moved Permanently
      | 302 // Found
      | 303 // See Other
      | 304 // Modified
      | 307 // Temporary Redirect
      | 400 // Request
      | 401 // Unauthorized
      | 403 // Forbidden
      | 404 // Not Found
      | 405 // Method Not Allowed
      | 406 // Not Acceptable
      | 412 // Precondition Failed
      | 415 // Unsupported Media Type
      | 500 // Internal Server Error
      | 501; // Not Implemented;
    data?: ResponseType;
    error?: Error;
  }
}

declare module 'ui-kit' {
  import * as React from 'react';
  import * as Core from 'react-native';
  import { NavigationState, NavigationParams, NavigationScreenProp } from 'react-navigation';
  import { FormikProps } from 'formik';
  import { Action } from 'c-redux';

  export interface _NavigationProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }

  export interface IContainerProps extends _NavigationProps {
    screenProps: {
      locale: string;
      online: boolean;
      setLocale: (locale: string) => void;
      t: (locale: string) => string;
    };
  }

  export interface _ViewProps extends Core.ViewProps {
    flex?: number;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    alignItems?: 'baseline' | 'center' | 'flex-start' | 'flex-end' | 'stretch';
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    alignContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'stretch'
      | 'space-between'
      | 'space-around';
    overflow?: 'visible' | 'hidden' | 'scroll';
    position?: 'absolute' | 'relative';
  }

  interface ICText {
    fontSize?: 'tiny' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?:
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900';
    textAlign?: 'auto' | 'left' | 'center' | 'right';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    color?: string;
    fontFamily?: string;
  }

  export interface _TextProps extends Core.TextProps, ICText {}

  type _VectorIconProvider =
    | 'Entypo'
    | 'EvilsIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'Zocial'
    | 'SimpleLineIcons';

  type _SpinnerProvider =
    | 'CircleFlip'
    | 'Bounce'
    | 'Wave'
    | 'WanderingCubes'
    | 'Pulse'
    | 'ChasingDots'
    | 'ThreeBounce'
    | 'Circle'
    | '9CubeGrid'
    | 'WordPress'
    | 'FadingCircle'
    | 'FadingCircleAlt'
    | 'Arc'
    | 'ArcAlt';

  export interface _InputProps extends _TextProps, Core.TextInputProps, FormikProps<any> {
    id: string;
    iconClearSize?: number;
    iconClearColor?: string;
    showClearButton?: boolean;
    borderBottomColor?: string;
    containerStyle?: Core.ViewStyle;
    initialValue?: string;
    lineStyle?: Core.ViewStyle;
    showError?: boolean;
    errorFontSize?: number;
    errorColor?: string;
    border?: boolean;
  }

  export interface _SpinnerProps {
    type: _SpinnerProvider;
    color?: string;
    size?: number;
  }

  export interface _ButtonProps {
    textStyle?: Core.TextStyle;
    textFontSize?: number;
    textColor?: string;
    backgroundColor?: string | string[];
    title?: string | JSX.Element;
    loading?: boolean;
    showLoading?: boolean;
    pressOnLoading?: boolean;
    spinnerColor?: string;
    spinnerSize?: number;
    spinnerType?: _SpinnerProvider;
    gradientDirection?: 'vertical' | 'horizontal';
  }

  export interface _VectorIconProps extends Core.TouchableOpacityProps {
    name: string;
    provider?: _VectorIconProvider;
    size?: number;
    color?: string;
    iconStyle?: Core.ViewStyle;
    touchableStyle?: Core.ViewStyle;
    onPress?: (event: Core.GestureResponderEvent) => any;
    getFontFamily?: Function;
    getImageSource?: Function;
    getRawGlyphMap?: Function;
    hasIcon?: () => Function;
  }

  export interface _CheckboxProps extends Core.FlatListProps<any> {
    data: Array<any>;
    provider?: _VectorIconProvider;
    initChecked?: Array<any>;
    checkedIconName?: string;
    unCheckedIconName?: string;
    iconsSize?: number;
    checkedIconColor?: string;
    unCheckedIconColor?: string;
    checkedTextColor?: string;
    unCheckedTextColor?: string;
    textStyle?: Core.TextStyle;
    textFontSize?: number;
    containerStyle?: Core.ViewStyle;
    activeOpacity?: number;
    onChanged?: (arr?: Array<any>) => any;
    reverse?: boolean;
  }

  export interface _RadiosProps extends _CheckboxProps {
    initChecked?: any;
    onChanged?: (value?: any, index?: number) => any;
  }

  export interface _FlatListProps extends Core.FlatListProps<any> {
    fetchingStatus?: number;
    onLoadMore?: Function;
    onReconnect?: Function;
  }

  export interface _ImageProps extends Core.ImageProps {
    zoomable?: boolean;
    errorText?: string;
    springConfig?: Core.Animated.SpringAnimationConfig;
    underlayColor?: string;
    backgroundColor?: string;
    swipeToDismiss?: boolean;
    activeProps?: object;
    loadingColor?: string;
    loadingSize?: 'large' | 'small';

    renderHeader?: Function;
    didOpen?: Function;
    onOpen?: Function;
    onClose?: Function;
    willClose?: Function;
    renderContent?: Function;
  }

  export interface _ModalProps extends Core.ModalProps {
    backHardwareToDismiss?: boolean;
    backdropTouchToDismiss?: boolean;
  }
}
