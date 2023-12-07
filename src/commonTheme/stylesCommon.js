/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import { StyleSheet } from 'react-native';
import { color, icon, fonts } from '../constant';
import { Dimensions } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { normalize, vh, screenHeight } from '../Utills/dimesnion';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    safeAreaStyle: {
        backgroundColor: color.WHITE,
        flex: 1,
    },
    // Splash screen styles
    splashMainStyle: {
        justifyContent: 'center',
    },
    backgroundStyle: {
        height: Platform.OS === 'ios' ? '115%' : '100%',
        width: '100%',
    },
    logoStyle: {
        height: vh(250),
        width: SCREEN_WIDTH,
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    // Login styles
    welcomTextStyle: {
        flex: 1,
        position: 'absolute',
        top: 0,
        color: color.DARK_TEXT,
        marginTop: 40,
        marginStart: 10,
        fontSize: 30,
        fontFamily: fonts.LATO_BOLD
    },
    whiteCornerStyle: {
        backgroundColor: color.WHITE,
        borderRadius: 15,
        position: 'absolute',
        width: '90%',
        paddingStart: 20,
        paddingEnd: 20,
        paddingTop: 40,
        paddingBottom: 40,
        alignSelf: 'center',
        shadowColor: color.BLACK,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        elevation: 15,
    },
    loaderViewCenter: {
        position: 'absolute',
        alignSelf: 'center',
        height: screenHeight / 2
    },
    phoneTextField: {
        width: '100%',
        alignSelf: 'center',
    },
    otpTextStyle: {
        fontFamily: fonts.LATO_BOLD,
        color: color.TEXT_COLOR,
        fontSize: 14
    },
    otpTextRedStyle: {
        fontFamily: fonts.LATO_REGULAR,
        color: color.APP_SECONDARY,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    otpTextGreenStyle: {
        fontFamily: fonts.LATO_REGULAR,
        color: color.APP_PRIMARY,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    primaryButtonBackground: {
        backgroundColor: color.APP_PRIMARY,
        borderRadius: 10,
        width: '100%',
        padding: 15,
        alignSelf: 'center',
    },
    primaryButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: color.WHITE,
        fontFamily: fonts.LATO_BOLD
    },
    // Welcom styles
    continueTextStyle: {
        fontSize: 18,
        color: color.WHITE,
        fontFamily: fonts.LATO_BOLD,
        alignSelf: 'center'
    },
    continueImage: {
        height: 35,
        width: 35,
        marginEnd: 5,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    parentViewStyle: {
        backgroundColor: color.APP_PRIMARY,
        height: 70,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
    },
    teacherViewStyle: {
        backgroundColor: color.APP_SECONDARY,
        height: 70,
        width: '100%',
        marginTop: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
    },
    // Header styles
    mainBackground: {
        height: Platform.OS === 'ios' ? 100 : 60,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
        top: Platform.OS === 'ios' ? -50 : 0,
        backgroundColor: color.APP_PRIMARY,
    },
    mainBackground_custome: {
        height: Platform.OS === 'ios' ? 60 : 60,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.APP_PRIMARY,
    },
    homeView: {
        height: 30,
        width: 30,
        margin: 15,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background: rgba(255, 255, 255, 0.35)'
    },
    homeicon: {
        height: 15,
        width: 15,
    },
    titleHeader: {
        alignContent: 'center',
        fontSize: 22,
        color: color.WHITE,
        fontFamily: fonts.LATO_BOLD
    },
    notificationView: {
        margin: 20,
        top: Platform.OS === 'ios' ? 40 : 0,
        alignContent: 'center',
        position: 'absolute',
        flexDirection: 'row',
        end: 0,
    },
    notificationView_new: {
        margin: 20,
        top: Platform.OS === 'ios' ? 0 : 0,
        alignContent: 'center',
        position: 'absolute',
        flexDirection: 'row',
        end: 0,
    },
    notificationIcon: {
        height: 23,
        width: 20,
    },
    notificationPoint: {
        height: 8,
        width: 8,
        position: 'absolute',
        end: 0,
    },
    supportIcon: {
        height: 17,
        width: 17,
    },


    // Dashboard
    dashList: {
        marginTop: Platform.OS === 'ios' ? -40 : 10,
        marginStart: 20,
        marginEnd: 20,
    },
    rawMainView: {
        flex: 1,
        backgroundColor: color.WHITE,
        borderRadius: 7,
        width: '99%',
        marginTop: 10,
        borderColor: color.GREY,
        borderWidth: 0.5,
        marginBottom: 10,
        alignSelf: 'center',
        shadowColor: Platform.OS === 'ios' ? color.LIGHT_GREY : color.BLACK,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 5,
        shadowRadius: 1,
        elevation: 5,
        marginStart:5,
        marginEnd:5
    },
    studentInfoView: {
        backgroundColor: color.COLOR_SECONDARY,
        flex: 0.75,
        borderRadius: 7,
        paddingStart: 15,
        paddingEnd: 10,
        flexDirection: 'row',
    },
    studentProfile: {
        height: 70,
        width: 70,
        alignSelf: 'center',
       
    },
    studentProfile_atten: {
        height: 50,
        width: 50,
        alignSelf: 'center',
       
    },
    margin10View: {
        margin: 10,
    },
    nameText: {
        fontSize: 20,
        fontFamily: fonts.LATO_BOLD,
        color: color.BLACK,
    },
    deptmentText: {
        fontSize: 14,
        marginTop: 2,
        fontFamily: fonts.LATO_BOLD,
        color: color.TEXT_COLOR,
    },
    infoRaw: {
        flexDirection: 'row',
        marginTop: 8,
    },
    infoColumn: {
        flexDirection: 'column',
        marginEnd: 10,
    },
    tiitleText: {
        fontSize: 12,
        fontFamily: fonts.LATO_REGULAR,
        color: color.GREY,
    },
    valueText: {
        fontSize: 14,
        marginTop: 2,
        fontFamily: fonts.LATO_BOLD,
        color: color.COLOR_PRIMARY,
    },
    actionView: {
        backgroundColor: color.WHITE,
        flex: 0.25,
        paddingStart: 18,
        paddingBottom: 7,
        paddingTop: 7,
        flexDirection: 'row-reverse',
        borderRadius: 7,
    },
    itemView: {
        justifyContent: 'center',
        alignContent: 'center',
        paddingEnd: 8,
        paddingStart: 8
    },
    imageView: {
        height: 21,
        width: 20,
        alignSelf: 'center',
    },
    noteImageView: {
        height: 24,
        width: 19,
        alignSelf: 'center',
    },
    studentImageView: {
        height: 20,
        width: 30,
        alignSelf: 'center',
    },
    feesImageView: {
        height: 20,
        width: 25,
        alignSelf: 'center',
    },
    lineView: {
        backgroundColor: color.GREY,
        height: 0.5,
        width: '100%'
    },
    // model content 
    modelTileView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalText: {
        marginBottom: 15,
        fontSize: 22,
        fontWeight: '700',
        color: color.DARK_TEXT,
        fontFamily: fonts.LATO_REGULAR,
        textAlign: "center"
    },
    closeImageView: {
        height: 15,
        width: 15,
        marginBottom: 15,
        resizeMode: 'contain'
    },
    inputMainView: {
        width: '100%',
        marginTop: 10,
        marginBottom:5
    },
    inputMainViewYear: {
        width: '100%',
        marginTop:0,
        marginBottom:0,
        justifyContent:'center'
    },
    textFieldView: {
        marginEnd: 30,
        fontSize: 20,
        color: color.DARK_TEXT,
        fontFamily: fonts.LATO_BOLD,
    },
    dropdownView: {
        resizeMode: 'contain',
        position: 'absolute',
        height: '100%',
        paddingEnd: 15,
        paddingBottom: 5,
        justifyContent: 'center',
        end: 0,
    },
    dropdownView_new: {
        resizeMode: 'contain',
        position: 'absolute',
        height: '100%',
        paddingEnd: 15,
        justifyContent: 'center',
        end: 0,
        bottom:4
        
    },
    dropImage: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
    },
    padding15View: {
        padding: 15,
    },
    // Tooltip style

    tooltipText: {
        fontSize: 12,
        fontFamily: fonts.LATO_REGULAR,
        fontWeight: '700',
        color: color.WHITE
    },
    tooltipSepretor: {
        width: 2,
        marginVertical: 2,
        marginHorizontal: 10,
        backgroundColor: color.WHITE
    },
    tooltipContent: {
        flexDirection: 'row',
    },
    // Attendance screen

    studentImage: {
        height: 60,
        width: 60,
        borderColor: color.WHITE,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 60 / 2,
    },
    sNameView: {
        flex: 0.65,
        alignSelf: 'center',
        marginEnd: 10,
    },
    sNameText: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: fonts.LATO_REGULAR,
        color: color.DARK_TEXT,
    },
    sLocationView: {
        flex: 0.3,
        alignSelf: 'center',
        alignItems: 'flex-start',
        marginEnd: 10,
        end: 0,
        position: 'absolute',
    },
    clockView: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    cloclImage: {
        height: 13,
        width: 13,
        marginEnd: 5,
        resizeMode: 'contain'
    },
    clockText: {
        fontSize: 12,
        fontWeight: '700',
        fontFamily: fonts.LATO_REGULAR,
        color: color.DARK_TEXT,
    },
    locationImage: {
        height: 15,
        width: 14,
        marginEnd: 5,
        resizeMode: 'contain'
    },
    searchTextFeild: {
        marginEnd: 30,
        fontSize: 14,
        color: color.DARK_TEXT,
        fontFamily: fonts.LATO_BOLD,
    },
    //  padding: 10,
    // Diary view
    diaryRowTitle: {
        fontFamily: fonts.LATO_BOLD,
        color: color.DARK_TEXT,
        fontSize: normalize(16)
    },
    diaryRowDescription: {
        fontFamily: fonts.LATO_REGULAR,
        color: color.DARK_TEXT,
        marginTop: 10,
        marginBottom: 10,
        fontSize: normalize(14)
    },
    diaryTimeView: {
        fontFamily: fonts.LATO_REGULAR,
        color: color.DARK_TEXT,
        marginTop: 10,
        marginBottom: 10,
        fontSize: normalize(12),
        position: 'absolute',
        end: 0,
        paddingEnd: 20,
    },
    // loader view
    loaderView: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
    },
    backgroundLoader: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        position: 'absolute',
        top: 120,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    backgroundLoader_new: {
        height: 100,
        width: 100,
        alignSelf: 'center',
    
    
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    buttonLoaderStyle: {
        borderRadius: 10,
        width: '100%',
        padding: 15,
        alignSelf: 'center',
        backgroundColor: color.WHITE,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: color.APP_PRIMARY,
    },


});
