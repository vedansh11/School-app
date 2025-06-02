import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { color, fonts, icon } from "../../constant";

export default function ProductCard({ item, navigation }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        borderColor: "#D3D2E2",
        borderWidth: 1,
      }}
      //  onPress={() => navigation.navigate("ProductDetails", { product: item })}
      onPress={() => navigation.navigate("ProductDetails")}
    >
      <Image
        source={item.product_image}
        style={{
          width: "100%",
          height: ms(163),
          resizeMode: "cover",

          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />

      <View style={{ padding: 18 }}>
        <Text
          style={{
            fontFamily: fonts.INTER_SEMIBOLD,
            fontSize: ms(14),
            color: "#0D083F",
          }}
        >
          {item.title}
        </Text>

        <View
          style={{
            flexDirection: "row",

            marginTop: ms(5),
            alignItems: "center",
          }}
        >
          <Image
            source={icon.IC_STAR}
            style={{
              width: ms(14),
              height: ms(14),
              resizeMode: "contain",
              marginRight: ms(4),
            }}
          />
          <Text>{item.ratings}</Text>
        </View>

        <Text
          style={{
            marginTop: ms(8),
            fontFamily: fonts.INTER,
            fontSize: ms(12),
            color: "#66628E",
          }}
          numberOfLines={2}
        >
          {item.desc}
        </Text>

        <Text
          style={{
            color: color.APP_PRIMARY,
            fontFamily: fonts.INTER_SEMIBOLD,
            fontSize: ms(16),
            marginTop: ms(10),
          }}
        >
          ₹{parseFloat(item.price).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
