import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  Animated,
} from "react-native";
import {
  color,
  fonts,
  icon,
  PreferenceKeys,
  ROLEID,
  SUPPORT_TYPE,
} from "../../constant";
import { RenderItemSupport } from "../../commonTheme/CommonView";
import {
  LoaderViewWithBackground_new,
  EmptyView,
} from "../../commonTheme/LoaderView";
import * as Preference from "../../storeData/Preference";
import * as Utills from "../../API/Utills";
import { axiosCallAPI } from "../../API/axiosCommonService";
import moment from "moment";
import stylesCommon from "../../commonTheme/stylesCommon";
import { screenWidth } from "../../Utills/dimesnion";
import { apiSimple, apiFull } from "../../API/api";
import { ms } from "react-native-size-matters";

const OrdersTab = (props) => {
  const [listData, setListData] = useState([]);
  const [backgroundLoaderView, setBackgroundLoaderView] = useState(false);
  const [noData, setNoData] = useState(false);
  const Type = props.route.params.type;
  const Role = props.route.params.role;
  const sectionID = props.route.params.sectionid;

  const DATA = [
    {
      id: 1,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "1",
    },
    {
      id: 2,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "0",
    },
    {
      id: 3,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "0",
    },
    {
      id: 4,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 1,
      isActive: "0",
    },
  ];

  //  Replied Messages
  const DATA_1 = [
    {
      id: 1,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "1",
    },
    {
      id: 2,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "0",
    },
    {
      id: 3,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "0",
    },
    {
      id: 4,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 1,
      isActive: "0",
    },
  ];

  // Closed Messages
  const DATA_2 = [
    {
      id: 1,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "-1",
    },
    {
      id: 2,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "-1",
    },
    {
      id: 3,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 2,
      isActive: "-1",
    },
    {
      id: 4,
      image: icon.PRODUCT_1,
      name: "1 set of 12pcs notebook",
      sellingPrice: "675",
      costPrice: "700",
      qty: 1,
      isActive: "-1",
    },
  ];

  //   useEffect(() => {
  //     const unsubscribe = props.navigation.addListener("focus", () => {
  //       // do something
  //       if (Role === "parent") {
  //         Preference.GetData(PreferenceKeys.STUDENT_DETAIL).then(
  //           (student_details) => {
  //             const StudentID = JSON.parse(student_details).id;
  //             const sectionID = JSON.parse(student_details).sectionId;
  //             console.log(StudentID);
  //             if (Type === "Replied") {
  //               GetReplyData(StudentID, sectionID);
  //             } else {
  //               GetSupportData(StudentID, sectionID);
  //             }
  //           }
  //         );
  //       } else {
  //         Preference.GetData(PreferenceKeys.CURRENT_USERID).then((teacher_id) => {
  //           //   const StudentID = JSON.parse(student_details).id;
  //           if (Type === "Replied") {
  //             GetReplyData(teacher_id, sectionID);
  //           } else {
  //             GetSupportData(teacher_id, sectionID);
  //           }
  //         });
  //       }
  //     });

  //     return unsubscribe;
  //   }, [props.navigation]);

  async function GetReplyData(ID, sectionID) {
    try {
      setBackgroundLoaderView(true);

      const roleId = Role === "parent" ? ROLEID.PARENT : ROLEID.TEACHER;
      const studentId = ID;

      const url =
        Utills.GET_REPLIED_DATA +
        `?roleId=${roleId}&studentId=${studentId}&sectionId=${sectionID}`;

      const res = await apiFull.get(url);
      const response = res?.data;

      setBackgroundLoaderView(false);

      if (response !== undefined) {
        if (response.result.length > 0) {
          setNoData(false);
          console.log("Here is the response list", response.result);
          setListData(response.result);
        } else {
          setNoData(true);
          setListData(response.result);
        }
      } else {
        setNoData(true);
      }
    } catch (error) {
      console.log("Error in GetReplyData:", error);
      setBackgroundLoaderView(false);
      setNoData(true);
    }
  }

  async function GetSupportData(ID, sectionID) {
    setBackgroundLoaderView(true);

    const roleId = Role == "parent" ? ROLEID.PARENT : ROLEID.TEACHER;
    const studentId = ID;
    const type =
      Type === "New"
        ? SUPPORT_TYPE.NEW
        : Type === "Closed"
        ? SUPPORT_TYPE.CLOSE
        : 1;

    const token = await Preference.GetData(PreferenceKeys.TOKEN);

    const params = {
      roleId: roleId,
      studentId: studentId,
      type: type,
      sectionId: sectionID,
    };

    try {
      const response = await apiFull.get(Utills.GET_SUPPORT_DATA, {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
        params,
        navigation: props.navigation, // passed to interceptor
      });

      setBackgroundLoaderView(false);

      if (response?.result?.length > 0) {
        setNoData(false);
        setListData(response.result);
      } else {
        setNoData(true);
        setListData(response.result || []);
      }
    } catch (error) {
      setBackgroundLoaderView(false);
      setLoaderView(false);
    }
  }

  function onSupportClick(requestID) {
    props.navigation.navigate("ParentSupportDetails", {
      requestID: 119,
      //puttingStatic for testing
      //requestID: requestID,
      type: Role,
      tab: Type,
    });
  }

  const renderItem = ({ item, index, Type }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginBottom: ms(15),
        }}
      >
        <Image
          source={item.image}
          style={{
            width: ms(70),
            height: ms(70),
            borderRadius: ms(8),
            marginRight: 12,
            resizeMode: "cover",
            opacity: Type === "CancelOrders" ? 0.5 : 1,
          }}
        />

        <View style={{ flex: 1, flexDirection: "row", paddingVertical: ms(5) }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
              opacity: Type === "CancelOrders" ? 0.5 : 1,
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
              <Text
                style={{
                  color:
                    item.isActive === "1"
                      ? color.ORDERS_GREY
                      : item.isActive === "-1"
                      ? color.SHIPPING_INFO_TXT_CLR
                      : color.SHIPPING_INFO_TXT_CLR,
                  fontFamily: fonts.INTER_MEDIUM,
                  fontSize: ms(12),
                }}
              >
                {console.warn("Type is this", Type)}
                {Type == "ActiveOrders"
                  ? "Cancel Order"
                  : Type == "PastOrders"
                  ? "Repeat Order"
                  : Type == "CancelOrders"
                  ? "Order Again"
                  : null}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.WHITE }}>
      <FlatList
        data={
          Type == "ActiveOrders"
            ? DATA
            : Type == "PastOrders"
            ? DATA_1
            : Type == "CancelOrders"
            ? DATA_2
            : null
        }
        // data={listData}
        renderItem={({ item, index }) => renderItem({ item, index, Type })}
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: ms(2), marginTop: ms(20) }}
      />
      {/* For Testing purpose commenting the below line please remove while real data  */}

      {/* {noData && <EmptyView />} */}

      {backgroundLoaderView && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoaderViewWithBackground_new color={color.WHITE} />
        </View>
      )}
    </View>
  );
};

export default OrdersTab;
