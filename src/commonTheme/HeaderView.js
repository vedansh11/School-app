/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../constant";
import stylesCommon from "./stylesCommon";
import * as Preference from "../storeData/Preference";
import { CommonActions } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
export const DashboardHeaderView = (props) => {
  // props elements
  // titile - set title header
  // type - set type which dashboard header you want to show teacher or prent?
  // color - set dashboard header background color

  const HomeNavigation = async () => {
    if ((await Preference.GetData(PreferenceKeys.IS_MULTIPLE_USER)) == "true")
      if (props.screen === "TeacherDashboard") {
        //  props.navigation.navigate("WelcomScreen");

        props.navigation.navigate("WelcomScreen");
      } else {
        props.navigation.goBack();
      }
  };
  const NotificationClick = () => {
    props.navigation.navigate("Notification");
  };

  const Logout = () => {
    Preference.ClearData();
    //  props.navigation.dispatch(StackActions.replace('LoginScreen'));
    props.navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    //  props.navigation.navigate('LoginScreen');
  };

  const SupportClick = () => {
    props.navigation.navigate("TeacherSupport");
  };

  return (
    <View style={stylesCommon.mainBackground}>
      <View style={stylesCommon.scoopCorner} />
      <View style={stylesCommon.circle} />
      <View
        style={[
          stylesCommon.buttonContainer,
          { alignItems: "center", marginTop: -45 },
        ]}
      >
        <TouchableOpacity
          style={stylesCommon.homeView}
          onPress={() => HomeNavigation()}
        >
          <Image
            source={icon.IC_LEFT_ARROW}
            style={stylesCommon.homeicon}
          ></Image>
        </TouchableOpacity>
        <Text style={stylesCommon.titleHeader}>{props.titile}</Text>
        <View style={stylesCommon.notificationView}>
          {/* {
                    (props.type === 'teacher') ?
                        <TouchableOpacity  onPress={() => TeacherSupportClick()}>
                        <View style={{
                            marginEnd: 15,
                        }}>
                            <Image source={icon.IC_TEACHER_SUPPORT}
                                style={stylesCommon.supportIcon}>
                            </Image>
                            <Image source={icon.IC_NOTIFICATION_POINT}
                                style={stylesCommon.notificationPoint}></Image>
                        </View>
                         </TouchableOpacity> : null
                } */}

          <View>
            <TouchableOpacity
              style={[
                stylesCommon.notificationIcon,
                { marginEnd: props.showLogout === true ? 5 : 15 },
              ]}
              onPress={() => NotificationClick()}
            >
              <Image
                source={icon.IC_NOTIFICATION}
                style={stylesCommon.notificationIcon}
              ></Image>
              <Image
                source={icon.IC_NOTIFICATION_POINT}
                style={stylesCommon.notificationPoint}
              ></Image>
            </TouchableOpacity>
          </View>
          {props.showLogout === true && (
            <View>
              <TouchableOpacity
                style={[stylesCommon.notificationIcon, { marginEnd: 5 }]}
                onPress={() => Logout()}
              >
                <Image
                  source={icon.IC_LOGOUT}
                  style={[
                    stylesCommon.notificationIcon,
                    { tintColor: "#ffffff" },
                  ]}
                ></Image>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* <Image source={icon.IC_CURVE} style={stylesCommon.curve} /> */}
      </View>
    </View>
  );
};
export const SchoolDetailHeaderView = (props) => {
  const [schoolInfo, setSchoolInfo] = useState("");
  const [studentInfo, setStudentInfo] = useState("");

  // console.log("getting this type of props", props);
  const HomeNavigation = () => {
    props.navigation.goBack();
  };
  const NotificationClick = () => {
    props.navigation.navigate("Notification");
  };

  useEffect(() => {
    if (props.type === "teacher") {
      Preference.GetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL).then(function (
        value
      ) {
        console.log("Getting this School info", value);
        setSchoolInfo(JSON.parse(value));
      });
    } else if (props.type === "parent") {
      Preference.GetData(PreferenceKeys.STUDENT_DETAIL).then(function (value) {
        console.log("Getting this School info", value);
        setStudentInfo(JSON.parse(value));
      });
    }
  }, []);

  const Logout = () => {
    Preference.ClearData();
    //  props.navigation.dispatch(StackActions.replace('LoginScreen'));
    props.navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    //  props.navigation.navigate('LoginScreen');
  };

  return (
    <View
      style={
        props.screen === "TeacherStudentProfile"
          ? stylesCommon.otherBackground
          : stylesCommon.mainBackground
      }
    >
      {props.screen === "TeacherStudentProfile" ? null : (
        <View style={stylesCommon.scoopCorner} />
      )}
      <View style={stylesCommon.circle} />
      <TouchableOpacity
        style={[
          stylesCommon.homeView,
          { marginTop: props.showAddress === true ? 0 : 0 },
        ]}
        onPress={() => HomeNavigation()}
      >
        <Image
          source={icon.IC_BACK_ARROW}
          style={stylesCommon.homeicon}
        ></Image>
      </TouchableOpacity>
      {props.type === "teacher" ? (
        <View
          style={{
            flexDirection: "column",
            flex: 0.6,
          }}
        >
          <Text
            style={{
              alignContent: "center",
              fontSize: 16,
              color: color.WHITE,
              fontFamily: fonts.LATO_BOLD,
            }}
          >
            {"Navrachana Primary School"}
            {/* {schoolInfo.schoolName} */}
          </Text>
          <Text
            style={{
              alignContent: "center",
              fontSize: 12,
              marginTop: 2,
              color: color.WHITE,
              fontFamily: fonts.LATO_BOLD,
            }}
          >
            {"2248, Raipur Chakla, Nr City Garden, Gandhi Road, Rajkot"}
            {/* {schoolInfo.address} */}
          </Text>
        </View>
      ) : props.showAddress ? (
        <View
          style={{
            flexDirection: "column",
            flex: 0.6,
          }}
        >
          <Text
            style={{
              alignContent: "center",
              fontSize: 14,
              color: color.WHITE,
              fontFamily: fonts.INTER_MEDIUM,
            }}
          >
            {"Navrachana Primary School "}
            {/* {schoolInfo.schoolName} */}
          </Text>
          <Text
            style={{
              alignContent: "center",
              fontSize: 10,

              color: color.WHITE,
              fontFamily: fonts.INTER,
            }}
          >
            {"2248, Raipur Chakla, Nr City Garden, Gandhi Road, Rajkot"}
            {/* {schoolInfo.address} */}
          </Text>
        </View>
      ) : (
        <View style={{ top: -2 }}>
          <Text
            style={{
              // alignContent: "center",
              fontSize: 18,

              color: color.WHITE,
              fontFamily: fonts.INTER_MEDIUM,
            }}
          >
            {studentInfo && studentInfo.student_name
              ? studentInfo.student_name
              : "Mr Narayan Parmar"}
          </Text>
          <Text
            style={{
              paddingTop: 0,
              marginTop: 0,
              fontSize: 12,

              color: color.WHITE,
              fontFamily: fonts.INTER,
            }}
          >
            Parent
          </Text>
        </View>
      )}

      {props.screen != "Notification" ? (
        <View
          style={[
            // props.screen != "TeacherSupport" &&
            //props.screen != "ParentSupport" &&
            // props.screen != "Payment" ?
            stylesCommon.notificationView,

            //  : stylesCommon.notificationView_new
          ]}
        >
          {props.type === "teacher" && props.screen != "TeacherSupport" ? (
            <TouchableOpacity
              style={{
                marginTop: 4,
              }}
              onPress={props.onSupportClick}
            >
              <Image
                source={icon.IC_TEACHER_SUPPORT}
                style={[stylesCommon.supportIcon, { marginStart: 5 }]}
              ></Image>
              <Image
                source={icon.IC_NOTIFICATION_POINT}
                style={[stylesCommon.notificationPoint, { end: -2 }]}
              ></Image>
            </TouchableOpacity>
          ) : null}

          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              marginEnd: 5,
            }}
          >
            <TouchableOpacity
              style={[
                stylesCommon.notificationIcon,
                {
                  //  marginTop: props.showAddress === true ? -5 : 0,
                  // marginEnd: 10,
                },
              ]}
              onPress={() => NotificationClick()}
            >
              <Image
                source={icon.IC_NOTIFICATION}
                style={[stylesCommon.notificationIcon, { marginStart: 5 }]}
              ></Image>
              <Image
                source={icon.IC_NOTIFICATION_POINT}
                style={[stylesCommon.notificationPoint, { end: -2 }]}
              ></Image>
            </TouchableOpacity>
            {props.showLogout && (
              <TouchableOpacity
                style={[stylesCommon.notificationIcon, { marginStart: 5 }]}
                onPress={() => Logout()}
              >
                <Image
                  source={icon.IC_LOGOUT}
                  style={[
                    stylesCommon.notificationIcon,
                    { tintColor: "#ffffff" },
                  ]}
                ></Image>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};
