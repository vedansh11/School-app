/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import {
    Alert,
} from 'react-native';
import * as Utills from '../API/Utills';
import * as Preference from '../storeData/Preference';
import { StackActions } from '@react-navigation/native';
import { color, icon, PreferenceKeys, AppText, fonts, alertText } from '../constant';

export default requestHeader = async (formData, Content_Type_Only) => {
    let requestHeader;
    if (formData) {
        requestHeader = {
            headers: {
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };
    }
    else if (Content_Type_Only) {
        requestHeader = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
    }
    else {
        requestHeader = {
            headers: {
                Accept: 'application/json',
                Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
            }
        };
    }
    console.log(requestHeader)
    return requestHeader;
}