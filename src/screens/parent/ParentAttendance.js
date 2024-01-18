/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  StyleSheet,
  Animated,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon, { SCREEN_WIDTH } from "../../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import { LoaderButtonView } from "../../commonTheme/LoaderView";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
  ModelTitleView,
  ButtonView,
} from "../../commonTheme/CommonView";
import * as Preference from "../../storeData/Preference";
import { DairyView } from "../common/DairyView";
import { axiosCallAPI } from "../../API/axiosCommonService";
import * as Utills from "../../API/Utills";
import {
  normalize,
  screenHeight,
  screenWidth,
  vh,
  vw,
} from "../../Utills/dimesnion";
import { OutlinedTextField } from "react-native-material-textfield-plus";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AttendanceDetailStatus from "./AttendanceDetailStatus";
import AttendanceTrends from "./AttendanceTrends";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const ParentAttendance = ({ route, navigation }) => {
  const { attendanceData } = route.params;

  const fromFieldRef = useRef();
  const toFieldRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [loaderView, setLoaderView] = useState(false);
  const [noteType, setNoteType] = useState("");
  const [description, setDescription] = useState("");
  const [isSaveData, setSaveData] = useState();
  const Tab = createMaterialTopTabNavigator();
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [toDateOpen, setToDateOpen] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    fromFieldRef?.current?.setValue(moment(fromDate).format("DD/MM/YYYY"));
    toFieldRef?.current?.setValue(moment(toDate).format("DD/MM/YYYY"));
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  });

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  async function AddLeaveAPI() {
    setLoaderView(true);
    let loginFormData = new FormData();
    loginFormData.append("id", attendanceData.section);
    loginFormData.append("studentId", attendanceData.id);
    // loginFormData.append("fromDate",moment(fromDate).format('YYYY-MM-DD'))
    // loginFormData.append("toDate",moment(toDate).format('YYYY-MM-DD'))
    loginFormData.append("fromDate", moment(fromDate).format("DD-MM-YYYY"));
    loginFormData.append("toDate", moment(toDate).format("DD-MM-YYYY"));
    loginFormData.append("description", description);
    loginFormData.append("sectionId", attendanceData.sectionId);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "post",
      Utills.LEAVE_SAVE,
      loginFormData,
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        if (response !== undefined) {
          setModalVisible(!modalVisible);
          clearData();
          setLoaderView(false);
        } else {
          setLoaderView(false);
        }
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }
  const MyTabBar = ({ state, descriptors, navigation, position }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          borderRadius: 50,
          width: screenWidth - 150,
          flex: 0.075,
          backgroundColor: "#EEEDF8",
          marginTop: 25,
          marginEnd: 20,
          marginStart: screenWidth / 2.6,
          //  justifyContent: "space-around",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                backgroundColor: isFocused ? color.WHITE : null,
                width: SCREEN_WIDTH / 3.7,
                height: 30,
                // paddingTop: 12,
                // paddingVertical: 5,
                marginStart: 5,
                // marginEnd: 5,
                marginVertical: 5,
                //paddingHorizontal: 10,
                justifyContent: "center",
                alignContent: "center",
                borderRadius: 50,
                // borderTopStartRadius: 10,
                // borderTopEndRadius: 10,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: isFocused ? 2 : 0 },
                shadowOpacity: isFocused ? 0.2 : 0,
                elevation: isFocused ? 5 : 0,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={{
                    fontSize: 10,
                    textAlign: "center",
                    fontFamily: fonts.INTER_MEDIUM,
                    color: isFocused ? "#101828" : "#98A2B3",
                  }}
                >
                  {label}
                </Animated.Text>
                {/* {isFocused ? (
                  <View
                    style={{
                      backgroundColor: color.COLOR_PRIMARY,
                      height: 1,
                      marginTop: 12,
                      width: SCREEN_WIDTH / 8,
                    }}
                  />
                ) : null} */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      // <View
      //   style={{
      //     flexDirection: "row",
      //     backgroundColor: color.COLOR_SECONDARY,
      //     justifyContent: "space-around",
      //   }}
      // >
      //   {state.routes.map((route, index) => {
      //     const { options } = descriptors[route.key];
      //     const label =
      //       options.tabBarLabel !== undefined
      //         ? options.tabBarLabel
      //         : options.title !== undefined
      //         ? options.title
      //         : route.name;

      //     const isFocused = state.index === index;

      //     const onPress = () => {
      //       const event = navigation.emit({
      //         type: "tabPress",
      //         target: route.key,
      //         canPreventDefault: true,
      //       });

      //       if (!isFocused && !event.defaultPrevented) {
      //         navigation.navigate({ name: route.name, merge: true });
      //       }
      //     };

      //     const inputRange = state.routes.map((_, i) => i);
      //     const opacity = position.interpolate({
      //       inputRange,
      //       outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
      //     });

      //     return (
      //       <TouchableOpacity
      //         accessibilityRole="button"
      //         accessibilityState={isFocused ? { selected: true } : {}}
      //         accessibilityLabel={options.tabBarAccessibilityLabel}
      //         testID={options.tabBarTestID}
      //         onPress={onPress}
      //         style={{
      //           backgroundColor: isFocused
      //             ? color.WHITE
      //             : color.COLOR_SECONDARY,
      //           width: SCREEN_WIDTH / 2.3,
      //           paddingTop: 12,
      //           borderTopStartRadius: 10,
      //           borderTopEndRadius: 10,
      //           alignItems: "center",
      //           shadowColor: "#000",
      //           shadowOffset: { width: 0, height: isFocused ? 2 : 0 },
      //           shadowOpacity: isFocused ? 0.2 : 0,
      //           elevation: isFocused ? 5 : 0,
      //         }}
      //       >
      //         <View
      //           style={{
      //             alignItems: "center",
      //           }}
      //         >
      //           <Animated.Text
      //             style={{
      //               fontSize: 16,
      //               fontFamily: fonts.LATO_REGULAR,
      //               fontWeight: "700",
      //               color: isFocused ? color.DARK_TEXT : color.GREY,
      //             }}
      //           >
      //             {label}
      //           </Animated.Text>
      //           {isFocused ? (
      //             <View
      //               style={{
      //                 backgroundColor: color.COLOR_PRIMARY,
      //                 height: 1,
      //                 marginTop: 12,
      //                 width: SCREEN_WIDTH / 8,
      //               }}
      //             />
      //           ) : null}
      //         </View>
      //       </TouchableOpacity>
      //     );
      //   })}
      // </View>
    );
  };

  const MyTabs = () => {
    return (
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name="AttendanceDetailStatus"
          component={AttendanceDetailStatus}
          initialParams={{ studentData: attendanceData }}
          options={{ tabBarLabel: "Detailed Status" }}
        />
        <Tab.Screen
          name="AttendanceTrends"
          upperCaseLabel={false}
          component={AttendanceTrends}
          initialParams={{ studentData: attendanceData }}
          options={{ tabBarLabel: "Trends" }}
        />
      </Tab.Navigator>
    );
  };
  const handleClick = useCallback(() => {
    setModalVisible(true);
  }, []);

  const InputView = (label, isEnable, image, multiline) => {
    return (
      <View>
        {label == AppText.FROM && (
          <TouchableOpacity
            style={stylesCommon.inputMainView}
            onPress={() => setFromDateOpen(true)}
          >
            <OutlinedTextField
              ref={fromFieldRef}
              baseColor={color.APP_PRIMARY}
              style={stylesCommon.textFieldView}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={label}
              height={80}
              multiline={multiline}
              editable={isEnable}
              returnKeyType="done"
              autoFocus={false}
              onChangeText={(date) => setFromDate(date)}
            />
            {image != "" ? (
              <View style={stylesCommon.dropdownView}>
                <Image style={stylesCommon.dropImage} source={image}></Image>
              </View>
            ) : null}
            <DatePicker
              modal
              mode="date"
              theme="light"
              open={fromDateOpen}
              minimumDate={fromDate}
              date={fromDate}
              onConfirm={(date) => {
                setFromDateOpen(false);
                setFromDate(date);
                setToDate(date);
              }}
              onCancel={() => {
                setFromDateOpen(false);
              }}
            />
          </TouchableOpacity>
        )}
        {label == AppText.TO && (
          <TouchableOpacity
            style={stylesCommon.inputMainView}
            onPress={() => setToDateOpen(true)}
          >
            <OutlinedTextField
              ref={toFieldRef}
              baseColor={color.APP_PRIMARY}
              style={stylesCommon.textFieldView}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={label}
              height={80}
              multiline={multiline}
              editable={isEnable}
              returnKeyType="done"
              autoFocus={false}
              onChangeText={(date) => setToDate(date)}
            />
            {image != "" ? (
              <View style={stylesCommon.dropdownView}>
                <Image style={stylesCommon.dropImage} source={image}></Image>
              </View>
            ) : null}
            <DatePicker
              modal
              mode="date"
              theme="light"
              open={toDateOpen}
              date={toDate}
              minimumDate={toDate}
              onConfirm={(date) => {
                setToDateOpen(false);
                if (
                  new Date(fromDate) > new Date(date) ||
                  new Date(date) < new Date(fromDate)
                ) {
                  Alert.alert(AppText.ALERT_APP_NAME, AppText.DATE_VALIDATION);
                } else {
                  setToDate(date);
                }
              }}
              onCancel={() => {
                setToDateOpen(false);
              }}
            />
          </TouchableOpacity>
        )}
        {label == AppText.DESCRIPTION && (
          <View style={stylesCommon.inputMainView}>
            <OutlinedTextField
              style={[
                stylesCommon.textFieldView,
                { marginBottom: vh(15), paddingTop: vh(5) },
              ]}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={label}
              height={80}
              multiline={multiline}
              editable={isEnable}
              returnKeyType="done"
              autoFocus={false}
              error={
                !isSaveData &&
                isSaveData != undefined &&
                description.length === 0 &&
                AppText.ENTER_DESCRIPTION
              }
              onChangeText={(text) => setDescription(text)}
            />
            {image != "" ? (
              <View style={stylesCommon.dropdownView}>
                <Image style={stylesCommon.dropImage} source={image}></Image>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  };
  function clearData() {
    setLoaderView(false);
    setDescription("");
    setSaveData();
    setFromDate(new Date());
    setToDate(new Date());
  }
  function saveBtnClick() {
    setSaveData(validation());
    if (validation()) {
      AddLeaveAPI();
    }
  }
  function validation() {
    if (description.length === 0) return false;
    else return true;
  }
  function renderCloseClick() {
    setModalVisible(!modalVisible);
    clearData();
  }
  const AddLeaveModel = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={[styles.centeredView, { height: "100%" }]}>
            <View style={[styles.modalView, { height: "65%" }]}>
              <ModelTitleView
                tiitle={AppText.APPLY_FOR_LEAVE}
                onPressClose={() => renderCloseClick()}
                style={{
                  fontSize: 16,
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: "#1D2939",
                  marginBottom: 15,
                }}
              />
              {/* <ScrollView
                style={{
                  width: "100%",
                }}
                keyboardShouldPersistTaps={"always"}
                keyboardDismissMode={"on-drag"}
              > */}
              <View
                style={{
                  marginBottom: 20,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#D0D5DD",
                    marginBottom: 20,
                  }}
                />
                {InputView(AppText.FROM, false, icon.IC_CALENDAR, false)}
                {InputView(AppText.TO, false, icon.IC_CALENDAR, false)}
                {InputView(AppText.DESCRIPTION, true, "", true)}
              </View>

              {loaderView === true ? (
                <LoaderButtonView />
              ) : (
                <ButtonView
                  tiitle={AppText.SUBMIT}
                  onClick={() => saveBtnClick()}
                />
              )}
              <View style={{ padding: screenWidth / 4 }} />
              {/* </ScrollView> */}
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      {/* Dashboard Header view UI */}
      <SchoolDetailHeaderView
        titile={AppText.DASHBOARD}
        type={"parent"}
        navigation={navigation}
        screen={"ParentAttendance"}
      />
      {modalVisible && AddLeaveModel()}
      <Text
        style={{
          position: "absolute",
          top: 128,
          left: 15,
          zIndex: 10,
          fontFamily: fonts.INTER_SEMIBOLD,
          color: "#1D2939",
          fontSize: 16,
        }}
      >
        Attendance
      </Text>
      {MyTabs()}
      <TouchableOpacity onPress={handleClick}>
        <View
          style={{
            marginStart: 10,
            borderWidth: 1,
            width: "95%",
            height: 50,
            borderRadius: 50,
            borderColor: "#564CB8",
            justifyContent: "center",
            //backgroundColor: color.RED,
            // marginBottom: 33,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: fonts.INTER,
              fontSize: 18,
              color: "#564CB8",
            }}
          >
            Apply Leave
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: "100x%",
    position: "absolute",
    bottom: 0,
    start: 0,
    end: 0,
    marginTop: Platform.OS == "ios" ? -50 : 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    top: 20,
    padding: 20,

    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ParentAttendance;
