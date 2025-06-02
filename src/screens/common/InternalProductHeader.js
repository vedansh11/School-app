import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../../constant";
import { ms } from "react-native-size-matters";

export default function InternalProductHeader(props) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontFamily: fonts.INTER_SEMIBOLD,
          fontSize: ms(14),
          color: "#1D2939",
        }}
      >
        {props.title}
      </Text>

      <TouchableOpacity style={{ width: 25, height: 25 }}>
        <Image
          source={props.sideIcon}
          style={{ width: 24, height: 24, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
