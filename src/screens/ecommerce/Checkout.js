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

export default function Checkout({ navigation }) {
  const [chekoutItems, setchekoutItems] = useState([
    {
      id: 1,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
    },
    {
      id: 2,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
    },
    {
      id: 3,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
    },
    {
      id: 4,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 1,
    },
  ]);

  const updateQuantity = (id, type) => {
    setchekoutItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        const newQty =
          type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1;

        return { ...item, qty: newQty };
      })
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", flex: 1, marginBottom: ms(15) }}>
        <Image
          source={item.image}
          style={{
            width: ms(70),
            height: ms(70),
            borderRadius: ms(8),
            marginRight: 12,
            resizeMode: "cover",
          }}
        />

        <View style={{ flex: 1, flexDirection: "row", paddingVertical: ms(5) }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View style={{ justifyContent: "space-between", flex: 1 }}>
              <Text
                style={{
                  color: color.CART_TITLE_BlACK,
                  fontFamily: fonts.INTER_SEMIBOLD,
                  fontSize: ms(12),
                }}
              >
                {item.name}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: ms(14),
                    fontFamily: fonts.INTER_SEMIBOLD,
                    color: color.APP_PRIMARY,
                  }}
                >
                  ₹{item.sellingPrice}
                </Text>
                <Text
                  style={{
                    fontSize: ms(10),
                    fontFamily: fonts.INTER_SEMIBOLD,
                    color: "#66628E",
                    textDecorationLine: "line-through",
                    marginLeft: ms(8),
                  }}
                >
                  ₹{item.costPrice}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, "dec")}
                style={{
                  borderColor: color.CART_GREY,
                  borderWidth: 0.75,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  height: ms(25),
                  width: ms(25),
                }}
              >
                <Text style={{ fontSize: ms(13) }}>–</Text>
              </TouchableOpacity>
              <Text
                style={{
                  marginHorizontal: ms(11),
                  fontSize: ms(14),
                  color: "black",
                }}
              >
                {item.qty}
              </Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, "inc")}
                style={{
                  borderColor: color.CART_GREY,
                  borderWidth: 0.75,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  height: ms(25),
                  width: ms(25),
                }}
              >
                <Text style={{ fontSize: ms(13) }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const getTotalItemCount = () => {
    return chekoutItems.reduce((total, item) => total + item.qty, 0);
  };

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
        <View style={{ marginHorizontal: 16, marginTop: 18 }}>
          <View
            style={{
              backgroundColor: "#E1DFFD",
              paddingHorizontal: ms(15),
              paddingVertical: ms(16),
              borderRadius: ms(8),
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
              <View style={{ flex: 0.8 }}>
                <Text>Shipping Address</Text>

                <Text
                  style={{
                    fontFamily: fonts.INTER,
                    fontSize: ms(12),
                    color: "#667085",

                    //  backgroundColor: "red",
                  }}
                  numberOfLines={1}
                >
                  {
                    "2248, Raipur Chakla, Nr City Garden, Gandhi Road, Rajkot , Near Amrapali and station"
                  }
                </Text>
              </View>

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
                  source={icon.IC_chekout_EDIT}
                  style={{
                    width: ms(13.5),
                    height: ms(13.5),
                    resizeMode: "contain",
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}></View>

          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.INTER_SEMIBOLD,
              color: "#000",
              marginBottom: ms(15),
            }}
          >
            Items ({getTotalItemCount()})
          </Text>
          <FlatList
            data={chekoutItems}
            // data={dummyData}
            renderItem={(item, index) => renderItem(item, index)}
            showsVerticalScrollIndicator={false}
            style={
              {
                // marginTop: 10,
              }
            }
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
            showsHorizontalScrollIndicator={false}
          />

          <View>
            <Text
              style={{
                fontFamily: fonts.INTER_SEMIBOLD,
                color: color.CART_TITLE_BlACK,
                fontSize: ms(16),
                marginTop: ms(8),
                marginBottom: ms(15),
              }}
            >
              Shipping Information
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: ms(15),
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.SHIPPING_INFO_TXT_CLR,
                  fontSize: ms(12),
                }}
              >
                Total ({getTotalItemCount() + " items"})
              </Text>

              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.CART_TITLE_BlACK,
                  fontSize: ms(12),
                }}
              >
                ₹2100.00
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: ms(15),
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.SHIPPING_INFO_TXT_CLR,
                  fontSize: ms(12),
                }}
              >
                Shipping Fee
              </Text>

              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.CART_TITLE_BlACK,
                  fontSize: ms(12),
                }}
              >
                ₹0.0
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: ms(35),
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.SHIPPING_INFO_TXT_CLR,
                  fontSize: ms(12),
                }}
              >
                Discount
              </Text>

              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.CART_TITLE_BlACK,
                  fontSize: ms(12),
                }}
              >
                ₹75.00
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: ms(15),
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.SHIPPING_INFO_TXT_CLR,
                  fontSize: ms(12),
                }}
              >
                Sub Total
              </Text>

              <Text
                style={{
                  fontFamily: fonts.INTER_SEMIBOLD,
                  color: color.CART_TITLE_BlACK,
                  fontSize: ms(12),
                }}
              >
                ₹2025.00
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: ms(20),
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
          <Text
            style={{
              fontFamily: fonts.INTER_SEMIBOLD,
              fontSize: ms(16),
              color: "white",
            }}
            onPress={() => navigation.navigate("PaymentSuccess")}
          >
            Purchase Now
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add to Cart Button */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
