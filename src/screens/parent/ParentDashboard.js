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
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import { LoaderView } from "../../commonTheme/LoaderView";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import {
  DashboardHeaderView,
  SchoolDetailHeaderView,
} from "../../commonTheme/HeaderView";
import {
  DashboardDetailMenu,
  DashboardRawDetailMenu,
  PresentSquareView,
} from "../../commonTheme/CommonView";
import * as Preference from "../../storeData/Preference";
import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
import { vw } from "../../Utills/dimesnion";
import ImageLoad from "react-native-image-placeholder";
import { apiSimple } from "../../API/api";

const ParentDashboard = ({ navigation }) => {
  const [dataList, setDataList] = useState([]);
  const [loaderView, setLoaderView] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    studentListAPI();
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [dataList]);

  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  function NavigateToTimeTable(data) {
    Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data));
    navigation.navigate("ParentTimeTable", { parentData: data });
  }
  function NavigateToDairy(data) {
    Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data));
    navigation.navigate("ParentDairy", { diaryData: data });
  }
  function NavigateToAttendance(data) {
    Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data));
    navigation.navigate("ParentAttendance", { attendanceData: data });
  }
  function NavigateToSuppport(data) {
    Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data));
    navigation.navigate("ParentSupport");
  }
  function NavigateToPayment(data) {
    Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data));
    navigation.navigate("Payment");
  }

  // async function studentListAPI() {
  //   setLoaderView(true);
  //   let requestOptions = {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
  //     },
  //   };

  //   axiosCallAPI(
  //     "get",
  //     Utills.STUDENT_LIST,
  //     "",
  //     requestOptions,
  //     true,
  //     navigation
  //   )
  //     .then((response) => {
  //       console.log("med",response);
  //       if (response !== undefined) {
  //         setLoaderView(false);
  //         if (JSON.stringify(dataList) != JSON.stringify(response.result))
  //           setDataList(response.result);
  //       } else {
  //         setLoaderView(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setLoaderView(false);
  //     });
  // }

  async function studentListAPI() {
    setLoaderView(true);
    try {
      const res = await apiSimple.get(Utills.STUDENT_LIST);
      const response = res?.data;
      console.log("sd", response.result);
      if (response !== undefined) {
        if (JSON.stringify(dataList) !== JSON.stringify(response.result)) {
          setDataList(response.result);
        }
      }
    } catch (error) {
      // Error already handled in interceptors (toasts, log etc.)
      console.error("studentListAPI error", error);
    } finally {
      setLoaderView(false);
    }
  }

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      color: "#ECFEFF",
      secondaryColor: "#0BB5BF",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      color: "#ECFEFF",
      secondaryColor: "#0BB5BF",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={stylesCommon.mainMenu}>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            borderRadius: 7,
            // paddingStart: 15,
            // paddingEnd: 10,
            // paddingTop: 10,
            //paddingBottom: 10,
            flexDirection: "row",
          }}
        >
          <ImageLoad
            style={stylesCommon.studentProfile}
            source={
              item.profilePic_path && item.profilePic_path !== ""
                ? { uri: item.profilePic_path }
                : icon.BOY
            }
            loadingStyle={{ size: "large", color: "blue" }}
            borderRadius={50}
            placeholderStyle={stylesCommon.studentProfile}
            placeholderSource={icon.BOY} //remove this line when the profile pic working
          />

          <View style={{ marginStart: 20, flex: 1 }}>
            <Text style={stylesCommon.nameText}>{item.student_name}</Text>
            <Text style={stylesCommon.deptmentText}>{item.enrollmentNo}</Text>
            {/* <Text style={stylesCommon.deptmentText}>
              {"Class : " + item.className + " - " + item.sectionName}
            </Text> */}
            {/* <View style={stylesCommon.infoRaw}>
                            <View style={stylesCommon.infoColumn}>
                                <Text style={stylesCommon.tiitleText}>{'Last Scane Time'}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    marginTop: 2,
                                    fontFamily: fonts.LATO_BOLD,
                                    color: item.secondaryColor,
                                }}>{'09: 45 AM '}</Text>
                            </View>
                            <View style={stylesCommon.infoColumn}>
                                <Text style={stylesCommon.tiitleText}>{'Last Location'}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    marginTop: 2,
                                    fontFamily: fonts.LATO_BOLD,
                                    color: item.secondaryColor,
                                }}>{'School Gate'}</Text>
                            </View>
                        </View> */}

            <View
              style={{
                marginTop: 12,
                flexDirection: "row",

                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={stylesCommon.sSubHeading}>Last Scan Time</Text>
                <Text style={stylesCommon.sSubText}>09: 45 AM</Text>
              </View>

              <View>
                <Text style={stylesCommon.sSubHeading}>Last Location</Text>
                <Text style={stylesCommon.sSubText}>School Gate 1</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={stylesCommon.lineView}></View>

        <DashboardDetailMenu
          attendance={true}
          isShowFees={true}
          dairy={true}
          isShowTimeTable={true}
          isShowHelp={true}
          onStudentAttendanceClick={() => NavigateToAttendance(item)}
          onSupportClick={() => NavigateToSuppport(item)}
          onDairyClick={() => NavigateToDairy(item)}
          onTimeTableClick={() => NavigateToTimeTable(item)}
          onPaymentClick={() => NavigateToPayment(item)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      <SchoolDetailHeaderView
        titile={AppText.DASHBOARD}
        goBackWelcomeScreen={true}
        type={"parent"}
        navigation={navigation}
        showLogout={true}
      />

      <FlatList
        data={dataList}
        renderItem={renderItem}
        style={stylesCommon.dashList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<LoaderView color={color.PROGRESS_GREY} />}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default ParentDashboard;
