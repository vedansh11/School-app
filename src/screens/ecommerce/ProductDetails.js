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

export default function ProductDetails({ navigation }) {
  const [imageHeight, setImageHeight] = useState(200);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(2);
  const sizes = ["S", "M", "L", "XL"];

  const description =
    "Its simple and elegant shape makes it perfect for those of you who like minimalist clothes and want something stylish yet practical for everyday use.";

  const MAX_CHAR = 100;
  const shortDescription = description.substring(0, MAX_CHAR);

  useEffect(() => {
    // For remote images (use URL)
    // Image.getSize('https://your-image-url.com/image.png', (width, height) => { ... })

    // For local image (like yours), we use resolveAssetSource
    const imageSource = Image.resolveAssetSource(icon.PRODUCT_1);
    const ratio = imageSource.height / imageSource.width;
    console.log("Ratio", ratio);
    const calculatedHeight = (screenWidth - ms(32)) * ratio;
    setImageHeight(calculatedHeight);
  }, []);

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
              width: "100%",
              height: imageHeight,
              borderRadius: 24,
              overflow: "hidden",
              backgroundColor: "#f0f0f0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icon.PRODUCT_1}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: fonts.INTER_SEMIBOLD,
              fontSize: ms(16),
              color: "#0D083F",
              marginTop: ms(15),
            }}
          >
            {"1 set of 12pcs notebook"}
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
            <Text>{"5.0"}</Text>
          </View>

          <View style={{ marginTop: ms(10) }}>
            <Text
              style={{
                fontSize: ms(13),
                fontFamily: fonts.INTER_REGULAR,
                color: "#666",
                lineHeight: ms(20),
              }}
            >
              {isExpanded ? description : `${shortDescription}... `}
              <Text
                onPress={() => setIsExpanded(!isExpanded)}
                style={{
                  color: "#0D083F",
                  fontFamily: fonts.INTER_SEMIBOLD,
                }}
              >
                {isExpanded ? " Read Less" : " Read More"}
              </Text>
            </Text>
          </View>

          <Text
            style={{
              fontFamily: fonts.INTER_SEMIBOLD,
              fontSize: ms(12),
              color: "#0D083F",
              marginTop: ms(20),
            }}
          >
            Choose Size
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: ms(10),
              marginEnd: ms(5),
            }}
          >
            {sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={{
                    borderRadius: ms(20),
                    width: ms(26),
                    height: ms(26),
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    marginRight: ms(7),
                    borderColor: isSelected ? "#66628E" : "#DFDEDE",
                    backgroundColor: isSelected ? "#66628E" : "#fff",
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? "#fff" : "#333",
                      fontFamily: fonts.INTER_MEDIUM,
                      fontSize: ms(14),
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Price and Quantity Row */}
          <View
            style={{
              marginTop: ms(20),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Price Display */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: ms(22),
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.APP_PRIMARY,
                }}
              >
                ₹675
              </Text>
              <Text
                style={{
                  fontSize: ms(14),
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: "#66628E",
                  textDecorationLine: "line-through",
                  marginLeft: ms(8),
                }}
              >
                ₹700.00
              </Text>
            </View>

            {/* Quantity Selector */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Minus Button */}
              <TouchableOpacity
                onPress={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                }
                style={{
                  width: ms(35),
                  height: ms(35),
                  borderRadius: ms(19),
                  borderWidth: 1,
                  borderColor: "#D3D2E2",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Text style={{ fontSize: ms(20), color: "#0D083F" }}>−</Text>
              </TouchableOpacity>

              {/* Quantity Text */}
              <Text
                style={{
                  fontSize: ms(16),
                  fontFamily: fonts.INTER_BOLD,
                  color: "#0D083F",
                  marginRight: 15,
                }}
              >
                {quantity}
              </Text>

              {/* Plus Button */}
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={{
                  width: ms(35),
                  height: ms(35),
                  borderRadius: ms(19),
                  borderWidth: 1,
                  borderColor: "#D3D2E2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: ms(20), color: "#0D083F" }}>+</Text>
              </TouchableOpacity>
            </View>
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
        onPress={() => navigation.navigate("Cart")}
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
