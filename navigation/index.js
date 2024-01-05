/**
 * React Native Greate Minds App
 * @author Shivani Sisodiya
 * @version 1.0
 * @since 04 Apr 2022
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
//Import react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// color theme
import { color } from "../src/constant";
// Navigation screen
import LandingScreen from "../src/screens/LandingScreen";
import LoginScreen from "../src/screens/LoginScreen";
import WelcomScreen from "../src/screens/WelcomScreen";
import ParentDashboard from "../src/screens/parent/ParentDashboard";
import ParentDairy from "../src/screens/parent/ParentDairy";
import ParentTimeTable from "../src/screens/parent/ParentTimeTable";
import ParentAttendance from "../src/screens/parent/ParentAttendance";
import TeacherDashboard from "../src/screens/teacher/TeacherDashboard";
import TeacherDairy from "../src/screens/teacher/TeacherDairy";
import TeacherTimeTable from "../src/screens/teacher/TeacherTimeTable";
import Notification from "../src/screens/Notification";
import ParentSupport from "../src/screens/parent/ParentSupport";
import Attendance from "../src/screens/teacher/Attendance";
import ParentSupportDetails from "../src/screens/parent/ParentSupportDetail";
import AddNewRequest from "../src/screens/parent/ParentAddRequest";
import TeacherSupport from "../src/screens/teacher/TeacherSupport";
import PaymentOrderScreen from "../src/screens/parent/Payment";
import TeacherDashboard2 from "../src/screens/teacher/TeacherDashboard2";
import { MenuProvider } from "react-native-popup-menu";

const Stack = createNativeStackNavigator();

export default function navigation() {
  return (
    <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingScreen"
          options={{
            headerShown: false,
          }}
          component={LandingScreen}
        />

        <Stack.Screen
          name="LoginScreen"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="WelcomScreen"
          options={{
            headerShown: false,
          }}
          component={WelcomScreen}
        />
        <Stack.Screen
          name="ParentDashboard"
          options={{
            headerShown: false,
          }}
          component={ParentDashboard}
        />
        <Stack.Screen
          name="TeacherDashboard"
          options={{
            headerShown: false,
          }}
          component={TeacherDashboard}
        />
        <Stack.Screen
          name="TeacherDashboard2"
          options={{
            headerShown: false,
          }}
          component={TeacherDashboard2}
        />
        <Stack.Screen
          name="Notification"
          options={{
            headerShown: false,
          }}
          component={Notification}
        />
        <Stack.Screen
          name="ParentDairy"
          options={{
            headerShown: false,
          }}
          component={ParentDairy}
        />
        <Stack.Screen
          name="TeacherDairy"
          options={{
            headerShown: false,
          }}
          component={TeacherDairy}
        />
        <Stack.Screen
          name="TeacherTimeTable"
          options={{
            headerShown: false,
          }}
          component={TeacherTimeTable}
        />
        <Stack.Screen
          name="ParentTimeTable"
          options={{
            headerShown: false,
          }}
          component={ParentTimeTable}
        />
        <Stack.Screen
          name="Attendance"
          options={{
            headerShown: false,
          }}
          component={Attendance}
        />
        <Stack.Screen
          name="ParentAttendance"
          options={{
            headerShown: false,
          }}
          component={ParentAttendance}
        />
        <Stack.Screen
          name="ParentSupport"
          options={{
            headerShown: false,
          }}
          component={ParentSupport}
        />
        <Stack.Screen
          name="ParentSupportDetails"
          options={{
            headerShown: false,
          }}
          component={ParentSupportDetails}
        />
        <Stack.Screen
          name="ParentAddNewRequest"
          options={{
            headerShown: false,
          }}
          component={AddNewRequest}
        />
        <Stack.Screen
          name="TeacherSupport"
          options={{
            headerShown: false,
          }}
          component={TeacherSupport}
        />
        <Stack.Screen
          name="Payment"
          options={{
            headerShown: false,
          }}
          component={PaymentOrderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </MenuProvider>
  );
}
