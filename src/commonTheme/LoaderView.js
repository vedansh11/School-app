/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, ActivityIndicator, Image, TouchableOpacity, Text } from 'react-native';
import { color,fonts } from '../constant';
import stylesCommon from './stylesCommon';

export const LoaderView = (props) => {

    return (
        <View style={stylesCommon.loaderView}>
            <ActivityIndicator size="large" color={props.color} />
        </View>
    );
}
export const LoaderViewWithBackground = (props) => {

    return (
        <View style={stylesCommon.backgroundLoader}>
            <View style={stylesCommon.loaderView}>
                <ActivityIndicator size="large" color={props.color} />
            </View>
        </View>

    );
}

export const LoaderViewWithBackground_new = (props) => {

    return (
        <View style={stylesCommon.backgroundLoader_new}>
            <View style={stylesCommon.loaderView}>
                <ActivityIndicator size="large" color={props.color} />
            </View>
        </View>

    );
}

export const EmptyView = (props) => {
    return (
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:14, fontWeight:'500', fontFamily:fonts.LATO_BOLD,color:color.BLACK}}>No Data Found</Text>
    </View>
    );
    }
export const LoaderButtonView = (props) => {
    return (
        <TouchableOpacity style={stylesCommon.buttonLoaderStyle}
            disabled={true} >
            <ActivityIndicator size="large" color={color.APP_PRIMARY} />
        </TouchableOpacity>
    );
}

