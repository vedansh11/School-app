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
import { ExpandableListView } from "react-native-expandable-listview";
import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";

const TeacherDashboard = ({ navigation }) => {
  const [listDataSource, setListDataSource] = useState([]);
  const [classListData, setClassList] = useState([]);
  const [dataList, setData] = useState([]);
  const [clickIndex, setIndex] = useState();
  const [showContent, setShowContent] = useState();
  const [loaderView, setLoaderView] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    const unsubscribe = navigation.addListener('focus', () => {
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
  useEffect(() =>{
    Preference.SetData(PreferenceKeys.TEACHER_DASHBOARD_INDEX, ""+clickIndex);
  },[clickIndex]);
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
        console.log("Response>> "+JSON.stringify(response))

        if (JSON.stringify(listDataSource) !== JSON.stringify(response))
        console.log(response);
          setListDataSource(response);
          Preference.GetData(PreferenceKeys.TEACHER_DASHBOARD_INDEX).then(index =>{
            if(index){
              setIndex(parseInt(index));
              teacherClassListAPI(listDataSource[parseInt(index)].id);
            }
          })
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }
  async function teacherClassListAPI(Id) {
  console.log(Id);
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
    Preference.SetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL, JSON.stringify(showContent))
    navigation.navigate("TeacherDairy", { diaryData: data });
  }
  function NavigateToTimeTable(data) {
    Preference.SetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL, JSON.stringify(showContent))
    navigation.navigate("TeacherTimeTable", { teacherData: data });
  }
  function onStudentAttendanceClick(data) {
    Preference.SetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL, JSON.stringify(showContent))
    navigation.navigate("Attendance", { attendanceData: data });
  }
  function NavigateToSupport(data){
    console.log(data);
    Preference.SetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL, JSON.stringify(showContent))
    navigation.navigate("TeacherSupport", { supportData: data });
  }

  function clickDown(item, index) {
    
    setIndex(index);
    teacherClassListAPI(item.id);
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
            index === clickIndex ? setIndex() : clickDown(item, index);
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
              flex: 0.60,
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
                  height: 30,
                  width: 30,
                  marginEnd: 10,
                }}
                source={icon.IC_UP}
              ></Image>
            </View>
          ) : (
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
                  height: 30,
                  width: 30,
                  marginEnd: 10,
                }}
                source={icon.IC_DOWN}
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
            {/* <View style={{
                                backgroundColor: color.GREY,
                                height: 0.6,
                                width: '100%'
                            }}></View> */}

            <FlatList
              data={classListData}
              style={{
                marginTop: 7,
                marginBottom:80
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
              backgroundColor: color.COLOR_SECONDARY,
              flex: 0.75,
              borderRadius: 7,
              paddingStart: 15,
              paddingEnd: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: color.INFO_BLUE,
                  height: 32,
                  width: 50,
                  borderTopEndRadius: 8,
                  borderTopStartRadius: 8,
                  color: color.WHITE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: fonts.LATO_BOLD,
                    color: color.WHITE,
                  }}
                >
                  {item.className}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: color.GREEN,
                  height: 25,
                  width: 50,
                  marginTop: 1,
                  borderBottomEndRadius: 4,
                  borderBottomStartRadius: 4,
                  color: color.WHITE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
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
                paddingBottom: 7,
                paddingTop: 7,
                marginEnd: 10,
                end: 0,
                position: "absolute",
                flexDirection: "row",
              }}
            >
              <PresentSquareView
                colorTheme={color.GREEN}
                textPresent={"P"}
                value={item.leave.present}
              ></PresentSquareView>
              <PresentSquareView
                colorTheme={color.A_ORENG}
                textPresent={"L"}
                value={item.leave.onleave}
              ></PresentSquareView>
              <PresentSquareView
                colorTheme={color.INFO_BLUE}
                textPresent={"A"}
                value={item.leave.absent}
              ></PresentSquareView>
              <PresentSquareView
                colorTheme={color.RED}
                textPresent={"U"}
                value={item.leave.untrack}
              ></PresentSquareView>
            </View>
          </View>
          <View style={stylesCommon.lineView}></View>
          <DashboardRawDetailMenu
            isShowHelp={true}
            isShowFees={false}
            isShowTimeTable={true}
            isShowNote={true}
            isShowCalendar={false}
            isShowStudent={true}
            onNoteClick={() => NavigateToDairy(item)}
            onStudentAttendanceClick={() => onStudentAttendanceClick(item)}
            onTimeTableClick={() => NavigateToTimeTable(item)}
            onSupportClick ={() => NavigateToSupport(item)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      {/* Dashboard Header view UI */}
      <DashboardHeaderView
        titile={AppText.DASHBOARD}
        type={"teacher"}
        navigation={navigation}
      />

      <View>
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
