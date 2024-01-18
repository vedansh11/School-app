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
      props.navigation.navigate("WelcomScreen");
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

  const TeacherSupportClick = () => {
    props.navigation.navigate("TeacherSupport");
  };

  return (
    <View style={stylesCommon.mainBackground}>
      <View style={stylesCommon.scoopCorner} />
      <View style={stylesCommon.circle} />
      <View style={stylesCommon.buttonContainer}>
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
              style={[stylesCommon.notificationIcon, { marginEnd: 15 }]}
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
          <View>
            <TouchableOpacity
              style={stylesCommon.notificationIcon}
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

  return (
    <View
      style={
        //props.screen != "TeacherSupport" &&
        // props.screen != "ParentSupport" &&
        // props.screen != "Payment" ?
        // && props.screen != 'DairyView'
        stylesCommon.mainBackground
        //: stylesCommon.mainBackground_custome
      }
    >
      <View style={stylesCommon.scoopCorner} />
      <View style={stylesCommon.circle} />
      <TouchableOpacity
        style={stylesCommon.homeView}
        onPress={() => HomeNavigation()}
      >
        <Image
          source={icon.IC_BACK_ARROW}
          style={stylesCommon.homeicon}
        ></Image>
      </TouchableOpacity>
      {props.screen != "Notification" ? (
        props.type === "teacher" ? (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            {schoolInfo ? (
              <>
                <Text
                  style={{
                    alignContent: "center",
                    fontSize: 16,
                    color: color.WHITE,
                    fontFamily: fonts.LATO_BOLD,
                  }}
                >
                  {schoolInfo.schoolName}
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
                  {schoolInfo.address}
                </Text>
              </>
            ) : null}
          </View>
        ) : (
          <Text
            style={{
              // alignContent: "center",
              fontSize: 18,
              paddingBottom: 14,
              color: color.WHITE,
              fontFamily: fonts.INTER,
            }}
          >
            {studentInfo.student_name}
          </Text>
        )
      ) : (
        <Text style={stylesCommon.titleHeader}>{props.titile}</Text>
      )}

      {props.screen != "Notification" ? (
        <View
          style={
            // props.screen != "TeacherSupport" &&
            //props.screen != "ParentSupport" &&
            // props.screen != "Payment" ?
            stylesCommon.notificationView
            //  : stylesCommon.notificationView_new
          }
        >
          {props.type === "teacher" && props.screen != "TeacherSupport" ? (
            <View
              style={{
                marginTop: 22,
                marginEnd: 15,
              }}
            >
              <Image
                source={icon.IC_TEACHER_SUPPORT}
                style={stylesCommon.supportIcon}
              ></Image>
              <Image
                source={icon.IC_NOTIFICATION_POINT}
                style={stylesCommon.notificationPoint}
              ></Image>
            </View>
          ) : null}

          <View style={{ marginTop: 22 }}>
            <TouchableOpacity
              style={stylesCommon.notificationIcon}
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
        </View>
      ) : null}
    </View>
  );
};
