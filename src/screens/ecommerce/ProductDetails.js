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
  const productData = {
    id: 1,
    title: "1 set of 12pcs notebook",
    description:
      "Its simple and elegant shape makes it perfect for those of you who like minimalist clothes and want something stylish yet practical for everyday use.",
    image: icon.PRODUCT_1,
    sizes: ["S", "M", "L", "XL"],
    price: 675,
    originalPrice: 700,
    rating: 5.0,
  };

  const [imageHeight, setImageHeight] = useState(200);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[2]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = productData.price * quantity;
  const totalOriginal = productData.originalPrice * quantity;

  const MAX_CHAR = 100;
  const shortDescription = productData?.description.substring(0, MAX_CHAR);

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

      {/* Header */}
      <ProductHeader
        title={productData.title}
        type={"ecommerce"}
        navigation={navigation}
        screen={"Products"}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: ms(20) }}>
        <View style={{ marginHorizontal: 16, marginTop: 12 }}>
          {/* Product Image */}
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
              source={productData.image}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: fonts.INTER_SEMIBOLD,
              fontSize: ms(16),
              color: "#0D083F",
              marginTop: ms(15),
            }}
          >
            {productData.title}
          </Text>

          {/* Rating */}
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
            <Text>{productData.rating}</Text>
          </View>

          {/* Description */}
          <View style={{ marginTop: ms(10) }}>
            <Text
              style={{
                fontSize: ms(13),
                fontFamily: fonts.INTER_REGULAR,
                color: "#666",
                lineHeight: ms(20),
              }}
            >
              {isExpanded ? productData.description : `${shortDescription}... `}
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

          {/* Size Selection */}
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
            {productData.sizes.map((size) => {
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

          {/* Price and Quantity */}
          <View
            style={{
              marginTop: ms(20),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Price */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: ms(22),
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.APP_PRIMARY,
                }}
              >
                ₹{totalPrice}
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
                ₹{totalOriginal.toFixed(2)}
              </Text>
            </View>

            {/* Quantity */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                }
                style={styles.qtyButton}
              >
                <Text style={{ fontSize: ms(20), color: "#0D083F" }}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={styles.qtyButton}
              >
                <Text style={{ fontSize: ms(20), color: "#0D083F" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <TouchableOpacity
        style={styles.addToCartBtn}
        onPress={() =>
          navigation.navigate("Cart", {
            product: { ...productData, quantity, selectedSize },
          })
        }
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
        <Text style={styles.addToCartText}>Add to Cart</Text>
        <Text style={styles.addToCartPrice}>
          | ₹{totalPrice}{" "}
          <Text style={{ textDecorationLine: "line-through" }}>
            ₹{totalOriginal.toFixed(2)}
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  qtyButton: {
    width: ms(35),
    height: ms(35),
    borderRadius: ms(19),
    borderWidth: 1,
    borderColor: "#D3D2E2",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  qtyText: {
    fontSize: ms(16),
    fontFamily: fonts.INTER_BOLD,
    color: "#0D083F",
  },
  addToCartBtn: {
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
  },
  addToCartText: {
    color: "#fff",
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: ms(16),
  },
  addToCartPrice: {
    color: "#fff",
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: ms(14),
    marginLeft: ms(8),
  },
});
