import * as React from 'react';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  NavigationScreenOptions,
  NavigationScreenConfig
} from 'react-navigation';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { filterSelectors, filterActions } from '../../redux/filter';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import { business, colors, dims } from '../../constants';
import { UIKit } from '../../components';
import normalize from '../../utils/normalize';
import { AppState } from 'c-redux';
import { Dispatch } from 'react-redux/node_modules/redux';
import { taskActions } from '../../redux/task';

const statuses = ['all'].concat(business.STATUS);
const deadlines = ['all', true, false];

interface Props extends IContainerProps {
  filter: any;
  setFilter: (filter: any) => void;
  getRequest: (params: any) => void;
  clearRequest: () => void;
}

const mapStateToProps = (state: AppState) => ({
  filter: filterSelectors(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (filter: any) => dispatch(filterActions.setFilter(filter)),
  getRequest: (params: any) => dispatch(taskActions.getTask(params)),
  clearRequest: () => dispatch(taskActions.clearTask())
});

class Filter extends React.Component<Props, any> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }): NavigationScreenConfig<NavigationScreenOptions> => {
    const size = dims.topBarButtonSize;
    const onPress = navigation.getParam('rightButtonPress', () => {});
    return {
      headerRight: (
        <UIKit.HeaderButton onPress={onPress}>
          <UIKit.assets.icons.Feather.Check width={size} height={size} stroke="#fff" />
        </UIKit.HeaderButton>
      )
    };
  };

  private form = React.createRef<Formik>();

  constructor(props: Props) {
    super(props);
    this.props.navigation.setParams({ rightButtonPress: this.onSubmit });
  }

  renderStatusItem = ({ item, index }: { item: any; index: number }) => (
    <UIKit.Text style={styles.itemText}>
      {index === 0 ? this.props.screenProps.t('label.all') : item}
    </UIKit.Text>
  );

  renderDeadline = ({ item, index }: { item: any; index: number }) => (
    <UIKit.Text style={styles.itemText}>
      {index === 0
        ? this.props.screenProps.t('label.all')
        : index === 1
        ? 'Over Deadline'
        : 'Deadline'}
    </UIKit.Text>
  );

  onDatePickerResult = (date: Date) => {};

  onSubmit = (values: any) => {
    if (this.form.current) {
      const filter = this.form.current.state.values;
      if (filter.isOverDeadline === deadlines[0]) {
        filter.isOverDeadline = undefined;
      }
      if (filter.status === statuses[0]) {
        filter.status = undefined;
      }

      const _filter = this.props.filter;
      if (
        filter.isOverDeadline !== _filter.isOverDeadline ||
        filter.status !== _filter.status ||
        filter.type !== _filter.type ||
        filter.userName !== _filter.userName
      ) {
        this.props.setFilter(filter);
        this.props.clearRequest();
        this.props.getRequest({ ...filter, pageNumber: 0, excludedApprovedRequest: true });
      }
      this.props.navigation.goBack();
    }
  };

  init = () => {
    const { filter } = this.props;
    const { isOverDeadline, type, userName, status } = filter;

    const initialValues = {
      isOverDeadline,
      userName,
      status,
      type
    };
    return initialValues;
  };

  validationSchema = () => {};

  render() {
    const { screenProps, filter } = this.props;

    const { t } = screenProps;

    const { isOverDeadline, type, userName, status } = filter;

    const initialValues = {
      isOverDeadline,
      userName,
      status,
      type
    };

    return (
      <Formik
        ref={this.form}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={this.onSubmit.bind(this)}
        validationSchema={this.validationSchema()}
      >
        {props => {
          return (
            <UIKit.ScrollView style={styles.wrapper}>
              <UIKit.View style={styles.titleWrapper}>
                <UIKit.Text color="#7d7b81" fontWeight="bold">
                  {t('label.status')}
                </UIKit.Text>
              </UIKit.View>

              <UIKit.View style={styles.group}>
                <UIKit.RadioButtons
                  containerStyle={styles.item}
                  textStyle={styles.itemTitle}
                  textFontSize={dims.fontSize.smaller}
                  data={statuses}
                  renderItem={this.renderStatusItem}
                  initChecked={status === undefined ? statuses[0] : status}
                  onChanged={(value: any) => props.setFieldValue('status', value)}
                />
              </UIKit.View>

              <UIKit.View style={styles.separator} />

              <UIKit.View style={styles.titleWrapper}>
                <UIKit.Text color="#7d7b81" fontWeight="bold">
                  {t('label.deadline')}
                </UIKit.Text>
              </UIKit.View>

              <UIKit.View style={styles.group}>
                <UIKit.RadioButtons
                  containerStyle={styles.item}
                  textStyle={styles.itemTitle}
                  textFontSize={dims.fontSize.small}
                  initChecked={isOverDeadline === undefined ? deadlines[0] : isOverDeadline}
                  data={deadlines}
                  renderItem={this.renderDeadline}
                  onChanged={(value?: any, index?: number) =>
                    props.setFieldValue('isOverDeadline', value)
                  }
                />
              </UIKit.View>

              <UIKit.View style={styles.titleWrapper}>
                <UIKit.Text color="#7d7b81" fontWeight="bold">
                  {t('label.account')}
                </UIKit.Text>
              </UIKit.View>

              <UIKit.View style={styles.line}>
                <UIKit.assets.icons.Feather.AtSign
                  stroke={colors.text}
                  width={dims.fontSize.large}
                  height={dims.fontSize.large}
                />

                <UIKit.Input
                  id="userName"
                  containerStyle={styles.flex1}
                  style={styles.lineMargin}
                  border={false}
                  showError={false}
                  fontSize={dims.fontSize.small}
                  placeholder={t('pHolder.byEmail')}
                  keyboardType="email-address"
                  {...props}
                />
              </UIKit.View>
            </UIKit.ScrollView>
          );
        }}
      </Formik>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);

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
  lineMargin: {
    marginLeft: 10
  },
  flex1: {
    flex: 1
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
  itemText: {
    marginLeft: 10
  },
  input: {
    fontSize: normalize(dims.fontSize.small),
    color: colors.text,
    paddingRight: 8
  },
  reset: {
    marginTop: 20,
    borderRadius: 5
  }
});
