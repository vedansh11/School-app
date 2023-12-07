/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import { color, fonts, PreferenceKeys } from '../../constant';
import stylesCommon, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../commonTheme/stylesCommon';
import ProgressCircle from 'react-native-progress-circle'
import { axiosCallAPI } from '../../API/axiosCommonService';
import * as Utills from '../../API/Utills';
import * as Preference from '../../storeData/Preference';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';


const AttendanceTrends = ({ route, navigation }) => {

    const { studentData } = route.params;

    const [prevMonth , setPrevMonth] = useState("0%")
    const [prevYear , setPrevYear] = useState("0%")

    useEffect(() =>{
        PresentCountAPI()
    })

    async function PresentCountAPI() {
        let requestOptions = {
            headers: {
                Accept: 'application/json',
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };

        axiosCallAPI('get', Utills.ATTENDANCE_PRESENT_COUNT+ '?studentId=' + studentData.id+'&sectionId='+studentData.sectionId, '', requestOptions, true, navigation)
            .then(response => {
                setPrevMonth(response.previou_month)
                setPrevYear(response.year_to_date)
            })
    }

    const AttendanceProgress = (text, progress, progressColor) => {
        return (
            <View style={styles.mainView}>
                <Text style={styles.textStyle}>{text}</Text>

                <ProgressCircle
                    percent={parseFloat(progress)}
                    radius={50}
                    borderWidth={6}
                    color={progressColor}
                    shadowColor={color.LIGHT_GREY}
                    bgColor={color.WHITE}
                >
                    <Text style={styles.percentageText}>{progress}</Text>
                </ProgressCircle>
            </View>
        )
    }

    return (
        <SafeAreaView style={stylesCommon.safeAreaStyle}>
            <StatusBar backgroundColor={color.APP_PRIMARY} />
            <View style={styles.container}>
                {AttendanceProgress('Previous Month', prevMonth, color.APP_SECONDARY)}
                {AttendanceProgress('Year to Date', prevYear, color.APP_PRIMARY)}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainView: {
        backgroundColor: color.WHITE,
        borderRadius: 15,
        alignItems: "center",
        borderWidth: 1,
        borderColor: color.GREY,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: SCREEN_HEIGHT / 4.5,
        width: SCREEN_WIDTH / 2.3,
        justifyContent: 'space-around'
    },
    textStyle: {
        fontSize: 15,
        fontFamily: fonts.LATO_REGULAR,
        fontWeight: '600',
        marginBottom: -20,
        color: color.TEXT_COLOR
    },
    percentageText: {
        fontSize: 20,
        fontFamily: fonts.LATO_REGULAR,
        fontWeight: '600',
        color: color.PER_GREY
    }

});

export default AttendanceTrends;
