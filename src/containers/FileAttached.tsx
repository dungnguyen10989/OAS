import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Boundary from './Boundary';
import { requestDetailActions, requestDetailSelectors } from '../redux/requestDetail';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import { AppState } from 'c-redux';
import { UIKit } from '../components';
import { dims, colors } from '../constants';
import { routes } from '.';

interface Props extends IContainerProps {
  fetchingAttachments: number;
  data: [];
  getAttachments: (params: { type: string; id: string }) => void;
}

const mapStateToProps = (state: AppState) => ({
  data: requestDetailSelectors(state).attachments,
  fetchingAttachments: requestDetailSelectors(state).fetchingAttachments
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAttachments: (params: { type: string; id: string }) =>
    dispatch(requestDetailActions.getRequestAttachments(params))
});

class FileAttached extends React.Component<Props, any> {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const id = this.props.navigation.getParam('id');
    const type = this.props.navigation.getParam('type');

    this.props.getAttachments({ type, id });
  };

  renderSeparator = () => <UIKit.View style={styles.separator} />;

  genKey = (item: any) => `${item.id}`;

  goToWebView = (url: string) => this.props.navigation.navigate(routes.WebView, { url });

  renderItem = (i: { item: any; index: number }) => {
    const { t } = this.props.screenProps;
    return (
      <UIKit.Core.TouchableOpacity
        activeOpacity={0.8}
        onPress={this.goToWebView.bind(this, i.item.url)}
        style={styles.item}
      >
        <UIKit.Text>
          {t('items.file.id')}: {i.item.id}
        </UIKit.Text>
        <UIKit.Text style={styles.text}>
          {t('items.file.requestCode')}: {i.item.requestCode}
        </UIKit.Text>
        <UIKit.Text style={styles.text}>
          {t('items.file.extension')}: {i.item.extension}
        </UIKit.Text>
      </UIKit.Core.TouchableOpacity>
    );
  };

  render() {
    const { data, fetchingAttachments } = this.props;
    return (
      <Boundary style={styles.wrapper}>
        <UIKit.FlatList
          fetchingStatus={fetchingAttachments}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.genKey}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileAttached);

const styles = UIKit.Core.StyleSheet.create({
  wrapper: {
    padding: dims.DEFAULT_PADDING,
    backgroundColor: colors.separator
  },
  content: {},
  separator: {
    height: dims.DEFAULT_PADDING
  },
  item: {
    padding: dims.DEFAULT_PADDING,
    backgroundColor: '#ddd',
    borderRadius: 5
  },
  text: {
    marginTop: 5
  }
});
