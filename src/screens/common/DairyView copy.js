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
  Alert,
  Modal,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon, { SCREEN_WIDTH } from "../../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {
  LoaderButtonView,
  LoaderViewWithBackground,
} from "../../commonTheme/LoaderView";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  renderEmptyContainer,
  TitileBackgroundView,
  ModelTitleView,
  ButtonView,
} from "../../commonTheme/CommonView";
import * as Preference from "../../storeData/Preference";
import DatePicker from "react-native-date-picker";
import { normalize, screenHeight, vh, vw } from "../../Utills/dimesnion";
import { axiosCallAPI } from "../../API/axiosCommonService";
import * as Utills from "../../API/Utills";
import moment from "moment";
import { OutlinedTextField } from "react-native-material-textfield-plus";

export const DairyView = (props) => {
  const fieldRef = useRef();
  const effectiveFieldRef = useRef();
  const dueFieldRef = useRef();
  const subjectRef = useRef();
  const descriptionRef = useRef();
  const [toolTipVisible, setTooltip] = useState(false);
  const [selectedTopIndex, setTopIndex] = useState();
  const [selectedIndex, setIndex] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isfilterDate, setFilterDate] = useState(false);
  const [dateList, setDateList] = useState([]);
  const [loaderView, setLoaderView] = useState(false);
  const [screenLoaderView, setScreenLoaderView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateOpen, setEffectiveDateOpen] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isSaveData, setSaveData] = useState();
  const [isNoteType, setISNoteType] = useState(-1);
  const [isSubject, setISSubject] = useState(-1);
  const [dairyID, setDairyID] = useState(0);
  const [noteTypeID, setNoteTypeID] = useState("");
  const [noteTypeSelected, setNoteTypeSelected] = useState("");
  const [noteType, setNoteType] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectSelected, setSubjectSelected] = useState("");
  const [subjectSelectedName, setSubjectSelectedName] = useState("");
  const [effectiveDateTEXT, setEffectiveDateTEXT] = useState(
    AppText.EFFECTIVE_DATE
  );
  const [dueDateTEXT, setDueDateTEXT] = useState(AppText.DUE_DATE);

  useEffect(() => {
    TeacherDiaryAPI("");

    if (props.dairyType === "teacher") {
      NoteTypeListAPI();
      GetSubjectList();
    }

    fieldRef?.current?.setValue(moment(date).format("DD/MM/YYYY"));
    effectiveFieldRef?.current?.setValue(
      moment(effectiveDate).format("DD/MM/YYYY")
    );
    dueFieldRef?.current?.setValue(moment(dueDate).format("DD/MM/YYYY"));
    descriptionRef?.current?.setValue(description);

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [isfilterDate ? null : date, effectiveDate, dueDate, description]);
  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }
  async function NoteTypeListAPI() {
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "get",
      Utills.NOTE_TYPE_LIST,
      "",
      requestOptions,
      true,
      props.navigation
    ).then((response) => {
      if (JSON.stringify(noteType) !== JSON.stringify(response.result))
        setNoteType(response.result);
    });
  }

  async function GetSubjectList() {
    let loginFormData = new FormData();
    loginFormData.append("classId", props.classID);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
    axiosCallAPI(
      "post",
      Utills.SUBJECT_LIST,
      loginFormData,
      requestOptions,
      true,
      props.navigation
    ).then((response) => {
      // var subjectarray = [];
      // response.map((item) =>{
      //       subjectarray.push(item.subjectName);
      // });
      setSubjectList(response);
      // if (JSON.stringify(noteType) !== JSON.stringify(response.result))

      //     setNoteType(response.result)
    });
  }

  async function DeleteDairyAPI(dairyDeleteID) {
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    axiosCallAPI(
      "get",
      Utills.TEACHER_DELETE_DIARY + "?id=" + dairyDeleteID,
      "",
      requestOptions,
      true,
      props.navigation
    ).then((response) => {
      if (response !== undefined) {
      }
    });
  }
  async function TeacherDiaryAPI(selectedDate) {
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };

    if (selectedDate != "")
      var dairyListURL =
        Utills.TEACHER_DIARY_LIST +
        "?sectionId=" +
        props.sectionId +
        "&search=" +
        moment(selectedDate).format("YYYY-MM-DD");
    else
      var dairyListURL =
        Utills.TEACHER_DIARY_LIST + "?sectionId=" + props.sectionId;

    console.log("dairyListURL >>" + dairyListURL);
    axiosCallAPI(
      "get",
      dairyListURL,
      "",
      requestOptions,
      true,
      props.navigation
    )
      .then((response) => {
        if (response !== undefined) {
          setScreenLoaderView(false);
          if (JSON.stringify(dateList) != JSON.stringify(response.result))
            setDateList(response.result);
        } else {
          setScreenLoaderView(false);
        }
      })
      .catch((error) => {
        setScreenLoaderView(false);
      });
  }
  const handleClick = (index, mainIndex) => {
    setIndex(index);
    setTopIndex(mainIndex);
    setTooltip(true);
  };
  const renderItem = ({ item, index }) => {
    var mainIndex = index;
    return (
      <View
        style={
          {
            // flex: 1
          }
        }
      >
        <Text
          style={{
            fontFamily: fonts.LATO_REGULAR,
            color: color.WHITE,
            backgroundColor: color.GREY,
            paddingTop: 5,
            paddingBottom: 5,
            paddingStart: 20,
            paddingEnd: 20,
            borderRadius: 12,
            fontSize: normalize(14),
            overflow: "hidden",
            margin: 10,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          {item.date}
        </Text>

        <FlatList
          data={item.records}
          // renderItem={renderItemChild}
          renderItem={({ item, index }) =>
            renderItemChild(item, index, mainIndex)
          }
        />
      </View>
    );
  };
  function clearData() {
    setLoaderView(false);
    setSubject("");
    setDescription("");
    setNoteTypeID("");
    setSaveData();
    setEffectiveDate(new Date());
    setDueDate(new Date());
    setNoteTypeSelected("");
    setSubjectSelected("");
    setSubjectSelectedName("");
    setEffectiveDateTEXT(AppText.EFFECTIVE_DATE);
    setDueDateTEXT(AppText.DUE_DATE);
    setISNoteType(-1);
    setISSubject(-1);
  }
  function saveBtnClick() {
    setSaveData(validation());
    if (validation()) {
      AddDiaryAPI();
    }
  }
  function validation() {
    if (
      noteTypeSelected === "" &&
      noteTypeID === "" &&
      subjectSelectedName.length === 0
    ) {
      // Alert.alert(AppText.ALERT_APP_NAME, 'Please select note type')
      setISNoteType(0);
      setISSubject(0);
      return false;
    }
    if (noteTypeSelected === "" && noteTypeID === "") {
      // Alert.alert(AppText.ALERT_APP_NAME, 'Please select note type')
      setISNoteType(0);
      return false;
    }
    if (subjectSelectedName.length == 0) {
      setISSubject(0);
      return false;
    }
    if (description.length == 0) return false;
    else if (noteType.length == 0) {
      // Alert.alert(AppText.ALERT_APP_NAME, 'Note type not found!')
      return false;
    } else return true;
  }
  function renderCloseClick() {
    setModalVisible(!modalVisible);
    clearData();
  }
  const EditDairyClick = (item) => {
    console.log("Item>>" + JSON.stringify(item));

    effectiveFieldRef?.current?.setValue(
      moment(new Date(item.effectiveDate)).format("DD/MM/YYYY")
    );
    dueFieldRef?.current?.setValue(
      moment(new Date(item.dueDate)).format("DD/MM/YYYY")
    );
    subjectRef?.current?.setValue(item.subject);
    descriptionRef?.current?.setValue(item.description);

    setTooltip(false);
    setModalVisible(true);
    setDairyID(item.id);
    setNoteTypeID(item.noteType);
    setSubject(item.subject);
    setDescription(item.description);
    setEffectiveDate(new Date(item.effectiveDate));
    setDueDate(new Date(item.dueDate));

    if (item.noteType !== "0") {
      noteType.map((noteTypeItem) => {
        if (item.noteType === noteTypeItem.id)
          setNoteTypeSelected(noteTypeItem.title);
      });
    } else {
      setNoteTypeSelected("");
    }
    if (item.subject !== "0") {
      subjectList.map((subjectItem) => {
        console.log("Subject>>" + JSON.stringify(subjectItem));
        if (item.subject === subjectItem.subjectId) {
          console.log(item.subject);
          setSubjectSelected(subjectItem.subjectName);
          setSubjectSelectedName(subjectItem.subjectId);
        }
      });
    } else {
      setSubjectSelected("");
      setSubjectSelectedName("");
    }
  };
  const DeleteDairyClick = (Id) => {
    setTooltip(false);
    DeleteDairyAPI(Id);
  };
  async function AddDiaryAPI() {
    setLoaderView(true);
    let loginFormData = new FormData();
    loginFormData.append("id", dairyID);
    loginFormData.append("sectionId", props.sectionId);
    loginFormData.append("noteType", noteTypeID);
    loginFormData.append(
      "effectiveDate",
      moment(effectiveDate).format("YYYY-MM-DD")
    );
    //loginFormData.append("subject", subjectSelected)
    loginFormData.append("subject", subjectSelectedName);
    loginFormData.append("description", description);
    loginFormData.append("dueDate", moment(dueDate).format("YYYY-MM-DD"));

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
    console.log(loginFormData);
    axiosCallAPI(
      "post",
      Utills.TEACHER_SAVE_DIARY,
      loginFormData,
      requestOptions,
      true,
      props.navigation
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
  const InputView = (label, isEnable, image, multiline) => {
    return (
      <View>
        {label == AppText.NOTE_TYPE && (
          <View style={stylesCommon.inputMainView}>
            <SelectDropdown
              data={noteType}
              onSelect={(selectedItem, index) => {
                setISNoteType(-1);
                setNoteTypeID(selectedItem.id);
              }}
              defaultButtonText={
                noteTypeSelected === "" ? "Select note type" : noteTypeSelected
              }
              //    defaultButtonText={'Select note type'}
              // defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={
                isNoteType != 0
                  ? styles.dropdownBtnStyle
                  : styles.dropdownBtnStyle_error
              }
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
            {isNoteType == 0 && (
              <Text
                style={{
                  color: "#D50000",
                  fontSize: 12,
                  marginTop: -10,
                  marginStart: 10,
                }}
              >
                Please select note type
              </Text>
            )}
          </View>
        )}
        {label == AppText.SUBJECT && (
          <View style={stylesCommon.inputMainView}>
            <SelectDropdown
              data={subjectList}
              onSelect={(selectedItem, index) => {
                // setNoteTypeID(selectedItem.id)
                setISSubject(-1);
                console.log(selectedItem.subjectId);
                setSubjectSelectedName(selectedItem.subjectId);
              }}
              defaultButtonText={
                subjectSelected === "" ? "Select Subject" : subjectSelected
              }
              //    defaultButtonText={'Select note type'}
              // defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.subjectName;
              }}
              rowTextForSelection={(item, index) => {
                return item.subjectName;
              }}
              buttonStyle={
                isSubject != 0
                  ? styles.dropdownBtnStyle
                  : styles.dropdownBtnStyle_error
              }
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
            {isSubject == 0 && (
              <Text
                style={{
                  color: "#D50000",
                  fontSize: 12,
                  marginTop: -10,
                  marginStart: 10,
                }}
              >
                Please select subject
              </Text>
            )}
          </View>
        )}
        {label == AppText.EFFECTIVE_DATE && (
          <TouchableOpacity
            style={stylesCommon.inputMainView}
            onPress={() => setEffectiveDateOpen(true)}
          >
            <OutlinedTextField
              ref={effectiveFieldRef}
              baseColor={color.APP_PRIMARY}
              style={stylesCommon.textFieldView}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={effectiveDateTEXT}
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
              open={effectiveDateOpen}
              date={effectiveDate}
              onConfirm={(date) => {
                setEffectiveDateOpen(false);
                setEffectiveDate(date);
                setDueDate(date);
                setEffectiveDateTEXT(moment(date).format("YYYY-MM-DD"));
              }}
              onCancel={() => {
                setEffectiveDateOpen(false);
              }}
            />
          </TouchableOpacity>
        )}
        {/* {
                    (label == AppText.SUBJECT) &&
                    <View style={stylesCommon.inputMainView}>
                        <OutlinedTextField
                            ref={subjectRef}
                            style={stylesCommon.textFieldView}
                            tintColor={color.APP_PRIMARY}
                            selectionColor={color.APP_PRIMARY}
                            label={label}
                            height={80}
                            multiline={multiline}
                            editable={isEnable}
                            returnKeyType='done'
                            autoFocus={false}
                            error={(!isSaveData && isSaveData != undefined) && subject.length === 0 && AppText.ENTER_SUBJECT}
                            onChangeText={(text) => setSubject(text)}
                        />
                        {
                            (image != '') ?
                                <View style={stylesCommon.dropdownView}>
                                    <Image style={stylesCommon.dropImage}
                                        source={image}>
                                    </Image>
                                </View> : null
                        }

                    </View>
                } */}
        {label == AppText.DESCRIPTION && (
          <View style={stylesCommon.inputMainView}>
            <OutlinedTextField
              ref={descriptionRef}
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
              keyboardShouldPersistTaps={"always"}
              keyboardDismissMode={"on-drag"}
              returnKeyType="return"
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
        {label == AppText.DUE_DATE && (
          <TouchableOpacity
            style={stylesCommon.inputMainView}
            onPress={() => setDueDateOpen(true)}
          >
            <OutlinedTextField
              ref={dueFieldRef}
              style={stylesCommon.textFieldView}
              baseColor={color.APP_PRIMARY}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={dueDateTEXT}
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
              open={dueDateOpen}
              date={dueDate}
              onConfirm={(date) => {
                setDueDateOpen(false);
                if (effectiveDate < date) {
                  setDueDate(date);
                  setDueDateTEXT(moment(date).format("YYYY-MM-DD"));
                } else {
                  Alert.alert(
                    AppText.ALERT_APP_NAME,
                    "Due date should be greater than the effective date"
                  );
                }
              }}
              onCancel={() => {
                setDueDateOpen(false);
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const TeacherAddDairyModel = () => {
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
          <View style={styles.centeredView}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={"on-drag"}
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.modalView}>
                <ModelTitleView
                  tiitle={
                    dairyID === 0 ? AppText.ADD_DIARY : AppText.EDIT_DIARY
                  }
                  onPressClose={() => renderCloseClick()}
                />
                <View
                  style={{
                    marginBottom: 20,
                    width: "100%",
                  }}
                >
                  {InputView(
                    AppText.NOTE_TYPE,
                    false,
                    icon.IC_DOWN_ARROW,
                    false
                  )}
                  {InputView(
                    AppText.EFFECTIVE_DATE,
                    false,
                    icon.IC_CALENDAR,
                    false
                  )}
                  {/* {InputView(AppText.SUBJECT, true, '', false)} */}
                  {InputView(AppText.SUBJECT, false, icon.IC_DOWN_ARROW, false)}
                  {InputView(AppText.DESCRIPTION, true, "", true)}
                  {InputView(AppText.DUE_DATE, false, icon.IC_CALENDAR, false)}
                </View>

                {loaderView === true ? (
                  <LoaderButtonView />
                ) : (
                  <ButtonView
                    tiitle={AppText.SUBMIT}
                    onClick={() => saveBtnClick()}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };
  const renderItemChild = (item, index, mainIndex) => {
    const styles = StyleSheet.create({
      diaryRowView: {
        backgroundColor: color.COLOR_SECONDARY,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
      },
    });
    return (
      <View>
        {props.dairyType == "teacher" ? (
          selectedTopIndex == mainIndex && selectedIndex == index ? (
            <Tooltip
              isVisible={toolTipVisible}
              content={
                <View style={stylesCommon.tooltipContent}>
                  <TouchableOpacity onPress={() => EditDairyClick(item)}>
                    <Text style={stylesCommon.tooltipText}>{AppText.EDIT}</Text>
                  </TouchableOpacity>
                  <View style={stylesCommon.tooltipSepretor} />
                  <TouchableOpacity onPress={() => DeleteDairyClick(item.id)}>
                    <Text style={stylesCommon.tooltipText}>
                      {AppText.DELETE}
                    </Text>
                  </TouchableOpacity>
                </View>
              }
              placement="top"
              contentStyle={{
                backgroundColor: color.BLACK,
              }}
              onClose={() => setTooltip(false)}
              arrowStyle={{ width: 40 }}
            >
              <TouchableOpacity
                style={[styles.diaryRowView, { width: "100%" }]}
                onPress={() => handleClick(index, mainIndex)}
              >
                <Text style={stylesCommon.diaryRowTitle}>
                  {item.subjectName}
                </Text>
                <Text style={stylesCommon.diaryRowDescription}>
                  {item.description}
                </Text>
                <Text style={stylesCommon.diaryTimeView}>{item.dueDate}</Text>
              </TouchableOpacity>
            </Tooltip>
          ) : (
            <TouchableOpacity
              style={styles.diaryRowView}
              onPress={() => handleClick(index, mainIndex)}
            >
              <Text style={stylesCommon.diaryRowTitle}>{item.subjectName}</Text>
              <Text style={stylesCommon.diaryRowDescription}>
                {item.description}
              </Text>
              <Text style={stylesCommon.diaryTimeView}>{item.dueDate}</Text>
            </TouchableOpacity>
          )
        ) : (
          <View style={styles.diaryRowView}>
            {/* <Text style={stylesCommon.diaryRowTitle}>{item.titile}</Text> */}
            <Text style={stylesCommon.diaryRowTitle}>{item.subjectName}</Text>
            <Text style={stylesCommon.diaryRowDescription}>
              {item.description}
            </Text>
            <Text style={stylesCommon.diaryTimeView}>{item.dueDate}</Text>
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

        {/* Dashboard Header view UI */}
        <SchoolDetailHeaderView
          titile={AppText.DASHBOARD}
          type={props.dairyType}
          navigation={props.navigation}
          screen={"DairyView"}
        />
        <View
          style={{
            flex: 1,
            marginTop: Platform.OS === "ios" ? -50 : 0,
          }}
        >
          <TitileBackgroundView
            titile={"Diary"}
            navigation={props.navigation}
            image={props.image}
            secondViewImage={props.secondViewImage}
            isSecondviewRequired={props.isSecondviewRequired}
            tagAdd={props.tagAdd}
            tagAddSecond={props.tagAddSecond}
            class={props.class}
            onSecondViewClick={() => {
              if (props.dairyType === "teacher") {
                setNoteTypeSelected("");
                setNoteTypeID("");
                setDairyID(0);
                setModalVisible(true);
                effectiveFieldRef?.current?.setValue(
                  moment(new Date()).format("DD/MM/YYYY")
                );
                dueFieldRef?.current?.setValue(
                  moment(new Date()).format("DD/MM/YYYY")
                );
              }
            }}
            onClick={() => {
              TeacherDiaryAPI("");
              fieldRef?.current?.setValue("");
              setScreenLoaderView(true);
              setFilterDate(false);
            }}
            isShowClass={props.isShowClass}
          />
          {/* <View style={{
                    padding: 15,
                   
                }}> */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              paddingStart: 15,
              paddingEnd: 15,
              //marginTop: (props.dairyType === 'teacher') ? - 25 : 5,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                width: "85%",
              }}
              onPress={() => setOpen(true)}
            >
              <OutlinedTextField
                ref={!isfilterDate ? null : fieldRef}
                tintColor={color.APP_PRIMARY}
                baseColor={color.APP_PRIMARY}
                selectionColor={color.APP_PRIMARY}
                label={AppText.DATE}
                maxLength={10}
                disabled={false}
                autoFocus={true}
                editable={false}
                style={{
                  fontSize: 16,
                  fontFamily: fonts.LATO_BOLD,
                }}
                onChangeText={(text) => setDate(text)}
              />
              <Image
                style={{
                  width: 15,
                  height: 16,
                  end: 0,
                  marginEnd: 20,
                  alignContent: "center",
                  position: "absolute",
                }}
                source={icon.IC_CALENDAR}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginStart: 10,
                top: -2,
              }}
              onPress={() => {
                setDate(new Date());
                TeacherDiaryAPI(new Date());
                setFilterDate(true);
                fieldRef?.current?.setValue(
                  moment(new Date()).format("DD/MM/YYYY")
                );
              }}
            >
              <Text
                style={{
                  color: color.INFO_BLUE,
                  alignSelf: "center",
                  fontSize: 16,
                  fontFamily: fonts.LATO_BOLD,
                }}
              >
                {"Today"}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            theme="light"
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              setFilterDate(true);
              TeacherDiaryAPI(date);
              fieldRef?.current?.setValue(moment(date).format("DD/MM/YYYY"));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <FlatList
            style={{ paddingStart: 15, paddingEnd: 15 }}
            data={dateList}
            scrollEnabled={true}
            //contentContainerStyle={{ minHeight: '100%' }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyContainer("No data found", false)}
          />

          {/* </View>    */}
          {modalVisible && TeacherAddDairyModel()}
          {screenLoaderView && (
            <View style={styles.screenLoader}>
              <LoaderViewWithBackground color={color.WHITE} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: "100%",
    position: "absolute",
    // bottom: 0,
    paddingTop: vh(screenHeight / 10),
    start: 0,
    end: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignSelf: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    padding: 20,
    height: "100%",
    width: "90%",
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
  // drop down
  dropdownBtnStyle: {
    width: "100%",
    height: vh(50),
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: vh(15),
    backgroundColor: color.WHITE,
    borderColor: color.GREY,
  },
  // drop down error
  dropdownBtnStyle_error: {
    width: "100%",
    height: vh(50),
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: vh(15),
    backgroundColor: color.WHITE,
    borderColor: "#D50000",
  },
  dropdownBtnTxtStyle: {
    textAlign: "left",
    fontSize: 20,
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
  screenLoader: {
    position: "absolute",
    alignSelf: "center",
    marginTop: vh(SCREEN_WIDTH / 2.5),
  },
  dropdownRowStyle: { backgroundColor: color.WHITE, borderBottomWidth: 0 },
  dropdownRowTxtStyle: {
    color: color.DARK_TEXT,
    textAlign: "left",
    fontFamily: fonts.LATO_REGULAR,
    paddingHorizontal: vw(10),
  },
});
