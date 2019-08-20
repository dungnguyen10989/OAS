import * as React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import Boundary from './Boundary';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import { UIKit } from '../components';
import { Formik, FormikActions, FormikValues } from 'formik';
import { colors, dims } from '../constants';
import ModalTypes from './filter/SelectTypes';
import { routes } from '.';
import { requestDetailActions, requestDetailSelectors } from '../redux/requestDetail';
import { AppState } from 'c-redux';
import { Dispatch } from 'react-redux/node_modules/redux';
import { showDialog } from '../emitter';

const duration = 500;

interface Props extends IContainerProps {
  detail: any;
  fetchingApprove: number;
  approve: (params: any) => void;
}

const mapStateToProps = (state: AppState) => ({
  detail: requestDetailSelectors(state).detail,
  fetchingApprove: requestDetailSelectors(state).fetchingApprove
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  approve: (params: any) => dispatch(requestDetailActions.approveRequest(params))
});

class Approve extends React.Component<Props, any> {
  private formik = React.createRef<Formik>();
  private modal = React.createRef<ModalTypes>();
  private formHeight = 0;

  constructor(props: Props) {
    super(props);
  }

  onSubmit = (values: FormikValues, action: FormikActions<any>) => {
    const { navigation, approve, screenProps, detail } = this.props;
    const { t } = screenProps;
    const { id, request } = detail;
    const type = navigation.getParam('type');

    const { status, note, returnFor, moreTask, moreTaskReason } = values;

    const onSuccess = () => {
      showDialog({
        buttons: [{ text: 'OK', onPress: navigation.popToTop }],
        title: t('alert.success'),
        content: t('alert.approveRequestSuccess')
      });
    };

    const onError = (message: string) => {
      showDialog({
        buttons: [{ text: 'OK' }],
        title: t('alert.error'),
        content: message
      });
    };

    const params: any = {
      id,
      type,
      status,
      note,
      onSuccess,
      onError,
      moreTaskApproveGroup: moreTask ? moreTask.approveGroupCode : undefined,
      moreTaskReason
    };

    if (status === 'Return') {
      params.returnToGroupId = returnFor.id;
    }

    if (!status) {
      return showDialog({
        buttons: [{ text: 'OK' }],
        title: t('alert.warning'),
        content: t('alert.chooseGroupToReturn')
      });
    }

    if (status === 'Return' && !returnFor) {
      return showDialog({
        buttons: [{ text: 'OK' }],
        title: t('alert.warning'),
        content: 'alert.chooseGroupToReturn'
      });
    }
    approve(params);
  };

  renderStatusItem = ({ item }: { item: any }) => (
    <UIKit.Text style={styles.itemText}>{item}</UIKit.Text>
  );

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.show();
    }
  };

  validation = () => {
    return yup.object().shape({
      status: yup.string().required()
    });
  };

  render() {
    const { t } = this.props.screenProps;
    const { isDecision, request } = this.props.detail;

    return (
      <Boundary style={styles.wrapper}>
        <UIKit.ScrollView>
          <Formik
            ref={this.formik}
            enableReinitialize
            initialValues={{
              status: '',
              note: '',
              returnFor: undefined,
              moreTask: undefined,
              moreTaskReason: ''
            }}
            onSubmit={this.onSubmit}
            validationSchema={this.validation()}
          >
            {props => {
              const selectGroupForReturn = () => {
                this.props.navigation.navigate(routes.ListGroup, {
                  requestListCode: request.requestListCode,
                  onBack: (g: any) => props.setFieldValue('returnFor', g)
                });
              };

              const selectGroupForMoreTask = () => {
                this.props.navigation.navigate(routes.ListGroup, {
                  onBack: (g: any) => props.setFieldValue('moreTask', g)
                });
              };

              //const showReturnFor = isDecision && visible === 'Return';
              return (
                <UIKit.View style={{ flexGrow: 0 }}>
                  <UIKit.Text style={styles.title}>{t('label.approveStatus')}</UIKit.Text>
                  <UIKit.RadioButtons
                    containerStyle={styles.item}
                    textStyle={styles.itemTitle}
                    textFontSize={dims.fontSize.small}
                    data={['Approved', 'Waiting', 'Return']}
                    renderItem={this.renderStatusItem}
                    onChanged={(value?: any, index?: number) => {
                      props.setFieldValue('status', value);
                      if (index === 2) {
                        selectGroupForReturn();
                      }
                    }}
                  />
                  {props.values.returnFor ? (
                    <UIKit.Core.TouchableOpacity
                      onPress={selectGroupForReturn}
                      style={styles.returnWrapper}
                    >
                      <UIKit.View style={styles.returnTitle}>
                        <UIKit.Text style={styles.return}>{t('label.returnForGroup')}</UIKit.Text>
                        <UIKit.assets.icons.FontAwesome.CaretRight
                          fill="#333"
                          width={dims.fontSize.largest}
                          height={dims.fontSize.largest}
                        />
                      </UIKit.View>
                      <UIKit.View style={styles.info}>
                        <UIKit.Text>ID: {props.values.returnFor.id}</UIKit.Text>
                        <UIKit.Text>Name: {props.values.returnFor.procedureCode}</UIKit.Text>
                        <UIKit.Text>Owner: {props.values.returnFor.groupOwner}</UIKit.Text>
                      </UIKit.View>
                    </UIKit.Core.TouchableOpacity>
                  ) : null}

                  <UIKit.View style={[styles.returnWrapper, styles.moreTask]}>
                    <UIKit.Core.TouchableOpacity onPress={selectGroupForMoreTask}>
                      <UIKit.View style={styles.returnTitle}>
                        <UIKit.Text style={styles.return}>
                          {t('label.addMoreTaskForGroups')}
                        </UIKit.Text>
                        <UIKit.assets.icons.FontAwesome.CaretRight
                          fill="#333"
                          width={dims.fontSize.largest}
                          height={dims.fontSize.largest}
                        />
                      </UIKit.View>
                      {props.values.moreTask ? (
                        <UIKit.View style={styles.info}>
                          <UIKit.Text>Code: {props.values.moreTask.approveGroupCode}</UIKit.Text>
                          <UIKit.Text>Name: {props.values.moreTask.approveGroupName}</UIKit.Text>
                          <UIKit.Text>
                            Department: {props.values.moreTask.departmentCode}
                          </UIKit.Text>
                        </UIKit.View>
                      ) : null}
                    </UIKit.Core.TouchableOpacity>

                    <UIKit.Input
                      {...props}
                      id="moreTaskReason"
                      placeholder={t('pHolder.noteMoreTask')}
                      multiline
                      numberOfLines={3}
                      style={styles.returnNote}
                      showError={false}
                      border={false}
                    />
                  </UIKit.View>

                  <UIKit.Text style={styles.title}>{t('label.approveNote')}</UIKit.Text>
                  <UIKit.Input
                    style={styles.input}
                    containerStyle={styles.containerStyle}
                    multiline
                    border={false}
                    showClearButton={false}
                    showError={false}
                    placeholder={t('pHolder.approveNote')}
                    id="note"
                    {...props}
                  />
                  <UIKit.Button
                    title={this.props.screenProps.t('btn.approve')}
                    style={styles.btn}
                    activeOpacity={props.values.status ? 0.8 : 1}
                    backgroundColor={props.values.status ? colors.main.orange : 'gray'}
                    onPress={e => props.handleSubmit()}
                    loading={this.props.fetchingApprove === 1}
                  />
                  <UIKit.Button
                    activeOpacity={0.8}
                    title={this.props.screenProps.t('btn.approvalHistory')}
                    style={[styles.btn, styles.btnView]}
                    backgroundColor={colors.main.orange}
                    onPress={this.props.navigation.navigate.bind(this, routes.ApprovalHistory)}
                  />
                </UIKit.View>
              );
            }}
          </Formik>
        </UIKit.ScrollView>
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Approve);

const styles = UIKit.Core.StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.separator
  },
  returnWrapper: {
    backgroundColor: '#eccc68',
    paddingTop: dims.DEFAULT_PADDING
  },
  moreTask: {
    marginTop: dims.DEFAULT_PADDING * 2
  },
  returnTitle: {
    marginHorizontal: dims.DEFAULT_PADDING,
    marginBottom: dims.DEFAULT_PADDING,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerStyle: {
    paddingHorizontal: dims.DEFAULT_PADDING
  },
  input: {
    height: dims.screenHeight - dims.getBottomSpace() - dims.getStatusBarHeight() - 200,
    maxHeight: 200,
    fontSize: dims.fontSize.small,
    color: '#555'
  },
  title: {
    margin: 8,
    marginTop: dims.DEFAULT_PADDING,
    marginLeft: dims.DEFAULT_PADDING,
    fontWeight: 'bold'
  },
  info: {
    paddingHorizontal: dims.DEFAULT_PADDING,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: dims.DEFAULT_PADDING
    // backgroundColor: '#f1f2f6'
  },
  key: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2
  },
  value: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 5,
    color: 'gray'
  },
  btn: {
    margin: dims.DEFAULT_PADDING,
    borderRadius: 2,
    padding: 10
  },
  btnView: {
    marginTop: 10
  },
  item: {
    paddingHorizontal: dims.DEFAULT_PADDING,
    paddingVertical: 8,
    backgroundColor: '#fff'
    //  marginBottom: 5
  },
  itemTitle: {
    flex: 1,
    marginLeft: 10
  },
  return: {
    fontWeight: 'bold',
    flex: 1
  },
  itemText: {
    marginLeft: 10
  },
  returnNote: {
    height: 100,
    padding: 10,
    fontSize: dims.fontSize.small
  }
});
