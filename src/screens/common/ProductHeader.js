import React from "react";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import stylesCommon from "../../commonTheme/stylesCommon";
import { color, fonts, icon, PreferenceKeys } from "../../constant";

export const ProductHeader = (props) => {
  const [schoolInfo, setSchoolInfo] = useState("");
  const [studentInfo, setStudentInfo] = useState("");

  // console.log("getting this type of props", props);
  const HomeNavigation = () => {
    props.navigation.goBack();
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

  return (
    <View style={stylesCommon.mainBackground}>
      <View style={stylesCommon.scoopCorner} />

      <View style={stylesCommon.circle} />

      <TouchableOpacity
        style={[stylesCommon.homeView, { marginEnd: 0 }]}
        onPress={() => HomeNavigation()}
      >
        <Image
          source={icon.IC_BACK_ARROW}
          style={stylesCommon.homeicon}
        ></Image>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",

          flex: 1,
          paddingHorizontal: 15,
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.INTER_SEMIBOLD,
            fontSize: 16,
            color: "#fff",
          }}
        >
          {props.title ?? "Products"}
        </Text>

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
      </View>
    </View>
  );
};
