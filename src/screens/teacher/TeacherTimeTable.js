/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    KeyboardAvoidingView} from 'react-native';
import { color, icon } from '../../constant';
import { BackHandler } from 'react-native';
import { TimeTableView } from '../common/TimeTableView';

const today = new Date();

const TeacherTimeTable = ({ route, navigation }) => {
    /* Get the param */
    const { teacherData } = route.params;

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
        <SafeAreaView style={{
            backgroundColor: color.WHITE,
        }}>
            <KeyboardAvoidingView keyboardShouldPersistTaps='handled'>
                <View style={{
                    backgroundColor: color.WHITE,
                    height: '100%',
                }}>
                    <TimeTableView
                        dairyType={'teacher'}
                        navigation={navigation}
                        image={icon.IC_ADD}
                        tagAdd={'Add'}
                        sectionId={teacherData.classId}
                        class={teacherData.className + '-' + teacherData.section}
                        isShowClass={true} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default TeacherTimeTable;


