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
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import {
  AppText,
  color,
  fonts,
  icon,
  PreferenceKeys,
  RECEIVER_TYPE,
} from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
  RenderItemSupport,
} from "../../commonTheme/CommonView";
import { normalize, screenHeight, vh, vw } from "../../Utills/dimesnion";
import SelectDropdown from "react-native-select-dropdown";
import { OutlinedTextField } from "react-native-material-textfield-plus";
import { LoaderButtonView } from "../../commonTheme/LoaderView";
import { ButtonView } from "../../commonTheme/CommonView";
import * as Preference from "../../storeData/Preference";
import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
const AddNewRequest = ({ navigation }) => {
  const [loaderView, setLoaderView] = useState(false);
  const [receiverId, setReceiverID] = useState(-1);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
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

  async function AddNewSupport(ID, sectionId, classId) {
    // const params ={
    //   studentId: ID,
    //   receiverType : receiverId,
    //   message: msg
    // }

    var params = new FormData();
    params.append("studentId", ID);
    params.append("receiverType", receiverId);
    params.append("message", msg);
    params.append("sectionId", sectionId);
    params.append("classId", classId);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
    console.log(params);
    axiosCallAPI(
      "post",
      Utills.ADD_SUPPORT_DATA,
      params,
      requestOptions,
      true,
      navigation
    )
      // axiosCallAPI('get', Utills.GET_SUPPORT_DATA, p.toString(), requestOptions, true, props.navigation)
      .then((response) => {
        navigation.goBack();
      })
      .catch((error) => {
        setLoaderView(false);
      });
  }
  const InputView = (label, isEnable, image, multiline) => {
    return (
      <View>
        {label == AppText.FROM && (
          <TouchableOpacity
            style={stylesCommon.inputMainView}
            onPress={() => {}}
          >
            {/* <OutlinedTextField

                            baseColor={color.APP_PRIMARY}
                            style={stylesCommon.textFieldView}
                            tintColor={color.APP_PRIMARY}
                            selectionColor={color.APP_PRIMARY}
                            label={'Select'}
                            height={80}
                            multiline={multiline}
                            editable={isEnable}
                            returnKeyType='done'
                            autoFocus={false}
                        /> */}
            {image != "" ? (
              <View>
                <SelectDropdown
                  // data={AppText.WEEKDAYS}
                  data={RECEIVER_TYPE}
                  onSelect={(selectedItem, index) => {
                    //  setValue(selectedItem)
                    //console.log(selectedItem+", "+index);
                    setReceiverID(index + 1);
                  }}
                  defaultButtonText={"Select"}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdownBtnStyle}
                  buttonTextStyle={styles.dropdownBtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <View style={styles.arrowView}>
                        <Image
                          style={stylesCommon.dropImage}
                          source={image}
                        ></Image>
                      </View>
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdownStyle}
                  rowStyle={styles.dropdownRowStyle}
                  rowTextStyle={styles.dropdownRowTxtStyle}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        )}
        {label == AppText.TO && (
          <TouchableOpacity
            style={stylesCommon.inputMainView}
            onPress={() => {}}
          >
            <OutlinedTextField
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
                {
                  marginBottom: vh(15),
                  paddingTop: vh(5),
                  fontSize: normalize(14),
                },
              ]}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={"Message"}
              height={80}
              multiline={multiline}
              editable={isEnable}
              returnKeyType="done"
              autoFocus={false}
              // error={(!isSaveData && isSaveData != undefined) && description.length === 0 && AppText.ENTER_DESCRIPTION}
              onChangeText={(text) => {
                // setDescription(text)
                setMsg(text);
              }}
              value={msg}
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
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: color.APP_PRIMARY }} />
      <SafeAreaView style={stylesCommon.safeAreaStyle}>
        <StatusBar backgroundColor={color.APP_PRIMARY} />
        <SchoolDetailHeaderView
          titile={AppText.DASHBOARD}
          type={"parent"}
          navigation={navigation}
          screen={"ParentSupport"}
        />
        <View
          style={{
            padding: 10,
            flexDirection: "column",
            marginTop: Platform.OS === "ios" ? -0 : 0,
          }}
        >
          <TitileBackgroundView titile={"Support"} />
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#D0D5DD",
              marginHorizontal: 15,
            }}
          />
          <View style={{ padding: 15 }}>
            {InputView(AppText.FROM, false, icon.IC_DOWN_ARROW, false)}
            {InputView(AppText.DESCRIPTION, true, "", true)}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#CBC8E9",
                  borderRadius: 50,
                  flex: 1,
                  padding: 15,
                  marginEnd: 10,
                  alignSelf: "center",
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={stylesCommon.primaryButtonText}>{"Cancel"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FF6D4C",
                  borderRadius: 50,
                  flex: 1,
                  padding: 15,
                  marginStart: 10,
                  alignSelf: "center",
                }}
                onPress={() => {
                  if (receiverId < 0) {
                    Alert.alert(
                      AppText.ALERT_APP_NAME,
                      "Please select option before submit."
                    );
                  } else if (msg === "") {
                    Alert.alert(
                      AppText.ALERT_APP_NAME,
                      "Please enter message before submit."
                    );
                  } else {
                    Preference.GetData(PreferenceKeys.STUDENT_DETAIL).then(
                      (student_details) => {
                        const StudentID = JSON.parse(student_details).id;
                        const sectionId = JSON.parse(student_details).sectionId;
                        const classId = JSON.parse(student_details).classId;
                        AddNewSupport(StudentID, sectionId, classId);
                      }
                    );
                  }
                }}
              >
                <Text style={stylesCommon.primaryButtonText}>{"Submit"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  // drop down

  dropdownBtnStyle: {
    width: "100%",
    height: vh(50),
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: vh(15),
    backgroundColor: color.WHITE,
    borderColor: color.APP_PRIMARY,
  },
  dropdownBtnTxtStyle: {
    textAlign: "left",
    fontSize: normalize(14),
    color: color.DARK_TEXT,
    fontFamily: fonts.LATO_BOLD,
  },
  dropdownStyle: {
    backgroundColor: color.WHITE,
  },
  arrowView: {
    resizeMode: "contain",
    height: "100%",
    paddingEnd: 15,
    justifyContent: "center",
  },
  dropdownRowStyle: { backgroundColor: color.WHITE, borderBottomWidth: 0 },
  dropdownRowTxtStyle: {
    color: color.DARK_TEXT,
    textAlign: "left",
    fontFamily: fonts.LATO_REGULAR,
    paddingHorizontal: vw(10),
  },
});
export default AddNewRequest;
