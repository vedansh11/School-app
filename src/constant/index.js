/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

export const icon = {
    // LandingScreen icons
    LOGO: require('../assets/images/logo.png'),
    SPLASH_BACKGROUND: require('../assets/images/splash_bg.png'),
    BACKGROUND: require('../assets/images/background_img.png'),
    IC_PARENT: require('../assets/images/Group.png'),
    IC_TEACHER: require('../assets/images/Frame.png'),
    // Dashboard
    IC_HOME: require('../assets/images/Home.png'),
    IC_NOTIFICATION: require('../assets/images/Notification.png'),
    IC_NOTIFICATION_POINT: require('../assets/images/notificationPoint.png'),
    IC_LOGOUT: require('../assets/images/power-off.png'),
    IC_HELP: require('../assets/images/que-help.png'),
    IC_FEES: require('../assets/images/fees.png'),
    IC_TIME_TABLE: require('../assets/images/time-table.png'),
    IC_NOTES: require('../assets/images/notes.png'),
    IC_DATE_CAL: require('../assets/images/date-cal.png'),
    IC_GIRL_IMAGE: require('../assets/images/GIRL-IMAGE.png'),
    IC_UP: require('../assets/images/angle-up.png'),
    IC_DOWN: require('../assets/images/angle-down.png'),
    IC_STUDENT: require('../assets/images/student.png'),
    IC_SCHOOL_LOGO: require('../assets/images/school-logo.png'),
    IC_TEACHER_SUPPORT: require('../assets/images/teacher-support.png'),
    IC_BACK_ARROW: require('../assets/images/back-arrow.png'),
    IC_SIDE_ARROW: require('../assets/images/ic_side_arrow.png'),
    IC_NOTIFICATION_ROUND: require('../assets/images/IC_Notification.png'),
    IC_CALENDAR: require('../assets/images/date-calendar.png'),
    IC_SYNC: require('../assets/images/sync.png'),
    IC_ADD: require('../assets/images/ic-add.png'),
    IC_CANCEL: require('../assets/images/ic_cancel.png'),
    IC_CALENDAR: require('../assets/images/ic-calendar.png'),
    IC_DOWN_ARROW: require('../assets/images/ic-down-arrow.png'),
    IC_UP_ARROW: require('../assets/images/ic-up-arrow.png'),
    IC_UP_ARROW_WHITE: require('../assets/images/ic-arrow_up.png'),
    IC_DOWN_ARROW_WHITE: require('../assets/images/ic_arrow_down.png'),
    IC_DELETE_TT: require('../assets/images/ic-delete-time-table.png'),
    IC_EDIT_TT: require('../assets/images/ic-edit-time-table.png'),
    IC_SEARCH: require('../assets/images/ic-search.png'),
    STUDENT_IMAGE: require('../assets/images/student-image.png'),
    IC_LOCATION: require('../assets/images/ic-location.png'),
    IC_CLOCK: require('../assets/images/ic-clock.png'),
    IC_PHONE: require('../assets/images/phone-solid.png'),
    IC_ENVELOP: require('../assets/images/envelope.png'),
    IC_SEND: require('../assets/images/send.png'),
    IC_CLOSE: require('../assets/images/times-circle.png')

}

export const fonts = {
    // fonts
    LATO_LIGHT: 'Lato-Light',
    LATO_REGULAR: 'Lato-Regular',
    LATO_BOLD: 'Lato-Bold',
    LATO_ITALIC: 'Lato-Italic',
    LATO_BLACK: 'Lato-Black',
};

export const alertText = {
    // Dialog message
    ALERT: 'Alert',
    NO: 'NO',
    YES: 'YES',
    LOGOUT: 'Are you sure, You want to logout?',
    ERROR_MESSAGE: 'Something went wrong!',
};

export const PreferenceKeys = {
    // keys for store data
    TOKEN: 'token',
    IS_LOGIN: 'is_login',
    IS_PARENTS_LOGIN: 'is_parents_login',
    IS_TEACHER_LOGIN: 'is_teacher_login',
    IS_GARDIAN_LOGIN: 'is_gardian_login',
    INVENTORY_MANAGEMENT_DATA: 'inventory_data',
    IS_MULTIPLE_USER: 'is_multiple_user',
    TEACHER_SCHOOL_DETAIL: 'teacher_school_detail',
    STUDENT_DETAIL: 'student_detail',
    CURRENT_USERID:'user_id',
    LOGIN_USER_DETAIL: 'login_user_detail',
    TEACHER_DASHBOARD_INDEX: 'index',
    TERM_ID : 'term_id',
    AMOUNT : 'amount',
    REMARK : 'remark',
    STRUCTURE_ID : 'structure_id',
    SAVE_YEAR : 'save_year',
    CLASS_ID : 'class_id'
};

export const color = {
    // yellow theme color
    // COLOR_PRIMARY: '#E9C46A',
    // COLOR_SECONDARY: '#FFF5DB',
    // colors main
    APP_PRIMARY: '#0BB5BF',
    APP_SECONDARY: '#FF715B',
    // color change app theme
    COLOR_PRIMARY: '#0BB5BF',
    COLOR_SECONDARY: '#ECFEFF',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    ORANGE: '#FF715B',
    COLOR_LIGHT: '#FFDEDE',
    TRANSPARENT: '#2D313D',
    RED: '#F14D68',
    WHITE_BACKGROUND: '#F2F2F2',
    GREY: '#B0B1B2',
    LIGHT_GREY: '#CECECE',
    PURPLE_BACKGROUND: '#E1DFFD',
    LIGHT_BACKGROUND: '#ECFEFF',
    INFO_BLUE: '#40A0F9',
    YELLOW: '#E9C46A',
    YELLOW_LIGHT: '#FFF5DB',
    TEXT_COLOR: '#5E6A6D',
    DARK_TEXT: '#264653',
    GREEN: '#4CB877',
    A_ORENG: '#FF8C6C',
    RED: '#EB5757',
    PROGRESS_GREY: '#C5C3D6',
    PER_GREY: '#7F7C9E',
    // Attendace colors
    U_BG: '#FFDEDE',
    U_BR: '#FF6F6F',
    A_BG: '#EBF8FF',
    A_BR: '#40A0F9',
    O_BG: '#FFF5DB',
    O_BR: '#E9C46A',
    P_BG: '#DDFFF1',
    P_BR: '#4CB877',

};

export const ROLEID ={
    TEACHER : 2,
    PARENT : 3
};
export const SUPPORT_TYPE ={
    NEW:0,
    CLOSE:2
};

export const RECEIVER_TYPE =[
    "Class Teacher",
    "Class Admin",
    "Apps Support"
]



export const AppText = {
    // application text
    APP_NAME: 'GREATE MINDS',
    ALERT_APP_NAME: 'Great Minds',
    WELCOM_TEXT: 'Welcome to\n Great Minds',
    CONTINUE_PARENT: 'Continue as Parent',
    CONTINUE_TEACHER: 'Continue  as Teacher',
    MOBILE_NUMBER: 'Mobile Number',
    OTP: 'OTP',
    GET_OTP: 'Get OTP',
    RESEND_OTP: 'Resend OTP',
    AGREE: 'I agree to the Terms of Services  and Privacy Policy',
    SIGN_IN: 'Sign In',
    DESHBOARD: 'Dashboard',
    ENTER_NUMBER: 'Enter mobile number',
    VERIFY_OTP: 'Verify OTP',
    ENTER_VALID_NUMBER: 'Enter valid mobile number',
    AGREE_TC: 'Please agree Terms of Services  and Privacy Policy',
    DASHBOARD: 'Dashboard',
    NOTIFICATION: 'Notifications',
    DATE: 'Date',
    CLASS: 'Class',
    SUBMIT: 'Submit',
    SAVE: 'Save',
    ADD_DIARY: 'Add Diary',
    EDIT_DIARY: 'Edit Diary',
    ADD_PERIOD: 'Add Period',
    EDIT_PERIOD: 'Edit Period',
    APPLY_FOR_LEAVE: 'Apply for leave',
    DAY: 'Day',
    START_TIME: 'Start Time',
    END_TIME: 'End Time',
    SUBJECT: 'Subject',
    TOPIC: 'Topic',
    DONE: 'Done',
    NOTE_TYPE: 'Note Type',
    EFFECTIVE_DATE: 'Effective Date',
    DESCRIPTION: 'Description',
    REMARK: 'Remark',
    DUE_DATE: 'Due Date',
    TRACKER: 'Tracker',
    SEARCH: 'Search',
    ABSENT: 'Absent',
    PRESENT: 'Present  No ID',
    ID_SCAN: 'ID Not Scanned',
    EDIT: 'Edit',
    DELETE: 'Delete',
    ATTENDANCE: 'Attendance',
    LEAVE: 'Leave',
    FROM: 'From',
    TO: 'To',
    MONTH: 'Month',
    TIME_VALIDATION: 'Start time should be smaller then End time',
    DATE_VALIDATION: 'From date should be smaller then To date',
    ENTER_SUBJECT: 'Please enter subject',
    ENTER_TOPIC: 'Please enter topic',
    ENTER_DESCRIPTION: 'Please enter description',
    PAYMENT:'Payment',
    PAYMENT_DETAIL:'Payment Detail',
    MAKE_PAYMENT:'Make Payment',
    AMOUNT:'Amount',
    TERMS: 'Terms',
    WEEKDAYS: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

};