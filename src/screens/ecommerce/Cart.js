import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import stylesCommon from "../../commonTheme/stylesCommon";
import { AppText, color, fonts, icon } from "../../constant";
import { ProductHeader } from "../common/ProductHeader";
import { OutlinedTextField } from "react-native-material-textfield-plus";
import { ms } from "react-native-size-matters";
import InternalProductHeader from "../common/InternalProductHeader";
import { FlatGrid } from "react-native-super-grid";
import ProductCard from "../common/ProductCard";
import { screenHeight, screenWidth } from "../../Utills/dimesnion";

export default function Cart({ navigation }) {
  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      <ProductHeader
        title={"1 set of 12pcs notebook"}
        type={"ecommerce"}
        navigation={navigation}
        screen={"Products"}
        // showAddress={true}
      />
      <ScrollView>
        <View style={{ marginHorizontal: 16, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#E1DFFD",
              paddingHorizontal: ms(15),
              paddingVertical: ms(16),
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text>Shipping Address</Text>
              <View
                style={{
                  backgroundColor: color.APP_PRIMARY,
                  height: ms(30),
                  width: ms(30),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: ms(30),
                }}
              >
                <Image
                  source={icon.IC_CART_EDIT}
                  style={{
                    width: ms(13.5),
                    height: ms(13.5),
                    resizeMode: "contain",
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                fontFamily: fonts.INTER,
                fontSize: ms(12),
                color: "#667085",
                flex: 0.7,
                backgroundColor: "red",
              }}
            >
              {
                "2248, Raipur Chakla, Nr City Garden, Gandhi Road, Rajkot , Near Amrapali and station"
              }
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={{
          marginTop: ms(30),
          marginBottom: ms(40),
          marginHorizontal: ms(16),
          backgroundColor: "#FF6B4A",
          borderRadius: ms(100),
          paddingVertical: ms(14),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: ms(10),
        }}
      >
        <Image
          source={icon.IC_CART}
          style={{
            width: ms(22),
            height: ms(22),
            marginRight: ms(5),
            resizeMode: "contain",
            tintColor: "#fff",
          }}
        />
        <Text
          style={{
            color: "#fff",
            fontFamily: fonts.INTER_SEMIBOLD,
            fontSize: ms(16),
          }}
        >
          Add to Cart
        </Text>
        <Text
          style={{
            color: "#fff",
            fontFamily: fonts.INTER_MEDIUM,
            fontSize: ms(14),
            marginLeft: ms(8),
          }}
        >
          | ₹675{" "}
          <Text style={{ textDecorationLine: "line-through" }}>₹700</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
