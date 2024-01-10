/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
  button,
} from "react-native";
import stylesCommon from "../commonTheme/stylesCommon";
import { AppText, color, fonts, icon, PreferenceKeys } from "../constant";
import { OutlinedTextField } from "react-native-material-textfield-plus";
import { screenWidth } from "../Utills/dimesnion";

export const PresentSquareView = (props) => {
  // props elements
  // colorTheme - for set color for square
  // textPresent - text for square box
  // value - value for set inside large square

  return (
    <View
      style={{
        backgroundColor: color.WHITE,
        height: 52,
        //width: 56,
        width: screenWidth / 7,
        borderRadius: 5,

        margin: 3,
        borderColor: props.colorTheme,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 14,

          fontFamily: fonts.LATO_BOLD,
          color: color.BLACK,
        }}
      >
        {props.value}
      </Text>
      <Text
        style={{
          fontFamily: fonts.INTER,
          fontSize: screenWidth > 360 ? 10 : 8,
        }}
      >
        {props.textPresent}
      </Text>
    </View>
  );
};

export const DashboardRawDetailMenu = (props) => {
  // type - set type which user login teacher or prent?

  return (
    <View style={stylesCommon.actionView}>
      {/* Parent Dashboard */}

      {props.isShowFees ? (
        <TouchableOpacity
          onPress={props.onPaymentClick}
          style={stylesCommon.itemView}
        >
          <Image
            style={stylesCommon.feesImageView}
            source={icon.IC_FEES}
          ></Image>
        </TouchableOpacity>
      ) : null}

      {/* Teacher and Student Dashboard */}
      {props.isShowTimeTable ? (
        <TouchableOpacity
          style={stylesCommon.itemView}
          onPress={props.onTimeTableClick}
        >
          <Image
            style={stylesCommon.imageView}
            source={icon.IC_TIME_TABLE}
          ></Image>
        </TouchableOpacity>
      ) : null}
      {/* Teacher and Student Dashboard */}
      {props.isShowNote ? (
        <TouchableOpacity
          style={stylesCommon.itemView}
          onPress={props.onNoteClick}
        >
          <Image
            style={stylesCommon.noteImageView}
            source={icon.IC_NOTES}
          ></Image>
        </TouchableOpacity>
      ) : null}

      {props.isShowCalendar ? (
        <TouchableOpacity
          style={stylesCommon.itemView}
          onPress={props.onAttendanceClick}
        >
          <Image
            style={stylesCommon.imageView}
            source={icon.IC_DATE_CAL}
          ></Image>
        </TouchableOpacity>
      ) : null}

      {/* Teacher Dashboard */}

      {/* <TouchableOpacity style={stylesCommon.itemView}>
                <Image style={stylesCommon.imageView}
                    source={icon.IC_TIME_TABLE}>

                </Image>
            </TouchableOpacity>
            <TouchableOpacity style={stylesCommon.itemView}>
                <Image style={stylesCommon.noteImageView}
                    source={icon.IC_NOTES}>

                </Image>
            </TouchableOpacity> */}

      {/* {props.isShowStudent ? (
        <TouchableOpacity
          style={stylesCommon.itemView}
          onPress={props.onStudentAttendanceClick}
        >
          <Image
            style={stylesCommon.studentImageView}
            source={icon.IC_STUDENT}
          ></Image>
        </TouchableOpacity>
      ) : null} */}

      {props.attendance ? (
        <TouchableOpacity
          style={stylesCommon.attendanceView}
          onPress={props.onStudentAttendanceClick}
        >
          <Image
            style={stylesCommon.attendanceImageView}
            source={icon.IC_ATTENDANCE}
          ></Image>

          <Text style={stylesCommon.attendanceText}>Attendance</Text>
        </TouchableOpacity>
      ) : null}
      {props.dairy ? (
        <TouchableOpacity
          style={stylesCommon.dairyView}
          onPress={props.onDairyClick}
        >
          <Image
            style={stylesCommon.dairyImageView}
            source={icon.IC_DAIRY}
          ></Image>
          <Text style={stylesCommon.dairyText}>Dairy</Text>
        </TouchableOpacity>
      ) : null}
      {props.timetable ? (
        <TouchableOpacity
          style={stylesCommon.timetableView}
          onPress={props.ontimeTableClick}
        >
          <Image
            style={stylesCommon.timetableImageView}
            source={icon.IC_TT}
          ></Image>
          <Text style={stylesCommon.timetableText}>Time Table</Text>
        </TouchableOpacity>
      ) : null}

      {props.isShowHelp ? (
        <TouchableOpacity
          style={stylesCommon.itemView}
          onPress={props.onSupportClick}
        >
          <Image style={stylesCommon.imageView} source={icon.IC_HELP}></Image>
          <Text style={stylesCommon.helpText}>Help</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const TitileBackgroundView = (props) => {
  console.log(props.image);
  function addNavigation() {
    // props.navigation.navigate('TeacherAddDairyModel')
  }
  return (
    <View>
      <View
        style={{
          height: 60,
          alignContent: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: fonts.INTER_SEMIBOLD,
            color: color.BLACK,
            alignSelf: "center",
            fontSize: 16,
            marginStart: 20,
          }}
        >
          {props.titile}
        </Text>
        {props.isSecondviewRequired && (
          <TouchableOpacity
            style={{
              position: "absolute",
              alignSelf: "center",
              flexDirection: "row",
              end: -5,
              marginEnd: 20,
            }}
            onPress={props.onSecondViewClick}
          >
            <View
              style={{
                width: 100,
                height: 28,
                borderColor: "#564CB8",
                flex: 1,
                flexDirection: "row",
                borderBlockColor: "#564CB8",
                borderRadius: 50,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.secondViewImage != undefined ||
              props.secondViewImage != "" ? (
                <Image
                  style={{
                    height: 16,
                    width: 16,
                  }}
                  source={props.secondViewImage}
                />
              ) : null}
              {props.tagAddSecond != undefined ? (
                <Text
                  style={{
                    fontFamily: fonts.INTER,
                    color: "#564CB8",
                    alignSelf: "center",
                    fontSize: 13,
                    marginStart: 10,
                  }}
                >
                  {props.tagAddSecond}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "center",
            flexDirection: "row",
            end: 0,
            marginEnd: 20,
          }}
          onPress={props.onClick}
        >
          {props.image != undefined && props.image != "" ? (
            <Image
              style={{
                height: 16,
                width: 16,
                tintColor: "#000000",
              }}
              source={props.image}
            />
          ) : null}
          {props.tagAdd != undefined ? (
            <Text
              style={{
                fontFamily: fonts.LATO_REGULAR,
                color: color.BLACK,
                alignSelf: "center",
                fontSize: 14,
                marginStart: 10,
              }}
            >
              {props.tagAdd}
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
      {props.isShowClass ? (
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#FF6D4C",
            borderRadius: 50,
            borderColor: color.GREY,
            borderWidth: 1,
            //  top: -30,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: Platform.OS === "ios" ? color.LIGHT_GREY : color.BLACK,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 5,
            shadowRadius: 1,
            elevation: 5,
            height: 70,
            width: 70,
            marginTop: 30,
            position: "absolute",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: fonts.LATO_BOLD,
              color: color.WHITE,
              alignItems: "center",
            }}
          >
            {props.class}
          </Text>
          {/* <View
            style={{ width: 30, height: 1, backgroundColor: color.WHITE }}
          ></View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: fonts.LATO_BOLD,
              color: color.WHITE,
            }}
          >
            {}
          </Text> */}
        </View>
      ) : null}
    </View>
  );
};
export const ButtonView = (props) => {
  return (
    <TouchableOpacity
      style={stylesCommon.primaryButtonBackground}
      onPress={props.onClick}
    >
      <Text style={stylesCommon.primaryButtonText}>{props.tiitle}</Text>
    </TouchableOpacity>
  );
};
export const ModelTitleView = (props) => {
  return (
    <View style={stylesCommon.modelTileView}>
      <Text style={stylesCommon.modalText}>{props.tiitle}</Text>
      <TouchableOpacity onPress={props.onPressClose}>
        <Image
          style={stylesCommon.closeImageView}
          source={icon.IC_CANCEL}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};
export const renderEmptyContainer = (titile, singleLine) => {
  if (!singleLine) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 14,
            fontFamily: fonts.LATO_REGULAR,
            color: color.BLACK,
          }}
        >
          {titile}
        </Text>
      </View>
    );
  } else {
    return (
      <Text
        style={{
          textAlign: "center",
          alignSelf: "center",
          fontSize: 14,
          fontFamily: fonts.LATO_REGULAR,
          color: color.BLACK,
        }}
      >
        {titile}
      </Text>
    );
  }
};
export const RenderItemSupport = (props) => {
  return (
    <TouchableOpacity
      style={[
        stylesCommon.rawMainView,
        { justifyContent: "center", borderRadius: 7 },
      ]}
      onPress={() => {
        console.log("NumberDsp...", props.NumberDSP);
        props.onClick(props.NumberDSP);
      }}
    >
      <View
        style={{
          flex: 0.95,
          backgroundColor: color.WHITE,
          borderRadius: 7,
          paddingStart: 15,
          paddingEnd: 15,
          paddingTop: 15,
          paddingBottom: 15,
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: color.DARK_TEXT,
            fontSize: 14,
            fontFamily: fonts.INTER_MEDIUM,

            marginBottom: 2,
          }}
        >
          {"#" + props.NumberDSP}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={icon.IC_EDIT}
            style={{ height: 14, width: 14, marginEnd: 5 }}
          />

          <Text
            style={{
              color: "#564CB8",
              fontSize: 10,
              fontFamily: fonts.INTER_MEDIUM,
              marginEnd: 10,
            }}
          >
            {props.createdName}
          </Text>

          {/* {props.std ? (
            <Text
              style={{
                fontSize: 10,
                fontFamily: fonts.LATO_BOLD,
                color: color.COLOR_PRIMARY,
                marginStart: 5,
              }}
            >
              {props.std}
            </Text>
          ) : null} */}

          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 50,
              backgroundColor: "#98A2B3",
              marginEnd: 10,
            }}
          />

          <Image
            source={icon.IC_CALENDAR}
            style={{ height: 14, width: 14, marginEnd: 5 }}
          />

          <Text
            style={{
              color: "#667085",
              fontSize: 10,
              fontFamily: fonts.INTER,
            }}
          >
            {props.date}
          </Text>
        </View>

        <Text
          style={{
            color: "#667085",
            fontFamily: fonts.INTER,
            marginTop: 10,
            fontSize: 12,
            marginEnd: 20,
          }}
        >
          {props.supportDiscription}
        </Text>
      </View>

      <Image
        style={{
          height: 16,
          width: 10,
          resizeMode: "contain",
          marginEnd: 20,
          alignSelf: "baseline",
          end: 0,
          position: "absolute",
        }}
        source={icon.IC_SIDE_ARROW}
      ></Image>
    </TouchableOpacity>
  );
};

export const removeHTML = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString().replace(/&nbsp;/g, "");
  return str.replace(/(<([^>]+)>)/gi, "");
};
export function removeDuplicates(originalArray, prop) {
  var removeDuplicatesArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    removeDuplicatesArray.push(lookupObject[i]);
  }

  return removeDuplicatesArray;
}
