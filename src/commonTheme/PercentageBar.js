/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { color, fonts } from '../constant';
import { normalize } from '../Utills/dimesnion';

const PercentageBar = ({
    navigation,
    percentage,
    height,
    backgroundColor,
    completedColor,
}) => {
    const [getheight, setHeight] = useState(height);

    return (
        <View>
            <View style={{ justifyContent: 'center' }}>
                <View
                    style={{
                        width: '100%',
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 10,
                        backgroundColor: backgroundColor,
                    }}
                />
                <View
                    style={{
                        width: percentage ? percentage : 0,
                        height: getheight,
                        borderWidth:0.5,
                        borderEndWidth:0,
                        borderColor:color.PROGRESS_GREY,
                        marginVertical: 10,
                        borderTopStartRadius: 10,
                        borderBottomStartRadius: 10,
                        borderTopEndRadius: percentage > '97%' ? 10 : percentage == '100%' ? 10 : 0,
                        borderBottomEndRadius: percentage > '97%' ? 10 : percentage == '100%' ? 10 : 0,
                        backgroundColor: completedColor,
                        position: 'absolute',
                        bottom: getheight
                    }}
                />

                <View
                    style={{
                        width: percentage ? percentage : 0,
                        height: getheight,
                        justifyContent: 'center',
                        bottom: getheight + 10
                    }}>
                    <Text style={{ textAlign: 'right', fontSize: normalize(10), fontFamily: fonts.LATO_BOLD, color: (color.WHITE == completedColor )? color.PROGRESS_GREY : color.WHITE, textAlign: 'center' }}>{percentage}</Text>
                </View>
            </View>
        </View>
    );
};
export default PercentageBar;