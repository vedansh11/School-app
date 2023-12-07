/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import { LoaderView } from '../../commonTheme/LoaderView';
import { AppText, color, fonts, icon, PreferenceKeys } from '../../constant';
import stylesCommon from '../../commonTheme/stylesCommon';
import { BackHandler } from 'react-native';
import { DashboardHeaderView } from '../../commonTheme/HeaderView';
import { DashboardRawDetailMenu } from '../../commonTheme/CommonView';
import * as Preference from '../../storeData/Preference';
import * as Utills from '../../API/Utills';
import { axiosCallAPI } from '../../API/axiosCommonService';
import { vw } from '../../Utills/dimesnion';
import ImageLoad from 'react-native-image-placeholder';

const ParentDashboard = ({ navigation }) => {

    const [dataList, setDataList] = useState([]);
    const [loaderView, setLoaderView] = useState(false);


    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        studentListAPI()
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, [dataList]);

    function handleBackButtonClick() {
        BackHandler.exitApp()
        return true;
    }

    function NavigateToTimeTable(data) {
        Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data))
        navigation.navigate('ParentTimeTable', { parentData: data })
    }
    function NavigateToDairy(data) {
        Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data))
        navigation.navigate('ParentDairy', { diaryData: data })
    }
    function NavigateToAttendance(data) {
        Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data))
        navigation.navigate('ParentAttendance', { attendanceData: data })
    }
    function NavigateToSuppport(data){
        Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data))
        navigation.navigate('ParentSupport')
    }
    function NavigateToPayment(data){
        Preference.SetData(PreferenceKeys.STUDENT_DETAIL, JSON.stringify(data))
        navigation.navigate('Payment')
    }

    async function studentListAPI() {
        setLoaderView(true)
        let requestOptions = {
            headers: {
                Accept: 'application/json',
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };

        axiosCallAPI('get', Utills.STUDENT_LIST, '', requestOptions, true, navigation)
            .then(response => {
                console.log(response);
                if (response !== undefined) {
                    setLoaderView(false)
                    if (JSON.stringify(dataList) != JSON.stringify(response.result))
                        setDataList(response.result)
                } else {
                    setLoaderView(false)
                }

            }).catch(error => {
                setLoaderView(false)
            });
    }

    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "First Item",
            color: '#ECFEFF',
            secondaryColor: '#0BB5BF'
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Second Item",
            color: '#ECFEFF',
            secondaryColor: '#0BB5BF'
        },

    ];

    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <View style={stylesCommon.rawMainView}>
                <View style={{
                    backgroundColor: color.LIGHT_BACKGROUND,
                    flex: 0.75,
                    borderRadius: 7,
                    paddingStart: 15,
                    paddingEnd: 10,
                    paddingTop:10,paddingBottom:10,
                    flexDirection: 'row',
                }}>
                    <ImageLoad style={stylesCommon.studentProfile}
                        source={{uri:item.profilePic_path}}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        borderRadius={40}
                        placeholderStyle={stylesCommon.studentProfile}
                        >
                    </ImageLoad>
                    <View style={{marginHorizontal:vw(10),  alignSelf:'center',flex:1}}>
                        <Text style={stylesCommon.nameText}>{item.student_name}</Text>
                        <Text style={stylesCommon.deptmentText}>{item.enrollmentNo}</Text>
                        <Text style={stylesCommon.deptmentText}>{'Class : '+item.className+" - "+item.sectionName}</Text>
                        {/* <View style={stylesCommon.infoRaw}>
                            <View style={stylesCommon.infoColumn}>
                                <Text style={stylesCommon.tiitleText}>{'Last Scane Time'}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    marginTop: 2,
                                    fontFamily: fonts.LATO_BOLD,
                                    color: item.secondaryColor,
                                }}>{'09: 45 AM '}</Text>
                            </View>
                            <View style={stylesCommon.infoColumn}>
                                <Text style={stylesCommon.tiitleText}>{'Last Location'}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    marginTop: 2,
                                    fontFamily: fonts.LATO_BOLD,
                                    color: item.secondaryColor,
                                }}>{'School Gate'}</Text>
                            </View>
                        </View> */}
                    </View>
                </View>
                <View style={stylesCommon.lineView}></View>

                <DashboardRawDetailMenu
                    isShowHelp={true}
                    isShowFees={true}
                    isShowTimeTable={true}
                    isShowNote={true}
                    isShowCalendar={true}
                    isShowStudent={false}
                    onSupportClick={() => NavigateToSuppport(item)}
                    onNoteClick={() => NavigateToDairy(item)}
                    onAttendanceClick={() => NavigateToAttendance(item)}
                    onTimeTableClick={() => NavigateToTimeTable(item)}
                    onPaymentClick={() => NavigateToPayment(item)}
                />

            </View>

        );
    };



    return (
        <SafeAreaView style={stylesCommon.safeAreaStyle}>
            <StatusBar backgroundColor={color.APP_PRIMARY} />

            {/* Dashboard Header view UI */}
            <DashboardHeaderView titile={AppText.DASHBOARD}
                type={'parent'}
                navigation={navigation} />

            <FlatList
                data={dataList}
                renderItem={renderItem}
                style={stylesCommon.dashList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<LoaderView color={color.PROGRESS_GREY} />}
                keyExtractor={(item, index) => index}
            />

        </SafeAreaView>
    );
};


export default ParentDashboard;
