import * as React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

import View from './View';
import Text from './Text';
import VectorIcons from './VectorIcons';
import { colors } from '../../constants';
import Error from './Error';

interface Props {
  style?: ViewStyle;
  fetchingStatus?: number;
  onReconnect?: Function;
}

const arr = new Array(6).fill(0);

export default class Wrapper extends React.PureComponent<Props, any> {
  renderLoading = () => {
    return (
      <View style={this.props.style}>
        {arr.map((i: any, index: number) => (
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
      </View>
    );
  };
  render() {
    const { fetchingStatus, children, onReconnect } = this.props;
    return (
      <View>
        {fetchingStatus === -1 ? (
          <Error onReconnect={onReconnect} />
        ) : fetchingStatus === 1 ? (
          this.renderLoading()
        ) : (
          children
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  errorWrapper: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  errorText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loading: {
    alignSelf: 'center'
  },
  placeholder: {
    marginVertical: 10
  }
});
