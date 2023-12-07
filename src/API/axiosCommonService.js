/**
 * React Native Greate Minds App
 * @author Maulik Rajpara
 * @version 1.0
 * @since 19 May 2022
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

export const axiosCallAPI = (method, endpoint, params, headerRequest, isShowMessage, navigation) => {
    let errors;
    const client = axios.create({
        withCredentials: true,
        responseType: 'json',
        timeout: 30000,
    });
    if (method === 'post') {
        return client.post(endpoint, params, headerRequest)
            .then((response) => {
                console.log(response.data);
                if (response.data.status) {
                    if (response.data.message !== '') {
                        if (isShowMessage)
                            showMessage(`${response.data.message}`, 'success');
                    }
                    if(endpoint === Utills.VERIFY_OTP){
                        return response.data;
                   }
                   else{
                    return response.data.data;
                   }
                } else {
                    //console.log("(((((((((Error");
                    errors = response.data.errors;
                    Object.keys(errors).map(function (key, index) {
                        showMessage(`${errors[key]}`, 'error');
                    });
                   // showMessage(response.data.message, 'error');
                   if(endpoint === Utills.VERIFY_OTP){
                        return response.data;
                   }
                }

            })
            .catch((error) => {
             
                ERROR_HANDLER(error, errors)
            })
    }
    else if (method === 'get') {
        if(params)
        {
           
            return axios.get(endpoint, params,headerRequest)
            .then((response) => {
                console.log("Api response" +response);
                if (response.data.status) {
                    if (response.data.message !== '') {
                        if (isShowMessage)
                            showMessage(`${response.data.message}`, 'success');
                    }
                    return response.data.data;
                } else {
                    console.log(response.data.message)
                    //showMessage(response.data.message, 'error');
                    errors = response.data.errors;
                    Object.keys(errors).map(function (key, index) {
                        showMessage(`${errors[key]}`, 'error');
                    });
                }

            })
            .catch((error) => {
                    console.log(error);
                ERROR_HANDLER(error, errors)
            })
        }
        else{
           
            return axios.get(endpoint, headerRequest)
            .then((response) => {
              
                if (response.data.status) {    
                    if (response.data.message !== '') {
                        if (isShowMessage)
                            showMessage(`${response.data.message}`, 'success');
                    }
                    if(endpoint.includes(Utills.GET_PAYMENT_LIST)){
                        return response.data;
                    }
                    else{
                        return response.data.data;
                    }
                    
                } else {
                    
                    errors = response.data.errors;
                    Object.keys(errors).map(function (key, index) {
               
                        if(errors[key].length() > 0){
                        showMessage(`${errors[key]}`, 'error');
                        }
                    });
                  
                }

            })
            .catch((error) => {
                ERROR_HANDLER(error, errors)
               
                return error.response.data;
            })
        }
       
    }
    function ERROR_HANDLER(error, errors) {
            console.log(error);
        if (error.response.status === 400) {
            errors = error.response.data.errors;
            Object.keys(errors).map(function (key, index) {
              
                showMessage(`${errors[key]}`, 'error');
                
            });
            if(error.response.data.message){
            showMessage(error.response.data.message,'error');
            }
        } else if (error.response.status === 404) {
            showMessage('API request not found', 'error');
        } else if (error.response.status === 401) {
            showMessage(error.message, 'error');
            Preference.SetData(PreferenceKeys.IS_LOGIN, 'false')
            Preference.SetData(PreferenceKeys.TOKEN, '')
            navigation.dispatch(
                StackActions.replace('LoginScreen')
            );
        } else {
            showMessage(error.message, 'error');
        }
    }
}



const showMessage = (message, type) => {
    Alert.alert(AppText.ALERT_APP_NAME, message)
}