import * as React from 'react';
import { Image, StatusBar } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import { IContainerProps } from 'ui-kit';
import { UIKit } from '../components';
import { dims, colors, storageKeys } from '../constants';
import { images } from '../assets';
import I18n from '../i18n';
import normalize from '../utils/normalize';

const AppIntro = require('rn-falcon-app-intro');

const iconSize = normalize(dims.fontSize.larger);
export default class Introduce extends React.PureComponent<IContainerProps, any> {
  private modal = React.createRef<UIKit.Modal>();

  onSkipBtnHandle = (index: number) => {
    if (this.modal.current) {
      this.modal.current.show();
    }
  };
  doneBtnHandle = () => {
    if (this.modal.current) {
      this.modal.current.show();
    }
  };
  setLanguage = (locale: 'vi' | 'en') => {
    I18n.locale = locale;
    if (this.modal.current) {
      this.modal.current.hide();
    }
    this.props.navigation.navigate('Auth');
    RNSecureStorage.set(storageKeys.locale, locale, { accessible: ACCESSIBLE.ALWAYS });
    RNSecureStorage.set(storageKeys.ran, 'true', { accessible: ACCESSIBLE.ALWAYS });
  };

  render() {
    return (
      <UIKit.View style={styles.container}>
        <StatusBar backgroundColor="transparent" hidden />
        <AppIntro
          doneBtnLabel={<UIKit.Text color="#fff">Done</UIKit.Text>}
          skipBtnLabel={<UIKit.Text color="#fff">Skip</UIKit.Text>}
          nextBtnLabel={
            <UIKit.assets.icons.Feather.ChevronsRight
              stroke="#fff"
              width={iconSize}
              height={iconSize}
            />
          }
          // showSkipButton={index === 0}
          onSlideChange={(index: number) => this.setState({ index })}
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.onSkipBtnHandle}
        >
          <Image source={images.introduce1} width={dims.screenWidth} height={dims.screenHeight} />
          <Image source={images.introduce2} width={dims.screenWidth} height={dims.screenHeight} />
          <Image source={images.introduce3} width={dims.screenWidth} height={dims.screenHeight} />
        </AppIntro>
        <UIKit.Modal ref={this.modal} transparent animationType="slide">
          <UIKit.View style={styles.modal}>
            <UIKit.Text style={styles.title}>Choose language</UIKit.Text>
            <UIKit.View style={styles.imgs}>
              <UIKit.Core.TouchableOpacity
                style={styles.img}
                activeOpacity={0.8}
                onPress={this.setLanguage.bind(this, 'en')}
              >
                <UIKit.Core.Image
                  style={styles.image}
                  resizeMode="cover"
                  source={images.ensign.England}
                />
                <UIKit.Text style={styles.country}>English</UIKit.Text>
              </UIKit.Core.TouchableOpacity>
              <UIKit.Core.TouchableOpacity
                onPress={this.setLanguage.bind(this, 'vi')}
                style={styles.img}
                activeOpacity={0.8}
              >
                <UIKit.Core.Image
                  style={styles.image}
                  resizeMode="cover"
                  source={images.ensign.Vietnam}
                />
                <UIKit.Text style={styles.country}>Vietnamese</UIKit.Text>
              </UIKit.Core.TouchableOpacity>
            </UIKit.View>
          </UIKit.View>
        </UIKit.Modal>
      </UIKit.View>
    );
  }
}

const styles = UIKit.Core.StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dims.fontSize.larger,
    textAlign: 'center',
    marginBottom: 20
  },
  modal: {
    flex: 1,
    justifyContent: 'center'
  },
  imgs: {
    // flexDirection: 'row'
    marginHorizontal: dims.DEFAULT_PADDING
  },
  country: {
    marginLeft: 20
  },
  img: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginVertical: 5,
    padding: 10
  },
  image: {
    width: 40,
    height: 40
  },
  bg: {
    width: dims.screenWidth,
    height: dims.screenWidth / 2
  },
  auth: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: dims.getStatusBarHeight()
  },
  avatar: {
    width: dims.screenWidth / 6,
    height: dims.screenWidth / 6,
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: dims.screenWidth > 480 ? 40 : dims.screenWidth / 12
  },
  username: {
    color: '#fff',
    fontSize: dims.fontSize.small
  }
});
