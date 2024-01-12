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
  ScrollView,
  Modal,
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import { LoaderButtonView, LoaderView } from "../../commonTheme/LoaderView";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import PercentageBar from "../../commonTheme/PercentageBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
  ModelTitleView,
  ButtonView,
  removeDuplicates,
} from "../../commonTheme/CommonView";
import * as Preference from "../../storeData/Preference";
import { DairyView } from "../common/DairyView";
import { vh, normalize, vw } from "../../Utills/dimesnion";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import MonthPicker from "react-native-month-year-picker";
import { axiosCallAPI } from "../../API/axiosCommonService";
import * as Utills from "../../API/Utills";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import Day from "react-native-calendars/src/calendar/day/basic";
import { OutlinedTextField } from "react-native-material-textfield-plus";

const AttendanceDetailStatus = ({ route, navigation }) => {
  const { studentData } = route.params;

  const monthFieldRef = useRef();
  const [monthText, setMonthText] = useState(new Date());
  const [calOpen, setCalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState("");
  const [selectedColor, setSelectedColor] = useState(color.GREEN);
  const [leavePersentage, setLeavePersentage] = useState("0%");
  const [isfilterDate, setFilterDate] = useState(false);
  const [calendarData, setCalenderData] = useState([]);
  const [leaveDates, setLeaveDates] = useState([]);
  const [untrackedDates, setUntrackedDates] = useState([]);
  const [notSelectedDates, setNotSelectedDates] = useState([]);
  const [presentDates, setPresentDates] = useState([]);
  const [holidayDates, setHolidayDates] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
  const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
  const workout = { key: "workout", color: "green" };

  const PRESENT_DATA = [
    {
      color: "#4CB877",
      titile: "Present",
    },
    {
      color: "#40A0F9",
      titile: "Holiday",
    },
    {
      color: "#FF6F6F",
      titile: "Absent",
    },
    {
      color: "#E9C46A",
      titile: "Leave",
    },
    {
      color: "#FFFFFF",
      titile: "Weekend and Future date",
    },
  ];

  useEffect(() => {
    monthFieldRef?.current?.setValue(moment(monthText).format("MMMM, YYYY"));
    AttendanceDetailAPI();
  }, [monthText]);

  const getDisabledDays = (month, year, daysIndexes) => {
    let pivot = moment().month(month).year(year).startOf("month");
    const end = moment().month(month).year(year).endOf("month");
    let dates = {};
    const disabled = { disabled: true, disableTouchEvent: true };

    while (pivot.isBefore(end)) {
      daysIndexes.forEach((day) => {
        dates[moment(pivot).day(day).format("YYYY-MM-DD")] = disabled;
      });
      pivot.add(7, "days");
    }
    setMarkedDates(dates);
    return dates;
  };

  async function AttendanceDetailAPI() {
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    var URL =
      Utills.ATTENDANCE_LIST_MONTH +
      "?studentId=" +
      studentData.id +
      "&sectionId=" +
      studentData.sectionId +
      "&month_year=" +
      moment(monthText).format("MMMM-YYYY");

    axiosCallAPI("get", URL, "", requestOptions, true, navigation).then(
      (response) => {
        console.log(response);
        if (leaveData !== response.leave_average) {
          setLeaveData(response.leave_average);
          setLeavePersentage(response.leave_average.present);

          if (calendarData != response.attendance_list) {
            setCalenderData(response.attendance_list);
          }

          const selectedDates = {};

          response.attendance_list.map((item) => {
            if (item.attendance == "P") {
              if (!presentDates.includes(item.date))
                presentDates.push(item.date);

              const disabled = {
                disabled: false,
                disableTouchEvent: true,
                selected: true,
                selectedColor: color.P_BR,
              };
              presentDates.forEach((item) => {
                selectedDates[item] = disabled;
              });
            } else if (item.attendance == "H") {
              if (!holidayDates.includes(item.date))
                holidayDates.push(item.date);

              const disabled = {
                disabled: false,
                disableTouchEvent: true,
                selected: true,
                selectedColor: color.A_BR,
              };
              holidayDates.forEach((item) => {
                selectedDates[item] = disabled;
              });
            } else if (item.attendance == "U" || item.attendance == "A") {
              if (!untrackedDates.includes(item.date))
                untrackedDates.push(item.date);

              const disabled = {
                disabled: false,
                disableTouchEvent: true,
                selected: true,
                selectedColor: color.U_BR,
              };
              untrackedDates.forEach((item) => {
                selectedDates[item] = disabled;
              });
            } else if (item.attendance == "L") {
              if (!leaveDates.includes(item.date)) leaveDates.push(item.date);

              const disabled = {
                disabled: false,
                disableTouchEvent: true,
                selected: true,
                selectedColor: color.O_BR,
              };
              leaveDates.forEach((item) => {
                selectedDates[item] = disabled;
              });
            } else if (item.attendance == "") {
              if (!notSelectedDates.includes(item.date))
                notSelectedDates.push(item.date);

              const disabled = {
                disabled: true,
                disableTouchEvent: true,
                selected: false,
                selectedColor: color.WHITE,
              };
              notSelectedDates.forEach((item) => {
                selectedDates[item] = disabled;
              });
            }
          });
          setMarkedDates(selectedDates);
        }
      }
    );
  }
  const showPicker = useCallback((value) => setCalOpen(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || monthText;
      showPicker(false);
      if (event == "dateSetAction") {
        setMonthText(selectedDate);
        setFilterDate(true);
        setMarkedDates({});
        monthFieldRef?.current?.setValue(
          moment(selectedDate).format("MMMM, YYYY")
        );
      }
    },
    [showPicker]
  );
  const InputView = (label, isEnable, image, multiline) => {
    return (
      <View style={{ marginTop: -20, borderRadius: 8 }}>
        <TouchableOpacity
          style={[
            stylesCommon.inputMainView,
            {
              marginTop: 0,
              justifyContent: "center",
            },
          ]}
          onPress={() => setCalOpen(true)}
        >
          <OutlinedTextField
            ref={monthFieldRef}
            style={stylesCommon.searchTextFeild}
            tintColor={color.APP_PRIMARY}
            baseColor={color.APP_PRIMARY}
            selectionColor={color.APP_PRIMARY}
            label={label}
            value={monthText}
            autoFocus={true}
            multiline={false}
            editable={isEnable}
            textColor={color.GREY}
            onChangeText={(date) => setMonthText(date)}
          />
          {/*  inputContainerStyle={{
                        height: 40,
                    }} */}

          {image != "" ? (
            <View style={stylesCommon.dropdownView_new}>
              <Image style={stylesCommon.dropImage} source={image}></Image>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };
  const leaveDataClick = (item) => {
    if (item.titile == "Present") {
      setSelectedColor(item.color);
      setLeavePersentage(leaveData.present);
    } else if (item.titile == "Holiday") {
      setSelectedColor(item.color);
      setLeavePersentage(leaveData.holiday);
    } else if (item.titile == "Absent") {
      setSelectedColor(item.color);
      setLeavePersentage(leaveData.untracked);
    } else if (item.titile == "Leave") {
      setSelectedColor(item.color);
      setLeavePersentage(leaveData.onleave);
    } else if (item.titile == "Weekend and Future date") {
      setSelectedColor(item.color);
      setLeavePersentage(leaveData.weekend);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 50,
          marginStart: vw(-5),
          padding: vw(5),
        }}
        onPress={() => leaveDataClick(item)}
      >
        <View
          style={{
            backgroundColor: item.color,
            height: 10,
            width: 10,
            borderWidth: 0.5,
            borderColor: color.PROGRESS_GREY,
            borderRadius: 10 / 2,
          }}
        />
        <Text
          style={{
            fontFamily: fonts.LATO_REGULAR,
            color: color.TEXT_COLOR,
            fontSize: 12,
            marginVertical: 10,
            marginHorizontal: 5,
            textAlign: "center",
          }}
        >
          {"vedu"}
        </Text>
      </TouchableOpacity>
    );
  };

  const _rendeWeekDays = (weekName, weekOff) => {
    return (
      <View
        style={{
          height: vh(40),
          width: vw(40),
          borderRadius: 10,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "space-around",
          borderColor: "#EEEDF8",
        }}
      >
        <Text
          style={{
            color: weekOff ? "#98A2B3" : color.TEXT_COLOR,
            fontSize: normalize(12),
            fontFamily: fonts.INTER_SEMIBOLD,
          }}
        >
          {weekName}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[stylesCommon.safeAreaStyle]}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            marginTop: 50,
            marginStart: 12,
            marginHorizontal: 10,
          }}
        >
          {InputView(AppText.MONTH, false, icon.IC_CALENDAR, true)}

          <Calendar
            style={{
              borderWidth: 1,
              borderColor: color.PROGRESS_GREY,
              borderRadius: 10,
              //flex: 0.7,
              marginBottom: 20,
              paddingBottom: 15,
              //paddingHorizontal: 10,
              //paddingBottom: 10,
            }}
            hideArrows={true}
            disableArrowRight={true}
            disableArrowLeft={true}
            disableMonthChange={true}
            monthFormat={"MMM"}
            renderHeader={(date) => {
              return (
                <View
                  style={{
                    flexDirection: "column",
                    marginStart: -11,
                    width: "105%",
                    //   backgroundColor: "yellow",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.INTER_SEMIBOLD,

                        fontSize: 14,
                        color: "#1D2939",
                      }}
                    >
                      Calendar
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.INTER_SEMIBOLD,
                        fontSize: 12,
                        color: "#98A2B3",
                      }}
                    >
                      {moment(monthText).format("MMMM")}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      // backgroundColor: "red",
                      justifyContent: "space-around",
                      width: "100%",
                      marginVertical: 10,
                      //  marginStart: 10,
                    }}
                  >
                    {_rendeWeekDays("S", true)}
                    {_rendeWeekDays("M", false)}
                    {_rendeWeekDays("T", false)}
                    {_rendeWeekDays("W", false)}
                    {_rendeWeekDays("T", false)}
                    {_rendeWeekDays("F", false)}
                    {_rendeWeekDays("S", false)}
                  </View>
                </View>
              );
            }}
            hideDayNames={true}
            disabledByDefault={true}
            hideExtraDays={true}
            enableSwipeMonths={false}
            initialDate={moment(monthText).format("YYYY-MM-DD")}
            current={moment(monthText).format("YYYY-MM-DD")}
            disabledDaysIndexes={[7]}
            markedDates={markedDates}
            dayComponent={({ date, state, marking, theme }) => {
              return (
                <View
                  style={{
                    height: vh(40),
                    width: vw(40),
                    borderRadius: vh(10),
                    borderWidth:
                      marking != undefined ? (marking.disabled ? 1 : 0) : 0,
                    //  justifyContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor:
                      marking != undefined
                        ? marking.selectedColor
                        : color.WHITE,
                    borderColor: color.PROGRESS_GREY,
                  }}
                >
                  <Text
                    style={{
                      color:
                        marking != undefined
                          ? marking.disabled
                            ? color.GREY
                            : color.WHITE
                          : color.WHITE,
                      fontSize: normalize(12),
                      // fontWeight: "",
                      fontFamily: fonts.INTER_SEMIBOLD,
                    }}
                  >
                    {date.day}
                  </Text>
                </View>
              );
            }}
            theme={{
              textDayFontFamily: fonts.INTER_SEMIBOLD,
              textMonthFontFamily: fonts.INTER_SEMIBOLD,
              textDayHeaderFontFamily: fonts.INTER_SEMIBOLD,
              textSectionTitleDisabledColor: color.TEXT_COLOR,
              textDayStyle: {
                // height: vh(30),
                // width: vw(30),
                // borderRadius: vh(30) / 2,
                // borderWidth: 1,
                // textAlign: 'center',
                // borderColor: color.PROGRESS_GREY,
                // color: color.TEXT_COLOR,
                // fontSize: normalize(8),
                // fontWeight: '600',
                // bottom: vh(30) / 5,
                // fontFamily: fonts.LATO_REGULAR,
                // paddingTop: vh(30) / 3.5,
              },
              dayTextColor: color.TEXT_COLOR,
              textDisabledColor: color.GREY,
              textDayFontSize: normalize(12),
            }}
          />

          {/* <PercentageBar
            height={15}
            backgroundColor={color.PROGRESS_GREY}
            completedColor={selectedColor}
            percentage={leavePersentage}
          />
          <FlatList
            data={PRESENT_DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          /> */}

          <View>
            <Text
              style={{
                fontFamily: fonts.INTER_SEMIBOLD,
                marginBottom: 5,
                fontSize: 14,
                color: "#1D2939",
              }}
            >
              Statistics
            </Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[stylesCommon.line, { backgroundColor: "#41C183" }]}
                  />
                  <View
                    style={[
                      stylesCommon.dView,
                      {
                        backgroundColor: "#C6F2DD",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <View style={stylesCommon.StatsTextView}>
                      <Text style={stylesCommon.StatsText}>Present</Text>
                      <View
                        style={[
                          stylesCommon.StatsCircle,
                          {
                            backgroundColor: "#48D692",
                          },
                        ]}
                      >
                        <Text style={stylesCommon.StatsCircleText}>26</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[stylesCommon.line, { backgroundColor: "#F85050" }]}
                  />
                  <View
                    style={[
                      stylesCommon.dView,
                      {
                        backgroundColor: "#FEE5E5",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <View style={stylesCommon.StatsTextView}>
                      <Text style={stylesCommon.StatsText}>Absent</Text>
                      <View
                        style={[
                          stylesCommon.StatsCircle,
                          {
                            backgroundColor: "#F85050",
                          },
                        ]}
                      >
                        <Text style={stylesCommon.StatsCircleText}>26</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 30,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[stylesCommon.line, { backgroundColor: "#564CB8" }]}
                  />
                  <View
                    style={[
                      stylesCommon.dView,
                      {
                        backgroundColor: "#E6E4F4",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <View style={stylesCommon.StatsTextView}>
                      <Text style={stylesCommon.StatsText}>Holiday</Text>
                      <View
                        style={[
                          stylesCommon.StatsCircle,
                          {
                            backgroundColor: "#564CB8",
                          },
                        ]}
                      >
                        <Text style={stylesCommon.StatsCircleText}>26</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[stylesCommon.line, { backgroundColor: "#F5A74C" }]}
                  />
                  <View
                    style={[
                      stylesCommon.dView,
                      {
                        backgroundColor: "#FCE4C8",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <View style={stylesCommon.StatsTextView}>
                      <Text style={stylesCommon.StatsText}>Leave</Text>
                      <View
                        style={[
                          stylesCommon.StatsCircle,
                          {
                            backgroundColor: "#F5A74C",
                          },
                        ]}
                      >
                        <Text style={stylesCommon.StatsCircleText}>26</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {calOpen && (
        <View
          style={{
            flex: 1,
            bottom: vh(100),
          }}
        >
          <MonthPicker
            enableAutoDarkMode={false}
            onChange={onValueChange}
            mode={Platform.OS === "ios" ? "full" : "short"}
            value={monthText}
            okButton="Confirm"
            cancelButton="Cancel"
            autoTheme={false}
            locale="en"
          />
        </View>
      )}
      {Object.keys(markedDates).length === 0 && (
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            height: "100%",
            bottom: vh(60),
          }}
        >
          <LoaderView color={color.PROGRESS_GREY} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AttendanceDetailStatus;
