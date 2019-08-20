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
          <UIKit.Text style={{ textAlign: 'center', marginTop: 20 }}>
            Tính năng đang trong giai đoạn phát triển
          </UIKit.Text>
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
