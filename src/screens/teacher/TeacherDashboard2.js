import React, { useState, useEffect } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import * as Preference from "../../storeData/Preference";
import {
  DashboardHeaderView,
  SchoolDetailHeaderView,
} from "../../commonTheme/HeaderView";
import { LoaderView } from "../../commonTheme/LoaderView";
import {
  PresentSquareView,
  DashboardRawDetailMenu,
  renderEmptyContainer,
  removeDuplicates,
} from "../../commonTheme/CommonView";

import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
import { screenWidth } from "../../Utills/dimesnion";

export default function TeacherDashboard2({ navigation, route }) {
  const { item, index, data } = route.params;
  const [clickIndex, setIndex] = useState();
  const [listDataSource, setListDataSource] = useState([]);
  const [classListData, setClassList] = useState([]);
  const [dataList, setData] = useState([]);
  const [loaderView, setLoaderView] = useState(false);
  const [showContent, setShowContent] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      schoolListAPI();
      if (clickIndex !== undefined) {
        // console.log("API call");
        teacherClassListAPI(listDataSource[clickIndex].id);
      }
    });
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  useEffect(() => {
    Preference.SetData(PreferenceKeys.TEACHER_DASHBOARD_INDEX, "" + clickIndex);
  }, [clickIndex]);

  useEffect(() => {
    teacherClassListAPI(item.id);
  }, []);
  async function schoolListAPI() {
    setLoaderView(true);
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    try {
      const response = await axiosCallAPI(
        "get",
        Utills.SCHOOL_LIST,
        "",
        requestOptions,
        true,
        navigation
      );

      setLoaderView(false);
      console.log("Response>> " + JSON.stringify(response));

      if (JSON.stringify(listDataSource) !== JSON.stringify(response)) {
        console.log(response);
        setListDataSource(response);
        Preference.GetData(PreferenceKeys.TEACHER_DASHBOARD_INDEX).then(
          (index) => {
            if (index) {
              console.log("this is the index bhai ", index);
              setIndex(parseInt(index));
              teacherClassListAPI(response[parseInt(index)].id);
            }
          }
        );
      }
    } catch (error) {
      setLoaderView(false);
      console.error("Error getting Dashboard 2 is..", error);
    }
  }

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  console.log("The items foun in Navigation2 is ", item.id);
  console.log("The index foun in Navigation2 is ", index);
  console.log("The data foun in Navigation2 is ", classListData);

  async function teacherClassListAPI(Id) {
    setLoaderView(true);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "get",
      Utills.TEACHER_CLASS_LIST + "?schoolId=" + Id,
      "",
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        setLoaderView(false);
        if (JSON.stringify(classListData) !== JSON.stringify(response.result)) {
          setClassList(removeDuplicates(response.result, "id"));
          console.log("Response getting Dashboard2 is..", response);
        }
      })
      .catch((error) => {
        setLoaderView(false);
        console.log("Error getting getting Dashboard2 is..", error);
      });
  }

  function NavigateToDairy(data) {
    console.log("Navigated to dairy..", data);
    Preference.SetData(
      PreferenceKeys.TEACHER_SCHOOL_DETAIL,
      JSON.stringify(showContent)
    );

    console.log("The preference data i got is ----------");
    Preference.GetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL).then(function (
      value
    ) {
      console.log("Getting this School info", value);
    });

    navigation.navigate("TeacherDairy", { diaryData: data });
  }
  function NavigateToTimeTable(data) {
    Preference.SetData(
      PreferenceKeys.TEACHER_SCHOOL_DETAIL,
      JSON.stringify(showContent)
    );
    navigation.navigate("TeacherTimeTable", { teacherData: data });
  }
  function onStudentAttendanceClick(data) {
    Preference.SetData(
      PreferenceKeys.TEACHER_SCHOOL_DETAIL,
      JSON.stringify(showContent)
    );
    navigation.navigate("Attendance", { attendanceData: data });
  }
  function NavigateToSupport(data) {
    console.log(data);
    Preference.SetData(
      PreferenceKeys.TEACHER_SCHOOL_DETAIL,
      JSON.stringify(showContent)
    );
    navigation.navigate("TeacherSupport", { supportData: data });
  }

  const renderItemChild = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            backgroundColor: color.WHITE,
            borderRadius: 15,
            width: "92%",
            marginTop: 5,
            marginBottom: 5,
            alignSelf: "center",

            elevation: 2,
          }}
        >
          <View
            style={{
              backgroundColor: "#EEEDF8",

              borderTopStartRadius: 15,
              borderTopEndRadius: 15,
              paddingHorizontal: screenWidth > 360 ? 15 : 10,
              paddingTop: 15,
              paddingBottom: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginTop: 5,
                marginEnd: screenWidth > 360 ? 15 : 5,
              }}
            >
              <View
                style={{
                  backgroundColor: color.INFO_BLUE,
                  height: 75,
                  width: 75,
                  borderRadius: 50,
                  color: color.WHITE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: fonts.LATO_BOLD,
                    color: color.WHITE,
                  }}
                >
                  {item.className}
                </Text>
                <View
                  style={{ width: 30, height: 1, backgroundColor: color.WHITE }}
                ></View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: fonts.LATO_BOLD,
                    color: color.WHITE,
                  }}
                >
                  {item.section}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginEnd: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.INTER_MEDIUM,
                  fontSize: screenWidth > 360 ? 9 : 8,
                  color: "#101828",
                  position: "absolute",
                  right: 6,
                  top: screenWidth > 360 ? 10 : 12,
                }}
              >
                Room No : 04
              </Text>
              <View
                style={{
                  marginEnd: 10,
                  marginStart: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.INTER_SEMIBOLD,

                    fontSize: 14,
                    color: "#101828",
                  }}
                >
                  English
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.INTER_MEDIUM,
                    fontSize: screenWidth > 360 ? 10 : 8,
                    color: "#101828",
                  }}
                >
                  08:00 am - 08:30 am
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 12 }}>
                <PresentSquareView
                  colorTheme={color.GREEN}
                  textPresent={"Present"}
                  value={item.leave.present}
                ></PresentSquareView>
                <PresentSquareView
                  colorTheme={color.A_ORENG}
                  textPresent={"Leave"}
                  value={item.leave.onleave}
                ></PresentSquareView>
                <PresentSquareView
                  colorTheme={color.INFO_BLUE}
                  textPresent={"Absent"}
                  value={item.leave.absent}
                ></PresentSquareView>
                <PresentSquareView
                  colorTheme={color.RED}
                  textPresent={"Untracked"}
                  value={item.leave.untrack}
                ></PresentSquareView>
              </View>
            </View>
          </View>
          <View style={stylesCommon.lineView}></View>
          <DashboardRawDetailMenu
            attendance={true}
            dairy={true}
            timetable={true}
            onStudentAttendanceClick={() => onStudentAttendanceClick(item)}
            ontimeTableClick={() => NavigateToTimeTable(item)}
            onDairyClick={() => NavigateToDairy(item)}
            isShowHelp={true}
            // isShowFees={false}
            // isShowTimeTable={true}
            // isShowNote={true}
            // isShowCalendar={false}
            // isShowStudent={true}
            // onNoteClick={() => NavigateToDairy(item)}
            // onStudentAttendanceClick={() => onStudentAttendanceClick(item)}
            // onTimeTableClick={() => NavigateToTimeTable(item)}
            onSupportClick={() => NavigateToSupport(item)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={"#564CB8"} />

      {/* Dashboard Header view UI */}
      <DashboardHeaderView
        titile={AppText.DASHBOARD}
        type={"teacher"}
        navigation={navigation}
        //navigation={props.navigation}
      />
      {/* <SchoolDetailHeaderView
        titile={AppText.DASHBOARD}
        type={"teacher"}
        //navigation={navigation}
        navigation={props.navigation}
      /> */}

      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: color.WHITE,

            borderRadius: 15,
            width: "92%",
            marginStart: 14,
            position: "absolute",
            top: -25,
            elevation: 3,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              marginBottom: 8,
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Image
              style={{
                flex: 0.25,
                height: 80,
                width: 80,
                alignSelf: "center",
              }}
              source={icon.IC_SCHOOL_LOGO}
            ></Image>
            <View
              style={{
                flex: 0.8,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.LATO_BOLD,
                  color: color.BLACK,
                }}
              >
                {item.schoolName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 2,
                  fontFamily: fonts.LATO_BOLD,
                  color: color.TEXT_COLOR,
                }}
              >
                {item.address}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 70 }}>
          <FlatList
            data={classListData}
            style={{
              marginTop: 7,
              marginBottom: 80,
            }}
            ListEmptyComponent={renderEmptyContainer("No data found", true)}
            renderItem={renderItemChild}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
