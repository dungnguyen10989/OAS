import * as React from 'react';
import { View, Animated, StyleSheet, ViewStyle, ImageProps, ImageStyle } from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});

interface Props extends ImageProps {
  parallaxFactor: number;
  scrollPosition: any;
  wrapperStyle?: ViewStyle;
}

interface State {
  offset: number;
  width: number;
  height: number;
}

export default class ParallaxImage extends React.PureComponent<Props, State> {
  static defaultProps = {
    parallaxFactor: 0.2
  };
  private isLayoutStale = true;
  private container = React.createRef<View>();

  state = {
    offset: 0,
    width: 0,
    height: 0
  };

  setNativeProps(nativeProps) {
    if (this.container.current) {
      this.container.current.setNativeProps(nativeProps);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.isLayoutStale = true;
    }
  }

  handleLayout = event => {
    if (this.isLayoutStale && this.container.current) {
      this.container.current.measure(this.handleMeasure);
    }
  };

  handleMeasure = (ox, oy, width, height, px, py) => {
    this.isLayoutStale = false;

    this.setState({
      offset: py,
      height,
      width
    });
  };

  get image() {
    const { offset, width, height } = this.state;
    const { scrollPosition, parallaxFactor, style, ...other } = this.props;

    const parallaxPadding = height * parallaxFactor;

    const parallaxStyle: ImageStyle = {
      width: width,
      height: height + parallaxPadding * 2
    };
    if (scrollPosition) {
      parallaxStyle.transform = [
        {
          translateY: scrollPosition.interpolate({
            inputRange: [offset - height * 2, offset + height * 2],
            outputRange: [-parallaxPadding, parallaxPadding],
            extrapolate: 'clamp'
          })
        }
      ];
    } else {
      parallaxStyle.transform = [{ translateY: -parallaxPadding }];
    }

    return (
      <Animated.View style={[StyleSheet.absoluteFill, styles.container]}>
        <Animated.Image
          {...other}
          style={[StyleSheet.absoluteFill, parallaxStyle]}
          resizeMode={'cover'}
        />
      </Animated.View>
    );
  }

  render() {
    const { wrapperStyle } = this.props;
    return (
      <View
        ref={this.container}
        pointerEvents="none"
        style={[wrapperStyle, { overflow: 'hidden' }]}
        onLayout={this.handleLayout}
      >
        {this.image}
      </View>
    );
  }
}
