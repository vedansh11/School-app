/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Image, TextInput, TouchableOpacity, Platform } from "react-native";

import { AppText, color, fonts, icon, PreferenceKeys } from '../../constant';
import stylesCommon from '../../commonTheme/stylesCommon';
import { BackHandler } from 'react-native';
import { LoaderButtonView } from '../../commonTheme/LoaderView';
import { SchoolDetailHeaderView } from '../../commonTheme/HeaderView';
import { DashboardRawDetailMenu, TitileBackgroundView, ModelTitleView, ButtonView } from '../../commonTheme/CommonView';
import * as Preference from '../../storeData/Preference';
import { DairyView } from '../common/DairyView';
import DatePicker from 'react-native-date-picker'
import { normalize, screenHeight, vh, vw } from '../../Utills/dimesnion';
import { axiosCallAPI } from '../../API/axiosCommonService';
import * as Utills from '../../API/Utills';
import moment from 'moment'
import {
    OutlinedTextField,
} from 'react-native-material-textfield-plus';

const TeacherDairy = ({ route, navigation }) => {
    console.log("_______________");
    console.log(route.params);
    console.log("_______________");
    /* Get the param */
    const { diaryData } = route.params;

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
        <View style={{
            backgroundColor: color.WHITE,
            height: '100%',
        }}>
            <DairyView
                dairyType={'teacher'}
                navigation={navigation}
                image={icon.IC_SYNC}
                secondViewImage={icon.IC_ADD}
                isSecondviewRequired={true}
                tagAddSecond={'Add Diary'}
                sectionId={diaryData.id}
                classID={diaryData.classId}
                class={diaryData.className +'-'+diaryData.section}
                isShowClass={true} />

        </View>
    );
};

export default TeacherDairy;

