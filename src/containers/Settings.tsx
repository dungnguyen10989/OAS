import * as React from 'react';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  NavigationScreenOptions,
  NavigationScreenConfig
} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { Formik, FormikValues, FormikActions } from 'formik';
import CodePush from 'react-native-code-push';
import I18n from '../i18n';

import { _NavigationProps, IContainerProps } from 'ui-kit';
import { business, colors, dims, storageKeys } from '../constants';
import { UIKit } from '../components';
import normalize from '../utils/normalize';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { Alert } from 'react-native';

export default class Settings extends React.Component<IContainerProps, any> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }): NavigationScreenConfig<NavigationScreenOptions> => {
    const onPress = navigation.getParam('onRightPress');
    return {
      headerRight: (
        <UIKit.Core.TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Feather name="check" size={dims.topBarButtonSize} color={colors.main.white} />
        </UIKit.Core.TouchableOpacity>
      )
    };
  };
  private formik = React.createRef<Formik>();

  constructor(props: IContainerProps) {
    super(props);

    props.navigation.setParams({ onRightPress: this.onSave });
  }

  renderStatusItem = ({ item }: { item: any }) => {
    return <UIKit.Text>{item}</UIKit.Text>;
  };

  onSave = () => {
    if (this.formik.current) {
      this.formik.current.executeSubmit();
    }
  };

  onDatePickerResult = (date: Date) => {};

  onSubmit = (values: FormikValues, action: FormikActions<any>) => {
    const { language } = values;
    const map = language === 'English' ? 'en' : 'vi';
    if (I18n.locale !== map) {
      try {
        RNSecureStorage.set(storageKeys.locale, map, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY
        });
        Alert.alert('Alert', 'Application will be restarting to appearing the changes!', [
          {
            text: 'OK',
            onPress: () => CodePush.restartApp()
          }
        ]);
      } catch (error) {
        Alert.alert('Error', 'An undetermined error has occurred, please try again later!', [
          {
            text: 'OK'
          }
        ]);
      }
    }
  };

  validationSchema = () => {};

  render() {
    const { navigation, screenProps } = this.props;
    const { t } = screenProps;

    const initialValues = {
      language: 'Việt Nam'
    };
    return (
      <Formik
        ref={this.formik}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={this.onSubmit}
      >
        {props => {
          return (
            <UIKit.ScrollView style={styles.wrapper}>
              <UIKit.View style={styles.titleWrapper}>
                <UIKit.Text color="#7d7b81">{t('label.language')}</UIKit.Text>
              </UIKit.View>

              <UIKit.View style={styles.group}>
                <UIKit.RadioButtons
                  containerStyle={styles.item}
                  textStyle={styles.itemTitle}
                  textFontSize={dims.fontSize.smaller}
                  data={['Việt Nam', 'English']}
                  renderItem={this.renderStatusItem}
                  onChanged={(value: any) => props.setFieldValue('language', value)}
                />
              </UIKit.View>
            </UIKit.ScrollView>
          );
        }}
      </Formik>
    );
  }
}

const styles = UIKit.Core.StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#efecf3'
  },
  separator: {
    height: 10
  },
  titleWrapper: {
    paddingLeft: dims.DEFAULT_PADDING,
    paddingBottom: 3,
    paddingTop: dims.DEFAULT_PADDING
  },
  line: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: dims.DEFAULT_PADDING,
    flexDirection: 'row',
    alignItems: 'center'
  },
  lineIcon: {
    marginRight: dims.DEFAULT_PADDING
  },
  group: {
    backgroundColor: '#fff',
    paddingHorizontal: dims.DEFAULT_PADDING
  },
  item: {
    paddingVertical: 8
    //  marginBottom: 5
  },
  itemTitle: {
    flex: 1,
    marginLeft: 10
  },
  inputWrapper: {
    borderBottomWidth: 0
  },
  input: {
    fontSize: normalize(dims.fontSize.small),
    color: colors.text,
    paddingRight: 8
  }
});

// renderContent = () => {
//   const { t } = this.props.screenProps;
//   const { detail } = this.props;
//   const _data = [
//     { key: t('summary.id'), value: detail.id },
//     { key: t('summary.requestCode'), value: detail.requestCode },
//     { key: t('summary.approveRequestGroupCode'), value: detail.approveRequestGroupCode },
//     { key: t('summary.approvedBy'), value: detail.approvedBy },
//     { key: t('summary.approveDate'), value: this.convertDate(detail.approveDate) },
//     { key: t('summary.approveStatus'), value: detail.approveStatus },
//     { key: t('summary.stepNum'), value: detail.stepNum },
//     { key: t('summary.createdBy'), value: detail.createdBy },
//     { key: t('summary.createdDate'), value: this.convertDate(detail.createdDate) },
//     { key: t('summary.assignDate'), value: this.convertDate(detail.assignDate) },
//     { key: t('summary.deadlineApprove'), value: this.convertDate(detail.deadlineApprove) },
//     { key: t('summary.requestNotes'), value: detail.requestNotes },
//     { key: t('summary.requestReason'), value: detail.requestReason },
//     { key: t('summary.approveNotes'), value: detail.approveNotes },
//     { key: t('summary.amount'), value: detail.amount },
//     { key: t('summary.approveGroupForMoreTask'), value: detail.approveGroupForMoreTask },
//     { key: t('summary.addMoreTaskReason'), value: detail.addMoreTaskReason },
//     { key: t('summary.overDeadline'), value: detail.overDeadline },
//     { key: t('summary.remindDeadline'), value: detail.remindDeadline },
//     { key: t('summary.isLock'), value: detail.isLock },
//     { key: t('summary.returnedBy'), value: detail.returnedBy },
//     { key: t('summary.returnedStep'), value: detail.returnedStep },
//     { key: t('summary.returnedDate'), value: this.convertDate(detail.returnedDate) },
//     { key: t('summary.returnedTo'), value: detail.returnedTo }
//   ];
//   return (
//     <UIKit.FlatList
//       data={_data}
//       fetchingStatus={this.props.fetchingDetail}
//       onReconnect={this.fetch}
//       ItemSeparatorComponent={this.renderSeparator}
//       renderItem={this.renderItem}
//       keyExtractor={this.genKey}
//       scrollEventThrottle={16}
//       onScroll={this.onScroll}
//     />
//   );
// };
