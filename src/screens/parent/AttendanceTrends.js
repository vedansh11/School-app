/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useCallback, useState, useRef } from "react";
import { SafeAreaView, View, Text, StatusBar, StyleSheet } from "react-native";
import { color, fonts, PreferenceKeys } from "../../constant";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../commonTheme/stylesCommon";
import ProgressCircle from "react-native-progress-circle";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import { axiosCallAPI } from "../../API/axiosCommonService";
import * as Utills from "../../API/Utills";
import * as Preference from "../../storeData/Preference";
import { useEffect } from "react";
import { BackHandler } from "react-native";

const AttendanceTrends = ({ route, navigation }) => {
  const { studentData } = route.params;
  const isFocused = useIsFocused();
  const [prevMonth, setPrevMonth] = useState("0%");
  const [prevYear, setPrevYear] = useState("0%");
  const progressRefMonth = useRef<ProgressRef>(null);
  const progressRefYear = useRef<ProgressRef>(null);

  useEffect(() => {
    PresentCountAPI();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (progressRefMonth.current && progressRefYear.current) {
        progressRefMonth.current.reAnimate();
        progressRefYear.current.reAnimate();
      }
    }, [progressRefMonth.current, progressRefYear.current])
  );

  async function PresentCountAPI() {
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "get",
      Utills.ATTENDANCE_PRESENT_COUNT +
        "?studentId=" +
        studentData.id +
        "&sectionId=" +
        studentData.sectionId,
      "",
      requestOptions,
      true,
      navigation
    ).then((response) => {
      setPrevMonth(response.previou_month);
      setPrevYear(response.year_to_date);
    });
  }

  const AttendanceProgress = (
    text,
    progress,
    progressColor,
    activeStrokeColor,
    progressRef
  ) => {
    return (
      <View style={styles.mainView}>
        <Text style={styles.textStyle}>{text}</Text>

        {/* <ProgressCircle
          percent={parseFloat(progress)}
          outerCircleStyle={{ borderRadius: 20 }}
          containerStyle={{ borderRadius: 10 }}
          radius={50}
          borderWidth={10}
          color={progressColor}
          shadowColor={"#EEEDF8"}
          bgColor={color.WHITE}
        > */}
        <CircularProgress
          ref={progressRef}
          value={progress}
          valueSuffix="%"
          radius={60}
          duration={2000}
          activeStrokeWidth={15}
          progressValueColor={"#101828"}
          progressValueStyle={{
            fontFamily: fonts.INTER_SEMIBOLD,
            fontSize: 24,
          }}
          activeStrokeColor={progressColor}
          inActiveStrokeColor={activeStrokeColor}
          inActiveStrokeOpacity={0.2}
          //progressValueColor={"#fff"}
          //   valueSuffix={"%"}
        >
          <Text style={styles.percentageText}>{progress}</Text>
        </CircularProgress>
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />
      <View style={styles.container}>
        {AttendanceProgress(
          "Previous Month",
          50,
          "#F5A74C",
          "#F5A74C",
          progressRefMonth
        )}
        {AttendanceProgress(
          "Year to Date",
          70,
          "#564CB8",
          "#E6E4F4",
          progressRefYear
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainView: {
    backgroundColor: color.WHITE,
    borderRadius: 15,
    alignItems: "center",
    //shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 1,
    height: SCREEN_HEIGHT / 4,
    width: SCREEN_WIDTH / 2.3,
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: 14,
    fontFamily: fonts.INTER_MEDIUM,

    marginBottom: -20,
    color: "#475467",
  },
  percentageText: {
    fontSize: 24,
    fontFamily: fonts.INTER_SEMIBOLD,
    color: "#101828",
  },
});

export default AttendanceTrends;
