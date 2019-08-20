import * as React from 'react';
import { connect } from 'react-redux';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { Dispatch } from 'redux';
import { IContainerProps } from 'ui-kit';
import { Formik, FormikActions } from 'formik';
import * as yup from 'yup';
import {
  GestureResponderEvent,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Alert
} from 'react-native';
// import { CameraKitCameraScreen } from 'react-native-camera-kit';

import Boundary from '../Boundary';
import * as UIKit from '../../components/UIKit';
import { images } from '../../assets';
import { unitsSelectors, unitsActions } from '../../redux/units';
import { authSelectors, authActions } from '../../redux/auth';

import { AppState, Action } from 'c-redux';
import { storageKeys, dims, colors } from '../../constants';
import ReCaptcha from '../../components/recaptcha';
import { routes } from '..';
import normalize from '../../utils/normalize';
import { showDialog } from '../../emitter';

interface LoginParams {
  username?: string;
  password?: string;
}

interface Props extends IContainerProps {
  fetchingAuthorization?: number;
  fetchingUnits?: number;
  login: (params: LoginParams) => Action;
}

const mapStateToProps = (state: AppState) => ({
  fetchingAuthorization: authSelectors(state).fetchingAuthorization,
  fetchingUnits: unitsSelectors(state).fetchingUnits
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (payload: LoginParams) => dispatch(authActions.login(payload))
});

interface CheckMarkState {
  checked: boolean;
}

class CheckMark extends React.PureComponent<any, CheckMarkState> {
  constructor(props: any) {
    super(props);
    this.state = {
      checked: props.init || false
    };
  }

  private onPress = () => this.setState(currentState => ({ checked: !currentState.checked }));

  public getStatus = () => this.state.checked;

  render() {
    const { checked } = this.state;
    const Icon = checked
      ? UIKit.assets.icons.Feather.CheckSquare
      : UIKit.assets.icons.Feather.Square;
    const size = normalize(dims.fontSize.medium);
    return (
      <UIKit.Core.TouchableOpacity activeOpacity={0.8} onPress={this.onPress} style={styles.check}>
        <Icon stroke="#eee" width={size} height={size} />
        <UIKit.Text color="#eee" style={styles.checkText}>
          {this.props.t('label.rememberAccount')}
        </UIKit.Text>
      </UIKit.Core.TouchableOpacity>
    );
  }
}

class Login extends React.PureComponent<Props, LoginParams> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: undefined
    };
  }

  private userRef = React.createRef<UIKit.Input>();
  private pswRef = React.createRef<UIKit.Input>();
  private checkRef = React.createRef<CheckMark>();
  private formik = React.createRef<Formik<any>>();

  async componentDidMount() {
    try {
      const username = await RNSecureStorage.get(storageKeys.email);
      this.setState({ username } as LoginParams);
    } catch (error) {
      this.setState({ username: '' } as LoginParams);
    }
  }

  onSubmit = (values: LoginParams, action: FormikActions<LoginParams>) => {
    let checked = false;

    if (this.checkRef.current) {
      checked = this.checkRef.current.getStatus();
    }

    if (checked) {
      RNSecureStorage.set(storageKeys.email, values.username || '', {
        accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY
      });
    }

    this.props.login({ username: values.username, password: values.password });
  };

  onForgot = () => {
    let email = '';
    if (this.formik.current) {
      email = this.formik.current.state.values.email;
    }
    this.props.navigation.navigate({ routeName: routes.ForgotPassword, params: { email } });
  };

  handoverFocus = () => {
    if (this.pswRef.current) {
      this.pswRef.current.focus();
    }
  };

  validationSchema = () => {
    const { t } = this.props.screenProps;
    return yup.object().shape({
      username: yup
        .string()
        .required(t('validation.emailInvalid'))
        .email(t('validation.emailInvalid')),
      password: yup
        .string()
        .test('l', t('validation.passwordMinLength'), val => val && val.length >= 6)
    });
  };

  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    Alert.alert(
      `${event.type} button pressed`,
      `${captureImages}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  render() {
    const { username } = this.state;

    const { fetchingAuthorization, screenProps, fetchingUnits } = this.props;
    const { t } = screenProps;

    if (username === undefined) {
      return null;
    }

    return (
      <Boundary navigation={this.props.navigation}>
        <StatusBar
          backgroundColor={
            fetchingAuthorization === 1 || fetchingUnits === 1
              ? colors.main.redOverlay
              : colors.main.red
          }
        />
        <UIKit.ScrollView scrollEnabled bounces={false} style={styles.container}>
          <UIKit.Core.SafeAreaView style={styles.container}>
            {/* <UIKit.Overlay visible={fetchingAuthorization === 1 || fetchingUnits === 1} /> */}
            <UIKit.View style={styles.logo}>
              <UIKit.Core.Image source={images.logo} style={styles.img} resizeMode="cover" />
            </UIKit.View>
            <Formik
              ref={this.formik}
              enableReinitialize
              initialValues={{ username, password: '123456' }}
              onSubmit={this.onSubmit}
              validationSchema={this.validationSchema()}
            >
              {props => {
                return (
                  <UIKit.View style={styles.wrapper}>
                    <UIKit.Input
                      id="username"
                      ref={this.userRef}
                      placeholder={t('pHolder.email')}
                      autoCapitalize="none"
                      onSubmitEditing={this.handoverFocus}
                      keyboardType="email-address"
                      returnKeyType="next"
                      color="#fff"
                      iconClearColor="#fff"
                      borderBottomColor="#a1a1a1"
                      errorColor="#ddd"
                      containerStyle={styles.transparent}
                      placeholderTextColor="#a1a1a1"
                      {...props}
                    />
                    <UIKit.View style={styles.separator} />
                    <UIKit.Input
                      id="password"
                      secureTextEntry
                      ref={this.pswRef}
                      placeholder={t('pHolder.password')}
                      returnKeyType="go"
                      lineStyle={styles.psw}
                      color="#fff"
                      errorColor="#ddd"
                      iconClearColor="#fff"
                      placeholderTextColor="#a1a1a1"
                      borderBottomColor="#a1a1a1"
                      containerStyle={styles.transparent}
                      onSubmitEditing={() => props.handleSubmit()}
                      {...props}
                    />

                    <CheckMark ref={this.checkRef} t={t} init={username.length > 0} />

                    <UIKit.Button
                      loading={fetchingAuthorization === 1 || fetchingUnits === 1}
                      style={styles.submit}
                      title={t('btn.login')}
                      onPress={(e: GestureResponderEvent) => props.handleSubmit()}
                      backgroundColor={colors.main.yellow}
                    />
                    <UIKit.Core.TouchableOpacity style={styles.forgot} onPress={this.onForgot}>
                      <UIKit.Text color="#fff">{t('btn.forgotPassword')}</UIKit.Text>
                    </UIKit.Core.TouchableOpacity>
                  </UIKit.View>
                );
              }}
            </Formik>

            {/* <ReCaptcha style={styles.recaptcha} /> */}
            <UIKit.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <UIKit.Text color="#fff">ReCaptcha here</UIKit.Text>
            </UIKit.View>
          </UIKit.Core.SafeAreaView>
        </UIKit.ScrollView>
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = UIKit.Core.StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.main.red
  },
  flex1: {
    flex: 1
  },
  wrapper: {
    padding: 16
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: dims.DEFAULT_PADDING
  },
  checkText: {
    marginLeft: 5,
    fontSize: dims.fontSize.small
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  img: {
    maxHeight: 500,
    maxWidth: 500
  },
  psw: {
    marginVertical: 5
  },
  submit: {
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 10
  },
  recaptcha: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  forgot: {
    alignSelf: 'center',
    marginVertical: 20
  },
  separator: {
    height: dims.DEFAULT_PADDING
  },
  transparent: {
    backgroundColor: 'transparent'
  }
});
