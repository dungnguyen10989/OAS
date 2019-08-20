import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { IContainerProps } from 'ui-kit';
import { Formik, FormikActions } from 'formik';
import * as yup from 'yup';
import {
  GestureResponderEvent,
  Keyboard,
  Text,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from 'react-native';
import { Header } from 'react-navigation';

import Boundary from '../Boundary';
import * as UIKit from '../../components/UIKit';
import { images } from '../../assets';
import { appSelectors, appActions } from '../../redux/app';
import { AppState, Action } from 'c-redux';
import { storageKeys, dims, colors } from '../../constants';
import ReCaptcha from '../../components/recaptcha';
import { routes } from '..';
import { NavigationScreenOptions } from 'react-navigation';
import normalize from '../../utils/normalize';
import { authActions, authSelectors } from '../../redux/auth';

interface StateProps {
  fetchingRequestPasswordStatus?: number;
}

interface DispatchProps {
  requestPassword: (params: Form, onSuccess?: Function, onError?: Function) => Action;
}

interface OwnProps extends IContainerProps {}

interface Props extends OwnProps, DispatchProps, StateProps {}

interface Form {
  email: string;
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  fetchingRequestPasswordStatus: authSelectors(state).fetchingRequestPasswordStatus
});

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): DispatchProps => ({
  requestPassword: (payload, onSuccess, onError) =>
    dispatch(authActions.requestPassword(payload, onSuccess, onError))
});

class ForgotPassword extends React.PureComponent<Props, any> {
  private size = normalize(dims.fontSize.largest);

  onSubmit = (values: Form, action?: FormikActions<Form>) => {
    this.props.requestPassword({ email: values.email });
  };

  validationSchema = () => {
    const { t } = this.props.screenProps;

    return yup.object().shape({
      email: yup
        .string()
        .required(t('validation.emailInvalid'))
        .email(t('validation.emailInvalid'))
    });
  };

  back = () => this.props.navigation.goBack();

  render() {
    const { screenProps, fetchingRequestPasswordStatus } = this.props;
    const { t } = screenProps;
    const initialValues = { email: this.props.navigation.getParam('email') };

    return (
      <Boundary navigation={this.props.navigation}>
        <UIKit.Core.SafeAreaView style={styles.container}>
          <UIKit.Core.TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <UIKit.View style={styles.container}>
              <UIKit.Core.TouchableOpacity onPress={this.back} style={styles.header}>
                <UIKit.assets.icons.Feather.ArrowLeft
                  stroke="#1a1a1a"
                  width={this.size}
                  height={this.size}
                />
              </UIKit.Core.TouchableOpacity>
              <Formik
                initialValues={initialValues}
                onSubmit={this.onSubmit}
                validationSchema={this.validationSchema()}
              >
                {props => {
                  return (
                    <UIKit.View style={styles.wrapper}>
                      <UIKit.Text style={styles.label}>{t('label.forgotPassword')}</UIKit.Text>

                      <UIKit.Input
                        id="email"
                        placeholder={t('pHolder.email')}
                        onSubmitEditing={(
                          e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
                        ) => props.handleSubmit()}
                        keyboardType="email-address"
                        returnKeyType="go"
                        {...props}
                      />

                      <UIKit.Button
                        style={styles.submit}
                        title={t('btn.sendRequest')}
                        onPress={(e: GestureResponderEvent) => props.handleSubmit()}
                        backgroundColor={colors.gradientButton}
                        loading={fetchingRequestPasswordStatus === 1}
                      />
                    </UIKit.View>
                  );
                }}
              </Formik>
            </UIKit.View>
          </UIKit.Core.TouchableWithoutFeedback>
        </UIKit.Core.SafeAreaView>
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

const styles = UIKit.Core.StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginBottom: 10,
    padding: 5
  },
  title: {
    flex: 1,
    textAlign: 'center'
  },
  wrapper: {
    padding: 16
  },
  submit: {
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 10
  },
  label: {
    textAlign: 'center',
    color: '#1a1a1a',
    fontWeight: 'bold',
    marginBottom: 30
  }
});
