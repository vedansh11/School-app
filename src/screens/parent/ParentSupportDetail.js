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
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import {
  AppText,
  color,
  fonts,
  icon,
  PreferenceKeys,
  ROLEID,
} from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
  RenderItemSupport,
} from "../../commonTheme/CommonView";
import {
  normalize,
  screenHeight,
  screenWidth,
  vh,
} from "../../Utills/dimesnion";
import * as Preference from "../../storeData/Preference";
import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
import moment from "moment";
import { Axios } from "axios";
import {
  LoaderViewWithBackground,
  LoaderView,
  EmptyView,
  LoaderViewWithBackground_new,
} from "../../commonTheme/LoaderView";
import ImageLoad from "react-native-image-placeholder";
import { Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AboveKeyboard from "react-native-above-keyboard";

const ParentSupportDetails = ({ route, navigation }) => {
  const { requestID, type, tab } = route.params;
  const PER_PAGE = 10;
  var PAGE = 1;
  const [CURRENT_USERID, setCURRENT_USERID] = useState();
  const [keyboardStatus, setKeyboardStatus] = useState(0);
  const data = [
    {
      id: 1,
      name: "Test",
      currentUser: true,
      time: "April 2, 2022 04:41 PM",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      name: "Test1",
      currentUser: false,
      time: "April 2, 2022 04:41 PM",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      name: "Test2",
      currentUser: false,
      time: "April 2, 2022 04:41 PM",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 4,
      name: "Test3",
      currentUser: true,
      time: "April 2, 2022 04:41 PM",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  const [listdata, setListData] = useState([]);
  const [ref, setRef] = useState(null);
  const [lastIndex, setLastIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [studentName, setStudentName] = useState("");
  const [section, setSection] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isDetailsVisible, setIsDetailVisible] = useState(false);
  const [backgroundLoaderView, setBackgroundLoaderView] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadtype, setLoadType] = useState("first_time"); // 'first_time', 'load_more', 'add_new_msg'

  useEffect(() => {
    //  setListData(data);
    console.log(type);
    if (type === "parent") {
      Preference.GetData(PreferenceKeys.CURRENT_USERID).then(
        (student_detail) => {
          setCURRENT_USERID(student_detail);
        }
      );
    } else {
      Preference.GetData(PreferenceKeys.CURRENT_USERID).then(function (value) {
        console.log(value);
        setCURRENT_USERID(value);
      });
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [currentPage]);

  useEffect(() => {
    GetDetailData(
      loadtype == "first_time" || loadtype == "add_new_msg" ? true : false,
      currentPage
    );
  }, [CURRENT_USERID]);
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        console.log(event.endCoordinates.height);
        if (Platform.OS === "ios") {
          setKeyboardStatus(event.endCoordinates.height);
        }
      }
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      (event) => {
        console.log(event.endCoordinates.height);
        setKeyboardStatus(0);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  async function AddNewMessage() {
    var params = new FormData();
    params.append("id", lastIndex);
    params.append("message", message);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
    axiosCallAPI(
      "post",
      Utills.ADD_SUPPORT_REPLY,
      params,
      requestOptions,
      false,
      navigation
    )
      .then((response) => {
        setMessage("");
        setLoadType("add_new_msg");
        //GetDetailData(true,1);
        GetTempData(true, 1);
      })
      .catch((error) => {});
  }
  async function GetTempData(loadershow, page) {
    if (loadershow) {
      setBackgroundLoaderView(true);
    }
    console.log(requestID);
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
    axiosCallAPI(
      "get",
      Utills.GET_SUPPORT_DETAIL +
        "?id=" +
        requestID +
        "&per_page=" +
        PER_PAGE +
        "&page=" +
        page,
      "",
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        console.log(response);
        setBackgroundLoaderView(false);
        if (response !== undefined) {
          setStudentName(
            response.student_data.firstName +
              " " +
              response.student_data.lastName
          );
          setSection(
            response.student_data.class + " - " + response.student_data.section
          );
          setPhone(response.student_data.phoneNo);
          setEmail(response.student_data.email);
          setProfilePic(response.student_data.profilePic_path);
          setLastIndex(response.chat.result[0].id);

          //   setListData(response.chat.result);
          setTotalPages(response.chat.pages);
          setIsDetailVisible(true);

          var currentdata = [...listdata];
          currentdata.splice(0, 0, response.chat.result[0]);

          setListData(currentdata);
          ref.scrollToIndex({
            animated: true,
            index: 0,
            viewPosition: 0,
          });
        } else {
          //  setBackgroundLoaderView(false)
          //setLoaderView(false)
        }
      })
      .catch((error) => {
        setBackgroundLoaderView(false);
        //setLoaderView(false)
      });
  }
  async function GetDetailData(loadershow, page) {
    if (loadershow) {
      setBackgroundLoaderView(true);
    }
    console.log(requestID);
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
    axiosCallAPI(
      "get",
      Utills.GET_SUPPORT_DETAIL +
        "?id=" +
        requestID +
        "&per_page=" +
        PER_PAGE +
        "&page=" +
        page,
      "",
      requestOptions,
      true,
      navigation
    )
      // axiosCallAPI('get', Utills.GET_SUPPORT_DATA, p.toString(), requestOptions, true, props.navigation)
      .then((response) => {
        console.log(response);
        console.log(CURRENT_USERID);
        setBackgroundLoaderView(false);
        if (response !== undefined) {
          setStudentName(
            response.student_data.firstName +
              " " +
              response.student_data.lastName
          );
          setSection(
            response.student_data.class + " - " + response.student_data.section
          );
          setPhone(response.student_data.phoneNo);
          setEmail(response.student_data.email);
          setProfilePic(response.student_data.profilePic_path);
          setLastIndex(response.chat.result[0].id);

          //   setListData(response.chat.result);
          setTotalPages(response.chat.pages);
          setIsDetailVisible(true);
          if (loadtype == "first_time") {
            var currentdata = [...listdata];
            var finalarray = currentdata.concat(response.chat.result);
            setListData(finalarray);
            ref.scrollToIndex({
              animated: true,
              index: 0,
              viewPosition: 0,
            });
          } else if (loadtype == "load_more") {
            var currentdata = [...listdata];
            var finalarray = currentdata.concat(response.chat.result);
            setListData(finalarray);
          } else if (loadtype == "add_new_msg") {
            var currentdata = [...listdata];
            var finalarray = currentdata.splice(0, 0, response.chat.result[0]);
            console.log(finalarray);
            // setListData(finalarray);
            // ref.scrollToIndex({
            //   animated: true,
            //   index: 0,
            //   viewPosition: 0,
            // });
          }

          // setListData(response);
          //setLoaderView(false)
          // if (JSON.stringify(dataList) != JSON.stringify(response.result))
          //     setDataList(response.result)
        } else {
          //  setBackgroundLoaderView(false)
          //setLoaderView(false)
        }
      })
      .catch((error) => {
        setBackgroundLoaderView(false);
        //setLoaderView(false)
      });
  }
  function LoadMoreData() {
    if (currentPage < totalPages) {
      setLoadType("load_more");
      setCurrentPage(currentPage + 1);

      setLoadMore(true);
    }
  }
  const renderFooter = () => (
    <View style={styles.footerText}>
      {currentPage < totalPages && (
        <ActivityIndicator color={color.COLOR_PRIMARY} size="large" />
      )}
      {/* {(currentPage == totalPages) && <Text>No more articles at the moment</Text>} */}
    </View>
  );

  function CloseRequest() {
    Alert.alert(
      "Close Request",
      "Are you sure you want to close the request?",
      [
        {
          text: "NO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "YES", onPress: () => CloseRequestAPI() },
      ]
    );
  }
  async function CloseRequestAPI() {
    var params = new FormData();
    params.append("id", requestID);

    console.log(params);
    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
    axiosCallAPI(
      "post",
      Utills.CLOSE_SUPPORT_REQUEST,
      params,
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        setMessage("");
        navigation.goBack();
      })
      .catch((error) => {});
  }

  const keyExtractor = ({ id }) => String(id);

  const renderItem = ({ item }) =>
    item.senderId == CURRENT_USERID ? (
      <View
        style={{
          flex: 1,
          marginTop: 20,
          minHeight: 50,
          marginLeft: "20%",
          //paddingVertical: 15,
          backgroundColor: color.WHITE,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontFamily: fonts.INTER_MEDIUM, fontSize: 12 }}>
            {item.fullname}
          </Text>
          <Text style={{ fontFamily: fonts.INTER, fontSize: 10 }}>
            {moment(item.createdAt, "YYYY-MM-DD HH:mm:ss").format("dddd h:mma")}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#564CB8",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderTopStartRadius: 8,
            borderBottomStartRadius: 8,
            borderBottomEndRadius: 8,
            borderTopEndRadius: 0,
          }}
        >
          <Text
            style={{
              color: color.WHITE,
              fontFamily: fonts.INTER,
              fontSize: normalize(12),
            }}
          >
            {item.message}
          </Text>
        </View>
      </View>
    ) : (
      <View
        style={{
          marginTop: 20,
          backgroundColor: color.WHITE,
          flexDirection: "row",
          flex: 1,
        }}
      >
        <View style={{ marginEnd: 12 }}>
          <Image source={icon.IC_AVTAR} style={{ width: 40, height: 40 }} />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontFamily: fonts.INTER_MEDIUM, fontSize: 12 }}>
              {item.fullname}
            </Text>
            <Text style={{ fontFamily: fonts.INTER, fontSize: 10 }}>
              {" "}
              {moment(item.createdAt, "YYYY-MM-DD HH:mm:ss").format(
                "dddd h:mma"
              )}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#EEEDF8",
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderTopStartRadius: 0,
              borderBottomStartRadius: 8,
              borderBottomEndRadius: 8,
              borderTopEndRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#475467",
                fontFamily: fonts.INTER,
                fontSize: normalize(12),
              }}
            >
              {item.message}
            </Text>
          </View>
        </View>
      </View>
    );

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: color.APP_PRIMARY }} />
      <SafeAreaView style={stylesCommon.safeAreaStyle}>
        <StatusBar backgroundColor={color.APP_PRIMARY} />
        <SchoolDetailHeaderView
          titile={AppText.DASHBOARD}
          type={type}
          navigation={navigation}
          screen={type === "teacher" ? "TeacherSupport" : "ParentSupport"}
        />

        <View
          style={{
            flexDirection: "column",
            marginTop: Platform.OS === "ios" ? -0 : 0,
            flex: 1,
          }}
        >
          {type == "teacher" && tab != "Closed" ? (
            <TitileBackgroundView
              titile={"Request Details"}
              // image={icon.IC_CLOSE}
              // tagAdd={"Close Request"}
              onClick={CloseRequest}
            />
          ) : (
            <TitileBackgroundView titile={"Request Details"} />
          )}

          <View
            style={{
              paddingHorizontal: vh(15),
              paddingBottom: vh(20),
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: color.WHITE,
                padding: 15,
                borderRadius: 15,
                width: "100%",
                //borderColor: color.GREY,
                //borderWidth: 0.5,
                // alignSelf: "center",
                // shadowColor:
                //   Platform.OS === "ios" ? color.LIGHT_GREY : color.BLACK,
                // shadowOffset: { width: 2, height: 2 },
                // shadowOpacity: 5,
                // shadowRadius: 1,
                elevation: 2,
              }}
            >
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={() => {
                  navigation.navigate("TeacherStudentProfile");
                }}
              >
                <Text
                  style={{
                    fontSize: 14,

                    fontFamily: fonts.INTER_MEDIUM,
                    color: color.TEXT_COLOR,
                    marginBottom: 15,
                  }}
                >
                  {"Request #" + requestID}
                </Text>
                <View style={{ backgroundColor: "#EAECF0", height: 1 }}></View>
                {isDetailsVisible && (
                  <View
                    style={{
                      flexDirection: "row",

                      borderBottomLeftRadius: 7,
                      borderBottomRightRadius: 7,
                      marginTop: 15,
                    }}
                  >
                    {/* {profilePic.length > 0 ? ( */}
                    <ImageLoad
                      style={[
                        stylesCommon.studentProfile,
                        { height: 80, width: 80, marginEnd: 10 },
                      ]}
                      source={{ uri: profilePic }}
                      loadingStyle={{ size: "large", color: "blue" }}
                      borderRadius={50}
                      backgroundColor={color.YELLOW}
                      placeholderStyle={stylesCommon.studentProfile}
                    ></ImageLoad>
                    {/* ) : (
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={icon.IC_GIRL_IMAGE}
                  ></Image>
                )} */}

                    <View style={[{ flex: 1, marginStart: 10 }]}>
                      <Text style={stylesCommon.nameText}>{studentName}</Text>
                      <Text
                        style={[
                          stylesCommon.deptmentText,
                          { color: "#667085", marginTop: 5 },
                        ]}
                      >
                        {section}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 12,
                        }}
                      >
                        <View style={{ marginEnd: 40 }}>
                          <Text style={stylesCommon.supportText}>Phone</Text>
                          <TouchableOpacity
                            onPress={() => Linking.openURL(`tel:${phone}`)}
                          >
                            <Text style={stylesCommon.supportValueText}>
                              {phone}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View style={{}}>
                          <View>
                            <Text style={stylesCommon.supportText}>Email</Text>
                            <TouchableOpacity
                              onPress={() => Linking.openURL(`mailto:${email}`)}
                            >
                              <Text style={stylesCommon.supportValueText}>
                                {email}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      {/* <View style={{ marginTop: 10 }}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => Linking.openURL(`tel:${phone}`)}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={icon.IC_PHONE}
                            style={{
                              height: 20,
                              width: 20,
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              marginStart: 2,
                              fontFamily: fonts.LATO_BOLD,
                              flex: 1,
                              flexWrap: "wrap",
                              color: color.DARK_TEXT,
                            }}
                          >
                            {phone}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={() => Linking.openURL(`mailto:${email}`)}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={icon.IC_ENVELOP}
                            style={{
                              height: 20,
                              width: 20,
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              marginStart: 5,
                              fontFamily: fonts.LATO_BOLD,
                              flex: 1,
                              flexWrap: "wrap",
                              color: color.DARK_TEXT,
                            }}
                          >
                            {email}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 12,
                //padding: vh(10),
                //marginTop: 5,
                color: color.YELLOW,
                fontFamily: fonts.LATO_BOLD,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {""}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              marginBottom: 85,
              marginTop: vh(-15),
              marginHorizontal: vh(15),
              flex: 1,
            }}
          >
            {/* {isLoadMore && (
            <ActivityIndicator
              size="large"
              color={color.COLOR_PRIMARY}
              style={{ margin: 10 }}
            />
          )} */}
            <FlatList
              //data={[...listdata].reverse()}
              data={listdata}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={{ backgroundColor: color.WHITE, flex: 1 }}
              ref={(ref) => setRef(ref)}
              inverted
              extraData={listdata}
              onEndReached={LoadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
            />
          </View>
          {backgroundLoaderView && (
            <View
              style={{
                flex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(52, 52, 52, 0.5)",
              }}
            >
              <LoaderViewWithBackground_new color={color.WHITE} />
            </View>
          )}
        </View>

        {tab != "Closed" ? (
          <View
            style={{
              position: "absolute",
              bottom: keyboardStatus,
              width: "100%",
              backgroundColor: color.WHITE,
            }}
          >
            <View style={{ backgroundColor: "#EAECF0", height: 1 }}></View>

            <View style={{ padding: 13, flexDirection: "row" }}>
              <TextInput
                style={{
                  borderRadius: 7,
                  borderColor: "#D0D5DD",
                  borderWidth: 1,
                  height: 46,
                  flex: 1,
                  padding: 8,
                  fontFamily: fonts.LATO_REGULAR,
                  fontWeight: "600",
                }}
                placeholder={"Message"}
                placeholderTextColor={"#667085"}
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  //    var value =  {id:5, name: 'My Data', currentUser: true, time: 'April 2, 2022 04:41 PM', message: "Lorem Ipsum " }
                  //    var temparray = [...listdata];

                  // listdata.push({ name: 'New Data', currentUser: true, time: 'April 2, 2022 04:41 PM', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." })
                  // temparray.splice(3,0,value)
                  //    temparray.push(value);
                  if (message.length > 0) {
                    setLoadType("add_new_msg");
                    AddNewMessage();
                    Keyboard.dismiss();
                  }
                  // setListData(temparray);
                  // ref.scrollToIndex({
                  //     animated: true,
                  //     index: 0,
                  //     viewPosition: 0
                  //   })
                  // console.log(listdata.length);
                  // console.log(listdata);
                }}
              >
                <Image
                  source={icon.IC_SEND}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain",
                    marginStart: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  footerText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
});
export default ParentSupportDetails;
