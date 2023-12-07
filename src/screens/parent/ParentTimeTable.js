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
} from 'react-native';
import { AppText, color, fonts, icon, PreferenceKeys } from '../../constant';
import stylesCommon from '../../commonTheme/stylesCommon';
import { BackHandler } from 'react-native';
import { SchoolDetailHeaderView } from '../../commonTheme/HeaderView';
import { DashboardRawDetailMenu, TitileBackgroundView } from '../../commonTheme/CommonView';
import * as Preference from '../../storeData/Preference';
import { TimeTableView } from '../common/TimeTableView';

const ParentTimeTable = ({ route, navigation }) => {
    const { parentData } = route.params;

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    });

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

    return (
        <TimeTableView
            dairyType={'parent'}
            navigation={navigation}
            sectionId={parentData.classId}
            isShowClass={false} />
    );
};

export default ParentTimeTable;
