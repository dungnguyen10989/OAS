import Introduce from './Introduce';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import Drawer from './drawer';
import Filter from './filter';
import Approve from './Approve';
import ApprovalHistory from './ApprovalHistory';
import EditRequest from './editRequest';
import QuickApprove from './quickApprove';
import OpeningRequest from './OpeningRequest';

import Modal from './Modal';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import RequestList from './requestList';
import RequestSummary from './RequestSummary';
import WebView from './WebView';
import FileAttached from './FileAttached';
import ListGroup from './ListGroup';

export const routes = {
  Introduce: 'Introduce',
  Login: 'Login',
  ForgotPassword: 'ForgotPassword',
  Drawer: 'Drawer',
  Filter: 'Filter',
  Modal: 'Modal',
  Approve: 'Approve',
  ApprovalHistory: 'ApprovalHistory',
  EditRequest: 'EditRequest',
  Home: 'Home',
  Profile: 'Profile',
  Settings: 'Settings',
  RequestList: 'RequestList',
  RequestSummary: 'RequestSummary',
  WebView: 'WebView',
  FileAttached: 'FileAttached',
  QuickApprove: 'QuickApprove',
  ListGroup: 'ListGroup',
  OpeningRequest: 'OpeningRequest'
};

export const Navs = {
  [routes.Introduce]: Introduce,
  [routes.Login]: Login,
  [routes.ForgotPassword]: ForgotPassword,
  [routes.Drawer]: Drawer,
  [routes.Approve]: Approve,
  [routes.ApprovalHistory]: ApprovalHistory,
  [routes.EditRequest]: EditRequest,
  [routes.Filter]: Filter,
  [routes.Modal]: Modal,
  [routes.Home]: Home,
  [routes.Settings]: Settings,
  [routes.Profile]: Profile,
  [routes.RequestList]: RequestList,
  [routes.RequestSummary]: RequestSummary,
  [routes.WebView]: WebView,
  [routes.FileAttached]: FileAttached,
  [routes.QuickApprove]: QuickApprove,
  [routes.ListGroup]: ListGroup,
  [routes.OpeningRequest]: OpeningRequest
};
