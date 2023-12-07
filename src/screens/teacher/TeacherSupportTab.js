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
import { color, PreferenceKeys, ROLEID, SUPPORT_TYPE } from "../../constant";
import { RenderItemSupport } from "../../commonTheme/CommonView";
import { LoaderViewWithBackground_new, EmptyView } from "../../commonTheme/LoaderView";
import * as Preference from '../../storeData/Preference';
import * as Utills from '../../API/Utills';
import { axiosCallAPI } from '../../API/axiosCommonService';
import moment from "moment";
import stylesCommon from '../../commonTheme/stylesCommon';

const TeacherSupportTabCommon = (props) => {
    const [listData, setListData] = useState([]);
    const [backgroundLoaderView, setBackgroundLoaderView] = useState(false);
    const [noData, setNoData] = useState(false);
    const Type = props.route.params.type;
    const Role = props.route.params.role;
    const sectionID = props.route.params.sectionid;
    // const ID = props.route.params.id;

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            // do something
            if (Role === 'parent') {
                Preference.GetData(PreferenceKeys.STUDENT_DETAIL).then((student_details) => {
                    const StudentID = JSON.parse(student_details).id;
                    const sectionID = JSON.parse(student_details).sectionId;
                    console.log(StudentID);
                    if (Type === 'Replied') {
                        GetReplyData(StudentID, sectionID);
                    }
                    else {
                        GetSupportData(StudentID, sectionID);
                    }
                })
            }
            else {
                Preference.GetData(PreferenceKeys.CURRENT_USERID).then((teacher_id) => {
                    //   const StudentID = JSON.parse(student_details).id;
                    if (Type === 'Replied') {
                        GetReplyData(teacher_id, sectionID);
                    }
                    else {
                        GetSupportData(teacher_id, sectionID);
                    }
                })
            }
        });

        return unsubscribe;
    }, [props.navigation]);

    async function GetReplyData(ID, sectionID) {
        setBackgroundLoaderView(true)
        const roleId = (Role == 'parent' ? ROLEID.PARENT : ROLEID.TEACHER)
        const studentId = ID
        let requestOptions = {
            headers: {
                Accept: 'application/json',
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };
        axiosCallAPI('get', Utills.GET_REPLIED_DATA + "?roleId=" + roleId + "&studentId=" + studentId + "&sectionId=" + sectionID, '', requestOptions, true, props.navigation)
            // axiosCallAPI('get', Utills.GET_SUPPORT_DATA, p.toString(), requestOptions, true, props.navigation)
            .then(response => {
                console.log(response);
                setBackgroundLoaderView(false)
                if (response !== undefined) {

                    if (response.result.length > 0) {
                        setNoData(false)
                        setListData(response.result)
                    }
                    else {
                        setNoData(true)
                        setListData(response.result)
                    }
                    //setLoaderView(false)
                    // if (JSON.stringify(dataList) != JSON.stringify(response.result))
                    //     setDataList(response.result)
                } else {
                    //setLoaderView(false)
                    setNoData(true)
                }

            }).catch(error => {
                console.log(error);
                setBackgroundLoaderView(false)
                // setLoaderView(false)
            });
    }

    async function GetSupportData(ID, sectionID) {

        setBackgroundLoaderView(true)

        const roleId = (Role == 'parent' ? ROLEID.PARENT : ROLEID.TEACHER)
        const studentId = ID
        const type = (Type === "New" ? SUPPORT_TYPE.NEW : Type === 'Closed' ? SUPPORT_TYPE.CLOSE : 1)

        let requestOptions = {
            headers: {
                Accept: 'application/json',
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };


        axiosCallAPI('get', Utills.GET_SUPPORT_DATA + "?roleId=" + roleId + "&studentId=" + studentId + "&type=" + type + "&sectionId=" + sectionID, '', requestOptions, true, props.navigation)
            // axiosCallAPI('get', Utills.GET_SUPPORT_DATA, p.toString(), requestOptions, true, props.navigation)
            .then(response => {
                setBackgroundLoaderView(false)
                console.log(response.result);
                if (response !== undefined) {

                    if (response.result.length > 0) {
                        setNoData(false)
                        setListData(response.result)
                    }
                    else {
                        setNoData(true)
                        setListData(response.result)
                    }

                    //setLoaderView(false)
                    // if (JSON.stringify(dataList) != JSON.stringify(response.result))
                    //     setDataList(response.result)
                } else {
                    setNoData(true)
                    //setLoaderView(false)
                }

            }).catch(error => {
                setBackgroundLoaderView(false)
                setLoaderView(false)
            });
    }


    function onSupportClick(requestID) {

        props.navigation.navigate("ParentSupportDetails", {
            requestID: requestID,
            type: Role,
            tab: Type
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: color.WHITE }}>
            <FlatList
                // data={(Type == 'New') ? DATA : (Type == 'Replied') ? DATA_1 : (Type == 'Closed') ? DATA_2 : null }
                data={listData}
                renderItem={(item) =>

                    <RenderItemSupport
                        createdName={item.item.fullName}
                        supportDiscription={item.item.message}
                        NumberDSP={(item.item.parentId == '0' ? item.item.id : item.item.parentId)}
                        date={moment(item.item.updatedAt, "YYYY-MM-DD HH:mm:ss").format('MMMM DD, YYYY')}
                        std={'(' + item.item.className + " - " + item.item.section + ')'}
                        onClick={onSupportClick}

                    />
                    // Role == 'parent' ? null : 
                }
            />
            {
                (noData) &&
                <EmptyView />
            }

            {
                (backgroundLoaderView) &&
                <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', }}>
                    <LoaderViewWithBackground_new color={color.WHITE} />
                </View>
            }


        </View>
    );
}

export default TeacherSupportTabCommon;