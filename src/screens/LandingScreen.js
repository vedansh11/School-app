/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { color, icon, PreferenceKeys } from "../constant";
import stylesCommon from "../commonTheme/stylesCommon";
import { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import * as Preference from "../storeData/Preference";
import { StackActions } from "@react-navigation/native";
const LandingScreen = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    NextScreen();
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  async function NextScreen() {
    setTimeout(async () => {
      var IS_LOGIN = await Preference.GetData(PreferenceKeys.IS_LOGIN);
      var IS_PARENTS_LOGIN = await Preference.GetData(
        PreferenceKeys.IS_PARENTS_LOGIN
      );

      // navigation.navigate(IS_LOGIN === 'true' ?
      //     IS_PARENTS_LOGIN === 'true' ?
      //         'ParentDashboard' : 'TeacherDashboard'
      //     : 'LoginScreen')
      navigation.dispatch(
        StackActions.replace(
          IS_LOGIN === "true"
            ? IS_PARENTS_LOGIN === "true"
              ? "ParentDashboard"
              : "TeacherDashboard"
            : "LoginScreen"
        )
      );
      // navigation.navigate('LoginScreen')
      // navigation.navigate('WelcomScreen')
    }, 3000);
  }

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <View style={stylesCommon.MainContainer}>
        <View style={stylesCommon.splashMainStyle}>
          <Image
            style={stylesCommon.backgroundStyle}
            source={icon.SPLASH_BACKGROUND}
          />
          {/* <Image style={stylesCommon.logoStyle}
                        source={icon.LOGO} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
