import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { t } from '../i18n';
import Boundary from './Boundary';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import { UIKit } from '../components';
import { requestDetailActions, requestDetailSelectors } from '../redux/requestDetail';

import normalize from '../utils/normalize';
import { dims } from '../constants';
import { AppState } from 'c-redux';
import { FlatList } from '../components/UIKit';

interface Item {
  id: number;
  status: string;
  approveDate: Date;
  approveBy: string;
  note?: string;
}
interface Item {
  group: any;
  items: Array<Item>;
}

const duration = 200;

const mapStateToProps = (state: AppState) => ({
  history: requestDetailSelectors(state).history,
  fetchingHistory: requestDetailSelectors(state).fetchingHistory
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getHistory: (payload: { type: string; id: string }) =>
    dispatch(requestDetailActions.getRequestHistory(payload))
});

interface Props extends IContainerProps {
  history: any[];
  fetchingHistory: number;
  getHistory: (params: { type: string; id: string }) => void;
}

class ApprovalHistory extends React.Component<Props, any> {
  state = {
    activeSections: [0],
    collapsed: true
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const id = this.props.navigation.getParam('id');
    const type = this.props.navigation.getParam('type');

    this.props.getHistory({ type, id });
  };

  toggleExpanded = () => this.setState({ collapsed: !this.state.collapsed });

  setSections = (sections: Array<number | undefined>) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    });
  };

  renderHeader = (section: any, _: any, isActive: boolean) => {
    return (
      <Animatable.View
        duration={duration}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.group}</Text>
      </Animatable.View>
    );
  };

  renderContent(section: Item, _: any, isActive: boolean) {
    const { items } = section;

    const renderItem = ({ item, index }: { item: Item; index: number }) => {
      return (
        <Animatable.View
          duration={duration}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >
          <Animatable.View animation={isActive ? 'fadeInUp' : undefined}>
            <UIKit.Text fontSize={dims.fontSize.small}>
              <UIKit.Text fontWeight="bold">{t('items.approved.id')}: </UIKit.Text>
              {item.id}
            </UIKit.Text>
            <UIKit.Text fontSize={dims.fontSize.small}>
              <UIKit.Text fontSize={dims.fontSize.small} fontWeight="bold">
                {t('items.approved.approveDate')}:{' '}
              </UIKit.Text>
              {item.approveDate
                ? moment(item.approveDate)
                    .toDate()
                    .toLocaleDateString()
                : ''}
            </UIKit.Text>
            <UIKit.Text fontSize={dims.fontSize.small}>
              <UIKit.Text fontSize={dims.fontSize.small} fontWeight="bold">
                {t('items.approved.status')}:{' '}
              </UIKit.Text>
              {item.status}
            </UIKit.Text>
            <UIKit.Text fontSize={dims.fontSize.small}>
              <UIKit.Text fontSize={dims.fontSize.small} fontWeight="bold">
                {t('items.approved.approveBy')}:{' '}
              </UIKit.Text>
              {item.approveBy}
            </UIKit.Text>
            <UIKit.Text fontSize={dims.fontSize.small}>
              <UIKit.Text fontSize={dims.fontSize.small} fontWeight="bold">
                {t('items.approved.note')}:{' '}
              </UIKit.Text>
              {item.note}
            </UIKit.Text>
          </Animatable.View>
        </Animatable.View>
      );
    };
    return <FlatList data={items} keyExtractor={item => `${item.id}`} renderItem={renderItem} />;
  }
  render() {
    const { activeSections } = this.state;
    const { fetchingHistory, history, screenProps } = this.props;
    return (
      <Boundary style={styles.wrapper}>
        <UIKit.FetchingBoundary fetchingStatus={fetchingHistory} onReconnect={this.fetch}>
          {fetchingHistory === 0 && history.length === 0 ? (
            <UIKit.Text style={styles.empty}>{screenProps.t('label.noData')}</UIKit.Text>
          ) : (
            <Accordion
              activeSections={activeSections}
              sections={history}
              touchableComponent={TouchableOpacity}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={duration}
              onChange={this.setSections}
            />
          )}
        </UIKit.FetchingBoundary>
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovalHistory);

const styles = UIKit.Core.StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: dims.DEFAULT_PADDING
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 20
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  headerText: {
    fontSize: normalize(dims.fontSize.medium),
    fontWeight: 'bold'
  },
  content: {
    paddingHorizontal: dims.DEFAULT_PADDING,
    backgroundColor: '#fff',
    marginBottom: dims.DEFAULT_PADDING
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)'
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center'
  },
  multipleToggle__group: {
    fontSize: 16,
    marginRight: 8
  },
  empty: {
    textAlign: 'center'
  }
});
