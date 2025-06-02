import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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

export default function Products({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [filterBySearch, setFilterBySearch] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [image, setImage] = useState(""); // If you want to set an image, update this path
  const label = "Search Products"; // Set your
  const [selectedMenu, setSelectedMenu] = useState(0); // default selected index

  const dataList = [
    {
      id: 1,
      icon: icon.IC_CATEGORY,
      name: "All Item",
    },
    {
      id: 2,
      icon: icon.IC_BAG,
      name: "Bags",
    },

    {
      id: 3,
      icon: icon.IC_SHOE,
      name: "Shoes",
    },
    {
      id: 4,
      icon: icon.IC_SHIRT,
      name: "Uniform",
    },
  ];

  const productList = [
    {
      id: 1,
      product_image: icon.PRODUCT_1,
      title: "New Arrived Uniform 2025",
      ratings: "5.0",
      desc: "Its simple and elegant shape makes it to long and so",
      price: "2850",
    },

    {
      id: 2,
      product_image: icon.PRODUCT_2,
      title: "New Arrived Uniform 2025",
      ratings: "4.0",
      desc: "Its simple and elegant shape makes it to long and so",
      price: "899",
    },

    {
      id: 3,
      product_image: icon.PRODUCT_1,
      title: "New Arrived Uniform 2025",
      ratings: "4.6",
      desc: "Its simple and elegant shape makes it to long and so",
      price: "3850",
    },

    {
      id: 4,
      product_image: icon.PRODUCT_2,
      title: "New Arrived Uniform 2025",
      ratings: "5.0",
      desc: "Its simple and elegant shape makes it to long and so",
      price: "22850",
    },

    {
      id: 5,
      product_image: icon.PRODUCT_1,
      title: "New Arrived Uniform 2025",
      ratings: "5.0",
      desc: "Its simple and elegant shape makes it to long and so",
      price: "2342",
    },

    {
      id: 6,
      product_image: icon.PRODUCT_2,
      title: "New Arrived Uniform 2025",
      ratings: "5",
      desc: "Its simple and elegant shape makes it to long and so",
      price: "950",
    },
    {
      id: 7,
      product_image: icon.PRODUCT_1,
      title: "New Arrived Uniform 2025",
      ratings: "5.0",
      desc: "Its simple and elegant shape makes it to long and so",
      price: "21850",
    },
  ];

  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedMenu;

    return (
      <TouchableOpacity
        onPress={() => setSelectedMenu(index)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",

          alignItems: "center",
          borderRadius: ms(8),
          borderWidth: 1,
          borderColor: isSelected ? color.APP_PRIMARY : "#D3D2E2",
          paddingHorizontal: ms(13),
          paddingVertical: ms(10),
          backgroundColor: isSelected ? color.APP_PRIMARY : "#FFFFFF",
        }}
      >
        <Image
          source={item.icon}
          style={{
            width: 22,
            height: 22,
            resizeMode: "contain",
            tintColor: isSelected ? "#FFFFFF" : "#000000",

            marginRight: ms(8),
          }}
        />
        <Text
          style={{
            fontFamily: fonts.INTER_MEDIUM,
            color: isSelected ? "#FFFFFF" : "#000000",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProduct = ({ item, index }) => {
    return <ProductCard item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={stylesCommon.safeAreaStyle}>
      <StatusBar backgroundColor={color.APP_PRIMARY} />

      <ProductHeader
        title={"Prodcuts"}
        type={"ecommerce"}
        navigation={navigation}
        screen={"Products"}
        // showAddress={true}
      />
      <View style={{ marginHorizontal: 16, marginTop: 12 }}>
        <View style={[stylesCommon.inputMainView]}>
          <OutlinedTextField
            style={[stylesCommon.searchTextFeild]}
            tintColor={color.APP_PRIMARY}
            selectionColor={color.APP_PRIMARY}
            label={label}
            multiline={false}
            editable={isEnable}
            returnKeyType="done"
            autoFocus={false}
            inputContainerStyle={{
              height: 50,
            }}
            labelTextStyle={
              {
                // bottom: vh(5),
              }
            }
            onChangeText={(text) => {
              setSearchText(text);
              setFilterBySearch(true);
            }}
          />

          <View style={stylesCommon.dropdownView}>
            <Image
              style={{ width: 24, height: 24 }}
              source={icon.IC_SEARCH}
            ></Image>
          </View>
        </View>

        <FlatList
          data={dataList}
          // data={dummyData}
          renderItem={(item, index) => renderItem(item, index)}
          showsVerticalScrollIndicator={false}
          style={
            {
              // marginTop: 10,
            }
          }
          keyExtractor={(item, index) => index}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{ marginTop: ms(20), marginBottom: ms(5) }}>
          <InternalProductHeader
            title={"All Featured"}
            sideIcon={icon.IC_FILTER}
          />
        </View>
      </View>
      <FlatGrid
        itemDimension={145}
        spacing={14}
        data={productList}
        style={{}}
        renderItem={(item, index) => renderProduct(item, index)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
