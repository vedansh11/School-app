/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Platform,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Modal,
    Alert,KeyboardAvoidingView
} from 'react-native';
import { normalize, screenHeight, vh, vw } from '../../Utills/dimesnion';
import { AppText, color, icon, fonts, PreferenceKeys } from '../../constant';
import stylesCommon, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../commonTheme/stylesCommon';
import { SchoolDetailHeaderView } from '../../commonTheme/HeaderView';
import { TitileBackgroundView, renderEmptyContainer, removeHTML , ButtonView, ModelTitleView} from '../../commonTheme/CommonView';
import { useCallback } from 'react';
import { AlertMesaage } from '../../constant/methods';
import * as Preference from '../../storeData/Preference';
import * as Utills from '../../API/Utills';
import { axiosCallAPI } from '../../API/axiosCommonService';
import { LoaderViewWithBackground, LoaderButtonView } from '../../commonTheme/LoaderView';
import SelectDropdown from 'react-native-select-dropdown'
import DatePicker from 'react-native-date-picker'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import moment from 'moment'
import {
    OutlinedTextField,
} from 'react-native-material-textfield-plus';

const { width, height } = Dimensions.get('window');

const ITEM_SIZE = 35;

export function TimeTableView(props) {

    const today = new Date();
    const flatListRef = useRef()
    const startFieldRef = useRef();
    const endFieldRef = useRef();
    const subjectRef = useRef();
    const topicRef = useRef();
    const richText = React.useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [isEditTopic, setEditTopic] = useState(false);
    const [isEditTopicEmpty, setEditTopicEmpty] = useState(false);
    const [loaderView, setLoaderView] = useState(false);
    const [deleteloaderView, setDeleteLoaderView] = useState(false);
    const [selectedDay, setSelectedDay] = useState('')
    const [subject, setSubject] = useState('')
    const [topic, setTopic] = useState('')
    const [topicHTML, setTopicHTML] = useState('')
    const [startTime, setStartTime] = useState(new Date())
    const [startTimeOpen, setStartTimeOpen] = useState(false)
    const [endTime, setEndTime] = useState(new Date())
    const [endTimeOpen, setEndTimeOpen] = useState(false)
    const [isSaveData, setSaveData] = useState()
    const [value, setValue] = useState(AppText.WEEKDAYS[today.getDay()]);
    const [timetableID, setTimetableID] = useState(0)
    const [clickIndex, setIndex] = useState()
    const [refreshList, setRefreshList] = useState(false)
    const [dateList, setDateList] = useState([]);
    // const [flatListRef, setFlatListRef] = useState()
    const [SelectedWeek, setSelectedWeek] = useState()
    const [selectedIndex, setSelectedIndex] = useState()
    const [isVisible, setIsVisible] = useState(true)
    const [subjectList, setSubjectList] = useState([])
    const [subjectSelected, setSubjectSelected] = useState('');
    const [subjectSelectedName, setSubjectSelectedName] = useState('');
    const [startTimeTEXT, setStartTimeTEXT] = useState(AppText.START_TIME);
    const [endTimeTEXT, setEndTimeTEXT] = useState(AppText.END_TIME);
    const [isSubject, setISSubject] = useState(-1)

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startFieldRef?.current?.setValue(moment(startTime).format('hh:mm A'))
        endFieldRef?.current?.setValue(moment(endTime).format('hh:mm A'))
        subjectRef?.current?.setValue(subject)
        topicRef?.current?.setValue(topic)
            
        if (refreshList === false) {
            var setCurrentweekDay = setInterval(() =>{ 
                setIsVisible(false);
                fetchData()}, 500);
                TeacherTimeTableAPI()
            return () => clearInterval(setCurrentweekDay);
        }
     
        if (SelectedWeek != undefined) {
            var setCurrentweekDay_ = setInterval(() =>{  
              
                TeacherTimeTableAPI()
                clearInterval(setCurrentweekDay_)
            } , 500);
            return () => clearInterval(setCurrentweekDay_);
           
        }
       
    },[SelectedWeek,subject,topic,startTime,endTime]);

    useEffect(() => {
        GetSubjectList();
    },[])

    async function GetSubjectList(){

        let loginFormData = new FormData();
        loginFormData.append("classId", props.sectionId)

        let requestOptions = {
            headers: {
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };
        axiosCallAPI('post', Utills.SUBJECT_LIST, loginFormData, requestOptions, true, props.navigation)
        .then(response => {
            console.log("_______________");
            console.log(response);
            console.log("_______________");
              
                // var subjectarray = [];
                // response.map((item) =>{
                //       subjectarray.push(item.subjectName);  
                // });
                setSubjectList(response);
            // if (JSON.stringify(noteType) !== JSON.stringify(response.result))
                           
            //     setNoteType(response.result)

        })

    }
    async function fetchData() {
     
        await flatListRef?.current?.scrollToIndex({
            animated: false,
            index: today.getDay(),
            viewPosition: selectedIndex == AppText.WEEKDAYS.length - 1 ? 0.5 : 0.62
        })
        setSelectedWeek(AppText.WEEKDAYS[today.getDay()])
        setRefreshList(true)
    }
    const handleClick = () => {
        setTimetableID(0)
        setEdit(false)
        setModalVisible(true)
    };

    const handleEditClick = (item) => {
        var date = moment(new Date()).format('MMMM DD YYYY')

        console.log(item)
        setTimetableID(item.id)
        setEdit(true)
        setModalVisible(true)
        setSubject(item.subject)
        setTopic(removeHTML(item.topic))
        setTopicHTML(item.topic)
        setValue(item.day)
        moment().utcOffset(0, true).format()
        setStartTime(new Date(  moment( date + ' ' + item.startTime).format('MMMM DD YYYY, h:mm a')))
        setEndTime(new Date(  moment( date + ' ' + item.endTime).format('MMMM DD YYYY, h:mm a')))

        if (item.subject !== '0') {
            subjectList.map(subjectItem => {
                console.log("Subject>>"+JSON.stringify(subjectItem))
                if (item.subject === subjectItem.subjectId)
                    setSubjectSelected(subjectItem.subjectName)
                    setSubjectSelectedName(subjectItem.subjectId);
            })
        } else {
            setSubjectSelected('')
            setSubjectSelectedName('')
        }
    };

    const handleDeleteClick = (id) => {
        AlertMesaage(
            "Delete Slot",
            "Are you sure you want to delete this slot?",
            "Yes",
            "No",
            () => DeleteTimetableAPI(id)

        )

    };
    async function TeacherTimeTableAPI() {
    //   setLoaderView(true)
   
     
        let requestOptions = {
            headers: {
                Accept: 'application/json',
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };

        var tableURL = Utills.TEACHER_TIMETABLE_LIST + '?sectionId=' + props.sectionId + '&daySearch=' + SelectedWeek

        axiosCallAPI('get', tableURL, '', requestOptions, true, props.navigation)
            .then(response => {
                // setLoaderView(false)
                if (response !== undefined) {
                  
                    if (JSON.stringify(dateList) != JSON.stringify(response.result)) {
                     
                        setDateList(response.result)
                    }
                } else {
                    setDateList([]);
                    renderEmptyContainer('No data found', true)
                }

            }).catch(error => {
                // setLoaderView(false);
            
                renderEmptyContainer('No data found', true)
            });
    }
    async function AddTimeTableAPI() {
        setLoaderView(true)
        let loginFormData = new FormData();
        loginFormData.append("id", timetableID)
        loginFormData.append("sectionId", props.sectionId)
        loginFormData.append("day", value)
        loginFormData.append("startTime", moment(startTime).format('hh:mm A'))
        loginFormData.append("endTime", moment(endTime).format('hh:mm A'))
      //  loginFormData.append("subject", subject)
        loginFormData.append("subject", subjectSelectedName)
        loginFormData.append("topic", topicHTML)

        let requestOptions = {
            headers: {
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };
        axiosCallAPI('post', Utills.TEACHER_TIMETABLE_SAVE, loginFormData, requestOptions, true,  props.navigation)
            .then((response) => {
                if (response !== undefined) {
                    setModalVisible(!modalVisible)
                    clearData()
                    setLoaderView(false)
                } else {
                    setLoaderView(false)
                }
            }).catch(error => {
                setLoaderView(false)
            });

    }
    async function DeleteTimetableAPI(deleteRecordID) {
        setDeleteLoaderView(true)
        let requestOptions = {
            headers: {
                Accept: 'application/json',
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };

        axiosCallAPI('get', Utills.TEACHER_TIMETABLE_DELETE + '?id=' + deleteRecordID, '', requestOptions, true,  props.navigation)
            .then(response => {
                setDeleteLoaderView(false)
                if (response !== undefined) {
                    TeacherTimeTableAPI()
                }
            }).catch(error => {
                setDeleteLoaderView(false)
            });
    }
    const InputView = (label, isEnable, image, multiline) => {
        return (

            <View style={stylesCommon.inputMainView}>
                {/* {
                    (label == AppText.SUBJECT) &&
                    <View style={stylesCommon.inputMainView}>
                        <OutlinedTextField
                            ref={subjectRef}
                            style={stylesCommon.textFieldView}
                            tintColor={color.APP_PRIMARY}
                            selectionColor={color.APP_PRIMARY}
                            label={label}
                            height={80}
                            multiline={multiline}
                            editable={isEnable}
                            returnKeyType='done'
                            error={(!isSaveData && isSaveData != undefined) && subject.length === 0 && AppText.ENTER_SUBJECT}
                            autoFocus={false}
                            onChangeText={(text) => setSubject(text)}
                        />
                        {
                            (image != '') ?
                                <View style={stylesCommon.dropdownView}>
                                    <Image style={stylesCommon.dropImage}
                                        source={image}>
                                    </Image>
                                </View> : null
                        }

                    </View>
                } */}
                 {
                    (label == AppText.SUBJECT) &&
                    <View style={stylesCommon.inputMainView}>
                        <SelectDropdown
                            data={subjectList}
                            onSelect={(selectedItem, index) => {
                               // setNoteTypeID(selectedItem.id)
                               setISSubject(-1)
                               setSubjectSelectedName(selectedItem.subjectId)
                            }}
                            defaultButtonText={(subjectSelected === '') ? 'Select Subject' : subjectSelected}
                            //    defaultButtonText={'Select note type'} 
                            // defaultValueByIndex={0}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.subjectName;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.subjectName;
                            }}
                            buttonStyle={isSubject != 0 ? styles.dropdownBtnStyle : styles.dropdownBtnStyle_error}
                            buttonTextStyle={styles.dropdownBtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <View style={styles.arrowView}>
                                    <Image style={stylesCommon.dropImage}
                                        source={image}>
                                    </Image>
                                </View>;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdownStyle}
                            rowStyle={styles.dropdownRowStyle}
                            rowTextStyle={styles.dropdownRowTxtStyle}
                        />
{isSubject == 0 && <Text style={{color:'#D50000', fontSize:12, marginTop:-10, marginStart:10,}}>Please select subject</Text>}
                    </View>
                }
                {
                    (label == AppText.TOPIC) &&
                    <View style={stylesCommon.inputMainView}>
                        <OutlinedTextField
                            ref={topicRef}
                            style={stylesCommon.textFieldView}
                            tintColor={color.APP_PRIMARY}
                            selectionColor={color.APP_PRIMARY}
                            label={label}
                            height={80}
                            multiline={multiline}
                            editable={isEnable}
                            returnKeyType='done'
                            error={(!isSaveData && isSaveData != undefined) && topic.length === 0 && AppText.ENTER_TOPIC}
                            autoFocus={false}
                            onChangeText={(text) => setTopic(text)}
                        />
                        {
                            (image != '') ?
                                <View style={stylesCommon.dropdownView}>
                                    <Image style={stylesCommon.dropImage}
                                        source={image}>
                                    </Image>
                                </View> : null
                        }

                    </View>
                }
                {
                    (label == AppText.DAY) &&
                    <View style={stylesCommon.inputMainView}>

                        <SelectDropdown
                            // data={AppText.WEEKDAYS}
                            data={AppText.WEEKDAYS}
                            onSelect={(selectedItem, index) => {
                                setValue(selectedItem)
                            }}
                            defaultButtonText={value}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdownBtnStyle}
                            buttonTextStyle={styles.dropdownBtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <View style={styles.arrowView}>
                                    <Image style={stylesCommon.dropImage}
                                        source={image}>
                                    </Image>
                                </View>;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdownStyle}
                            rowStyle={styles.dropdownRowStyle}
                            rowTextStyle={styles.dropdownRowTxtStyle}
                        />

                    </View>
                }
            </View>
        )
    }
    const InputViewRow = (label, isEnable, image, multiline) => {
        return (
            <View style={{
                width: '48%'
            }}>
                {
                    (label == AppText.START_TIME) &&
                    <TouchableOpacity style={[stylesCommon.inputMainView]}
                        onPress={() => setStartTimeOpen(true)}>

                        <OutlinedTextField
                            ref={startFieldRef}
                            style={[stylesCommon.textFieldView, { fontSize: normalize(20), marginEnd: 0 }]}
                            tintColor={color.APP_PRIMARY}
                            baseColor={color.APP_PRIMARY}
                            selectionColor={color.APP_PRIMARY}
                            label={startTimeTEXT}
                            height={80}
                            editable={isEnable}
                            returnKeyType='done'
                            autoFocus={false}
                           
                        />
                        {
                            (image != '') ?
                                <View style={stylesCommon.dropdownView}>
                                    <Image style={stylesCommon.dropImage}
                                        source={image}>
                                    </Image>
                                </View> : null
                        }

                        <DatePicker
                            modal
                            mode='time'
                            theme="light"
                            open={startTimeOpen}
                            date={startTime}
                            onConfirm={(time) => {
                                setStartTimeOpen(false)
                                setStartTime(time)
                                setStartTimeTEXT(moment(time).format('hh:mm A'))
                            }}
                            onCancel={() => {
                                setStartTimeOpen(false)
                            }}
                        />
                    </TouchableOpacity>
                }
                {
                    (label == AppText.END_TIME) &&
                    <TouchableOpacity style={[stylesCommon.inputMainView]}
                        onPress={() => setEndTimeOpen(true)}>

                        <OutlinedTextField
                            ref={endFieldRef}
                            style={[stylesCommon.textFieldView, { fontSize: normalize(20), marginEnd: 0 }]}
                            baseColor={color.APP_PRIMARY}
                            tintColor={color.APP_PRIMARY}
                            selectionColor={color.APP_PRIMARY}
                            label={endTimeTEXT}
                            height={80}
                            editable={isEnable}
                            returnKeyType='done'
                            autoFocus={false}
                            
                        />
                        {
                            (image != '') ?
                                <View style={stylesCommon.dropdownView}>
                                    <Image style={stylesCommon.dropImage}
                                        source={image}>
                                    </Image>
                                </View> : null
                        }
                        <DatePicker
                            modal
                            mode='time'
                            theme="light"
                            open={endTimeOpen}
                            date={endTime}
                            onConfirm={(time) => {
                                setEndTimeOpen(false)
                                if (time.getTime() > startTime.getTime()) {
                                    setEndTime(time)
                                    setEndTimeTEXT(moment(time).format('hh:mm A'))
                                } else {
                                    Alert.alert(AppText.ALERT_APP_NAME, AppText.TIME_VALIDATION)
                                }
                            }
                            }
                            onCancel={() => {
                                setEndTimeOpen(false)
                            }}
                        />
                    </TouchableOpacity>
                }
            </View>
        )
    }
    function renderCloseClick() {
        setModalVisible(!modalVisible)
        clearData()
    }
    function clearData() {
        setSubject('')
        setTopic('')
        setTopicHTML('')
        setSaveData()
        setStartTime(new Date())
        setEndTime(new Date())
        setValue(AppText.WEEKDAYS[today.getDay()])
        setEditTopic(false)
        setEditTopicEmpty(false)
        setSubjectSelected("")
        setSubjectSelectedName('')
        setStartTimeTEXT(AppText.START_TIME)
        setEndTimeTEXT(AppText.END_TIME)
        setISSubject(-1)
    }
    function saveBtnClick() {
        setSaveData(validation())
        if (validation()) {
            AddTimeTableAPI()
        }
    }
    function validation() {
        if (subjectSelectedName.length === 0)
        {
        setISSubject(0);
            return false
    }
        else if (topic.length === 0) {
            setEditTopicEmpty(true)
            return false
        }
        else {
            setEditTopicEmpty(false)
            return true
        }
    }
    // function removeHTML(str) {
    //     if ((str === null) || (str === ''))
    //         return false;
    //     else
    //         str = str.toString();
    //     return str.replace(/(<([^>]+)>)/ig, '');
    // }
    const TeacherAddPeriodModel = () => {
        return (
            
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                      
                    <View style={styles.centeredView}>
                        <ScrollView keyboardShouldPersistTaps='handled'
                            keyboardDismissMode={'on-drag'}
                            showsVerticalScrollIndicator={true}>

                            <View style={styles.modalView}>
                          
                                <ModelTitleView
                                    tiitle={isEdit ? AppText.EDIT_PERIOD : AppText.ADD_PERIOD}
                                    onPressClose={() => renderCloseClick()} />

                                <View style={{
                                    marginBottom: 20,
                                    width: '100%',
                                }}>
                                    {InputView(AppText.DAY, false, icon.IC_DOWN_ARROW, false)}
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        {InputViewRow(AppText.START_TIME, false, '', false)}
                                        {InputViewRow(AppText.END_TIME, false, '', false)}
                                    </View>
                                    {InputView(AppText.SUBJECT, false, icon.IC_DOWN_ARROW, false)}
                                    {/* {InputView(AppText.TOPIC, true, '', true)} */}
                                </View>

                                <Text style={{
                                    color: isEditTopicEmpty && topic.length === 0 ? color.RED : isEditTopic ? color.COLOR_PRIMARY : color.GREY,
                                    paddingBottom: vh(2),
                                    marginStart: vw(2),
                                    fontSize: normalize(14),
                                    alignSelf: 'flex-start'
                                }}>{AppText.TOPIC}</Text>
                               
                                <View style={{
                                    width: '100%',
                                    marginBottom: vh(30),
                                    borderWidth: vh(1),
                                    borderRadius: vw(5),
                                    paddingTop: vh(5),
                                    borderColor: isEditTopicEmpty && topic.length === 0 ? color.RED : isEditTopic ? color.COLOR_PRIMARY : color.GREY,
                                }}>

                                    <RichEditor
                                        ref={richText}
                                        containerStyle={{
                                            flex: 0,
                                            fontSize: normalize(20),
                                            minHeight: vh(120),
                                            color: color.DARK_TEXT,
                                            fontFamily: fonts.LATO_BOLD,
                                        }}
                                        initialContentHTML={topicHTML}
                                        setContentFocusHandler={(focus) => console.log(focus)}
                                        useContainer={false}
                                        onSelectedTagChanged={true}
                                        onChange={(text) => {
                                            if (text != '') {
                                                setTopicHTML(text)
                                            }
                                            if (removeHTML(text)) {
                                                setEditTopic(true)
                                                setTopic(removeHTML(text))
                                            }
                                            else
                                                setEditTopic(false)
                                        }}
                                    />

                                    <RichToolbar
                                        style={{
                                            paddingVertical: vh(5),
                                            backgroundColor: color.WHITE,
                                            borderBottomStartRadius: vw(5),
                                            borderBottomEndRadius: vw(5),
                                        }}
                                        selectedButtonStyle={{
                                            backgroundColor: color.LIGHT_GREY,
                                            borderRadius: vw(5),
                                            margin: vh(2)
                                        }}

                                        editor={richText}
                                    />
                                </View>
                             
                                {
                                    (loaderView === true) ?
                                        <LoaderButtonView />
                                        : <ButtonView
                                            tiitle={AppText.SAVE}
                                            onClick={() => saveBtnClick()} />

                                }
                              
                            </View>

                        </ScrollView>
                       
                    </View>
                   
                </Modal>
           
        );
    };


    function clickDown(index) {
        setIndex(index)
    }
    function clickUp() {
        setIndex()
    }

    const renderItem = ({ item, index }) => (

        <View style={{
            backgroundColor: color.COLOR_PRIMARY,
            borderRadius: 8,
            marginTop: 10,
            flexDirection: 'column',
        }}>
            <TouchableOpacity style={{
                backgroundColor: color.COLOR_PRIMARY,
                borderRadius: 8,
                alignContent: 'center',
                flexDirection: 'row',
            }} onPress={() => {
                (index === clickIndex) ? clickUp() : clickDown(index)
            }}>
                <View style={{
                    marginHorizontal: 15,
                    marginVertical: 15,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: color.WHITE,
                        fontWeight: '700',
                        fontSize: 14,
                        fontFamily: fonts.LATO_REGULAR
                    }}>{item.startTime + ' - ' + item.endTime}</Text>
                </View>

                <View style={{
                    width: 0.5,
                    marginVertical: 7,
                    backgroundColor: color.WHITE
                }} />
                <View style={{
                    marginHorizontal: 15,
                    marginVertical: 15,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: color.WHITE,
                        fontWeight: '700',
                        fontSize: 20,
                        fontFamily: fonts.LATO_REGULAR
                    }}>{item.subjectName}</Text>
                </View>
                {
                    (index === clickIndex) ?
                        <View style={{
                            marginHorizontal: 15,
                            position: 'absolute',
                            end: 0,
                            alignSelf: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image
                                style={{
                                    height: 15,
                                    width: 15,
                                    marginEnd: 10,
                                    resizeMode: 'contain'
                                }}
                                source={icon.IC_UP_ARROW_WHITE}></Image>
                        </View>
                        :
                        <View style={{
                            marginHorizontal: 15,
                            position: 'absolute',
                            end: 0,
                            alignSelf: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image
                                style={{
                                    height: 15,
                                    width: 15,
                                    marginEnd: 10,
                                    resizeMode: 'contain'
                                }}
                                source={icon.IC_DOWN_ARROW_WHITE}></Image>
                        </View>
                }
            </TouchableOpacity>
            {
                (index === clickIndex) ?
                    <View>
                        <View style={{
                            backgroundColor: color.WHITE,
                            height: 0.5,
                            marginHorizontal: vh(15),
                        }}></View>
                        <View style={{
                            backgroundColor: color.COLOR_PRIMARY,
                            borderRadius: 8,
                            marginTop: vh(10),
                            marginBottom: vh(15),
                            marginHorizontal: 15,
                            flexDirection: 'column',
                        }}>
                            <Text style={{
                                color: color.WHITE,
                                fontWeight: '700',
                                fontSize: 12,
                                fontFamily: fonts.LATO_REGULAR
                            }}>{'Topic'.toUpperCase()}</Text>
                            <Text style={{
                                color: color.WHITE,
                                fontWeight: '700',
                                fontSize: 16,
                                marginTop: 5,
                                fontFamily: fonts.LATO_REGULAR
                            }}>{removeHTML(item.topic)}</Text>

                        </View >
                        {
                            (props.dairyType === 'teacher') &&
                            <View style={{
                                backgroundColor: color.COLOR_PRIMARY,
                                borderRadius: 8,
                                marginBottom: vh(10),
                                marginHorizontal: vh(15),
                                flexDirection: 'row',
                            }}>
                                <TouchableOpacity onPress={() => handleEditClick(item)}>
                                    <Image
                                        style={{
                                            height: vh(20),
                                            width: vw(20),
                                            marginEnd: vw(10),
                                            resizeMode: 'contain'
                                        }}
                                        source={icon.IC_EDIT_TT}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteClick(item.id)}>
                                    <Image
                                        style={{
                                            height: vh(20),
                                            width: vw(20),
                                            marginEnd: vw(10),
                                            resizeMode: 'contain'
                                        }}
                                        source={icon.IC_DELETE_TT}></Image>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                    : null

            }

        </View>

    )
    const renderItemWeekDays = ({ item, index }) => (
        <View style={{
            alignSelf: 'center'
        }}>
            <Text style={{
                color: color.GREY,
                fontWeight: '700',
                fontSize: 20,
                fontFamily: fonts.LATO_REGULAR
            }}>{item.day}</Text>
        </View>

    )
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >=
            selectedIndex * ITEM_SIZE;
    };
    function handleInfinityScroll(event) {
        let mHeight = event.nativeEvent.layoutMeasurement.height;
        let cSize = event.nativeEvent.contentSize.height;
        let Y = event.nativeEvent.contentOffset.y;
        if (Math.ceil(mHeight + Y) >= cSize) return true;
        return false;
    }

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 10 })

    return (
        <SafeAreaView style={stylesCommon.safeAreaStyle}>
            <StatusBar backgroundColor={color.APP_PRIMARY} />

            {/* Dashboard Header view UI */}
            <SchoolDetailHeaderView titile={AppText.DASHBOARD}
                type={props.dairyType}
                navigation={props.navigation}
                screen={'DairyView'} />
            <View style={{
                flexDirection: 'column',
                marginTop: Platform.OS === 'ios' ? -50 : 0,
            }}>
                <TitileBackgroundView
                    titile={'Timetable'}
                    navigation={props.navigation}
                    image={props.image}
                    tagAdd={props.tagAdd}
                    class={props.class}
                    onClick={() => handleClick()}
                    isShowClass={props.isShowClass}
                />

                <View style={{
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'gey',
                    marginTop: -20,
                    height: SCREEN_HEIGHT / 5
                }}>
                 
                
                    <View
                    style={{
                        backgroundColor: '#ECFEFF',
                        height: vh(45),
                        width: '90%',
                        borderRadius: 45 / 2,
                        borderColor: 'grey',
                        top: Platform.OS == 'ios' ? vh(105) : vh(100),
                        borderWidth: 0.3,
                        position: 'absolute'
                    }} />
                
                    
                  
                       <Animated.FlatList
                      ref={flatListRef}
                      data={AppText.WEEKDAYS}
                      style={{
                          height: height / 5,
                      
                          top: Platform.OS == 'ios' ? 30 : 45,
                          // marginBottom: Platform.OS == 'ios' ? 0 : selectedIndex == AppText.WEEKDAYS.length - 2 ? selectedIndex == AppText.WEEKDAYS.length - 1 ? -10 : -30 : 0,
                      }}
                      keyExtractor={(item, index) => item.toString()}
                      bounces={false}
                      onEndThreshold={0}
                      contentContainerStyle={{
                          paddingVertical: 70
                      }}
                      onScrollToIndexFailed={({
                          index,
                          averageItemLength,
                      }) => {
                          // Layout doesn't know the exact location of the requested element.
                          // Falling back to calculating the destination manually
                          flatListRef.current?.scrollToOffset({
                              offset: index * averageItemLength,
                              animated: true,
                          });

                      }}
                      legacyImplementation={false}
                      viewabilityConfig={viewConfigRef.current}
                      onScrollEndDrag={() => {
                          flatListRef.current.scrollToIndex({
                              animated: true,
                              index: selectedIndex,
                              viewPosition: (selectedIndex == (AppText.WEEKDAYS.length - 1)) ? 0.5 : 0.62
                          })
                      }
                      }
                      onScroll={
                          Animated.event(
                              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                              {
                                  useNativeDriver: true,
                                  listener: event => {
                                      var offsetY = event.nativeEvent.contentOffset.y
                                      const offsetX = event.nativeEvent.contentOffset.x

                                      for (var index = 1; index < AppText.WEEKDAYS.length; index++) {
                                          if (offsetY === 0) {
                                              setSelectedIndex(0)
                                              setSelectedWeek(AppText.WEEKDAYS[0])
                                          } else {
                                              if (index * ITEM_SIZE <= offsetY) {
                                                  setSelectedIndex(index)
                                                  setSelectedWeek(AppText.WEEKDAYS[index])

                                              }
                                          }

                                      }
                                  },
                              },
                          )}
                      showsVerticalScrollIndicator={false}
                      // snapToOffsets={ITEM_SIZE}
                      renderItem={({ item, index }) => {

                          const inputRange = [
                              (index - 1) * ITEM_SIZE,
                              index * ITEM_SIZE,
                              (index + 1) * ITEM_SIZE,
                          ]
                          const opacity = scrollY.interpolate({
                              inputRange,
                              outputRange: [.2, 1, .5]
                          })
                          const scale = scrollY.interpolate({
                              inputRange,
                              outputRange: [.65, 1, .75]
                          })
                          // const scale = scrollY.interpolate({
                          //     inputRange,
                          //     outputRange: [.5, 1, .75]
                          // })

                          return (
                              <View style={{
                                  alignSelf: 'center',
                                  marginVertical: 2,
                                  top: Platform.OS == 'ios' ? 0 : -20,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }}>
                                  <Animated.Text style={{
                                      color: 'black',
                                      fontSize: ITEM_SIZE * 0.83,
                                      marginTop: Platform.OS === 'ios' ? 0 : -7,
                                      fontWeight: '700',
                                      marginBottom: (index == (AppText.WEEKDAYS.length - 1) ? vh(-18) : 0),
                                      
                                      fontFamily: fonts.LATO_REGULAR,
                                      opacity,
                                      transform: [{
                                          scale
                                      }]
                                  }}>
                                      {item}
                                  </Animated.Text>
                              </View>
                          )
                      }}
                  />
                   
{ isVisible && 
 <View style={{backgroundColor:color.WHITE, position:'absolute',  height: SCREEN_HEIGHT / 5,width:'100%'}}>
   
                    </View>  
}                  

                </View>
                
                <View style={{
                        height: '60%'
                    }}>
                      <FlatList
                    data={dateList}
                    renderItem={renderItem}
                    contentContainerStyle={{ minHeight: '100%' }}
                    showsVerticalScrollIndicator={false}
                    style={{
                        marginHorizontal: 15,
                        marginVertical: 15,
                    }}
                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={renderEmptyContainer('No data found', true)}
                />
                    {loaderView && 
                    <View style={{   alignSelf: 'center',
                        position: 'absolute',
                        height:'100%',
                        width:'100%',
                        }} >
                           <LoaderViewWithBackground color={color.WHITE} /> 
                        </View>
                    }  

                     {
                    (deleteloaderView) &&
                    <View style={{
                        top: 200,
                        alignSelf: 'center',
                        position: 'absolute'
                    }}>
                        <LoaderViewWithBackground color={color.WHITE} />
                    </View>
                }
                    </View>
           
                {modalVisible && TeacherAddPeriodModel()}
            </View>


        </SafeAreaView >
    );
};


const styles = StyleSheet.create({
    centeredView: {
        height: '100%',
        position: 'absolute',
        // bottom: 0,
        paddingTop: vh(screenHeight / 10),
        start: 0,
        end: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: "center",
        alignSelf: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 15,
        alignSelf: 'center',
        padding: 20,
        height: '100%',
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    // drop down

    dropdownBtnStyle: {
        width: '100%',
        height: vh(50),
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: vh(15),
        backgroundColor: color.WHITE,
        borderColor: color.GREY,
    },
     // drop down error
     dropdownBtnStyle_error: {
        width: '100%',
        height: vh(50),
        borderRadius: 4,
        borderWidth: 2,
        marginBottom: vh(15),
        backgroundColor: color.WHITE,
        borderColor: '#D50000',
    },
    dropdownBtnTxtStyle: {
        textAlign: 'left',
        fontSize: 20,
        color: color.DARK_TEXT,
        fontFamily: fonts.LATO_BOLD,
    },
    dropdownStyle: {
        backgroundColor: color.WHITE,
    },
    arrowView: {
        resizeMode: 'contain',
        height: '100%',
        paddingEnd: 15,
        justifyContent: 'center',
    },
    dropdownRowStyle: { backgroundColor: color.WHITE, borderBottomWidth: 0, },
    dropdownRowTxtStyle: { color: color.DARK_TEXT, textAlign: 'left', fontFamily: fonts.LATO_REGULAR, paddingHorizontal: vw(10) },
});