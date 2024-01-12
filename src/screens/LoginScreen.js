/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  button,
  TouchableOpacity,
  Platform,
  NativeSyntheticEvent,
} from "react-native";
import { color, icon, PreferenceKeys, AppText, fonts } from "../constant";
import { ButtonView } from "../commonTheme/CommonView";
import {
  LoaderButtonView,
  LoaderViewWithBackground,
} from "../commonTheme/LoaderView";
import stylesCommon from "../commonTheme/stylesCommon";
import { axiosCallAPI } from "../API/axiosCommonService";
import { BackHandler } from "react-native";
import * as Preference from "../storeData/Preference";
import * as Utills from "../API/Utills";
import { StackActions } from "@react-navigation/native";

import {
  TextField,
  FilledTextField,
  Button,
  OutlinedTextField,
} from "react-native-material-textfield-plus";
import OTPTextView from "react-native-otp-textinput";
import CheckBox from "@react-native-community/checkbox";
import CountDown from "react-native-countdown-component";
import axios from "axios";
import { screenHeight, screenWidth } from "../Utills/dimesnion";
import OtpAutoFillViewManager from "react-native-otp-auto-fill";

const LoginScreen = ({ navigation }) => {
  const OTPViewRef = useRef();

  const [mobileNumber, setMobileNumber] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isShowButton, setShowButton] = useState(false);
  const mobileNumberRegex = /^[0]?[789]\d{9}$/;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loaderView, setLoaderView] = useState(false);
  const [backgroundLoaderView, setBackgroundLoaderView] = useState(false);
  const [showTimer, setTimmer] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [getOtpToggle, setGetOtpToggle] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      setShowButton(false);
      setTimmer(false);
      setShowResend(false);
      setMobileNumber("");
    });

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, []);
  const handleComplete = ({ nativeEvent: { code } }) => {
    //Alert.alert("OTP Code Received!", code)
    OTPViewRef.current.setValue(code);
  };
  const handleOnAndroidSignature = ({ nativeEvent: { code } }) => {
    console.log("Android Signature Key for SMS body:", code);
    //OTPViewRef.current.setValue(code);
  };
  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  function VerifyMobileNumber(clickType) {
    setGetOtpToggle(true);
    if (ValidationMobileNumber()) {
      VerifyMobilNumberAPI(clickType);
    }
  }
  function VerifyOTP() {
    if (ValidationOTP()) {
      verifyOTP_API();
    }
  }

  function VerifyMobilNumberAPI(clickType) {
    setBackgroundLoaderView(true);

    let loginFormData = new FormData();
    loginFormData.append("mobile_no", "9033903436");
    loginFormData.append("from", "mobile");

    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axiosCallAPI(
      "post",
      Utills.VERIFY_MOBILE_NUMBER,
      loginFormData,
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        if (response.is_success === true) {
          setBackgroundLoaderView(false);
          setShowButton(true);
          clickType === "OTP" ? setTimmer(true) : null;
          setShowResend(true);
        } else {
          setLoaderView(false);
          setBackgroundLoaderView(false);
        }
      })
      .catch((error) => {
        setLoaderView(false);
        setBackgroundLoaderView(false);
      });
  }

  function verifyOTP_API() {
    setLoaderView(true);
    var loginFormData = new FormData();
    loginFormData.append("mobile_no", 9033903436);
    loginFormData.append("otp", 1111);

    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axiosCallAPI(
      "post",
      Utills.VERIFY_OTP,
      loginFormData,
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        if (response !== undefined) {
          console.log(response);
          setLoaderView(false);
          if (response.status) {
            Preference.SetData(PreferenceKeys.IS_LOGIN, "true");
            Preference.SetData(
              PreferenceKeys.TOKEN,
              "Bearer " + response.data.access_token
            );
            verifyUserProfile();
          } else {
            if (OTPViewRef.current != null) {
              OTPViewRef.current.clear();
            }
          }
        } else {
          setLoaderView(false);
        }
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }
  async function verifyUserProfile() {
    setLoaderView(true);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "get",
      Utills.VERIFY_PROFILE,
      "",
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        setLoaderView(false);
        console.log("_________________________________");
        console.log(response);
        Preference.SetData(PreferenceKeys.CURRENT_USERID, response.id);
        Preference.SetData(
          PreferenceKeys.LOGIN_USER_DETAIL,
          JSON.stringify(response)
        );
        const Roles = Object.values(response.roles).map((value) => value.slug);

        console.log("**  Roles ** " + Roles);
        if (
          Roles.includes("parents") &&
          Roles.includes("guardian") &&
          Roles.includes("teacher")
        ) {
          console.log("Both");
          Preference.SetData(PreferenceKeys.IS_MULTIPLE_USER, "true");
          Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_GARDIAN_LOGIN, "false");
          // navigation.navigate('WelcomScreen')
          navigation.dispatch(StackActions.replace("WelcomScreen"));
        } else if (Roles.includes("teacher") && Roles.includes("parents")) {
          console.log("Both");
          Preference.SetData(PreferenceKeys.IS_MULTIPLE_USER, "true");
          Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_GARDIAN_LOGIN, "false");

          // navigation.navigate('WelcomScreen')
          navigation.dispatch(StackActions.replace("WelcomScreen"));
        } else if (Roles.includes("parents") && Roles.includes("guardian")) {
          console.log("Both");
          Preference.SetData(PreferenceKeys.IS_MULTIPLE_USER, "true");
          Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_GARDIAN_LOGIN, "false");
          // navigation.navigate('WelcomScreen')
          navigation.dispatch(StackActions.replace("WelcomScreen"));
        } else if (Roles.includes("teacher") && Roles.includes("guardian")) {
          console.log("Both");
          Preference.SetData(PreferenceKeys.IS_MULTIPLE_USER, "true");
          Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_GARDIAN_LOGIN, "false");
          // navigation.navigate('WelcomScreen')
          navigation.dispatch(StackActions.replace("WelcomScreen"));
        } else if (Roles.includes("guardian")) {
          console.log("Both");
          Preference.SetData(PreferenceKeys.IS_MULTIPLE_USER, "false");
          Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, "false");
          Preference.SetData(PreferenceKeys.IS_GARDIAN_LOGIN, "true");
          //navigation.navigate('ParentDashboard')
          navigation.dispatch(StackActions.replace("ParentDashboard"));
        } else if (Roles.includes("parents")) {
          console.log("parents");
          Preference.SetData(PreferenceKeys.IS_MULTIPLE_USER, "false");
          Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, "true");
          Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, "false");
          //navigation.navigate('ParentDashboard')
          navigation.dispatch(StackActions.replace("ParentDashboard"));
        } else if (Roles.includes("teacher")) {
          console.log("teacher");
          Preference.SetData(PreferenceKeys.IS_MULTIPLE_USER, "false");
          Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, "true");
          Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, "false");
          //navigation.navigate('TeacherDashboard')
          navigation.dispatch(StackActions.replace("TeacherDashboard"));
        }
        // // Set dynamic my array and compare pending
        // const customRoles = ['teacher', 'parents', 'school_admin']
        // const containsAll = customRoles.every(element => {
        //     return Roles.includes(element);
        // });

        // if (containsAll) {
        //     console.log('Both');
        //     navigation.navigate('WelcomScreen')
        // } else {
        //     customRoles.map(element => {
        //         if (Roles.includes(element)) {
        //             console.log(element);

        //         }
        //     });
        // }
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }

  function ValidationMobileNumber() {
    if (mobileNumber.length === 0) {
      // Alert.alert(AppText.ALERT_APP_NAME, AppText.ENTER_NUMBER)
      return false;
    }
    // else if (mobileNumberRegex.test(mobileNumber) === false) {
    //     // Alert.alert(AppText.ALERT_APP_NAME, AppText.ENTER_VALID_NUMBER)
    //     return false;
    // }
    else {
      return true;
    }
  }
  function ValidationOTP() {
    if (otpInput == "" || otpInput == undefined || otpInput.length < 4) {
      Alert.alert(AppText.ALERT_APP_NAME, AppText.VERIFY_OTP);
      return false;
    } else if (!toggleCheckBox) {
      Alert.alert(AppText.ALERT_APP_NAME, AppText.AGREE_TC);
      return false;
    } else {
      return true;
    }
  }

  onChangeText = (text) => {
    setMobileNumber(text);
  };

  const renderRightAccessory = () => {
    // Return your accessory component here
    return (
      <Image style={stylesCommon.phoneIcon} source={icon.IC_PHONE}></Image>
    );
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <View style={stylesCommon.MainContainer}>
        <Image style={stylesCommon.backgroundStyle} source={icon.BACKGROUND} />

        {/* <View style={stylesCommon.backgroundLogoContainer}>
         
        </View> */}
        <Image
          style={[
            stylesCommon.backgroundLogo,
            { width: screenWidth / 2.3, height: screenWidth / 2.5, top: 30 },
          ]}
          source={icon.LOGO}
        />
        {/* <Text style={stylesCommon.welcomTextStyle}>
          {" "}
          {AppText.WELCOM_TEXT}{" "}
        </Text> */}
        {console.log(getOtpToggle)}
        <View
          style={[
            stylesCommon.whiteCornerStyle,
            { height: getOtpToggle ? "70%" : "50%", paddingTop: 30 },
          ]}
        >
          {/* <View style={stylesCommon.parentViewStyle}>
            <Text style={stylesCommon.continueTextStyle}>
              {" "}
              {AppText.WELCOM_TEXT}{" "}
            </Text>
          </View> */}
          {/* 
          <View style={stylesCommon.parentViewStyle}></View> */}
          <Text style={stylesCommon.welcomTextStyle}>
            {AppText.WELCOM_TEXT}
          </Text>
          <OutlinedTextField
            tintColor={"#564CB8"}
            selectionColor={"#564CB8"}
            label={AppText.MOBILE_NUMBER}
            returnKeyType="done"
            renderRightAccessory={renderRightAccessory}
            autoFocus={true}
            error={
              mobileNumber.length === 0
                ? AppText.ENTER_NUMBER
                : mobileNumberRegex.test(mobileNumber) === false
                ? AppText.ENTER_VALID_NUMBER
                : ""
            }
            keyboardType="phone-pad"
            onChangeText={onChangeText}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isShowButton && (
              <Text style={stylesCommon.otpTextStyle}> {AppText.OTP} </Text>
            )}
            {showTimer ? (
              <CountDown
                until={0 * 0 + 60}
                size={14}
                running={true}
                onFinish={() => setTimmer(false)}
                digitStyle={{ backgroundColor: color.WHITE, margin: -10 }}
                digitTxtStyle={{ color: "#564CB8" }}
                separatorStyle={{ color: "#564CB8" }}
                timeToShow={["M", "S"]}
                timeLabels={{ m: "", s: "" }}
                showSeparator
              />
            ) : null}

            {showResend ? (
              !showTimer ? (
                <TouchableOpacity
                  style={stylesCommon.otpTextGreenStyle}
                  onPress={() => VerifyMobileNumber("resendOTP")}
                >
                  <Text style={stylesCommon.otpTextGreenStyle}>
                    {" "}
                    {AppText.RESEND_OTP}{" "}
                  </Text>
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                style={stylesCommon.otpTextRedStyle}
                onPress={() => VerifyMobileNumber("OTP")}
              >
                <Text style={stylesCommon.otpTextRedStyle}>
                  {" "}
                  {AppText.GET_OTP}{" "}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {isShowButton ? (
            <View>
              <OTPTextView
                tintColor={"#564CB8"}
                handleTextChange={(e) => {
                  setOtpInput(e);
                }}
                containerStyle={styles.textInputContainer}
                textInputStyle={styles.roundedTextInput}
                inputCount={4}
                autoFocus={false}
                returnKeyType="done"
                selectionColor={"#564CB8"}
                keyboardType="numeric"
                offTintColor={color.GREY}
                ref={OTPViewRef}
              />
              <OtpAutoFillViewManager
                onComplete={handleComplete}
                onAndroidSignature={handleOnAndroidSignature}
                style={styles.box}
                length={4} // Define the length od OTP. This is a must
                returnKeyType="done"
              />

              <View style={styles.checkboxContainer}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  tintColors={{ true: "#564CB8" }}
                  onCheckColor={color.WHITE}
                  onFillColor={"#564CB8"}
                  onTintColor={"#564CB8"}
                  style={{ borderRadius: 6 }}
                  //boxType={"square"}
                  onAnimationType={"bounce"}
                  offAnimationType={"bounce"}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <View style={{ flexDirection: "column", marginBottom: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>{"I agree to the"}</Text>
                    <TouchableOpacity style={styles.labelUnderline}>
                      <Text style={styles.labelUnderline}>
                        {"Terms of Services"}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>{"and"}</Text>
                  </View>
                  <TouchableOpacity style={styles.labelUnderline}>
                    <Text style={styles.labelUnderline}>
                      {"Privacy Policy"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {loaderView === true ? (
                <LoaderButtonView />
              ) : (
                <ButtonView
                  tiitle={AppText.SIGN_IN}
                  onClick={() => VerifyOTP()}
                />
              )}
            </View>
          ) : null}

          {/* <TouchableOpacity style={stylesCommon.primaryButtonBackground}
                        onPress={() => NextScreen()}>
                        <Text style={stylesCommon.primaryButtonText}>{AppText.SIGN_IN}</Text>
                    </TouchableOpacity> */}
        </View>
        {backgroundLoaderView && (
          <View style={stylesCommon.loaderViewCenter}>
            <LoaderViewWithBackground color={color.WHITE} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  roundedTextInput: {
    borderRadius: 8,
    borderWidth: 1,
    height: 55,
    width: 52,
    color: "#564CB8",
    fontFamily: fonts.INTER_MEDIUM,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    marginStart: 2,
    color: color.TEXT_COLOR,
    fontSize: 10,

    fontFamily: fonts.INTER_MEDIUM,
  },
  labelUnderline: {
    marginStart: 1,
    color: "#564CB8",

    fontSize: 10,
    fontFamily: fonts.INTER_MEDIUM,
  },
  box: {
    width: 0,
    height: 0,
    marginVertical: 0,
    borderColor: "red",
    borderWidth: 0,
  },
});

export default LoginScreen;
