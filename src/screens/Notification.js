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
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";
import { AppText, color, fonts, icon, PreferenceKeys } from "../constant";
import stylesCommon from "../commonTheme/stylesCommon";
import { BackHandler } from "react-native";
import { SchoolDetailHeaderView } from "../commonTheme/HeaderView";
import {
  DashboardRawDetailMenu,
  TitileBackgroundView,
} from "../commonTheme/CommonView";
import * as Preference from "../storeData/Preference";
import * as Utills from "../API/Utills";
import { axiosCallAPI } from "../API/axiosCommonService";
import HTMLView from "react-native-htmlview";

const Notification = ({ navigation }) => {
    const VIEWABILITY_CONFIG = {
        minimumViewTime: 3000,
        viewAreaCoveragePercentThreshold: 100,
        waitForInteraction: true,
      };
  const PER_PAGE = 10;
  var PAGE = 1;
  const [listData, setListData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadMore, setLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    console.log(currentPage);
    GetNotificationData("true");
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
   
  }, [currentPage]);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  // HomeNavigation = () => {
  //     navigation.goBack()
  // }

  async function GetNotificationData(isLoaderShow) {
  //  console.log(Utills.NOTIFICATION + "?per_page=" + PER_PAGE + "&page=" + PAGE+", total "+totalPages);
  
    let requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
 //   Alert.alert("API",Utills.NOTIFICATION + "?per_page=" + PER_PAGE + "&page=" + PAGE+", total "+totalPages+", "+isLoaderShow);
    axiosCallAPI(
      "get",
      Utills.NOTIFICATION + "?per_page=" + PER_PAGE + "&page=" + currentPage,
      "",
      requestOptions,
      false,
      navigation
    ).then((response) => {
        console.log(response);
      setTotalPages(response.pages);
      setLoadMore(false);
        var currentdata = [...listData];
        var finalarray = currentdata.concat(response.result);
      setListData(finalarray);
    });
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
  function LoadMoreData (){
   
  
        if (currentPage < totalPages) {
      
            setCurrentPage(currentPage+1)
           
          setLoadMore(true);
         
       
        }
      
  }
  const renderFooter = () => (
    <View style={styles.footerText}>
        {(currentPage < totalPages) && <ActivityIndicator color={color.COLOR_PRIMARY}   size="large"/>}
        {/* {(currentPage == totalPages) && <Text>No more articles at the moment</Text>} */}
    </View>
)
  const keyExtractor = ({ id }) => String(id);
  const renderItem = ({ item }) => {
    return (
      <View style={stylesCommon.rawMainView}>
        <View
          style={{
            backgroundColor:
              item.isRead == "0" ? color.COLOR_SECONDARY : color.WHITE,
            flex: 0.75,
            borderRadius: 7,
            paddingStart: 15,
            paddingEnd: 10,
            minHeight: 60,
            flexDirection: "row",
          }}
        >
          {item.isRead == "0" ? (
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Image
                style={{
                  height: 42,
                  width: 42,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
                source={icon.IC_NOTIFICATION_ROUND}
              ></Image>
              <Image
                source={icon.IC_NOTIFICATION_POINT}
                style={{
                  height: 8,
                  width: 8,
                  top: 3,
                  resizeMode: "contain",
                  position: "absolute",
                  end: 2,
                }}
              ></Image>
            </View>
          ) : (
            <Image
              style={{
                height: 42,
                width: 42,
                resizeMode: "contain",
                alignSelf: "center",
              }}
              source={icon.IC_NOTIFICATION_ROUND}
            ></Image>
          )}

          <View style={stylesCommon.margin10View}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.LATO_BOLD,
                color: color.BLACK,
              }}
            >
              {item.type}
            </Text>
            {/* <Text style={{
                            fontSize: 12,
                            marginTop: 2,
                            marginEnd: 50,
                            fontFamily: fonts.LATO_BOLD,
                            color: color.TEXT_COLOR,
                        }}>{item.notificationText}</Text> */}
            <HTMLView value={"<p>" + item.notificationText + "</p>"} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      {/* Dashboard Header view UI */}
      <SchoolDetailHeaderView
        titile={AppText.NOTIFICATION}
        type={"parent"}
        navigation={navigation}
        screen={"Notification"}
      />
      <View
        style={{
          flexDirection: "column",
          marginTop: Platform.OS === "ios" ? -50 : 0,
          flex:1
        }}
      >
        {/* <TitileBackgroundView
                    titile={'Notifications'}
                /> */}
        <FlatList
          data={listData}
          renderItem={renderItem}
          style={{
            paddingStart: 20,
            paddingEnd: 20,
            paddingTop: 10,
            paddingBottom: 30,
          
          }} 
          showsVerticalScrollIndicator={false}
          onEndReached={ LoadMoreData}
          onEndReachedThreshold={0.1}
          keyExtractor={keyExtractor}
          ListFooterComponent={renderFooter}
        extraData={listData}
        />
      
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    footerText: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    loading: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
});
export default Notification;
