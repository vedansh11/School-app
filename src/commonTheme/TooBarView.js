/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import stylesCommon from '../commonTheme/stylesCommon'

const TooBarView = (props) => {

    return (
        <View style={stylesCommon.AppBarViewStyle}>

            <Text style={stylesCommon.textView}>{props.name}</Text>
        </View>
    );
}

export default TooBarView;
