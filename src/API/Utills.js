/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 27 Dec 2021
 * @format
 * @flow strict-local
 */

// export const BASE_URL = 'https://api.prastaratech.com/api/';
export const BASE_URL = "https://api.greatminds.live/api/";
//export const BASE_URL = "https://49silverstonedrive.ca/webmobischool/api/api/";
export const VERIFY_MOBILE_NUMBER = `${BASE_URL}authentication/mobile-no`;
export const VERIFY_OTP = `${BASE_URL}authentication/otp`;
export const VERIFY_PROFILE = `${BASE_URL}users/profile`;
export const SCHOOL_LIST = `${BASE_URL}users/school-list`;
export const TEACHER_CLASS_LIST = `${BASE_URL}section/list-by-school`;
export const TEACHER_SAVE_DIARY = `${BASE_URL}diary/save`;
export const TEACHER_DIARY_LIST = `${BASE_URL}diary/list`;
export const NOTE_TYPE_LIST = `${BASE_URL}diary/notetype_list`;
export const TEACHER_DELETE_DIARY = `${BASE_URL}diary/delete`;
export const TEACHER_TIMETABLE_LIST = `${BASE_URL}timetable/list`;
export const TEACHER_TIMETABLE_SAVE = `${BASE_URL}timetable/save`;
export const TEACHER_TIMETABLE_DELETE = `${BASE_URL}timetable/delete`;
export const TEACHER_ATTENDANCE_LIST = `${BASE_URL}attendance/listStudent`;
export const STUDENT_LIST = `${BASE_URL}students/student-list`;
export const ATTENDANCE_SAVE = `${BASE_URL}attendance/save`;
export const ATTENDANCE_PRESENT_COUNT = `${BASE_URL}attendance/presentCounter`;
export const ATTENDANCE_LIST_MONTH = `${BASE_URL}attendance/listMonth`;
export const LEAVE_SAVE = `${BASE_URL}leave/save`;
// ketan
export const GET_SUPPORT_DATA = `${BASE_URL}support/list`;
export const ADD_SUPPORT_DATA = `${BASE_URL}support/save`;
export const GET_REPLIED_DATA = `${BASE_URL}support/repliedList`;
export const GET_SUPPORT_DETAIL = `${BASE_URL}support/detailList`;
export const ADD_SUPPORT_REPLY = `${BASE_URL}support/reply`;
export const CLOSE_SUPPORT_REQUEST = `${BASE_URL}support/close`;
export const NOTIFICATION = `${BASE_URL}notification/list`;
export const SUBJECT_LIST = `${BASE_URL}subject/subjectList`;
export const CREATE_ORDER = `${BASE_URL}payment/payment-order`;
export const GET_PAYMENT_LIST = `${BASE_URL}mobilepay/list?classId=`;
export const SAVE_PAYMENT = `${BASE_URL}mobilepay/payment-fee`;
export const GET_CLASS_LIST = `${BASE_URL}classes/list?schoolId=`;
