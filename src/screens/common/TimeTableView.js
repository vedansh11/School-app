/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import {
  normalize,
  screenHeight,
  screenWidth,
  vh,
  vw,
} from "../../Utills/dimesnion";
import { AppText, color, icon, fonts, PreferenceKeys } from "../../constant";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../commonTheme/stylesCommon";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  TitileBackgroundView,
  renderEmptyContainer,
  removeHTML,
  ButtonView,
  ModelTitleView,
} from "../../commonTheme/CommonView";
import { useCallback } from "react";
import { AlertMesaage } from "../../constant/methods";
import * as Preference from "../../storeData/Preference";
import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
import {
  LoaderViewWithBackground,
  LoaderButtonView,
} from "../../commonTheme/LoaderView";
import SelectDropdown from "react-native-select-dropdown";
import DatePicker from "react-native-date-picker";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import moment from "moment";
import { OutlinedTextField } from "react-native-material-textfield-plus";
import { apiSimple } from "../../API/api";

const { width, height } = Dimensions.get("window");

const ITEM_SIZE = 35;

export function TimeTableView(props) {
  const today = new Date();
  const flatListRef = useRef();
  const startFieldRef = useRef();
  const endFieldRef = useRef();
  const subjectRef = useRef();
  const topicRef = useRef();
  const richText = React.useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isEditTopic, setEditTopic] = useState(false);
  const [isEditTopicEmpty, setEditTopicEmpty] = useState(false);
  const [loaderView, setLoaderView] = useState(false);
  const [deleteloaderView, setDeleteLoaderView] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [topicHTML, setTopicHTML] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [isSaveData, setSaveData] = useState();

  const [timetableID, setTimetableID] = useState(0);
  const [clickIndex, setIndex] = useState();
  const [refreshList, setRefreshList] = useState(false);
  const [dateList, setDateList] = useState([]);
  // const [flatListRef, setFlatListRef] = useState()
  const [SelectedWeek, setSelectedWeek] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const [subjectList, setSubjectList] = useState([]);

  const [subjectSelectedName, setSubjectSelectedName] = useState("");
  const [startTimeTEXT, setStartTimeTEXT] = useState(AppText.START_TIME);
  const [endTimeTEXT, setEndTimeTEXT] = useState(AppText.END_TIME);

  const [subjectSelected, setSubjectSelected] = useState(""); // For Subject dropdown
  const [value, setValue] = useState(""); // For Day dropdown
  const [isSubject, setISSubject] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  const dummySubjectList = [
    { subjectId: "ENG101", subjectName: "English" },
    { subjectId: "MATH201", subjectName: "Mathematics" },
    { subjectId: "SCI301", subjectName: "Science" },
    { subjectId: "SOC501", subjectName: "Social Study" },
    { subjectId: "HIN401", subjectName: "Hindi" },
    { subjectId: "DRAW601", subjectName: "Drawing" },
  ];

  const dummyData = [
    {
      id: "1",
      subjectId: "MATH201",
      subjectName: "Maths",
      startTime: "07:40 AM",
      endTime: "08:25 AM",
      roomNo: "04",
      topic: "Integration and derivation",
      isBreak: false,
    },
    {
      id: "2",
      subjectId: "SCI301",
      subjectName: "Science",
      startTime: "09:45 AM",
      endTime: "10:30 AM",
      roomNo: "04",
      topic:
        "<p>Due date for the term fee is 26 July, 2023. Your prompt attention to this matter is greatly appreciated.</p>",
      isBreak: false,
    },
    {
      id: "3",
      subjectName: "Break",
      startTime: "10:30 AM",
      duration: "15 Mins",
      roomNo: "",
      isBreak: true,
    },
    {
      id: "4",
      subjectId: "ENG101",
      subjectName: "English",
      startTime: "10:45 AM",
      endTime: "11:30 AM",
      roomNo: "04",
      topic: "<p>Grammar Practice: Tenses</p>",
      isBreak: false,
    },
    {
      id: "5",
      subjectId: "SOC501",
      subjectName: "Social Study",
      startTime: "11:40 AM",
      endTime: "12:25 PM",
      roomNo: "04",
      topic: "<p>Geography: Indian Rivers</p>",
      isBreak: false,
    },
    {
      id: "6",
      subjectName: "Lunch",
      startTime: "12:30 PM",
      duration: "15 Mins",
      roomNo: "",
      isBreak: true,
    },
    {
      id: "7",
      subjectId: "HIN401",
      subjectName: "Hindi",
      startTime: "12:45 PM",
      endTime: "01:30 PM",
      roomNo: "04",
      topic: "<p>Vyakaran: Sangya and Sarvanaam</p>",
      isBreak: false,
    },
    {
      id: "8",
      subjectId: "DRAW601",
      subjectName: "Drawing",
      startTime: "01:40 PM",
      endTime: "02:25 PM",
      roomNo: "Art Room",
      topic: "<p>Sketching fruits using pencil shading</p>",
      isBreak: false,
    },
  ];

  useEffect(() => {
    startFieldRef?.current?.setValue(moment(startTime).format("hh:mm A"));
    endFieldRef?.current?.setValue(moment(endTime).format("hh:mm A"));
    subjectRef?.current?.setValue(subject);
    topicRef?.current?.setValue(topic);

    if (refreshList === false) {
      var setCurrentweekDay = setInterval(() => {
        setIsVisible(false);
        fetchData();
      }, 500);
      TeacherTimeTableAPI();
      return () => clearInterval(setCurrentweekDay);
    }

    if (SelectedWeek != undefined) {
      var setCurrentweekDay_ = setInterval(() => {
        TeacherTimeTableAPI();
        clearInterval(setCurrentweekDay_);
      }, 500);
      return () => clearInterval(setCurrentweekDay_);
    }
  }, [SelectedWeek, subject, topic, startTime, endTime]);

  // useEffect(() => {
  //   GetSubjectList();
  // }, []);

  // async function GetSubjectList() {
  //   let loginFormData = new FormData();
  //   loginFormData.append("classId", props.sectionId);

  //   let requestOptions = {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //       Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
  //     },
  //   };
  //   axiosCallAPI(
  //     "post",
  //     Utills.SUBJECT_LIST,
  //     loginFormData,
  //     requestOptions,
  //     true,
  //     props.navigation
  //   ).then((response) => {
  //     console.log("_______________");
  //     console.log(response);
  //     console.log("_______________");

  //     // var subjectarray = [];
  //     // response.map((item) =>{
  //     //       subjectarray.push(item.subjectName);
  //     // });
  //     setSubjectList(response);
  //     // if (JSON.stringify(noteType) !== JSON.stringify(response.result))

  //     //     setNoteType(response.result)
  //   });
  // }
  async function fetchData() {
    await flatListRef?.current?.scrollToIndex({
      animated: false,
      index: today.getDay(),
      viewPosition: selectedIndex == AppText.WEEKDAYS.length - 1 ? 0.5 : 0.62,
    });
    setSelectedWeek(AppText.WEEKDAYS[today.getDay()]);
    setRefreshList(true);
  }
  const handleClick = () => {
    setTimetableID(0);
    setEdit(false);
    setModalVisible(true);
  };

  const handleEditClick = (item) => {
    var date = moment(new Date()).format("MMMM DD YYYY");

    console.log(item);
    setTimetableID(item.id);
    setEdit(true);
    setModalVisible(true);
    setSubject(item.subject);
    setTopic(removeHTML(item.topic));
    setTopicHTML(item.topic);
    setValue(item.day);
    moment().utcOffset(0, true).format();
    setStartTime(
      new Date(
        moment(date + " " + item.startTime).format("MMMM DD YYYY, h:mm a")
      )
    );
    setEndTime(
      new Date(moment(date + " " + item.endTime).format("MMMM DD YYYY, h:mm a"))
    );

    if (item.subject !== "0") {
      // if (subjectList && subjectList.length > 0) {
      //   subjectList.map((subjectItem) => {
      //     console.log("Subject>>" + JSON.stringify(subjectItem));
      //     if (item.subject === subjectItem.subjectId)
      //       setSubjectSelected(subjectItem.subjectName);
      //     setSubjectSelectedName(subjectItem.subjectId);
      //   });

      // }

      if (dummySubjectList && dummySubjectList.length > 0) {
        dummySubjectList.map((subjectItem) => {
          console.log("Subject>>" + JSON.stringify(subjectItem), item.subject);
          if (item.subjectId === subjectItem.subjectId)
            setSubjectSelected(subjectItem.subjectName);
          setSubjectSelectedName(subjectItem.subjectId);
        });
      } else {
        console.log("subjectList is not available");
      }
    } else {
      setSubjectSelected("");
      setSubjectSelectedName("");
    }
  };

  const handleDeleteClick = (id) => {
    AlertMesaage(
      "Delete Slot",
      "Are you sure you want to delete this slot?",
      "Yes",
      "No",
      () => DeleteTimetableAPI(id)
    );
  };
  // async function TeacherTimeTableAPI() {
  //   setLoaderView(true);

  //   let requestOptions = {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
  //     },
  //   };

  //   var tableURL =
  //     Utills.TEACHER_TIMETABLE_LIST +
  //     "?sectionId=" +
  //     props.sectionId +
  //     "&daySearch=" +
  //     SelectedWeek;

  //   axiosCallAPI("get", tableURL, "", requestOptions, true, props.navigation)
  //     .then((response) => {
  //       console.log("TT data", props.sectionId, SelectedWeek, response);
  //       setLoaderView(false);
  //       if (response !== undefined) {
  //         if (JSON.stringify(dateList) != JSON.stringify(response.result)) {
  //           setDateList(response.result);
  //         }
  //       } else {
  //         setDateList([]);
  //         renderEmptyContainer("No data found", true);
  //       }
  //     })
  //     .catch((error) => {
  //       // setLoaderView(false);

  //       renderEmptyContainer("No data found", true);
  //     });
  // }

async function TeacherTimeTableAPI() {
  console.log("Teacherr-------time table api called")
  setLoaderView(true);

  const token = await Preference.GetData(PreferenceKeys.TOKEN);
  const tableURL = `${Utills.TEACHER_TIMETABLE_LIST}?sectionId=${props.sectionId}&daySearch=${SelectedWeek}`;
   console.log("TT data", tableURL);
  try {
    const res = await apiSimple.get(tableURL, {
      headers: {
        Authorization: token,
      },
    });

    const response = res?.data;
    console.log("TT data",response.result);

    if (response !== undefined) {
      if (JSON.stringify(dateList) !== JSON.stringify(response.result)) {
        setDateList(response.result);
      }
    } else {
      setDateList([]);
      renderEmptyContainer("No data found", true);
    }
  } catch (error) {
    renderEmptyContainer("No data found", true);
  } finally {
    setLoaderView(false);
  }
}


  // async function AddTimeTableAPI() {
  //   setLoaderView(true);
  //   let loginFormData = new FormData();
  //   loginFormData.append("id", timetableID);
  //   loginFormData.append("sectionId", props.sectionId);
  //   loginFormData.append("day", value);
  //   loginFormData.append("startTime", moment(startTime).format("hh:mm A"));
  //   loginFormData.append("endTime", moment(endTime).format("hh:mm A"));
  //   //  loginFormData.append("subject", subject)
  //   loginFormData.append("subject", subjectSelectedName);
  //   loginFormData.append("topic", topicHTML);

  //   let requestOptions = {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //       Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
  //     },
  //   };
  //   axiosCallAPI(
  //     "post",
  //     Utills.TEACHER_TIMETABLE_SAVE,
  //     loginFormData,
  //     requestOptions,
  //     true,
  //     props.navigation
  //   )
  //     .then((response) => {
  //       if (response !== undefined) {
  //         setModalVisible(!modalVisible);
  //         clearData();
  //         setLoaderView(false);
  //       } else {
  //         setLoaderView(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setLoaderView(false);
  //     });
  // }

async function AddTimeTableAPI() {
  setLoaderView(true);

  const token = await Preference.GetData(PreferenceKeys.TOKEN);
  let loginFormData = new FormData();

  loginFormData.append("id", timetableID);
  loginFormData.append("sectionId", props.sectionId);
  loginFormData.append("day", value);
  loginFormData.append("startTime", moment(startTime).format("hh:mm A"));
  loginFormData.append("endTime", moment(endTime).format("hh:mm A"));
  loginFormData.append("subject", subjectSelectedName);
  loginFormData.append("topic", topicHTML);

  try {
    const res = await apiSimple.post(Utills.TEACHER_TIMETABLE_SAVE, loginFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    const response = res?.data;

    if (response !== undefined) {
      setModalVisible(!modalVisible);
      clearData();
    }
  } catch (error) {
    // error will be handled by global interceptors
  } finally {
    setLoaderView(false);
  }
}


  // async function DeleteTimetableAPI(deleteRecordID) {
  //   setDeleteLoaderView(true);
  //   let requestOptions = {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
  //     },
  //   };

  //   axiosCallAPI(
  //     "get",
  //     Utills.TEACHER_TIMETABLE_DELETE + "?id=" + deleteRecordID,
  //     "",
  //     requestOptions,
  //     true,
  //     props.navigation
  //   )
  //     .then((response) => {
  //       setDeleteLoaderView(false);
  //       if (response !== undefined) {
  //         TeacherTimeTableAPI();
  //       }
  //     })
  //     .catch((error) => {
  //       setDeleteLoaderView(false);
  //     });
  // }

  async function DeleteTimetableAPI(deleteRecordID) {
  setDeleteLoaderView(true);

  const token = await Preference.GetData(PreferenceKeys.TOKEN);

  try {
    const res = await apiSimple.get(
      `${Utills.TEACHER_TIMETABLE_DELETE}?id=${deleteRecordID}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );

    const response = res?.data;
    if (response !== undefined) {
      TeacherTimeTableAPI();
    }
  } catch (error) {
    // error handled by global interceptor
  } finally {
    setDeleteLoaderView(false);
  }
}


  const InputView = (label, isEnable, image, multiline) => {
    return (
      <View
        style={[stylesCommon.inputMainView, { marginTop: 0, marginBottom: 0 }]}
      >
        {label == AppText.SUBJECT && (
          <View
            style={[
              stylesCommon.inputMainView,
              { marginTop: 0, marginBottom: 10 },
            ]}
          >
            <SelectDropdown
              // data={subjectList}
              data={dummySubjectList}
              onSelect={(selectedItem, index) => {
                // setNoteTypeID(selectedItem.id)
                setISSubject(-1);
                setSubjectSelectedName(selectedItem);
              }}
              defaultButtonText={
                subjectSelected === "" ? "Subject" : subjectSelected
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
        {label == AppText.TOPIC && (
          <View
            style={[
              stylesCommon.inputMainView,
              { marginTop: 0, marginBottom: 0 },
            ]}
          >
            <OutlinedTextField
              ref={topicRef}
              style={stylesCommon.textFieldView}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={label}
              height={80}
              multiline={multiline}
              editable={isEnable}
              returnKeyType="done"
              error={
                !isSaveData &&
                isSaveData != undefined &&
                topic.length === 0 &&
                AppText.ENTER_TOPIC
              }
              autoFocus={false}
              onChangeText={(text) => setTopic(text)}
            />
            {image != "" ? (
              <View style={stylesCommon.dropdownView}>
                <Image style={stylesCommon.dropImage} source={image}></Image>
              </View>
            ) : null}
          </View>
        )}
        {label == AppText.DAY && (
          <View style={stylesCommon.inputMainView}>
            <SelectDropdown
              //  data={AppText.WEEKDAYS}
              data={AppText.WEEKDAYS}
              onSelect={(selectedItem, index) => {
                console.log("Sel", selectedItem);
                setValue(selectedItem);
              }}
              //defaultButtonText={value}
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
        )}
      </View>
    );
  };
  const InputViewRow = (label, isEnable, image, multiline) => {
    return (
      <View
        style={{
          width: "48%",
        }}
      >
        {label == AppText.START_TIME && (
          <TouchableOpacity
            style={[stylesCommon.inputMainView, { marginBottom: 15 }]}
            onPress={() => setStartTimeOpen(true)}
          >
            <OutlinedTextField
              ref={startFieldRef}
              style={[
                stylesCommon.textFieldView,
                { fontSize: normalize(20), marginEnd: 0 },
              ]}
              tintColor={color.APP_PRIMARY}
              //baseColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={startTimeTEXT}
              height={80}
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
              mode="time"
              theme="light"
              open={startTimeOpen}
              date={startTime}
              onConfirm={(time) => {
                setStartTimeOpen(false);
                setStartTime(time);
                setStartTimeTEXT(moment(time).format("hh:mm A"));
              }}
              onCancel={() => {
                setStartTimeOpen(false);
              }}
            />
          </TouchableOpacity>
        )}
        {label == AppText.END_TIME && (
          <TouchableOpacity
            style={[stylesCommon.inputMainView, { marginBottom: 15 }]}
            onPress={() => setEndTimeOpen(true)}
          >
            <OutlinedTextField
              ref={endFieldRef}
              style={[
                stylesCommon.textFieldView,
                { fontSize: normalize(20), marginEnd: 0 },
              ]}
              // baseColor={color.APP_PRIMARY}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={endTimeTEXT}
              height={80}
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
              mode="time"
              theme="light"
              open={endTimeOpen}
              date={endTime}
              onConfirm={(time) => {
                setEndTimeOpen(false);
                if (time.getTime() > startTime.getTime()) {
                  setEndTime(time);
                  setEndTimeTEXT(moment(time).format("hh:mm A"));
                } else {
                  Alert.alert(AppText.ALERT_APP_NAME, AppText.TIME_VALIDATION);
                }
              }}
              onCancel={() => {
                setEndTimeOpen(false);
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  function renderCloseClick() {
    setModalVisible(!modalVisible);
    clearData();
  }
  function clearData() {
    setSubject("");
    setTopic("");
    setTopicHTML("");
    setSaveData();
    setStartTime(new Date());
    setEndTime(new Date());
    setValue(AppText.WEEKDAYS[today.getDay()]);
    setEditTopic(false);
    setEditTopicEmpty(false);
    setSubjectSelected("");
    setSubjectSelectedName("");
    setStartTimeTEXT(AppText.START_TIME);
    setEndTimeTEXT(AppText.END_TIME);
    setISSubject(-1);
  }
  function saveBtnClick() {
    setSaveData(validation());
    if (validation()) {
      AddTimeTableAPI();
    }
  }
  function validation() {
    if (subjectSelectedName.length === 0) {
      setISSubject(0);
      return false;
    } else if (topic.length === 0) {
      setEditTopicEmpty(true);
      return false;
    } else {
      setEditTopicEmpty(false);
      return true;
    }
  }
  // function removeHTML(str) {
  //     if ((str === null) || (str === ''))
  //         return false;
  //     else
  //         str = str.toString();
  //     return str.replace(/(<([^>]+)>)/ig, '');
  // }

  const resetModalData = () => {
    setSubjectSelected(""); // Reset the subject dropdown
    setISSubject(0); // Reset the subject error state
    setTopic(""); // Reset the topic field
    setTopicHTML(""); // Reset the HTML content in the rich text editor
    setValue(""); // Reset the day value
    setStartTime(""); // Reset the start time
    setEndTime(""); // Reset the end time
  };
  const TeacherAddPeriodModel = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          resetModalData();
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
                // tiitle={isEdit ? AppText.EDIT_PERIOD : AppText.ADD_PERIOD}
                tiitle={"Timetable"}
                onPressClose={() => renderCloseClick()}
              />

              <View
                style={{
                  marginBottom: 20,
                  width: "100%",
                }}
              >
                {InputView(AppText.DAY, false, icon.IC_DOWN_ARROW, false)}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {InputViewRow(
                    AppText.START_TIME,
                    false,
                    icon.IC_CLOCK,
                    false
                  )}
                  {InputViewRow(AppText.END_TIME, false, icon.IC_CLOCK, false)}
                </View>

                {InputView(AppText.SUBJECT, false, icon.IC_DOWN_ARROW, false)}

                {InputView(AppText.TOPIC, true, "", true)}
              </View>

              {loaderView === true ? (
                <LoaderButtonView />
              ) : (
                <ButtonView
                  tiitle={AppText.SAVE}
                  onClick={() => saveBtnClick()}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  function clickDown(index) {
    setIndex(index);
  }
  function clickUp() {
    setIndex();
  }

  const renderItem = ({ item, index }) => (
    <View
      style={{
        backgroundColor: index === clickIndex ? "#FEEEEE" : "#EAECF0",
        borderRadius: 10,
        marginTop: 10,
        flexDirection: "column",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor:
            item.roomNo === ""
              ? "#FCE4C8"
              : index === clickIndex
              ? "#FEEEEE"
              : "#EAECF0",
          borderRadius: 10,
          alignContent: "center",
          flexDirection: "row",
        }}
        onPress={() => {
          if (item.roomNo !== "") {
            index === clickIndex ? clickUp() : clickDown(index);
          }
        }}
        activeOpacity={item.roomNo === "" ? 1 : 0.2}
      >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.INTER,
                fontSize: 16,

                color: item.roomNo === "" ? "#93642E" : "#1D2939",
              }}
            >
              {item.subjectName}
            </Text>
            <Text
              style={{
                fontFamily: fonts.INTER,
                fontSize: 12,
                color: item.roomNo === "" ? "#93642E" : "#667085",
                marginTop: 6,
              }}
            >
              {item.endTime
                ? `${item.startTime} - ${item.endTime}`
                : item.startTime}
            </Text>
          </View>
        </View>
        {item.roomNo != "" && (
          <Text
            style={{
              position: "absolute",
              right: screenWidth / 5,
              bottom: 10,
              color: "#667085",
              fontFamily: fonts.INTER,
              fontSize: 12,
            }}
          >
            Room No.: 04
          </Text>
        )}

        {item.duration != "" && (
          <Text
            style={{
              position: "absolute",
              right: 15,
              bottom: 10,
              color: "#93642E",
              fontFamily: fonts.INTER,
              fontSize: 12,
            }}
          >
            {item.duration != "" ? item.duration : "10 Mins"}
          </Text>
        )}

        {/* <View
          style={{
            marginHorizontal: 15,
            marginVertical: 15,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: color.WHITE,
              fontWeight: "700",
              fontSize: 20,
              fontFamily: fonts.LATO_REGULAR,
            }}
          >
            {item.subjectName}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 15,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: color.WHITE,
              fontWeight: "700",
              fontSize: 12,
              fontFamily: fonts.INTER,
            }}
          >
            {item.startTime + " - " + item.endTime}
          </Text>
        </View> */}

        {item.topic ? (
          index === clickIndex ? (
            <View
              style={{
                marginHorizontal: 15,
                position: "absolute",
                end: 0,
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  height: 24,
                  width: 24,
                  marginEnd: 5,
                  resizeMode: "contain",
                }}
                source={icon.IC_BLACK_UP_ARROW}
              />
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 15,
                position: "absolute",
                end: 0,
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  height: 24,
                  width: 24,
                  marginEnd: 5,
                  resizeMode: "contain",
                }}
                source={icon.IC_BLACK_DOWN_ARROW}
              />
            </View>
          )
        ) : null}
      </TouchableOpacity>
      {index === clickIndex ? (
        <View>
          <View
            style={{
              backgroundColor: index === clickIndex ? "#FFD2C8" : color.WHITE,
              height: 0.5,
              marginHorizontal: vh(15),
            }}
          ></View>
          <View
            style={{
              borderRadius: 8,
              marginTop: vh(10),
              marginBottom: vh(15),
              marginHorizontal: 15,
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "#667085",
                //fontWeight: "700",
                fontSize: 12,
                fontFamily: fonts.INTER,
              }}
            >
              {"Topic".toUpperCase()}
            </Text>
            {item.topic && (
              <Text
                style={{
                  color: "#667085",
                  fontSize: 12,
                  marginTop: 5,
                  fontFamily: fonts.INTER,
                }}
              >
                {removeHTML(item.topic)}
              </Text>
            )}
          </View>
          {props.dairyType === "teacher" && (
            <View
              style={{
                borderRadius: 8,
                marginBottom: vh(10),
                marginHorizontal: vh(15),
                flexDirection: "row",

                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: color.RED,
                  borderRadius: 50,
                  position: "absolute",
                  backgroundColor: "#564CB8",
                  right: 50,
                  bottom: 0,
                }}
              >
                <TouchableOpacity onPress={() => handleEditClick(item)}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginEnd: 10,
                      resizeMode: "contain",
                      marginHorizontal: 20,
                      position: "absolute",
                      right: -5,
                      bottom: -25,
                    }}
                    source={icon.IC_EDIT_TT}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderColor: "#F85050",
                  borderWidth: 1,

                  borderRadius: 50,
                  position: "relative",
                  left: screenWidth - 100,
                  bottom: 0,
                }}
              >
                <TouchableOpacity onPress={() => handleDeleteClick(item.id)}>
                  <Image
                    style={{
                      height: vh(20),
                      width: vw(20),
                      marginEnd: vw(10),
                      resizeMode: "contain",
                      marginHorizontal: 10,
                      position: "absolute",
                      right: -5,
                      bottom: -23,
                    }}
                    source={icon.IC_DELETE_TT}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );

  function NavigateToSupportTeacher() {
    Preference.SetData(PreferenceKeys.TEACHER_SCHOOL_DETAIL);
    props.navigation.navigate("TeacherSupport");
  }
  function NavigateToSupportParent() {
    props.navigation.navigate("ParentSupport");
  }

  return props.dairyType == "parent" ? (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      {/* Dashboard Header view UI */}
      <SchoolDetailHeaderView
        titile={AppText.DASHBOARD}
        type={props.dairyType}
        navigation={props.navigation}
        screen={"TimeTableView"}
        showAddress={true}
        onSupportClick={() => NavigateToSupportParent()}
      />
      <View
        style={{
          flexDirection: "column",
          marginTop: Platform.OS === "ios" ? -50 : 0,
          flex: 1,
        }}
      >
        <TitileBackgroundView
          titile={"Timetable"}
          navigation={props.navigation}
        />
        {/* yaha se bhai hai dekh len  */}
        <View
          style={{
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "#EEEDF8",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            {AppText.WEEKDAYS.map((day) => {
              const isSelected = SelectedWeek === day;

              return (
                <TouchableOpacity
                  key={day}
                  style={{
                    elevation: 10,
                    shadowColor: "rgba(142, 152, 168, 0.3)",
                  }}
                  onPress={() => setSelectedWeek(day)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      backgroundColor: isSelected ? color.WHITE : null,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      marginStart: 5,
                      marginEnd: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: color.BLACK,
                        fontFamily: fonts.INTER_MEDIUM,
                        fontSize: 12,
                        opacity: isSelected ? 1 : 0.4,
                      }}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            //  data={dateList}
            data={dummyData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 30, // 👈 gives space for last item
            }}
            style={{
              marginHorizontal: 15,
              marginVertical: 15,
              // marginBottom: 80,
            }}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={renderEmptyContainer("No data found", true)}
          />
          {loaderView && (
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                height: "100%",
                width: "100%",
              }}
            >
              <LoaderViewWithBackground color={color.WHITE} />
            </View>
          )}

          {deleteloaderView && (
            <View
              style={{
                top: 200,
                alignSelf: "center",
                position: "absolute",
              }}
            >
              <LoaderViewWithBackground color={color.WHITE} />
            </View>
          )}
        </View>

        {modalVisible && TeacherAddPeriodModel()}
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      {/* Dashboard Header view UI */}
      <SchoolDetailHeaderView
        titile={AppText.DASHBOARD}
        type={props.dairyType}
        navigation={props.navigation}
        screen={"DairyView"}
        onSupportClick={() => NavigateToSupportTeacher()}
      />
      <View
        style={{
          flexDirection: "column",
          marginTop: Platform.OS === "ios" ? -50 : 0,
          flex: 1,
        }}
      >
        <View style={{ marginTop: 6 }}>
          <TitileBackgroundView
            titile={"Timetable"}
            navigation={props.navigation}
            isSecondviewRequired={true}
            secondViewImage={props.image}
            tagAddSecond={"Add Timetable"}
            class={props.class}
            onSecondViewClick={() => handleClick()}
            isShowClass={props.isShowClass}
          />
        </View>
        {/* yaha se bhai hai dekh len  */}
        <View
          style={{
            padding: 5,
            justifyContent: "center",
            alignItems: "center",

            paddingHorizontal: 10,
            paddingTop: 25,
            marginTop: 80,
            // height: SCREEN_HEIGHT / 10,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "#EEEDF8",
              flexDirection: "row",

              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            {AppText.WEEKDAYS.map((day) => {
              const isSelected = SelectedWeek === day;

              return (
                <TouchableOpacity
                  key={day}
                  style={{
                    elevation: 10,
                    shadowColor: "rgba(142, 152, 168, 0.3)",
                  }}
                  onPress={() => setSelectedWeek(day)}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      backgroundColor: isSelected ? color.WHITE : null,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      marginStart: 5,
                      marginEnd: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: color.BLACK,
                        fontFamily: fonts.INTER_MEDIUM,
                        fontSize: 12,
                        opacity: isSelected ? 1 : 0.3,
                      }}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            //data={dateList}
            data={dummyData}
            renderItem={renderItem}
            contentContainerStyle={{ marginBottom: 40 }}
            showsVerticalScrollIndicator={false}
            style={{
              marginHorizontal: 15,
              marginVertical: 5,
            }}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={renderEmptyContainer("No data found", true)}
          />
          {loaderView && (
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                height: "100%",
                width: "100%",
              }}
            >
              <LoaderViewWithBackground color={color.WHITE} />
            </View>
          )}

          {deleteloaderView && (
            <View
              style={{
                top: 200,
                alignSelf: "center",
                position: "absolute",
              }}
            >
              <LoaderViewWithBackground color={color.WHITE} />
            </View>
          )}
        </View>

        {modalVisible && TeacherAddPeriodModel()}
      </View>
    </SafeAreaView>
  );
}

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
  dropdownRowStyle: { backgroundColor: color.WHITE, borderBottomWidth: 0 },
  dropdownRowTxtStyle: {
    color: color.DARK_TEXT,
    textAlign: "left",
    fontFamily: fonts.LATO_REGULAR,
    paddingHorizontal: vw(10),
  },
});
