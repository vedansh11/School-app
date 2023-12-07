/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, Image, View, Alert, TouchableOpacity, Modal, Pressable, button } from 'react-native';
import stylesCommon from '../commonTheme/stylesCommon'
import { AppText, color, fonts, icon, PreferenceKeys } from '../constant';
import {
    OutlinedTextField,
} from 'react-native-material-textfield-plus';

export const PresentSquareView = (props) => {
    // props elements
    // colorTheme - for set color for square
    // textPresent - text for square box
    // value - value for set inside large square

    return (
        <View style={{
            backgroundColor: color.WHITE,
            height: 45,
            width: 45,
            borderRadius: 5,
            borderWidth: 1,
            margin: 2,
            borderColor: props.colorTheme,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: props.colorTheme,
                height: 16,
                width: 16,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0,
                end: 0,
                position: 'absolute',
                borderTopEndRadius: 3,
                borderBottomStartRadius: 3,
            }}>
                <Text style={{
                    fontSize: 12,
                    marginStart: 2,
                    fontFamily: fonts.LATO_BOLD,
                    color: color.WHITE,
                }}>{props.textPresent}</Text>
            </View>
            <Text style={{
                fontSize: 24,
                marginTop: 10,
                fontFamily: fonts.LATO_BOLD,
                color: color.BLACK,
            }}>{props.value}</Text>
        </View>
    );
}

export const DashboardRawDetailMenu = (props) => {
    // type - set type which user login teacher or prent?

    return (
        <View style={stylesCommon.actionView}>
            {/* Parent Dashboard */}
            {
                (props.isShowHelp) ?
                    <TouchableOpacity style={stylesCommon.itemView}
                    onPress={props.onSupportClick}>
                        <Image style={stylesCommon.imageView}
                            source={icon.IC_HELP}>
                        </Image>
                    </TouchableOpacity>
                    : null
            }

            {
                (props.isShowFees) ?
                    <TouchableOpacity onPress={props.onPaymentClick} style={stylesCommon.itemView}>
                        <Image style={stylesCommon.feesImageView}
                            source={icon.IC_FEES}>
                        </Image>
                    </TouchableOpacity>
                    : null
            }

            {/* Teacher and Student Dashboard */}
            {
                (props.isShowTimeTable) ?
                    <TouchableOpacity style={stylesCommon.itemView}
                        onPress={props.onTimeTableClick}>
                        <Image style={stylesCommon.imageView}
                            source={icon.IC_TIME_TABLE}>
                        </Image>
                    </TouchableOpacity>
                    : null
            }
            {/* Teacher and Student Dashboard */}
            {
                (props.isShowNote) ?
                    <TouchableOpacity style={stylesCommon.itemView}
                        onPress={props.onNoteClick}>
                        <Image style={stylesCommon.noteImageView}
                            source={icon.IC_NOTES}>
                        </Image>
                    </TouchableOpacity>
                    : null
            }

            {
                (props.isShowCalendar) ?
                    <TouchableOpacity style={stylesCommon.itemView}
                        onPress={props.onAttendanceClick}>
                        <Image style={stylesCommon.imageView}
                            source={icon.IC_DATE_CAL}>
                        </Image>
                    </TouchableOpacity>
                    : null
            }

            {/* Teacher Dashboard */}

            {/* <TouchableOpacity style={stylesCommon.itemView}>
                <Image style={stylesCommon.imageView}
                    source={icon.IC_TIME_TABLE}>

                </Image>
            </TouchableOpacity>
            <TouchableOpacity style={stylesCommon.itemView}>
                <Image style={stylesCommon.noteImageView}
                    source={icon.IC_NOTES}>

                </Image>
            </TouchableOpacity> */}

            {
                (props.isShowStudent) ?
                    <TouchableOpacity style={stylesCommon.itemView}
                        onPress={props.onStudentAttendanceClick}>
                        <Image style={stylesCommon.studentImageView}
                            source={icon.IC_STUDENT}>
                        </Image>
                    </TouchableOpacity>
                    : null
            }

        </View>
    );
}

export const TitileBackgroundView = (props) => {
    console.log(props.image)
    function addNavigation() {
        // props.navigation.navigate('TeacherAddDairyModel')
    }
    return (
        <View>
            <View style={{
                backgroundColor: color.COLOR_SECONDARY,
                height: 60,
                alignContent: 'center',
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: fonts.LATO_BOLD,
                    color: color.BLACK,
                    alignSelf: 'center',
                    fontSize: 20,
                    marginStart: 20,
                }}>{props.titile}</Text>
                             {
                    (props.isSecondviewRequired) &&
                    <TouchableOpacity
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        end: 30,
                        marginEnd: 20,
                    }}
                    onPress={props.onSecondViewClick}>
                    {
                        props.secondViewImage != undefined || props.secondViewImage != '' ?
                            <Image
                                style={{
                                    height: 16,
                                    width: 16,
                                }}
                                source={props.secondViewImage} /> : null
                    }
                    {
                        props.tagAddSecond != undefined ?
                            <Text style={{
                                fontFamily: fonts.LATO_REGULAR,
                                color: color.BLACK,
                                alignSelf: 'center',
                                fontSize: 14,
                                marginStart: 10,
                            }}>{props.tagAddSecond}</Text> : null
                    }
                </TouchableOpacity>

                }
                
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        end: 0,
                        marginEnd: 20,
                    }}
                    onPress={props.onClick}>
                    {
                        props.image != undefined && props.image != '' ?
                            <Image
                                style={{
                                    height: 16,
                                    width: 16,
                                   tintColor: '#000000' 
                                }}
                                source={props.image} /> : null
                    }
                    {
                        props.tagAdd != undefined ?
                            <Text style={{
                                fontFamily: fonts.LATO_REGULAR,
                                color: color.BLACK,
                                alignSelf: 'center',
                                fontSize: 14,
                                marginStart: 10,
                            }}>{props.tagAdd}</Text> : null
                    }


                </TouchableOpacity>
                
            </View>
            {
                (props.isShowClass) ?
                    <View style={{
                        flexDirection: 'column',
                        backgroundColor: color.WHITE,
                        borderRadius: 60 / 2,
                        borderColor: color.GREY,
                        borderWidth: 1,
                      //  top: -30,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        shadowColor: Platform.OS === 'ios' ? color.LIGHT_GREY : color.BLACK,
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 5,
                        shadowRadius: 1,
                        elevation: 5,
                        height: 60,
                        width: 60,
                        marginTop:30,
                        position:'absolute'
                    }}>
                        <Text style={{
                            fontFamily: fonts.LATO_REGULAR,
                            color: color.DARK_TEXT,
                            alignSelf: 'center',
                            fontSize: 8,
                        }}>{AppText.CLASS.toUpperCase()}</Text>
                        <Text style={{
                            fontFamily: fonts.LATO_BOLD,
                            color: color.INFO_BLUE,
                            alignSelf: 'center',
                            marginTop: 2,
                            fontSize: 14,
                        }}>{props.class}</Text>
                    </View> : null
            }

        </View>
    );
}
export const ButtonView = (props) => {
    return (
        <TouchableOpacity style={stylesCommon.primaryButtonBackground}
            onPress={props.onClick}>
            <Text style={stylesCommon.primaryButtonText}>{props.tiitle}</Text>
        </TouchableOpacity>
    );
}
export const ModelTitleView = (props) => {
    return (
        <View style={stylesCommon.modelTileView}>
            <Text style={stylesCommon.modalText}>{props.tiitle}</Text>
            <TouchableOpacity onPress={props.onPressClose}>
                <Image style={stylesCommon.closeImageView}
                    source={icon.IC_CANCEL}>
                </Image>
            </TouchableOpacity>

        </View>
    );
}
export const renderEmptyContainer = (titile, singleLine) => {
    if (!singleLine) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}>
                <Text style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontSize: 14,
                    fontFamily: fonts.LATO_REGULAR,
                    color: color.BLACK
                }}>{titile}</Text>
            </View>

        )
    } else {
        return (
            <Text style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 14,
                fontFamily: fonts.LATO_REGULAR,
                color: color.BLACK
            }}>{titile}</Text>

        )
    }
}
export const RenderItemSupport = ( props ) => {
    return(
        <TouchableOpacity style={[stylesCommon.rawMainView,{justifyContent:'center'}]}
        onPress={() => { props.onClick(props.NumberDSP)}}>
        <View style={{
            flex:0.95,
            backgroundColor: color.WHITE,
            borderRadius: 7,
            paddingStart: 15,
            paddingEnd: 10,
            paddingTop:10,
            paddingBottom:10,
            flexDirection: 'column',
        }}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{
                color:color.DARK_TEXT,
                fontSize:16,
                fontFamily:fonts.LATO_REGULAR
            }}>
            {props.createdName}
            </Text>
            { (props.std) ? 
            <Text style={{  fontSize:14, fontFamily:fonts.LATO_BOLD,color:color.COLOR_PRIMARY,marginStart:5}}>{props.std}</Text>
            : null
            }
            </View>
            <Text style={{
                color:color.DARK_TEXT,
                fontSize:12,
                fontFamily:fonts.LATO_REGULAR,
                marginTop:2
            }}>
            {"#"+props.NumberDSP}
            </Text>
            <Text style={{
                color:color.TEXT_COLOR,
                fontFamily:fonts.LATO_REGULAR,
                marginTop:10,
                fontSize:11,
                marginEnd:20,
            }}>
          {props.supportDiscription}
            </Text>
        </View>

        <Image style={{
            height:16,
            width:10,
            resizeMode:'contain',
            marginEnd:20,
            alignSelf:'baseline',
            end:0,
            position:'absolute'
        }}
        source={icon.IC_SIDE_ARROW}></Image>
        <Text style={{
                color:color.GREY,
                fontSize:10,
                fontFamily:fonts.LATO_REGULAR,
                marginTop:10,
                marginEnd:20,
                end:0,
                top:0,
                position:'absolute'
            }}>
           {props.date}
            </Text>
            
        </TouchableOpacity>
    );
}

export const removeHTML = (str) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString().replace(/&nbsp;/g, '');
    return str.replace(/(<([^>]+)>)/ig, '');
}
export function removeDuplicates(originalArray, prop) {
    var removeDuplicatesArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        removeDuplicatesArray.push(lookupObject[i]);
    }

    return removeDuplicatesArray;
}