import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

import { _FlatListProps } from 'ui-kit';
import Error from './Error';
import { UIKit } from '..';
import { t } from '../../i18n';

const arr = new Array(6).fill(0);

export default class List extends React.PureComponent<_FlatListProps, any> {
  static defaultProps = {
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false
  };
  private onEndReachedCalledDuringMomentum = false;

  onLoadMore = () => {
    const { onLoadMore } = this.props;

    if (!this.onEndReachedCalledDuringMomentum && typeof onLoadMore === 'function') {
      this.onEndReachedCalledDuringMomentum = true;

      onLoadMore();
    }
  };

  renderLoading = () => {
    const { fetchingStatus, data } = this.props;
    const _arr = data && data.length > 0 ? [1] : arr;
    return fetchingStatus === 1 ? (
      <UIKit.View>
        {_arr.map((i: any, index: number) => (
          <Placeholder
            key={`${index}`}
            Animation={Fade}
            Left={PlaceholderMedia}
            style={styles.placeholder}
          >
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        ))}
      </UIKit.View>
    ) : null;
  };

  renderEmpty = () => {
    if (this.props.fetchingStatus === 0 && this.props.data && this.props.data.length === 0) {
      return <UIKit.Text textAlign="center">{t('label.noData')}</UIKit.Text>;
    }
    return null;
  };

  render() {
    const { contentContainerStyle, onReconnect, fetchingStatus, ...rest } = this.props;
    if (fetchingStatus === -1) {
      return <Error onReconnect={onReconnect} />;
    }
    return (
      <FlatList
        {...rest}
        refreshing={fetchingStatus === 2}
        onMomentumScrollBegin={() => (this.onEndReachedCalledDuringMomentum = false)}
        contentContainerStyle={[styles.list, contentContainerStyle]}
        ListFooterComponent={this.renderLoading}
        ListEmptyComponent={this.renderEmpty}
        onEndReached={this.onLoadMore}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20
  },
  indicator: {
    alignSelf: 'center',
    marginVertical: 5
  },
  placeholder: {
    marginVertical: 10
  }
});
