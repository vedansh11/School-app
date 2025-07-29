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
  Modal,
  ScrollView,
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../../constant";
import { BackHandler } from "react-native";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
  RenderItemSupport,
  ModelTitleView,
  ButtonView,
} from "../../commonTheme/CommonView";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import stylesCommon, { SCREEN_WIDTH } from "../../commonTheme/stylesCommon";
import OrdersTab from "./OrderTabs";
import { screenHeight, screenWidth, vh, vw } from "../../Utills/dimesnion";
import SelectDropdown from "react-native-select-dropdown";
import { OutlinedTextField } from "react-native-material-textfield-plus";
import { ms } from "react-native-size-matters";
import { ProductHeader } from "../common/ProductHeader";

const Orders = (navigation) => {
  //const sectionID = navigation.route.params.supportData.id;
  const sectionID = 1; //for dummy
  const Tab = createMaterialTopTabNavigator();

  const [ModalVisible, setModalVisible] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [message, setMessage] = useState("");

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

  const MyTabBar = ({ state, descriptors, navigation, position }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#EEEDF8",
          borderRadius: 50,
          width: screenWidth - ms(20),
          flex: 0.07,
          alignItems: "center",
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
                marginEnd: 4,

                borderRadius: ms(50),
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: isFocused ? 2 : 0 },
                shadowOpacity: isFocused ? 0.2 : 0,
                elevation: isFocused ? 2 : 0,
              }}
            >
              <Animated.Text
                style={{
                  fontSize: ms(12),
                  fontFamily: fonts.INTER_MEDIUM,

                  color: isFocused ? color.DARK_TEXT : color.GREY,
                  paddingVertical: 7,
                  // marginHorizontal:10,
                  paddingHorizontal: 12,
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
      <>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen
            name="ActiveOrders"
            upperCaseLabel={false}
            component={OrdersTab}
            initialParams={{
              type: "ActiveOrders",
              role: "teacher",
              sectionid: sectionID,
            }}
            options={{ tabBarLabel: "Active Orders" }}
          />
          <Tab.Screen
            name="PastOrders"
            upperCaseLabel={false}
            component={OrdersTab}
            initialParams={{
              type: "PastOrders",
              role: "teacher",
              sectionid: sectionID,
            }}
            options={{ tabBarLabel: "Past Orders" }}
          />
          <Tab.Screen
            name="CancelOrders"
            upperCaseLabel={false}
            component={OrdersTab}
            initialParams={{
              type: "CancelOrders",
              role: "teacher",
              sectionid: sectionID,
            }}
            options={{ tabBarLabel: "Cancel Orders" }}
          />
        </Tab.Navigator>
      </>
    );
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      <ProductHeader
        title={"Orders"}
        type={"ecommerce"}
        navigation={navigation}
        screen={"Products"}
        // showAddress={true}
      />
      <View
        style={{
          marginHorizontal: ms(10),
          flexDirection: "row",
          marginTop: ms(20),
          flex: 1,
          backgroundColor: color.WHITE,
        }}
      >
        <View style={{ flex: 1, zIndex: 10 }}>{MyTabs()}</View>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
