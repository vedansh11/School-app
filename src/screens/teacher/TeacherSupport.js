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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import stylesCommon, { SCREEN_WIDTH } from "../../commonTheme/stylesCommon";
import TeacherSupportTabCommon from "./TeacherSupportTab";

const TeacherSupport = ( navigation ) => {
  const sectionID = navigation.route.params.supportData.id;
  const Tab = createMaterialTopTabNavigator();

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
    navigation.navigation.goBack();
    return true;
  }

  const CreateMyTab = (type) => <TeacherSupportTabCommon type={type} />;

  const MyTabBar = ({ state, descriptors, navigation, position }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: color.COLOR_SECONDARY,
          justifyContent: "space-around",
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
                backgroundColor: isFocused
                  ? color.WHITE
                  : color.COLOR_SECONDARY,
                 width: SCREEN_WIDTH / 3.1,
                
                paddingTop: 12,
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
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
                    fontSize: 16,
                    fontFamily: fonts.LATO_REGULAR,
                    fontWeight: "700",
                    color: isFocused ? color.DARK_TEXT : color.GREY,
                  }}
                >
                  {label}
                </Animated.Text>
                {isFocused ? (
                  <View
                    style={{
                      backgroundColor: color.COLOR_PRIMARY,
                      height: 1,
                      marginTop: 12,
                      width: SCREEN_WIDTH / 8,
                    }}
                  />
                ) : null}
              </View>
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
          initialParams={{ type: "New", role:"teacher", sectionid : sectionID }}
          options={{ tabBarLabel: "New" }}
        />
        <Tab.Screen
          name="SupportReplied"
          upperCaseLabel={false}
          component={TeacherSupportTabCommon}
          initialParams={{ type: "Replied", role:"teacher",sectionid : sectionID }}
          options={{ tabBarLabel: "Replied" }}
        />
        <Tab.Screen
          name="SupportClosed"
          upperCaseLabel={false}
          component={TeacherSupportTabCommon}
          initialParams={{ type: "Closed", role:"teacher",sectionid : sectionID }}
          options={{ tabBarLabel: "Closed" }}
        />
      </Tab.Navigator>
    );
  };
  return (
    // <SafeAreaView style={{backgroundColor:color.WHITE}}>
    //   <StatusBar backgroundColor={color.APP_PRIMARY} />
    //   <SchoolDetailHeaderView
    //     titile={AppText.DASHBOARD}
    //     type={"parent"}
    //     navigation={navigation}
    //     screen={"ParentSupport"}
    //   />
    //   <View
    //     style={{

    //       marginTop: Platform.OS === "ios" ? -50 : 0,

    //     }}
    //   >
    //     <TitileBackgroundView
    //       titile={"Support"}  />
    //         <View style={{backgroundColor:color.COLOR_LIGHT,alignItems:"center",alignContent:"center",justifyContent:"center"}}>
    //         {/* {MyTabs()} */}
    //         <Text>Hello</Text>
    //         </View>

    //   </View>
    // </SafeAreaView>
    <>
    <SafeAreaView style={{ flex: 0, 
        backgroundColor: color.APP_PRIMARY}} /> 
    <SafeAreaView style={{ backgroundColor: color.WHITE, flex: 1 }}>
      <StatusBar backgroundColor={color.APP_PRIMARY}
       />
    
        <SchoolDetailHeaderView
        titile={AppText.DASHBOARD}
        type={"teacher"}
        navigation={navigation.navigation}
        screen={"TeacherSupport"}
      /> 
      <TitileBackgroundView titile={"Support"} />
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        flex:1, backgroundColor:color.COLOR_SECONDARY

        }}
      >
        {MyTabs()}
      </View> 
    </SafeAreaView>
    </>
  );
};

export default TeacherSupport;
