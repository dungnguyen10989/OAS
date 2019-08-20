import * as React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

interface State {
  hasError?: Error | undefined;
}

export default class Wrapper extends React.PureComponent<any, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: error };
  }

  constructor(props: any) {
    super(props);
    this.state = { hasError: undefined };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return (
      <SafeAreaView style={styles.wrapper}>
        {hasError ? (
          <Text style={styles.errorText}>
            An error has ocurred when render data, please try again!
          </Text>
        ) : (
          children
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  errorText: {
    margin: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
