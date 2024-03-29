/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import { StyleSheet } from "react-native";
import { color, icon, fonts } from "../constant";
import { Dimensions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { normalize, vh, screenHeight, screenWidth } from "../Utills/dimesnion";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  safeAreaStyle: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  // Splash screen styles
  splashMainStyle: {
    justifyContent: "center",
  },
  backgroundStyle: {
    height: Platform.OS === "ios" ? "115%" : "100%",
    width: "100%",

    // height: Platform.OS === "ios" ? "115%" : "50%",
    // width: "100%",
  },
  backgroundLogo: {
    height: 182,
    width: 198,
    top: 10,
    position: "absolute",
    top: 30,
    alignSelf: "center",
    flex: 1,
  },

  welcomebackgroundLogo: {
    top: 20,
    position: "absolute",
    top: 30,
    alignSelf: "center",
    flex: 1,
  },

  logoStyle: {
    height: vh(250),
    width: SCREEN_WIDTH,
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    resizeMode: "contain",
  },
  // Login styles
  welcomTextStyle: {
    //flex: 1,
    // position: "absolute",
    // top: 50,
    // left: 50,
    color: "#101828",
    marginBottom: 50,
    fontSize: 28,
    fontFamily: fonts.INTER,
  },

  phoneIcon: {},

  whiteCornerStyle: {
    backgroundColor: color.WHITE,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    // paddingStart: 20,
    // paddingEnd: 20,
    // paddingTop: 40,
    // paddingBottom: 40,
    padding: 50,
    //paddingBottom: 70,
    //paddingTop: 10,
    // justifyContent: "center",
    alignSelf: "stretch",

    shadowColor: color.BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    elevation: 15,
  },
  loaderViewCenter: {
    position: "absolute",
    alignSelf: "center",
    height: screenHeight / 2,
  },
  phoneTextField: {
    width: "100%",
    alignSelf: "center",
  },
  otpTextStyle: {
    fontFamily: fonts.LATO_BOLD,
    color: color.TEXT_COLOR,
    fontSize: 14,
  },
  otpTextRedStyle: {
    fontFamily: fonts.LATO_REGULAR,
    color: color.APP_SECONDARY,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  otpTextGreenStyle: {
    fontFamily: fonts.LATO_REGULAR,
    color: "#564CB8",
    fontSize: 14,
    // textDecorationLine: "underline",
  },
  primaryButtonBackground: {
    backgroundColor: "#FF6D4C",
    borderRadius: 50,
    width: "100%",
    padding: 15,
    alignSelf: "center",
  },

  supportPrimaryButtonBackground: {
    backgroundColor: "#FF6D4C",
    borderRadius: 50,
    width: "46%",
    padding: 15,
    alignSelf: "center",
  },
  primaryButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: color.WHITE,
    fontFamily: fonts.INTER_BOLD,
  },
  // Welcom styles
  continueTextStyle: {
    fontSize: 18,
    color: color.WHITE,
    fontFamily: fonts.INTER,
    alignSelf: "center",
  },
  continueImage: {
    height: 30,
    width: 30,
    marginEnd: 8,
    resizeMode: "contain",
    alignSelf: "center",
  },
  parentViewStyle: {
    backgroundColor: color.APP_PRIMARY,

    width: "110%",
    //position: "absolute",
    flexDirection: "row",
    marginBottom: 23,

    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    borderRadius: 50,
  },
  teacherViewStyle: {
    backgroundColor: color.APP_SECONDARY,
    //height: 70,
    padding: 20,
    width: "110%",
    //marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    borderRadius: 50,
  },
  // Header styles
  mainBackground: {
    height: Platform.OS === "ios" ? 125 : 95,

    width: "100%",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    top: Platform.OS === "ios" ? -50 : 0,
    backgroundColor: "#564CB8",
    borderBottomLeftRadius: 25,
  },
  // curve: {
  //   position: "absolute",
  //   right: 0,
  //   top: 93,
  // },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  scoopCorner: {
    position: "absolute",
    bottom: -5,
    right: 10,
    margin: -20,
    backgroundColor: "#564CB8",
    width: 60,
    height: 40,
    borderBottomLeftRadius: 60,
    zIndex: 1,
  },

  circle: {
    position: "absolute",
    bottom: -10,
    right: 22,
    margin: -20,
    borderTopRightRadius: 70,
    backgroundColor: "#ffffff",
    borderBottomRightRadius: 0,
    width: 60,
    height: 30,
    borderRadius: 50,
    zIndex: 2,
  },

  mainBackground_custome: {
    height: Platform.OS === "ios" ? 60 : 60,
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: color.APP_PRIMARY,
  },
  homeView: {
    height: 40,
    width: 40,
    margin: 15,
    marginTop: 0,
    borderRadius: 100,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.APP_LIGHT_PRIMARY_LIGHT_PRIMARY,
  },
  homeicon: {
    height: 21,
    width: 21,
  },
  titleHeader: {
    position: "absolute",
    top: 6,
    left: 65,
    fontSize: 18,
    color: color.WHITE,
    fontFamily: fonts.INTER_MEDIUM,
  },
  notificationView: {
    margin: 20,
    top: Platform.OS === "ios" ? 28 : -12,
    alignContent: "center",
    position: "absolute",
    flexDirection: "row",
    end: 0,
  },
  notificationView_new: {
    margin: 20,
    top: Platform.OS === "ios" ? 0 : 0,
    alignContent: "center",
    position: "absolute",
    flexDirection: "row",
    end: 0,
  },
  notificationIcon: {
    height: 24,
    width: 24,

    // marginTop: 10,
  },
  notificationIcon2: {
    height: 24,
    width: 24,
  },
  notificationPoint: {
    height: 8,
    width: 8,
    position: "absolute",
    end: 0,
    top: 0,
  },

  supportIcon: {
    height: 20,
    width: 20,
  },

  // Dashboard
  dashList: {
    marginTop: Platform.OS === "ios" ? -40 : 10,
    marginHorizontal: 15,
    marginVertical: 10,
    // marginStart: 20,
    // marginEnd: 20,
  },
  mainMenu: {
    flex: 1,
    backgroundColor: color.WHITE,
    borderRadius: 15,
    width: "100%",
    marginTop: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    borderColor: "#EAECF0",
    //borderColor: "#564CB8",
    borderWidth: 1,
    alignSelf: "center",
  },
  rawMainView: {
    flex: 1,
    backgroundColor: color.WHITE,
    borderRadius: 15,
    width: "99%",
    marginTop: 10,
    //padding: 15,
    marginBottom: 10,
    elevation: 2,
    borderColor: "#EAECF0",
    //borderColor: "#564CB8",
    borderWidth: 1,
    alignSelf: "center",
    // shadowColor: Platform.OS === "ios" ? color.LIGHT_GREY : color.BLACK,
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 5,
    // shadowRadius: 1,
    //elevation: 1,
    // marginStart: 5,
    //marginEnd: 5,
  },
  studentInfoView: {
    backgroundColor: color.COLOR_SECONDARY,
    flex: 0.75,
    borderRadius: 7,
    paddingStart: 15,
    paddingEnd: 10,
    flexDirection: "row",
  },
  studentProfile: {
    height: 80,
    width: 80,
    paddingEnd: 20,
    //alignSelf: "center",
  },
  studentProfile_atten: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  margin10View: {
    margin: 10,
  },
  nameText: {
    fontSize: 16,
    fontFamily: fonts.INTER_SEMIBOLD,
    color: "#564CB8",
  },
  deptmentText: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: fonts.INTER_MEDIUM,
    color: "#667085",
  },
  infoRaw: {
    flexDirection: "row",
    marginTop: 8,
  },
  infoColumn: {
    flexDirection: "column",
    marginEnd: 10,
  },
  tiitleText: {
    fontSize: 12,
    fontFamily: fonts.LATO_REGULAR,
    color: color.GREY,
  },
  valueText: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: fonts.LATO_BOLD,
    color: color.COLOR_PRIMARY,
  },
  actionView: {
    backgroundColor: color.WHITE,
    flex: 0.6,
    paddingStart: 18,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },

  itemView: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 3,
    width: 65.6,
    height: 58,
    //width: screenWidth / 7,
    //height: screenWidth / 7,
    backgroundColor: "#C1F4FF",
    borderRadius: 5,
    //marginTop: 15,
  },

  mainDashView: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 1,
    //  width: 65.6,
    // height: 58,
    width: screenWidth / 7,
    height: screenWidth / 7,
    // backgroundColor: "#C1F4FF",
    borderRadius: 5,
    //marginTop: 15,
  },
  attendanceView: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 1,
    width: 65.6,
    height: 58,
    backgroundColor: "#C6F2DD",
    borderRadius: 5,
    margin: 6,
  },
  dairyView: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 1,
    width: 65.6,
    height: 58,

    backgroundColor: "#C1F4FF",
    borderRadius: 5,
    margin: 6,
  },
  timetableView: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 1,
    width: 65.6,
    height: 58,
    backgroundColor: "#FCE4C8",
    borderRadius: 5,
    margin: 6,
  },
  imageView: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginBottom: 4,
  },
  noteImageView: {
    height: 24,
    width: 19,
    alignSelf: "center",
  },
  studentImageView: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  attendanceImageView: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginBottom: 4,
  },
  dairyImageView: {
    height: 20,
    width: 20,
    alignSelf: "center",
    //marginBottom: 4,
  },
  timetableImageView: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginBottom: 4,
  },
  feesImageView: {
    height: 20,
    width: 25,
    alignSelf: "center",
  },

  dashboardMenuText: {
    fontFamily: fonts.INTER,
    fontSize: 8,
    textAlign: "center",
    marginTop: 6,
    color: "#FDC9C9",
  },
  dashboardImageView: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  lineView: {
    backgroundColor: "#EAECF0",
    height: 1,
    width: "100%",
    marginVertical: 15,
  },
  // model content
  modelTileView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 22,
    color: color.DARK_TEXT,
    fontFamily: fonts.INTER_SEMIBOLD,
    textAlign: "center",
  },
  closeImageView: {
    height: 24,
    width: 24,
    marginBottom: 15,
    resizeMode: "contain",
  },
  inputMainView: {
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
  },
  inputMainViewYear: {
    width: "100%",
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "center",
  },
  textFieldView: {
    marginEnd: 30,
    fontSize: 16,
    color: "#101828",
    fontFamily: fonts.INTER,
  },
  dropdownView: {
    resizeMode: "contain",
    position: "absolute",
    height: "100%",
    paddingEnd: 10,
    paddingBottom: 5,
    justifyContent: "center",
    end: 0,
  },
  dropdownView_new: {
    resizeMode: "contain",
    position: "absolute",
    height: "100%",
    paddingEnd: 15,
    justifyContent: "center",
    end: 0,
    bottom: 4,
  },
  dropImage: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  padding15View: {
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  // Tooltip style

  tooltipText: {
    fontSize: 12,
    fontFamily: fonts.INTER_MEDIUM,
    marginStart: 8,
    marginEnd: 8,
    // fontWeight: "700",
    color: color.WHITE,
  },

  attendanceText: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: 8,
    color: "#2B8058",
    textAlign: "center",
  },

  dairyText: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: 8,
    color: "#144D59",
    textAlign: "center",
  },
  timetableText: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: 8,
    color: "#563A1B",
    textAlign: "center",
  },
  helpText: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: 8,
    color: "#144D59",
    textAlign: "center",
  },
  tooltipSepretor: {
    width: 2,
    marginVertical: 2,
    marginHorizontal: 8,
    marginEnd: 5,
    backgroundColor: color.WHITE,
  },
  tooltipContent: {
    flexDirection: "row",
    width: 100,
  },
  // Attendance screen

  studentImage: {
    height: 60,
    width: 60,
    borderColor: color.WHITE,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 60 / 2,
  },
  sNameView: {
    flex: 0.65,
    alignSelf: "center",
    marginEnd: 10,
  },
  sNameText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fonts.INTER_SEMIBOLD,
    color: color.DARK_TEXT,
  },
  sLocationView: {
    flex: 0.3,
    alignSelf: "center",
    alignItems: "flex-start",
    marginEnd: 10,
    end: 0,
    position: "absolute",
  },
  clockView: {
    flexDirection: "row",
    marginBottom: 2,
  },
  cloclImage: {
    height: 13,
    width: 13,
    marginEnd: 5,
    resizeMode: "contain",
  },
  clockText: {
    fontSize: 12,
    fontWeight: "700",
    fontFamily: fonts.LATO_REGULAR,
    color: color.DARK_TEXT,
  },
  locationImage: {
    height: 15,
    width: 14,
    marginEnd: 5,
    resizeMode: "contain",
  },
  searchTextFeild: {
    marginEnd: 30,
    fontSize: 16,
    color: color.DARK_TEXT,
    fontFamily: fonts.INTER,
  },
  //  padding: 10,
  // Diary view
  diaryRowTitle: {
    fontFamily: fonts.INTER_MEDIUM,
    color: color.DARK_TEXT,
    fontSize: normalize(12),
  },
  diaryRowDescription: {
    fontFamily: fonts.INTER,
    color: color.DARK_TEXT,
    marginTop: 10,
    marginBottom: 10,
    fontSize: normalize(10),
  },
  diaryTimeView: {
    fontFamily: fonts.LATO_REGULAR,
    color: color.DARK_TEXT,
    marginTop: 5,
    marginBottom: 5,
    fontSize: normalize(12),
    position: "absolute",
    end: -10,
    paddingEnd: 20,
  },
  // loader view
  loaderView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backgroundLoader: {
    height: 100,
    width: 100,
    alignSelf: "center",
    position: "absolute",
    top: 120,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  backgroundLoader_new: {
    height: 100,
    width: 100,
    alignSelf: "center",

    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  buttonLoaderStyle: {
    borderRadius: 10,
    width: "100%",
    padding: 15,
    alignSelf: "center",
    backgroundColor: color.WHITE,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: color.APP_PRIMARY,
  },

  supportText: {
    fontFamily: fonts.INTER,
    fontSize: 10,
    color: "#667085",
  },

  supportValueText: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: screenWidth > 360 ? 10 : 8,
    color: "#101828",
    paddingBottom: 5,
  },

  supportModalView: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    top: 80,
    padding: 20,
    height: 380,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  dropdownStyle: {
    width: "100%",
    height: vh(50),
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: vh(15),
    backgroundColor: color.WHITE,
    borderColor: color.GREY,
  },

  sNameProfileText: {
    fontFamily: fonts.INTER_SEMIBOLD,
    color: "#4D44A6",
    fontSize: 14,
  },

  sClassText: {
    fontSize: 12,
    fontFamily: fonts.INTER,
  },
  sSubHeading: {
    color: "#98A2B3",
    fontFamily: fonts.INTER,
    fontSize: 12,
  },
  sSubText: {
    color: "#1D2939",
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: 12,
  },
  sProfileHeading: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: 12,
    color: "#1D2939",
  },
  sPersonalText: {
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: 12,
    color: "#98A2B3",
  },
  sPersonalValue: {
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: 12,
    color: "#667085",
  },
  sParentText: {
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: 14,
    color: "#667085",
  },
  sParentSideText: {
    fontFamily: fonts.INTER,
    fontSize: 12,
    color: "#564CB8",
  },

  line: {
    height: 32,
    width: 5,
  },

  dView: {
    width: 150,
    height: 32,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
  },

  StatsTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 15,
    marginEnd: 5,
  },

  StatsText: {
    marginTop: 4,
    fontFamily: fonts.INTER,
    fontSize: 12,
  },

  StatsCircle: {
    borderRadius: 50,
    width: 26,
    justifyContent: "center",
    height: 26,
  },

  StatsCircleText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: fonts.INTER_BOLD,
    fontSize: 12,
  },

  PaymentTextTitle: {
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: 14,
    color: "#fff",
  },

  PaymentNo: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: 24,
    color: "#fff",
  },
});
