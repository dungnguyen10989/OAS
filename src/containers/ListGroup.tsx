import * as React from 'react';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  NavigationScreenOptions,
  NavigationScreenConfig
} from 'react-navigation';
import { connect } from 'react-redux';
import Modalize from 'react-native-modalize';

import { requestDetailActions, requestDetailSelectors } from '../redux/requestDetail';

import { _NavigationProps, IContainerProps } from 'ui-kit';
import { dims, colors } from '../constants';
import { UIKit } from '../components';
import { AppState } from 'c-redux';
import { Dispatch } from 'react-redux/node_modules/redux';
import { t } from '../i18n';

interface State {
  query: string;
}

interface Props extends IContainerProps {
  groups: any;
  getGroups: (params: { requestListCode: string | number }) => void;
  fetchingGroup: number;
}

const mapStateToProps = (state: AppState, props: Props) => {
  const requestListCode = props.navigation.getParam('requestListCode');
  if (requestListCode) {
    return {
      groups: requestDetailSelectors(state).groupsForReturn,
      fetchingGroup: requestDetailSelectors(state).fetchingGroupsForReturn
    };
  }
  return {
    groups: requestDetailSelectors(state).groupsForMoreTask,
    fetchingGroup: requestDetailSelectors(state).fetchingGroupsForMoreTask
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => {
  const requestListCode = props.navigation.getParam('requestListCode');
  if (requestListCode) {
    return {
      getGroups: (params: { requestListCode: string | number }) =>
        dispatch(requestDetailActions.getGroupForReturn(params))
    };
  }
  return {
    getGroups: () => dispatch(requestDetailActions.getGroupForMoreTask())
  };
};

class ListGroup extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }): NavigationScreenConfig<NavigationScreenOptions> => {
    const onChangeText = navigation.getParam('onChangeText');
    const onPress = navigation.getParam('onPress');
    const department = navigation.getParam('department') || t('label.all');

    return {
      headerTitle: (
        <UIKit.View style={styles.wrapper}>
          <UIKit.Core.TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="sentences"
            autoCorrect={false}
            spellCheck={false}
            clearButtonMode="never"
            placeholder={t('pHolder.searchGroup')}
            onChangeText={onChangeText}
          />

          <UIKit.Core.TouchableOpacity style={styles.x} onPress={onPress} activeOpacity={0.8}>
            <UIKit.Core.Text numberOfLines={1} style={styles.department}>
              {department}
            </UIKit.Core.Text>
          </UIKit.Core.TouchableOpacity>
        </UIKit.View>
      )
    };
  };

  private modalRef = React.createRef<Modalize>();
  private gType: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      query: ''
    };
    this.props.navigation.setParams({ onChangeText: this.onChangeText });
    this.props.navigation.setParams({ onPress: this.showModal });

    this.gType = this.props.navigation.getParam('requestListCode');
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => this.props.getGroups({ requestListCode: this.gType });

  showModal = () => {
    if (this.modalRef.current) {
      this.modalRef.current.open();
    }
  };

  onChangeText = (query: string) => this.setState({ query });

  renderItem = ({ item }: { item: any }) => {
    const onPress = () => {
      const onBack = this.props.navigation.getParam('onBack');
      if (typeof onBack === 'function') {
        onBack(item);
      }
      this.props.navigation.goBack();
    };

    if (!this.gType) {
      return (
        <UIKit.Core.TouchableOpacity onPress={onPress} style={styles.item}>
          <UIKit.Text>Code: {item.approveGroupCode}</UIKit.Text>
          <UIKit.Text>Name: {item.approveGroupName}</UIKit.Text>
          <UIKit.Text>Department code: {item.departmentCode}</UIKit.Text>
          <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
            Company code: {item.comCode}
          </UIKit.Text>
          <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
            Unit code: {item.unitCode}
          </UIKit.Text>
          <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
            Active: {`${item.active}`}
          </UIKit.Text>
          <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
            Active date: {item.createdDate}
          </UIKit.Text>
          <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
            Active by: {item.createdBy}
          </UIKit.Text>
        </UIKit.Core.TouchableOpacity>
      );
    }

    return (
      <UIKit.Core.TouchableOpacity onPress={onPress} style={styles.item}>
        <UIKit.Text>ID: {item.id}</UIKit.Text>
        <UIKit.Text>Code: {item.procedureCode}</UIKit.Text>
        <UIKit.Text>Group owner: {item.groupOwner}</UIKit.Text>
        <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
          Name: {item.stepName}
        </UIKit.Text>
        <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
          Created by: {item.createdBy}
        </UIKit.Text>
        <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
          Active: {`${item.active}`}
        </UIKit.Text>
        <UIKit.Text color="#555" fontSize={dims.fontSize.small}>
          Step number: {item.stepNum}
        </UIKit.Text>
      </UIKit.Core.TouchableOpacity>
    );
  };

  renderSeparator = () => <UIKit.View style={styles.separator} />;

  render() {
    const { fetchingGroup, groups } = this.props;
    const { query } = this.state;

    const data1 = Array.isArray(groups)
      ? groups.filter(
          (i: any) =>
            (i.createBy && i.createBy.includes(query)) ||
            (i.stepName && i.stepName.includes(query)) ||
            (i.groupOwner && i.groupOwner.includes(query))
        )
      : [];

    const data2 = Array.isArray(groups)
      ? groups.filter(
          (i: any) =>
            (i.approveGroupCode && i.approveGroupCode.includes(query)) ||
            (i.approveGroupName && i.approveGroupName.includes(query))
        )
      : [];

    return (
      <UIKit.View style={styles.flex1}>
        <UIKit.FlatList
          contentContainerStyle={styles.content}
          fetchingStatus={fetchingGroup}
          data={this.gType ? data1 : data2}
          keyExtractor={item => (this.gType ? `${item.id}` : `${item.approveGroupCode}`)}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Modalize useNativeDriver withHandle withReactModal ref={this.modalRef}>
          <UIKit.View style={styles.modal} />
        </Modalize>
      </UIKit.View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListGroup);

const styles = UIKit.Core.StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: colors.separator,
    padding: dims.DEFAULT_PADDING
  },
  content: {},
  wrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: dims.screenWidth - 110,
    paddingHorizontal: 10,
    height: '70%',
    flexDirection: 'row',
    borderRadius: 20
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.overlay
  },
  separator: {
    height: dims.DEFAULT_PADDING,
    backgroundColor: colors.separator
  },
  x: {
    marginVertical: 4,
    backgroundColor: '#4b4b4b',
    borderRadius: 13,
    maxWidth: dims.screenWidth / 4
  },
  department: {
    fontSize: 12,
    color: '#fff',
    marginVertical: 4,
    marginHorizontal: 12
  },
  input: {
    flex: 1,
    paddingRight: 5
  }
});
