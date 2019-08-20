import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import { AppState } from 'c-redux';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import Feather from 'react-native-vector-icons/Feather';
import CameraKitCamera from 'react-native-camera-kit';
import * as Animatable from 'react-native-animatable';

import { Formik, FormikActions, FormikValues } from 'formik';
import SelectGroup from './SelectGroup';
import { requestDetailActions, requestDetailSelectors } from '../../redux/requestDetail';
import { business, colors, dims } from '../../constants';
import Boundary from '../Boundary';
import { UIKit } from '../../components';
import { routes } from '..';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  NavigationScreenConfig,
  NavigationScreenOptions
} from 'react-navigation';
import normalize from '../../utils/normalize';

interface Props extends IContainerProps {
  detail: any;
  fetchingGetRequestDetail: number;
  fetchingUpdateRequestDetail: number;
  getDetail: (params: { type: string; id: string }) => void;
  updateDetail: (params: any) => void;
}

const mapStateToProps = (state: AppState) => ({
  detail: requestDetailSelectors(state).detail,
  fetchingGetRequestDetail: requestDetailSelectors(state).fetchingDetail
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDetail: (params: { type: string; id: string }) =>
    dispatch(requestDetailActions.getRequestDetail(params)),
  updateDetail: (params: { type: string; id: string }) =>
    dispatch(requestDetailActions.updateRequestDetail(params))
});

class EditRequest extends React.Component<Props, any> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }): NavigationScreenConfig<NavigationScreenOptions> => {
    const onRightPress = navigation.getParam('rightButtonPress');
    const size = dims.topBarButtonSize;
    return {
      headerStyle: {
        borderBottomWidth: 0
      },
      headerRight: (
        <UIKit.HeaderButton onPress={onRightPress}>
          <UIKit.assets.icons.Feather.MoreVertical width={size} height={size} stroke="#fff" />
        </UIKit.HeaderButton>
      )
    };
  };

  private actionSheet = React.createRef<ActionSheet>();
  private camRef = React.createRef<CameraKitCamera>();
  private selectRef = React.createRef<SelectGroup>();
  private formik = React.createRef<Formik>();

  constructor(props: Props) {
    super(props);
    this.props.navigation.setParams({ rightButtonPress: this.openSheet });
  }

  componentDidMount() {
    this.fetchDetail();
  }

  fetchDetail = () => {
    const id = this.props.navigation.getParam('id');
    const type = this.props.navigation.getParam('type');
    const { detail } = this.props;

    if (id !== detail.id && type !== type.id) {
      this.props.getDetail({ type, id });
    }
  };

  openSheet = () => {
    if (this.actionSheet.current) {
      this.actionSheet.current.show();
    }
  };

  navigate = (routeName: string, params?: NavigationParams) => {
    this.props.navigation.navigate(routeName, params);
  };

  onActionSheetItemPress = (index: number) => {
    if (index === 1) {
      return;
    }
    const id = this.props.navigation.getParam('id');
    const type = this.props.navigation.getParam('type');
    this.navigate(routes.ApprovalHistory, { id, type });
  };

  renderStatusItem = ({ item }: { item: any }) => <UIKit.Text>{item}</UIKit.Text>;

  onSubmit = () => {};

  openSelect = () => {
    if (this.selectRef.current) {
      this.selectRef.current.open();
    }
  };

  render() {
    const { t } = this.props.screenProps;
    const { fetchingGetRequestDetail } = this.props;

    return (
      <Boundary style={styles.wrapper}>
        <UIKit.ScrollView>
          <UIKit.FetchingBoundary
            fetchingStatus={fetchingGetRequestDetail}
            onReconnect={this.fetchDetail}
          >
            <Formik
              ref={this.formik}
              enableReinitialize
              initialValues={{ approve: '', note: '', group: undefined }}
              onSubmit={this.onSubmit}
            >
              {props => {
                return (
                  <React.Fragment>
                    <UIKit.Text style={styles.title}>{t('label.approveStatus')}</UIKit.Text>
                    <UIKit.RadioButtons
                      containerStyle={styles.item}
                      textStyle={styles.itemTitle}
                      textFontSize={dims.fontSize.small}
                      data={['Pending', 'Approve', 'Return']}
                      renderItem={this.renderStatusItem}
                      onChanged={(value?: any, index?: number) =>
                        props.setFieldValue('approve', value)
                      }
                    />

                    <Animatable.View
                      transition={['left', 'opacity']}
                      style={{
                        zIndex: -1,
                        left: props.values.approve === 'Return' ? 0 : dims.screenWidth,
                        opacity: props.values.approve === 'Return' ? 1 : 0
                      }}
                    >
                      <UIKit.Core.TouchableOpacity
                        style={styles.returnFor}
                        onPress={this.openSelect}
                      >
                        <UIKit.Text fontSize="small" style={styles.flex1}>
                          Return for
                          <UIKit.Text color="red" fontWeight="bold">
                            {' '}
                            *
                          </UIKit.Text>
                          : {props.values.group ? props.values.group.name : ''}
                        </UIKit.Text>
                        <UIKit.assets.icons.Feather.ChevronRight
                          width={dims.fontSize.large}
                          height={dims.fontSize.large}
                          stroke={colors.text}
                        />
                      </UIKit.Core.TouchableOpacity>
                    </Animatable.View>

                    <SelectGroup
                      ref={this.selectRef}
                      onClosed={(item: any) => props.setFieldValue('group', item)}
                    />
                    <Animatable.View
                      transition="top"
                      style={{
                        top: props.values.approve === 'Return' ? dims.DEFAULT_PADDING * 2 : 0
                      }}
                    >
                      <UIKit.Text style={styles.title}>{t('label.approveStatus')}</UIKit.Text>
                      <UIKit.Input
                        {...props}
                        id="note"
                        multiline
                        showError={false}
                        showClearButton={false}
                        placeholder="Nhap notes"
                        border={false}
                        style={styles.notes}
                      />
                      <UIKit.Button
                        title={t('btn.save')}
                        backgroundColor={colors.main.orange}
                        style={styles.btn}
                      />
                      <UIKit.Button
                        title={t('btn.saveAndApprove')}
                        backgroundColor={colors.main.orange}
                        style={styles.btn}
                      />
                    </Animatable.View>
                  </React.Fragment>
                );
              }}
            </Formik>
            <ActionSheet
              ref={this.actionSheet}
              options={['View Approve', 'Cancel']}
              cancelButtonIndex={1}
              onPress={this.onActionSheetItemPress}
            />
            {/* <CameraKitCamera
          ref={this.camRef}
          style={{
            flex: 1,
            backgroundColor: 'white'
          }}
          cameraOptions={{
            flashMode: 'auto', // on/off/auto(default)
            focusMode: 'on', // off/on(default)
            zoomMode: 'on', // off/on(default)
            ratioOverlay: '1:1', // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077' // optional
          }}
        /> */}
          </UIKit.FetchingBoundary>
        </UIKit.ScrollView>
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRequest);

const styles = UIKit.Core.StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.separator
    // paddingHorizontal: dims.DEFAULT_PADDING
  },
  flex1: {
    flex: 1
  },
  containerStyle: {
    padding: dims.DEFAULT_PADDING
  },
  input: {
    height: dims.screenHeight - dims.getBottomSpace() - dims.getStatusBarHeight() - 200,
    maxHeight: 200,
    fontSize: dims.fontSize.small,
    color: '#555'
  },
  title: {
    margin: 8,
    marginTop: dims.DEFAULT_PADDING,
    fontWeight: 'bold'
  },
  key: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2
  },
  value: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 5,
    color: 'gray'
  },
  btn1: {
    marginTop: dims.DEFAULT_PADDING * 2
  },
  btn: {
    margin: dims.DEFAULT_PADDING,
    marginBottom: 0,
    borderRadius: 2,
    padding: 10
  },
  btnView: {
    marginTop: 10
  },
  item: {
    padding: 10,
    backgroundColor: '#fff'
    //  marginBottom: 5
  },
  itemTitle: {
    flex: 1,
    marginLeft: 10
  },
  return: {
    padding: 8,
    marginTop: dims.DEFAULT_PADDING,
    fontWeight: 'bold',
    backgroundColor: '#fff'
  },
  returnFor: {
    paddingLeft: dims.DEFAULT_PADDING * 2,
    borderTopColor: colors.border,
    borderTopWidth: 0.5,
    backgroundColor: '#fff',
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  notes: {
    padding: 10,
    height: 100
  }
});
