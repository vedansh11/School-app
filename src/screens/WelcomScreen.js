/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { color, icon, PreferenceKeys, AppText, fonts } from '../constant';
import stylesCommon from '../commonTheme/stylesCommon';
import { BackHandler } from 'react-native';
import * as Preference from '../storeData/Preference';
import {
    TextField,
    FilledTextField,
    Button,
    OutlinedTextField,
} from 'react-native-material-textfield-plus';
import OTPTextView from 'react-native-otp-textinput';
import CheckBox from '@react-native-community/checkbox';

const WelcomScreen = ({ navigation }) => {

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    function handleBackButtonClick() {
        BackHandler.exitApp()
        return true;
    }

    ParentScreeenNavigate = () => {
        Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, 'true')
        Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, 'false')
        navigation.navigate('ParentDashboard')
    }
    TeacherScreeenNavigate = () => {
        Preference.SetData(PreferenceKeys.IS_TEACHER_LOGIN, 'true')
        Preference.SetData(PreferenceKeys.IS_PARENTS_LOGIN, 'false')
        navigation.navigate('TeacherDashboard')
    }

    return (
        <SafeAreaView style={stylesCommon.safeAreaStyle}>
            <View style={stylesCommon.MainContainer}>
                <Image style={stylesCommon.backgroundStyle}
                    source={icon.BACKGROUND} />
                <Text style={stylesCommon.welcomTextStyle}> {AppText.WELCOM_TEXT} </Text>
                <View style={stylesCommon.whiteCornerStyle}>
                    <TouchableOpacity style={stylesCommon.parentViewStyle}
                        onPress={() => ParentScreeenNavigate()}>
                        <Image style={stylesCommon.continueImage}
                            source={icon.IC_PARENT}>
                        </Image>
                        <Text style={stylesCommon.continueTextStyle}> {AppText.CONTINUE_PARENT.toUpperCase()} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesCommon.teacherViewStyle}
                        onPress={() => TeacherScreeenNavigate()}>
                        <Image style={stylesCommon.continueImage}
                            source={icon.IC_TEACHER}>
                        </Image>
                        <Text style={stylesCommon.continueTextStyle}> {AppText.CONTINUE_TEACHER.toUpperCase()} </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView >
    );
}

export default WelcomScreen;