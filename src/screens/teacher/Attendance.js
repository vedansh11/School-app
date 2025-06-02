/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  SectionList,
  FlatList,
  Pressable,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import {
  LoaderButtonView,
  LoaderViewWithBackground,
} from "../../commonTheme/LoaderView";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
  ModelTitleView,
  ButtonView,
  renderEmptyContainer,
  removeDuplicates,
} from "../../commonTheme/CommonView";
import * as Preference from "../../storeData/Preference";
import { DairyView } from "../common/DairyView";
import { axiosCallAPI } from "../../API/axiosCommonService";
import Tooltip from "react-native-walkthrough-tooltip";
import { normalize, vh, vw } from "../../Utills/dimesnion";
import * as Utills from "../../API/Utills";
import { OutlinedTextField } from "react-native-material-textfield-plus";
import ImageLoad from "react-native-image-placeholder";
const Attendance = ({ route, navigation }) => {
  const { attendanceData } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [loaderView, setLoaderView] = useState(false);
  const [toolTipVisible, setTooltip] = useState(false);
  const [selectedTopIndex, setTopIndex] = useState();
  const [selectedIndex, setIndex] = useState();
  const [searchText, setSearchText] = useState("");
  const [listDataSource, setListDataSource] = useState([]);
  const [isfilterBySearch, setFilterBySearch] = useState(false);
  // const [dataList, setDataList] = useState([]);
  const [absentData, setAbsendData] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState("Loading...");

  const dataList = [
    {
      title: "Untracked",
      data: [
        {
          attendance: "2",
          createdAt: "2025-05-13 14:13:02",
          date: "2025-05-13",
          deletedAt: "0000-00-00 00:00:00",
          enrollmentNo: "ENR010",
          fullName: "Reyansh Panchal",
          id: "978",
          // profilePic_path:
          //   "https://api.greatminds.live/uploads/student_profile/1679047613.jpg",
          remarks: "",
          sectionId: "3",
          studentId: "7",
          updatedAt: "2025-05-13 14:13:02",
        },
        {
          attendance: "2",
          createdAt: "2025-05-13 14:13:02",
          date: "2025-05-13",
          deletedAt: "0000-00-00 00:00:00",
          enrollmentNo: "ENR0020",
          fullName: "Mahendra Ram1",
          id: "979",
          // profilePic_path:
          //   "https://api.greatminds.live/uploads/student_profile/",
          remarks: "",
          sectionId: "3",
          studentId: "9",
          updatedAt: "2025-05-13 14:13:02",
        },
      ],
    },
    {
      title: "Absentees",
      data: [
        {
          attendance: "0",

          enrollmentNo: "ENR0011",
          fullName: "Aarav Shah",
          id: "981",
          // profilePic_path:
          //   "https://api.greatminds.live/uploads/student_profile/aarav.jpg",
          remarks: "Sick leave",
          sectionId: "3",
          studentId: "11",
        },
      ],
    },
    {
      title: "On-Leave",
      data: [
        {
          attendance: "3",
          createdAt: "2025-05-13 09:15:00",
          date: "2025-05-13",
          deletedAt: "0000-00-00 00:00:00",
          enrollmentNo: "ENR0033",
          fullName: "Saanvi Patel",
          id: "983",
          // profilePic_path:
          //   "https://api.greatminds.live/uploads/student_profile/saanvi.jpg",
          remarks: "Family function",
          sectionId: "3",
          studentId: "13",
          updatedAt: "2025-05-13 09:15:00",
        },
      ],
    },
    {
      title: "Present",
      data: [
        {
          attendance: "1",
          createdAt: "2025-05-13 08:45:00",
          date: "2025-05-13",
          deletedAt: "0000-00-00 00:00:00",
          enrollmentNo: "ENR0012",
          fullName: "Diya Mehta",
          id: "982",
          // profilePic_path:
          //   "https://api.greatminds.live/uploads/student_profile/1679047613.jpg",
          remarks: "",
          sectionId: "3",
          studentId: "12",
          updatedAt: "2025-05-13 08:45:00",
        },
      ],
    },
  ];

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // multipleData()
    StudentListAPI();
    return () => {
      // clearData()
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  function multipleData() {
    setListDataSource([
      {
        title: "Untracked",
        data: [
          {
            boarderColor: "#FF6F6F",
            color: "#FFDEDE",
            url: "img1.jpg",
          },
        ],
      },
      {
        title: "Absentees",
        data: [
          {
            boarderColor: "#40A0F9",
            color: "#EBF8FF",
            url: "img1.jpg",
          },
        ],
      },
      {
        title: "On-Leave",
        data: [
          {
            boarderColor: "#E9C46A",
            color: "#FFF5DB",
            url: "img1.jpg",
          },
          {
            boarderColor: "#E9C46A",
            color: "#FFF5DB",
            url: "img2.jpeg",
          },
        ],
      },
      {
        title: "Present ",
        data: [
          {
            boarderColor: "#4CB877",
            color: "#DDFFF1",
            url: "img1.jpg",
          },
          {
            boarderColor: "#4CB877",
            color: "#DDFFF1",
            url: "img2.jpeg",
          },
          {
            boarderColor: "#4CB877",
            color: "#DDFFF1",
            url: "img3.jpg",
          },
        ],
      },
    ]);
  }
  const handleSyncClick = () => {
    //        if (absentData.length != 0) {
    Alert.alert(
      AppText.ALERT_APP_NAME,
      "Status of all the people marked as UNTRACKED will be changed to PRESENT. Do you want to continue?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Continue", onPress: () => saveAttendance_API() },
      ]
    );
    //        } else {
    //           Alert.alert(AppText.ALERT_APP_NAME, 'Please select track record')
    //        }
  };

  const clearData = () => {
    setAbsendData([]);
    setFilterBySearch(false);
    setSearchText("");
    setIndex();
    setTooltip(false);
  };
  async function StudentListAPI() {
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    if (isfilterBySearch && searchText.length > 2)
      var listURL =
        Utills.TEACHER_ATTENDANCE_LIST +
        "?sectionId=" +
        attendanceData.id +
        "&search=" +
        searchText;
    else
      var listURL =
        Utills.TEACHER_ATTENDANCE_LIST + "?sectionId=" + attendanceData.id;

    axiosCallAPI("get", listURL, "", requestOptions, true, navigation)
      .then((response) => {
        console.log(response);
        if (response != undefined) {
          if (JSON.stringify(dataList) != JSON.stringify(response))
            var isDataAvailable_ = false;
          response.map((item) => {
            if (item.data.length > 0) {
              isDataAvailable_ = true;
            }
          });

          if (isDataAvailable_) {
            console.log("Attendance Data", response);
            // setDataList(response);
          } else {
            setIsDataAvailable("No Data found.");
            // setDataList([]);
          }
          //   setIsDataAvailable(isDataAvailable_);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function saveAttendance_API() {
    setLoaderView(true);
    var formData = new FormData();
    formData.append("sectionId", attendanceData.id);
    formData.append("attendance", JSON.stringify(absentData));

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "post",
      Utills.ATTENDANCE_SAVE,
      formData,
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        clearData();

        setLoaderView(false);
        StudentListAPI();
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }
  const renderItem = ({ item, index }) => {
    console.log("renderitem", item);
    var mainIndex = index;

    if (item.data.length != 0) {
      return (
        <View
          style={{
            flexDirection: "column",
            marginVertical: 5,
          }}
        >
          <View>
            <View
              style={{
                alignSelf: "center",
                marginTop: 5,
                backgroundColor: "#EAECF0",
                borderRadius: 50,
                paddingHorizontal: 15,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.INTER,
                  color: "#667085",
                }}
              >
                {item.title +
                  " " +
                  `(${String(item.data.length).padStart(2, "0")})`}
              </Text>
            </View>
            <FlatList
              data={item.data}
              style={{
                marginTop: 5,
              }}
              renderItem={({ item, index }) =>
                renderItemChild(item, index, mainIndex)
              }
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      );
    }
  };

  const renderItemChild = (item, index, mainIndex) => {
    const styles = StyleSheet.create({
      studentMainRow: {
        flex: 1,
        backgroundColor:
          dataList[mainIndex].title == "Untracked"
            ? color.U_BG
            : dataList[mainIndex].title == "Present"
            ? color.P_BG
            : dataList[mainIndex].title == "On-Leave"
            ? color.O_BG
            : dataList[mainIndex].title == "Absentees" && color.A_BG,
        borderRadius: 7,
        width: "100%",
        paddingVertical: 10,
        marginTop: 10,
        borderColor:
          dataList[mainIndex].title == "Untracked"
            ? color.U_BR
            : dataList[mainIndex].title == "Present"
            ? color.P_BR
            : dataList[mainIndex].title == "On-Leave"
            ? color.O_BR
            : dataList[mainIndex].title == "Absentees" && color.A_BR,
        borderWidth: 0.5,
        flexDirection: "row",
        alignContent: "center",
        alignSelf: "center",
        shadowColor: Platform.OS === "ios" ? color.LIGHT_GREY : color.BLACK,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1.5,
        shadowRadius: 1,
        elevation: 2,
      },
    });
    const handleClick = (index, mainIndex) => {
      if (
        dataList[mainIndex].title == "Untracked" ||
        dataList[mainIndex].title == "Present"
      ) {
        setIndex(index);
        setTopIndex(mainIndex);
        setTooltip(true);
      }
    };

    const OpenDropDown = () => {
      console.log("Dropdown Pressed");
      setModalVisible(true);
    };
    const StudentInfoView = (item, index, mainIndex) => {
      return (
        <View style={styles.studentMainRow}>
          {/* <Image style={stylesCommon.studentImage}
                    source={icon.STUDENT_IMAGE}>
                </Image> */}
          <ImageLoad
            style={{ height: 60, width: 60, marginStart: 15 }}
            source={
              item.profilePic_path &&
              (item.profilePic_path.includes(".png") ||
                item.profilePic_path.includes(".jpg"))
                ? { uri: item.profilePic_path }
                : icon.IC_DUMMY_GIRL
            }
            loadingStyle={{ size: "large", color: "blue" }}
            borderRadius={50}
            placeholderStyle={stylesCommon.studentProfile_atten}
          ></ImageLoad>
          <View style={[stylesCommon.sNameView, { marginStart: vw(20) }]}>
            <Text
              style={{
                fontFamily: fonts.INTER_SEMIBOLD,
                color:
                  dataList[mainIndex].title == "Untracked"
                    ? color.U_BR
                    : dataList[mainIndex].title == "Present"
                    ? color.P_BR
                    : dataList[mainIndex].title == "On-Leave"
                    ? color.O_BR
                    : dataList[mainIndex].title == "Absentees" && color.A_BR,
              }}
            >
              {item.fullName}
            </Text>
            <Text style={stylesCommon.deptmentText}>{item.enrollmentNo}</Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 8,

                width: "150%",
              }}
            >
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                {(dataList[mainIndex]?.title === "Untracked" ||
                  dataList[mainIndex]?.title === "Present") && (
                  <Image
                    style={{
                      height: 13,
                      width: 13,
                      resizeMode: "contain",
                      marginTop: 2,
                      marginRight: 4,
                    }}
                    source={icon.IC_ATTENDANCE_CLOCK}
                  ></Image>
                )}

                {(dataList[mainIndex]?.title === "Untracked" ||
                  dataList[mainIndex]?.title === "Present") && (
                  <Text
                    style={{
                      fontFamily: fonts.INTER_SEMIBOLD,
                      fontSize: 12,
                      color: "#101828",
                    }}
                  >
                    09: 45 AM
                  </Text>
                )}
              </View>

              <View style={{ flexDirection: "row" }}>
                {(dataList[mainIndex]?.title === "Untracked" ||
                  dataList[mainIndex]?.title === "Present") && (
                  <Image
                    style={{
                      height: 13,
                      width: 13,
                      marginLeft: 40,
                      marginTop: 2,
                      marginRight: 4,
                    }}
                    source={icon.IC_ATTENDANCE_LOCATION}
                  ></Image>
                )}

                {(dataList[mainIndex]?.title === "Untracked" ||
                  dataList[mainIndex]?.title === "Present") && (
                  <Text
                    style={{
                      fontFamily: fonts.INTER_SEMIBOLD,
                      fontSize: 12,
                      color: "#101828",
                    }}
                  >
                    School Gate 1
                  </Text>
                )}
              </View>
            </View>
          </View>
          {/* <View style={stylesCommon.sLocationView}>
                    <View style={stylesCommon.clockView}>
                        <Image style={stylesCommon.cloclImage}
                            source={icon.IC_CLOCK}>
                        </Image>
                        <Text style={stylesCommon.clockText}>{'09: 45 AM'}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Image style={stylesCommon.locationImage}
                            source={icon.IC_LOCATION}>
                        </Image>
                        <Text style={stylesCommon.clockText}>{'School Gate 1'}</Text>
                    </View>

                </View> */}

          {/* Here the three dots is being configured  */}

          <Menu>
            <MenuTrigger
              onPress={() => OpenDropDown()}
              style={{ position: "absolute", right: -65 }}
            >
              <Image
                style={{
                  width: 18,
                  height: 18,
                  // position:'absolute',
                  // right:-50,
                }}
                source={icon.IC_ATTENDANCE_DOTS}
              ></Image>
            </MenuTrigger>

            <MenuOptions
              customStyles={{
                optionsContainer: {
                  position: "absolute",
                  borderRadius: 8,
                  marginTop: 30,
                  marginLeft: 70,
                  height: 120,
                  width: 130,
                  backgroundColor: "#fff",
                },
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderTopWidth: 0,
                  borderRightWidth: 10,
                  borderBottomWidth: 10,
                  borderLeftWidth: 10,
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: "#fff",
                  borderLeftColor: "transparent",
                  zIndex: 2,
                  position: "absolute",
                  top: -8,
                  right: 9,
                }}
              ></View>
              <ScrollView>
                {AppText.ATTENDANCE_DROP_OPTIONS.map((option) => (
                  <MenuOption key={option.key}>
                    <Text style={{ marginStart: 5 }}>{option}</Text>
                  </MenuOption>
                ))}
              </ScrollView>
            </MenuOptions>
          </Menu>
        </View>

        // </View>
        //</TouchableOpacity>
      );
    };
    const toolTipClick = (type) => {
      setTooltip(false);
      absentData.push({
        studentId: item.studentId,
        attendance: type,
        remarks: "",
      });
      setAbsendData(removeDuplicates(absentData, "studentId"));
    };
    return (
      <View>
        {selectedTopIndex == mainIndex && selectedIndex == index ? (
          <Tooltip
            isVisible={toolTipVisible}
            content={
              <TouchableOpacity onPress={() => toolTipClick("A")}>
                <Text style={stylesCommon.tooltipText}>{AppText.ABSENT}</Text>
              </TouchableOpacity>
              // <View style={stylesCommon.tooltipContent}>
              //     <TouchableOpacity
              //         onPress={() => setTooltip(false)}>
              //         <Text style={stylesCommon.tooltipText}>{AppText.ABSENT}</Text>
              //     </TouchableOpacity>
              //     <View style={stylesCommon.tooltipSepretor} />
              //     <TouchableOpacity
              //         onPress={() => setTooltip(false)}>
              //         <Text style={stylesCommon.tooltipText}>{AppText.PRESENT}</Text>
              //     </TouchableOpacity>
              //     <View style={stylesCommon.tooltipSepretor} />
              //     <TouchableOpacity
              //         onPress={() => setTooltip(false)}>
              //         <Text style={stylesCommon.tooltipText}>{AppText.ID_SCAN}</Text>
              //     </TouchableOpacity>
              // </View>
            }
            placement="top"
            contentStyle={{
              backgroundColor: color.BLACK,
            }}
            onClose={() => setTooltip(false)}
          >
            {StudentInfoView(item, index, mainIndex)}
          </Tooltip>
        ) : (
          StudentInfoView(item, index, mainIndex)
        )}
      </View>
    );
  };

  const InputView = (label, isEnable, image, multiline) => {
    return (
      <View
        style={[stylesCommon.inputMainView, { marginTop: 10, marginBottom: 0 }]}
      >
        <OutlinedTextField
          style={stylesCommon.searchTextFeild}
          tintColor={color.APP_PRIMARY}
          selectionColor={color.APP_PRIMARY}
          label={label}
          multiline={false}
          editable={isEnable}
          returnKeyType="done"
          autoFocus={false}
          inputContainerStyle={{
            height: 50,
          }}
          labelTextStyle={
            {
              // bottom: vh(5),
            }
          }
          onChangeText={(text) => {
            setSearchText(text);
            setFilterBySearch(true);
          }}
        />
        {image != "" ? (
          <View style={stylesCommon.dropdownView}>
            <Image style={{ width: 24, height: 24 }} source={image}></Image>
          </View>
        ) : null}
      </View>
    );
  };
  function NavigateToSupport() {
    Preference.SetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL);
    navigation.navigate("TeacherSupport");
  }

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      {/* Dashboard Header view UI */}
      <SchoolDetailHeaderView
        type={"teacher"}
        navigation={navigation}
        screen={"Attendance"}
        onSupportClick={() => NavigateToSupport()}
      />
      <View
        style={{
          flexDirection: "column",
          marginTop: Platform.OS === "ios" ? -40 : 0,
        }}
      >
        <TitileBackgroundView
          titile={"Attendance"}
          navigation={navigation}
          isSecondviewRequired={false}
        />
      </View>
      <View style={[stylesCommon.padding15View, { flex: 1, paddingBottom: 5 }]}>
        {InputView(
          AppText.SEARCH,
          loaderView ? false : true,
          icon.IC_SEARCH,
          true
        )}
        {loaderView ? (
          <LoaderViewWithBackground color={color.WHITE} />
        ) : (
          <FlatList
            data={dataList}
            // data={dummyData}
            renderItem={(item, index) => renderItem(item, index)}
            showsVerticalScrollIndicator={false}
            style={
              {
                // marginTop: 10,
              }
            }
            keyExtractor={(item, index) => index}
            ListEmptyComponent={renderEmptyContainer(isDataAvailable, true)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Attendance;
