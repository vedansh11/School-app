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
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import * as Preference from "../../storeData/Preference";
import { DashboardHeaderView } from "../../commonTheme/HeaderView";
import { LoaderView } from "../../commonTheme/LoaderView";
import {
  PresentSquareView,
  DashboardRawDetailMenu,
  renderEmptyContainer,
  removeDuplicates,
} from "../../commonTheme/CommonView";

import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
import TeacherDashboard2 from "./TeacherDashboard2";
import { screenWidth } from "../../Utills/dimesnion";

const TeacherDashboard = ({ navigation }) => {
  const [listDataSource, setListDataSource] = useState([]);
  const [classListData, setClassList] = useState([]);
  const [dataList, setData] = useState([]);
  const [clickIndex, setIndex] = useState();
  const [showContent, setShowContent] = useState();
  const [loaderView, setLoaderView] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    const unsubscribe = navigation.addListener("focus", () => {
      schoolListAPI();
      if (clickIndex !== undefined) {
        // console.log("API call");
        teacherClassListAPI(listDataSource[clickIndex].id);
      }
    });
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, []);
  useEffect(() => {
    Preference.SetData(PreferenceKeys.TEACHER_DASHBOARD_INDEX, "" + clickIndex);
  }, [clickIndex]);
  //  }, [listDataSource, classListData]);

  function multipleData() {
    setListDataSource([
      {
        id: "1001",
        color: "#ECFEFF",
        photos: [
          {
            color: "#ECFEFF",
            url: "img1.jpg",
          },
          {
            color: "#ECFEFF",
            url: "img2.jpeg",
          },
          {
            color: "#ECFEFF",
            url: "img3.jpg",
          },
        ],
      },
      {
        id: "1002",
        color: "#ECFEFF",
        photos: [
          {
            url: "img.jpg",
            color: "#ECFEFF",
          },
          {
            url: "img2.jpg",
            color: "#ECFEFF",
          },
          {
            url: "img3.jpg",
            color: "#ECFEFF",
          },
          {
            url: "img4.jpg",
            color: "#ECFEFF",
          },
        ],
      },
    ]);
  }

  async function schoolListAPI() {
    setLoaderView(true);
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "get",
      Utills.SCHOOL_LIST,
      "",
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        setLoaderView(false);
        console.log("Response>> " + JSON.stringify(response));

        if (JSON.stringify(listDataSource) !== JSON.stringify(response))
          console.log(response);
        setListDataSource(response);
        Preference.GetData(PreferenceKeys.TEACHER_DASHBOARD_INDEX).then(
          (index) => {
            if (index) {
              console.log("The teacherDashboard1 here index is", index);
              setIndex(parseInt(index));
              teacherClassListAPI(listDataSource[parseInt(index)].id);
            }
          }
        );
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }
  async function teacherClassListAPI(Id) {
    console.log("Id we are getting in classList", Id);
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
        if (JSON.stringify(classListData) !== JSON.stringify(response.result))
          setClassList(removeDuplicates(response.result, "id"));
        console.log("Response getting Dashboard 1 is..", response);
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }

  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  function NavigateToDairy(data) {
    console.log("The data coming here is...", data);
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

  function NavigateToDashBoard2(item, index) {
    teacherClassListAPI(item.id);
    setIndex(index);
    navigation.navigate("TeacherDashboard2", {
      item: item,
      index: index,
      data: classListData,
    });
  }
  function clickDown(item, index) {
    setIndex(index);
    teacherClassListAPI(item.id);
    console.log("so this is the item we are getting", item);

    //NavigateToDashBoard2(item, index);
  }

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.WHITE,
          borderRadius: 7,
          width: "100%",
          marginTop: 10,
          borderColor: color.GREY,
          borderWidth: 1,
          marginBottom: 10,
          alignSelf: "center",
          shadowColor: Platform.OS === "ios" ? color.LIGHT_GREY : color.BLACK,
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 5,
          shadowRadius: 1,
          elevation: 5,
          padding: 7,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            marginBottom: 8,
            flexDirection: "row",
            alignContent: "center",
          }}
          onPress={() => {
            NavigateToDashBoard2(item, index);
            // clickDown(item, index);
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
              flex: 0.6,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
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
          {index === clickIndex ? (
            <View
              style={{
                flex: 0.1,
                end: 0,
                position: "absolute",
                alignSelf: "center",
              }}
            >
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginEnd: 10,
                }}
                source={icon.IC_DOWN_ARROW}
              ></Image>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                end: 10,
                position: "absolute",
                alignSelf: "center",
                //transform: [{ rotateX: "180deg" }],
              }}
            >
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={icon.IC_SIDE_ARROW}
              ></Image>
            </View>
          )}
        </TouchableOpacity>
        <View>
          {/* <View
            style={{
              backgroundColor: color.GREY,
              height: 0.6,
              width: "100%",
            }}
          ></View> */}
          {/* <TouchableOpacity
            style={{ marginTop: 10, marginBottom: 5 }}
            onPress={() => {
              Preference.SetData(
                PreferenceKeys.TEACHER_SCHOOL_DETAIL,
                JSON.stringify(item)
              );
                navigation.navigate('TeacherSupport')
            }}
          >
            <View
              style={{
                alignSelf: "flex-end",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginEnd: 5,
                  resizeMode: "cover",
                  tintColor: color.INFO_BLUE,
                }}
                source={icon.IC_TEACHER_SUPPORT}
              ></Image>
              <Text
                style={{
                  color: color.INFO_BLUE,
                  marginEnd: 10,
                  fontFamily: fonts.LATO_BOLD,
                  fontSize: 12,
                }}
              >
                Support
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>

        {index === clickIndex ? (
          <View>
            {setShowContent(item)}

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
        ) : null}
      </View>
    );
  };

  const renderItemChild = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            backgroundColor: color.WHITE,
            borderRadius: 7,
            width: "100%",
            marginTop: 5,
            borderColor: color.GREY,
            borderWidth: 0.5,
            marginBottom: 5,
            alignSelf: "center",
            shadowColor: Platform.OS === "ios" ? color.LIGHT_GREY : color.BLACK,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 5,
            shadowRadius: 1,
            elevation: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "#EEEDF8",
              borderRadius: 7,
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
            // isShowHelp={true}
            // isShowFees={false}
            // isShowTimeTable={true}
            // isShowNote={true}
            // isShowCalendar={false}
            // isShowStudent={true}
            // onNoteClick={() => NavigateToDairy(item)}
            // onStudentAttendanceClick={() => onStudentAttendanceClick(item)}
            // onTimeTableClick={() => NavigateToTimeTable(item)}
            // onSupportClick={() => NavigateToSupport(item)}
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
      />

      <View>
        <View>
          <Text
            style={{
              marginTop: 35,
              marginHorizontal: 10,
              fontFamily: fonts.INTER_MEDIUM,
              fontSize: 24,
              color: "#101828",
            }}
          >
            Hi,Mr.Sample Text
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 30,
              fontFamily: fonts.INTER_SEMIBOLD,
              color: "#101828",
            }}
          >
            Good Morning
          </Text>
        </View>
        <FlatList
          data={listDataSource}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: Platform.OS === "ios" ? -40 : 10,
            marginStart: 10,
            marginEnd: 10,
          }}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={<LoaderView color={color.PROGRESS_GREY} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TeacherDashboard;
