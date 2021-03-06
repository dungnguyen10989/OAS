export default {
  status: {
    open: 'OPENING',
    waiting: 'WAITING APPROVE',
    approved: 'APPROVED',
    return: 'RETURN',
    cancel: 'CANCELLED',
    pending: 'PENDING'
  },
  alert: {
    alert: 'Alert',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    timedOut: 'Waiting time is too long, please try again later',
    expiredSession: 'Expired session',
    anotherAccountLoggedIn:
      'The session has expired because another device is logged into your account',
    inactiveTime:
      'The session expires due to more than 5 minutes you did not interact with the application',
    approveRequestSuccess: 'Congratulations ! You have successfully approved this request',
    chooseGroupToReturn: 'Please specify the group will be "Return"'
  },
  routes: {
    Login: 'Login',
    ForgotPassword: 'Forgot Password',
    Boundary: '',
    Drawer: '',
    Home: 'Home',
    Profile: 'Profile',
    RequestApprovementHistory: 'History',
    RequestDetail: 'Detail',
    RequestList: 'List request',
    RequestSummary: 'Summary',
    Settings: 'Settings',
    Filter: 'Filter result',
    FileAttached: 'Files Attached',
    Introduce: 'Introduce',
    Modal: 'Modal',
    Approve: 'Approve',
    QuickApprove: 'Quick Approve',
    ApprovalHistory: 'Approval History',
    EditRequest: 'Edit Request',
    WebView: 'File Content',
    OpeningRequest: 'Opening Request'
  },
  validation: {
    fieldIsRequired: 'This field is required',
    passwordMinLength: 'Password require at least 6 characters',
    emailInvalid: 'Email is invalid format'
  },
  pHolder: {
    email: 'Email',
    password: 'Password',
    searchRequest: 'Search request',
    searchGroup: 'Search group',
    byEmail: 'Filter by email',
    approveNote: 'Input your note for approval request',
    noteMoreTask: 'Input your note for the groups have been added more task'
  },
  label: {
    all: 'All',
    errorFetch: 'An error has occurred while fetching data, touch to retry...',
    rememberAccount: 'Remember account',
    forgotPassword: 'Please input your email to recover password',
    status: 'Request status',
    deadline: 'Deadline status',
    account: 'Account',
    request: 'Request',
    mine: 'Mine',
    approveNote: 'Note for approval request',
    approveStatus: 'Approve Status',
    language: 'Language',
    pushNotification: 'Receive notification',
    noData: 'No data found',
    openingRequest: 'Opening requests',
    returnForGroup: 'Return to groups',
    addMoreTaskForGroups: 'Add more task for groups',
    returnNote: 'Return note'
  },
  btn: {
    login: 'Login',
    forgotPassword: 'Forgot password?',
    sendRequest: 'Send request',
    approvalHistory: 'Approval history',
    editRequest: 'Edit request',
    quickApprove: 'Quick approve',
    approved: 'Approved',
    unapproved: 'Unapproved',
    save: 'Save',
    saveAndApprove: 'Save and approve',
    cancel: 'Cancel',
    close: 'Close',
    approve: 'Approve request',
    cancelFilter: 'Clear filter',
    fileAttached: 'File attached'
  },
  items: {
    approved: {
      id: 'ID',
      approveDate: 'Approved date',
      status: 'Status',
      approveBy: 'Approved by',
      note: 'Notes'
    },
    file: {
      id: 'ID',
      requestCode: 'Request code: ',
      extension: 'Extension'
    }
  },
  summary: {
    id: 'ID',
    requestCode: 'Request code',
    approveRequestGroupCode: 'Approve request group code',
    approveDate: 'Approved date',
    stepNum: 'Step number',
    assignDate: 'Assigned date',
    deadlineApprove: 'Deadline approved',
    requestNotes: 'Request notes',
    requestReason: 'Request reason',
    approveNotes: 'Approve notes',
    approveGroupForMoreTask: 'Approve group for more task',
    addMoreTaskReason: 'Add more task reason',
    overDeadline: 'Over deadline',
    remindDeadline: 'Remind deadline',
    isLock: 'Is lock',
    returnedStep: 'Returned step',
    returnedTo: 'Returned to',
    applyFor: 'Apply for',
    unit: 'Unit',
    department: 'Department',
    code: 'Code',
    name: 'Name',
    request: 'Request',
    originalSource: 'Original source',
    fileAttached: 'File Attack',
    deadline: 'Deadline',
    createdDate: 'Created date',
    createdBy: 'Created by',
    amount: 'Amount',
    approvedDate: 'Approved date',
    approvedBy: 'Approved by',
    approveStatus: 'Approve status',
    approveNote: 'Approve note',
    approveGroup: 'Approve group',
    moreTaskReason: 'More task reason',
    returnedBy: 'Returned by',
    returnedDate: 'Returned date',
    returnFromStep: 'Return from step'
  }
};
