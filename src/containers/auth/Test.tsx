import * as React from 'react';
import { connect } from 'react-redux';
import * as UIKit from '../../components/UIKit';
import { appSelectors } from '../../redux/app';
import { AppState } from 'c-redux';

type StateProps = {
  versionCode?: any;
};

type OwnProps = {};

type Props = OwnProps & StateProps;

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  versionCode: appSelectors(state).versionCode
});

class Login extends React.PureComponent<Props, any> {
  render() {
    const { versionCode } = this.props;

    return <UIKit.Text>test re-render versionCode: {versionCode}</UIKit.Text>;
  }
}

export default connect(
  mapStateToProps,
  null
)(Login);
