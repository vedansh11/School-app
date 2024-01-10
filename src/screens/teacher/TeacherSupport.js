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
import TeacherSupportTabCommon from "./TeacherSupportTab";
import { screenHeight, screenWidth, vh, vw } from "../../Utills/dimesnion";
import SelectDropdown from "react-native-select-dropdown";
import { OutlinedTextField } from "react-native-material-textfield-plus";

const TeacherSupport = (navigation) => {
  const sectionID = navigation.route.params.supportData.id;
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

  const CreateMyTab = (type) => <TeacherSupportTabCommon type={type} />;

  const VedanshTabBar = ({ state, descriptors, navigation, position }) => {
    return <Text>Hi</Text>;
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
      <>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen
            name="SupportNew"
            upperCaseLabel={false}
            component={TeacherSupportTabCommon}
            initialParams={{
              type: "New",
              role: "teacher",
              sectionid: sectionID,
            }}
            options={{ tabBarLabel: "New" }}
          />
          <Tab.Screen
            name="SupportReplied"
            upperCaseLabel={false}
            component={TeacherSupportTabCommon}
            initialParams={{
              type: "Replied",
              role: "teacher",
              sectionid: sectionID,
            }}
            options={{ tabBarLabel: "Replied" }}
          />
          <Tab.Screen
            name="SupportClosed"
            upperCaseLabel={false}
            component={TeacherSupportTabCommon}
            initialParams={{
              type: "Closed",
              role: "teacher",
              sectionid: sectionID,
            }}
            options={{ tabBarLabel: "Closed" }}
          />
        </Tab.Navigator>
      </>
    );
  };

  const AddSupportRequest = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ModalVisible}
          onRequestClose={() => setModalVisible(!ModalVisible)}
        >
          <View
            style={{
              height: "100%",
              position: "absolute",
              //paddingTop: vh(screenHeight / 50),
              start: 0,
              end: 0,

              backgroundColor: "rgba(0,0,0,0.3)",
              //backgroundColor: color.YELLOW,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {/* <ScrollView
            //keyboardShouldPersistTaps="handled"
            // keyboardDismissMode={"on-drag"}
            //showsVerticalScrollIndicator={true}
            > */}
            <View style={stylesCommon.supportModalView}>
              <ModelTitleView
                tiitle={AppText.AddSupportRequest}
                onPressClose={() => setModalVisible(false)}
              />
              <View style={{ marginBottom: 20, width: "100%" }}>
                <View style={stylesCommon.inputMainView}>
                  <SelectDropdown
                    data={[
                      "Navrachna Primary School",
                      "DonBosco School",
                      "ST Basil",
                    ]}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem.id);
                      //setSchool(selectedItem.id);
                    }}
                    defaultButtonText={"Select School"}
                    // buttonTextAfterSelection={(selectedItem,index)=>{
                    //   return selectedItem.schoolName
                    // }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: 20,
                      color: color.DARK_TEXT,
                      fontFamily: fonts.INTER,
                    }}
                    buttonStyle={stylesCommon.dropdownStyle}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <View
                          style={{
                            resizeMode: "contain",
                            height: "100%",
                            paddingEnd: 15,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={stylesCommon.dropImage}
                            source={icon.IC_DOWN_ARROW}
                          ></Image>
                        </View>
                      );
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={{ backgroundColor: color.WHITE }}
                    rowStyle={{
                      backgroundColor: color.WHITE,
                      borderBottomWidth: 0,
                    }}
                    rowTextStyle={{
                      color: color.DARK_TEXT,
                      textAlign: "left",
                      fontFamily: fonts.INTER,
                      paddingHorizontal: vw(10),
                    }}
                  />
                  <View style={stylesCommon.inputMainView}>
                    <OutlinedTextField
                      label={"Message"}
                      tintColor={color.APP_PRIMARY}
                      selectionColor={color.APP_PRIMARY}
                      height={50}
                      multiline={true}
                      editable={true}
                      keyboardShouldPersistTaps={"always"}
                      keyboardDismissMode={"on-drag"}
                      returnKeyType="return"
                      autoFocus={false}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      // backgroundColor: color.YELLOW,
                      marginTop: 5,
                    }}
                  >
                    <TouchableOpacity
                      style={stylesCommon.supportPrimaryButtonBackground}
                    >
                      <Text style={stylesCommon.primaryButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={stylesCommon.supportPrimaryButtonBackground}
                    >
                      <Text style={stylesCommon.primaryButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* </ScrollView> */}
          </View>
        </Modal>
      </View>
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
      <SafeAreaView style={{ flex: 0, backgroundColor: color.APP_PRIMARY }} />
      <SafeAreaView style={stylesCommon.safeAreaStyle}>
        <StatusBar backgroundColor={color.APP_PRIMARY} />

        <SchoolDetailHeaderView
          titile={AppText.DASHBOARD}
          type={"teacher"}
          navigation={navigation.navigation}
          screen={"TeacherSupport"}
        />
        <TitileBackgroundView
          titile={"Support"}
          isSecondviewRequired={true}
          secondViewImage={icon.IC_ADD}
          tagAddSecond={"Request"}
          onSecondViewClick={() => {
            setModalVisible(true);
          }}
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

        {ModalVisible && AddSupportRequest()}
      </SafeAreaView>
    </>
  );
};

export default TeacherSupport;
