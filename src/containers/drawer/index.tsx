import * as React from 'react';
import { Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Dispatch } from 'redux';
import { GestureHandlerGestureEvent } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import _ from 'lodash';

import { AppState } from 'c-redux';
import { IContainerProps, _NavigationProps } from 'ui-kit';
import { routes } from '..';
import { dims, colors } from '../../constants';
import { unitsSelectors } from '../../redux/units';
import { authSelectors } from '../../redux/auth';
import { migrateUnitsData } from '../../redux/helper';
import { filterActions, filterSelectors } from '../../redux/filter';
import { UIKit } from '../../components';
import normalize from '../../utils/normalize';
import { taskActions } from '../../redux/task';

const duration = 200;

const headerTitleSize = dims.fontSize.large;
const iconSize = normalize(dims.fontSize.larger);

interface Props extends IContainerProps {
  data: Array<any>;
  auth: any;
  filter: any;
  setFilter: (type: any) => void;
  getRequest: (type: any) => void;
  clearRequest: () => void;
}

interface State {
  selectedItem: string;
  collapsed?: boolean;
  activeSections: Array<number>;
}

const mapStateToProps = (state: AppState) => ({
  filter: filterSelectors(state),
  data: unitsSelectors(state).units,
  auth: authSelectors(state).data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getRequest: (params: any) => dispatch(taskActions.getTask(params)),
  setFilter: (params: any) => dispatch(filterActions.setFilter(params)),
  clearRequest: () => dispatch(taskActions.clearTask())
});

interface ItemProps {
  data: any;
  selected: boolean;
  requestSelect: (e?: GestureHandlerGestureEvent) => void;
}
class Item extends React.PureComponent<ItemProps, any> {
  private fontValue: Animated.Value;

  constructor(props: ItemProps) {
    super(props);
    this.fontValue = new Animated.Value(props.selected ? 1 : 0);
  }

  componentWillUpdate(nextProps: ItemProps) {
    if (nextProps.selected !== this.props.selected) {
      const toValue = nextProps.selected === true ? 1 : 0;

      Animated.timing(this.fontValue, {
        toValue,
        duration
      }).start();
    }
  }

  private onPress = () => this.props.requestSelect();

  render() {
    const fontSize = this.fontValue.interpolate({
      inputRange: [0, 1],
      outputRange: [dims.fontSize.small, dims.fontSize.larger]
    });
    return (
      <UIKit.Core.TouchableOpacity activeOpacity={0.9} style={styles.item} onPress={this.onPress}>
        <Animated.Text style={[styles.itemText, { fontSize }]}>
          {this.props.data.title}
        </Animated.Text>
      </UIKit.Core.TouchableOpacity>
    );
  }
}
class Drawer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedItem: '',
      collapsed: undefined,
      activeSections: [0]
    };
  }

  shouldComponentUpdate(nextProps: Props) {
    if (
      !_.isEqual(nextProps.navigation, this.props.navigation) ||
      !_.isEqual(nextProps.filter, this.props.filter)
    ) {
      return false;
    }
    return true;
  }

  toggleExpanded = () => this.setState({ collapsed: !this.state.collapsed });

  setSections = (sections: Array<number | undefined>) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    } as State);
  };

  renderHeader = (section: any, _: any, isActive: boolean) => {
    return (
      <UIKit.View style={styles.title}>
        <UIKit.Text fontSize={headerTitleSize} style={styles.headerText}>
          {section.key.toUpperCase()}
        </UIKit.Text>
        <Animated.View style={{ transform: [{ rotate: !isActive ? '0deg' : '90deg' }] }}>
          <UIKit.assets.icons.FontAwesome.CaretRight
            fill="#fff"
            width={iconSize}
            height={iconSize}
          />
        </Animated.View>
      </UIKit.View>
    );
  };

  renderContent(section: any, groupIndex: number, isActive: boolean) {
    const renderItem = ({ item, index }: { item: any; index: number }) => {
      const request = async () => {
        const { selectedItem } = this.state;
        const current = `${groupIndex}.${index}`;
        if (selectedItem !== current) {
          await this.setState({ selectedItem: current });
          this.props.setFilter({ type: item.id });
          const { filter } = this.props;
          this.props.clearRequest();
          this.props.getRequest({ ...filter, pageNumber: 0, excludedApprovedRequest: true });
          setTimeout(() => {
            this.props.navigation.closeDrawer();
          }, duration / 2);
        }
      };
      if (item.id === 'open') {
        return (
          <UIKit.Core.TouchableOpacity
            activeOpacity={0.9}
            style={[styles.item, styles.itemOpen]}
            onPress={() => this.props.navigation.navigate(routes.OpeningRequest)}
          >
            <UIKit.Text
              fontSize="smaller"
              style={styles.itemText}
              color={colors.status.open}
              fontWeight="bold"
            >
              {item.title.toUpperCase()}
            </UIKit.Text>
            <UIKit.assets.icons.Feather.ChevronRight
              width={dims.fontSize.largest}
              height={dims.fontSize.largest}
              stroke={colors.status.open}
            />
          </UIKit.Core.TouchableOpacity>
        );
      }
      return (
        <Item
          data={item}
          selected={isActive && `${groupIndex}.${index}` === this.state.selectedItem}
          requestSelect={request}
        />
      );
    };
    return (
      <Animatable.View duration={duration} transition="backgroundColor">
        <UIKit.FlatList
          data={section.value.concat([
            { id: undefined, title: this.props.screenProps.t('label.all') },
            { id: 'open', title: 'Opening Requests' }
          ])}
          contentContainerStyle={styles.padding}
          extraData={this.state}
          keyExtractor={(item: any) => `${item.id}`}
          renderItem={renderItem}
        />
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;
    const { auth } = this.props;

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        colors={colors.gradientButton}
        style={styles.container}
      >
        <UIKit.View style={styles.logoWrapper}>
          <Image source={UIKit.assets.images.logo} style={styles.logo} />
          <UIKit.View>
            <UIKit.Text
              adjustsFontSizeToFit
              numberOfLines={1}
              fontSize={dims.fontSize.small}
              color="#fff"
            >
              {auth.userName}
            </UIKit.Text>
            <UIKit.Text
              adjustsFontSizeToFit
              numberOfLines={1}
              fontSize={dims.fontSize.smaller}
              color="#ddd"
            >
              {auth.emailAddress}
            </UIKit.Text>
          </UIKit.View>
        </UIKit.View>
        <UIKit.ScrollView contentContainerStyle={styles.content}>
          <Accordion
            activeSections={activeSections}
            sections={migrateUnitsData(this.props.data)}
            expandMultiple={false}
            renderFooter={() => <UIKit.View style={styles.separatorList} />}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent.bind(this)}
            duration={duration}
            onChange={this.setSections}
          />
        </UIKit.ScrollView>
        <UIKit.View style={styles.buttons}>
          <UIKit.Core.TouchableOpacity
            onPress={() => this.props.navigation.navigate(routes.Profile)}
            style={styles.button}
          >
            <UIKit.assets.icons.Feather.User width={24} height={24} stroke="#fff" />
          </UIKit.Core.TouchableOpacity>

          <UIKit.View style={styles.separator} />
          <UIKit.Core.TouchableOpacity
            onPress={() => this.props.navigation.navigate(routes.Settings)}
            style={styles.button}
          >
            <UIKit.assets.icons.Feather.Settings width={24} height={24} stroke="#fff" />
          </UIKit.Core.TouchableOpacity>
        </UIKit.View>
      </LinearGradient>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoWrapper: {
    backgroundColor: colors.main.red,
    padding: 10,
    paddingTop: dims.getStatusBarHeight(),
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: dims.screenWidth / 3,
    height: dims.screenWidth / 3,
    alignSelf: 'center',
    maxWidth: 200,
    maxHeight: 200
  },
  headerContainer: {
    height: 150
  },
  title: {
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: headerTitleSize,
    color: '#fff'
  },
  screenContainer: {
    paddingTop: 20,
    width: '100%'
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontWeight: 'bold',
    color: '#00adff'
  },
  activeBackgroundColor: {
    backgroundColor: 'grey'
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexGrow: 0
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 8,
    marginVertical: 5
  },
  itemOpen: {
    paddingHorizontal: 0,
    borderBottomColor: colors.status.open,
    borderBottomWidth: 2
  },
  iconW: {
    width: 50
  },
  itemText: {
    flex: 1,
    color: '#eee'
  },
  buttons: {
    paddingBottom: dims.getBottomSpace() > 0 ? dims.getBottomSpace() / 1.5 : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#fff',
    paddingTop: 10
  },
  button: {
    flex: 1,
    alignItems: 'center'
  },
  separatorList: {
    height: dims.DEFAULT_PADDING
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#fff'
  }
});
