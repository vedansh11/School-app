/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

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
  Animated,
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";

import { BackHandler } from "react-native";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
  RenderItemSupport,
} from "../../commonTheme/CommonView";
import * as Preference from "../../storeData/Preference";
import { DairyView } from "../common/DairyView";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TeacherSupportTabCommon from "../teacher/TeacherSupportTab";
import stylesCommon, { SCREEN_WIDTH } from "../../commonTheme/stylesCommon";
import { screenWidth } from "../../Utills/dimesnion";
const ParentSupport = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  var StudentID;
  var sectionId;
  useEffect(() => {
    Preference.GetData(PreferenceKeys.STUDENT_DETAIL).then(
      (student_details) => {
        StudentID = JSON.parse(student_details).id;
        sectionId = JSON.parse(student_details).sectionId;
        console.log(">>>>>" + student_details);
      }
    );
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
  function onSupportClick(requestID) {
    navigation.navigate("ParentSupportDetails", {
      requestID: requestID,
    });
  }
  function AddNewRequest() {
    navigation.navigate("ParentAddNewRequest");
  }

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      isRead: true,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      isRead: true,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
    {
      title: "Second Item",
      isRead: false,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View>
        <RenderItemSupport />
      </View>
      // <View style={[stylesCommon.rawMainView,{justifyContent:'center'}]}>
      // <View style={{
      //     flex:0.95,
      //     backgroundColor: color.WHITE,
      //     borderRadius: 7,
      //     paddingStart: 15,
      //     paddingEnd: 10,
      //     paddingTop:10,
      //     paddingBottom:10,
      //     flexDirection: 'column',
      // }}>
      //     <Text style={{
      //         color:color.DARK_TEXT,
      //         fontSize:16,
      //         fontFamily:fonts.LATO_REGULAR
      //     }}>
      //     Created by Mr. Aadarsh Solanki
      //     </Text>
      //     <Text style={{
      //         color:color.DARK_TEXT,
      //         fontSize:12,
      //         fontFamily:fonts.LATO_REGULAR,
      //         marginTop:2
      //     }}>
      //     #DPSJ45286
      //     </Text>
      //     <Text style={{
      //         color:color.TEXT_COLOR,
      //         fontFamily:fonts.LATO_REGULAR,
      //         marginTop:10,
      //         fontSize:11,
      //         marginEnd:20,
      //     }}>
      //   {'Amet minim mollit non deserunt ullamco est sit\naliqua dolor do amet sint. ..'}
      //     </Text>
      // </View>

      // <Image style={{
      //     height:16,
      //     width:10,
      //     resizeMode:'contain',
      //     marginEnd:20,
      //     alignSelf:'baseline',
      //     end:0,
      //     position:'absolute'
      // }}
      // source={icon.IC_SIDE_ARROW}></Image>
      // <Text style={{
      //         color:color.GREY,
      //         fontSize:10,
      //         fontFamily:fonts.LATO_REGULAR,
      //         marginTop:10,
      //         marginEnd:20,
      //         end:0,
      //         top:0,
      //         position:'absolute'
      //     }}>
      //    April  2, 2022
      //     </Text>
      // </View>
    );
  };
  const MyTabBar = ({ state, descriptors, navigation, position }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#EEEDF8",
          borderRadius: 50,
          width: screenWidth - 100,
          flex: 0.07,
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

                marginStart: 6,
                marginEnd: 15,
                marginTop: 5,
                marginBottom: 5,

                borderRadius: 49,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: isFocused ? 2 : 0 },
                shadowOpacity: isFocused ? 0.2 : 0,
                elevation: isFocused ? 2 : 0,
              }}
            >
              <Animated.Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.INTER,
                  fontWeight: "700",
                  color: isFocused ? color.DARK_TEXT : color.GREY,
                  paddingVertical: 7,
                  // marginHorizontal:10,
                  paddingHorizontal: 15,
                }}
              >
                {label}
              </Animated.Text>

              {/* </View> */}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const MyTabs = () => {
    return (
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name="SupportNew"
          upperCaseLabel={false}
          component={TeacherSupportTabCommon}
          initialParams={{
            type: "New",
            role: "parent",
            id: StudentID,
            sectionID: sectionId,
          }}
          options={{ tabBarLabel: "New" }}
        />
        <Tab.Screen
          name="SupportReplied"
          upperCaseLabel={false}
          component={TeacherSupportTabCommon}
          initialParams={{
            type: "Replied",
            role: "parent",
            id: StudentID,
            sectionID: sectionId,
          }}
          options={{ tabBarLabel: "Replied" }}
        />
        <Tab.Screen
          name="SupportClosed"
          upperCaseLabel={false}
          component={TeacherSupportTabCommon}
          initialParams={{
            type: "Closed",
            role: "parent",
            id: StudentID,
            sectionID: sectionId,
          }}
          options={{ tabBarLabel: "Closed" }}
        />
      </Tab.Navigator>
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
            flexDirection: "column",
            marginTop: Platform.OS === "ios" ? -0 : 0,
            flex: 1,
          }}
        >
          <TitileBackgroundView
            titile={"Support"}
            secondViewImage={icon.IC_ADD}
            isSecondviewRequired={true}
            tagAddSecond={"Request"}
            onSecondViewClick={AddNewRequest}
          />
          <View
            style={{
              marginStart: 15,
              marginEnd: 15,
              flexDirection: "row",
              flex: 1,
              backgroundColor: color.WHITE,
            }}
          >
            {MyTabs()}

            <View
              style={{
                backgroundColor: "#EEEDF8",
                //  backgroundColor: "#fff",
                width: screenWidth / 4,
                height: 39,
                borderTopEndRadius: 50,
                borderBottomEndRadius: 50,
                position: "absolute",
                right: 0,
              }}
            />
          </View>
          {/* <FlatList
                    data={DATA}
                    renderItem={(item) =>
                        <RenderItemSupport
                            createdName={'Created by Mr. Aadarsh Solanki'}
                            supportDiscription={'Amet minim mollit non deserunt ullamco est sit\naliqua dolor do amet sint. ..'}
                            NumberDSP={'#DPSJ45286'}
                            date={'April  2, 2022'}
                            onClick = {onSupportClick}
                        />}
                    style={{
                        marginStart: 20,
                        marginEnd: 20,
                        marginTop: 10,
                        marginBottom: 30,
                    }}
                    showsVerticalScrollIndicator={false}
                /> */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ParentSupport;
