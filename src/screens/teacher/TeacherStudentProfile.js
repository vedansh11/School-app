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
  StyleSheet,
  ScrollView,
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import stylesCommon from "../../commonTheme/stylesCommon";
import * as Preference from "../../storeData/Preference";
import {
  DashboardHeaderView,
  SchoolDetailHeaderView,
} from "../../commonTheme/HeaderView";
import { LoaderView } from "../../commonTheme/LoaderView";
import {
  PresentSquareView,
  DashboardRawDetailMenu,
  renderEmptyContainer,
  removeDuplicates,
} from "../../commonTheme/CommonView";

import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
import { screenHeight, screenWidth } from "../../Utills/dimesnion";

export default function TeacherStudentProfile({ navigation }) {
  const [clickIndex, setIndex] = useState();
  const [listDataSource, setListDataSource] = useState([]);
  const [classListData, setClassList] = useState([]);
  const [dataList, setData] = useState([]);
  const [loaderView, setLoaderView] = useState(false);
  const [showContent, setShowContent] = useState();

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={"#564CB8"} />

      {/* Dashboard Header view UI */}
      <SchoolDetailHeaderView
        // titile={AppText.DASHBOARD}
        type={"teacher"}
        navigation={navigation}
        //navigation={props.navigation}
      />
      {/* <SchoolDetailHeaderView
        titile={AppText.DASHBOARD}
        type={"teacher"}
        //navigation={navigation}
        navigation={props.navigation}
      /> */}

      <View style={{ flex: 1 }}>
        <View>
          <View
            style={{
              backgroundColor: color.WHITE,
              paddingHorizontal: 15,
              paddingVertical: 20,
              marginTop: 10,
              marginBottom: 15,
              borderRadius: 15,
              width: "92%",
              marginStart: 14,
              position: "absolute",
              top: -25,
              elevation: 3,
              zIndex: 2,
              //marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View>
                <Image
                  style={{
                    flex: 1,
                    height: 80,
                    width: 80,
                    borderRadius: 50,
                  }}
                  source={icon.BOY}
                ></Image>
              </View>
              <View style={{ flex: 1, marginStart: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={stylesCommon.sNameProfileText}>
                      Jigar Parmar
                    </Text>
                    <Text style={stylesCommon.sClassText}>
                      5th Grade | DPS4A-4586
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#41C183",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.INTER_SEMIBOLD,
                          fontSize: 16,
                          color: "white",
                        }}
                      >
                        P
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: "row",

                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={stylesCommon.sSubHeading}>Last Scan Time</Text>
                    <Text style={stylesCommon.sSubText}>09: 45 AM</Text>
                  </View>

                  <View>
                    <Text style={stylesCommon.sSubHeading}>Last Location</Text>
                    <Text style={stylesCommon.sSubText}>School Gate 1</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={{}}>
          <View>
            <View
              style={{
                backgroundColor: color.WHITE,
                marginTop: screenWidth / 2.9,
                //top: screenWidth / 2.9,
                marginHorizontal: 15,
                padding: 15,
                borderRadius: 15,
                elevation: 5,
              }}
            >
              <View>
                <Text style={stylesCommon.sProfileHeading}>
                  Personal Details
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#D0D5DD",
                  marginTop: 10,
                }}
              ></View>
              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Height</Text>
                <Text style={stylesCommon.sPersonalValue}>4.5"</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Weight</Text>
                <Text style={stylesCommon.sPersonalValue}>22.5 Kgs</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Blood Group</Text>
                <Text style={stylesCommon.sPersonalValue}>B+</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Date of Birth</Text>
                <Text style={stylesCommon.sPersonalValue}>
                  7th September, 2013
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: color.WHITE,
                marginTop: screenHeight / 35,
                // top: screenWidth / 2.6,
                marginHorizontal: 15,
                padding: 15,
                borderRadius: 15,
                elevation: 5,
              }}
            >
              <View>
                <Text style={stylesCommon.sProfileHeading}>
                  Contact Details
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#D0D5DD",
                  marginTop: 10,
                }}
              ></View>
              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Phone</Text>
                <Text style={stylesCommon.sPersonalValue}>+91 933030959</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Email</Text>
                <Text style={stylesCommon.sPersonalValue}>
                  maulikbhai@gmail.com
                </Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Address</Text>
                <Text style={stylesCommon.sPersonalValue}>
                  2248, Raipur Chakla, Nr City Garden, Gandhi Road, Rajkot
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: color.WHITE,
                marginTop: screenWidth / 15,
                marginBottom: 10,
                //top: screenWidth / 2,
                marginHorizontal: 15,
                padding: 15,
                borderRadius: 15,
                elevation: 5,
              }}
            >
              <View>
                <Text style={stylesCommon.sProfileHeading}>
                  Contact Details
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#D0D5DD",
                  marginTop: 10,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={stylesCommon.sParentText}>Mr.Maulik Parmar</Text>
                <Text style={stylesCommon.sParentSideText}>Father</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Phone</Text>
                <Text style={stylesCommon.sPersonalValue}>+91 933030959</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Email</Text>
                <Text style={stylesCommon.sPersonalValue}>
                  maulikbhai@gmail.com
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#D0D5DD",
                  marginTop: 10,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={stylesCommon.sParentText}>Mrs.Maulika Parmar</Text>
                <Text style={stylesCommon.sParentSideText}>Mother</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Phone</Text>
                <Text style={stylesCommon.sPersonalValue}>+91 933030959</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={stylesCommon.sPersonalText}>Email</Text>
                <Text style={stylesCommon.sPersonalValue}>
                  maulikbhai@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
