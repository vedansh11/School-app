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
import { color, PreferenceKeys, ROLEID, SUPPORT_TYPE } from "../../constant";
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
import DropShadow from "react-native-drop-shadow";

const TeacherSupportTabCommon = (props) => {
  const [listData, setListData] = useState([]);
  const [backgroundLoaderView, setBackgroundLoaderView] = useState(false);
  const [noData, setNoData] = useState(false);
  const Type = props.route.params.type;
  const Role = props.route.params.role;
  const sectionID = props.route.params.sectionid;
  // const ID = props.route.params.id;
  //  New Messages
  const DATA = [
    {
      id: "201",
      senderId: "1",
      receiverId: "49",
      message: "How do I access the online class?",
      createdAt: "2025-05-08 09:00:00",
      updatedAt: "2025-05-08 09:00:00",
      deletedAt: "0000-00-00 00:00:00",
      studentId: "1",
      parentId: "0",
      sectionId: "8",
      section: "A",
      className: "I",
      fullName: "Kandarp Rajpara",
      status: "0",
    },
    {
      id: "202",
      senderId: "1",
      receiverId: "38",
      message: "When will the test result be published?",
      createdAt: "2025-05-08 09:05:00",
      updatedAt: "2025-05-08 09:05:00",
      deletedAt: "0000-00-00 00:00:00",
      studentId: "1",
      parentId: "0",
      sectionId: "8",
      section: "A",
      className: "I",
      fullName: "Kandarp Rajpara",
      status: "0",
    },
  ];

  //  Replied Messages
  const DATA_1 = [
    {
      id: "203",
      senderId: "1",
      receiverId: "38",
      message: "Thanks for the update!",
      createdAt: "2025-05-08 09:10:00",
      updatedAt: "2025-05-08 09:10:00",
      deletedAt: "0000-00-00 00:00:00",
      studentId: "1",
      parentId: "202",
      sectionId: "8",
      section: "A",
      className: "I",
      fullName: "Kandarp Rajpara",
      status: "1",
    },
    {
      id: "204",
      senderId: "38",
      receiverId: "1",
      message: "Results will be out by next week.",
      createdAt: "2025-05-08 09:15:00",
      updatedAt: "2025-05-08 09:15:00",
      deletedAt: "0000-00-00 00:00:00",
      studentId: "1",
      parentId: "202",
      sectionId: "8",
      section: "A",
      className: "I",
      fullName: "Teacher A",
      status: "1",
    },
  ];

  // Closed Messages
  const DATA_2 = [
    {
      id: "205",
      senderId: "1",
      receiverId: "38",
      message: "Issue resolved. Thank you!",
      createdAt: "2025-05-08 09:20:00",
      updatedAt: "2025-05-08 09:20:00",
      deletedAt: "0000-00-00 00:00:00",
      studentId: "1",
      parentId: "202",
      sectionId: "8",
      section: "A",
      className: "I",
      fullName: "Kandarp Rajpara",
      status: "2",
    },
    {
      id: "206",
      senderId: "38",
      receiverId: "1",
      message: "You're welcome!",
      createdAt: "2025-05-08 09:22:00",
      updatedAt: "2025-05-08 09:22:00",
      deletedAt: "0000-00-00 00:00:00",
      studentId: "1",
      parentId: "202",
      sectionId: "8",
      section: "A",
      className: "I",
      fullName: "Teacher A",
      status: "2",
    },
  ];

  console.log("Type is", Type);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // do something
      if (Role === "parent") {
        Preference.GetData(PreferenceKeys.STUDENT_DETAIL).then(
          (student_details) => {
            const StudentID = JSON.parse(student_details).id;
            const sectionID = JSON.parse(student_details).sectionId;
            console.log(StudentID);
            if (Type === "Replied") {
              GetReplyData(StudentID, sectionID);
            } else {
              GetSupportData(StudentID, sectionID);
            }
          }
        );
      } else {
        Preference.GetData(PreferenceKeys.CURRENT_USERID).then((teacher_id) => {
          //   const StudentID = JSON.parse(student_details).id;
          if (Type === "Replied") {
            GetReplyData(teacher_id, sectionID);
          } else {
            GetSupportData(teacher_id, sectionID);
          }
        });
      }
    });

    return unsubscribe;
  }, [props.navigation]);

  // async function GetReplyData(ID, sectionID) {
  //   setBackgroundLoaderView(true);
  //   const roleId = Role == "parent" ? ROLEID.PARENT : ROLEID.TEACHER;
  //   const studentId = ID;
  //   let requestOptions = {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
  //     },
  //   };
  //   axiosCallAPI(
  //     "get",
  //     Utills.GET_REPLIED_DATA +
  //       "?roleId=" +
  //       roleId +
  //       "&studentId=" +
  //       studentId +
  //       "&sectionId=" +
  //       sectionID,
  //     "",
  //     requestOptions,
  //     true,
  //     props.navigation
  //   )
  //     // axiosCallAPI('get', Utills.GET_SUPPORT_DATA, p.toString(), requestOptions, true, props.navigation)
  //     .then((response) => {
  //       console.log(response);
  //       setBackgroundLoaderView(false);
  //       if (response !== undefined) {
  //         if (response.result.length > 0) {
  //           setNoData(false);
  //           console.log("Here is the response list", response.result);
  //           setListData(response.result);
  //         } else {
  //           setNoData(true);
  //           setListData(response.result);
  //         }
  //         //setLoaderView(false)
  //         // if (JSON.stringify(dataList) != JSON.stringify(response.result))
  //         //     setDataList(response.result)
  //       } else {
  //         //setLoaderView(false)
  //         setNoData(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setBackgroundLoaderView(false);
  //       // setLoaderView(false)
  //     });
  // }

  async function GetReplyData(ID, sectionID) {
    try {
      setBackgroundLoaderView(true);

      const roleId = Role === "parent" ? ROLEID.PARENT : ROLEID.TEACHER;
      const studentId = ID;

      const url =
        Utills.GET_REPLIED_DATA +
        `?roleId=${roleId}&studentId=${studentId}&sectionId=${sectionID}`;

      const res = await apiSimple.get(url);
      const response = res?.data;
      console.log("Here is the response 1", response.result);
      setBackgroundLoaderView(false);

      if (response !== undefined) {
        if (response.result.length > 0) {
          setNoData(false);

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

  // async function GetSupportData(ID, sectionID) {
  //   setBackgroundLoaderView(true);

  //   const roleId = Role == "parent" ? ROLEID.PARENT : ROLEID.TEACHER;
  //   const studentId = ID;
  //   const type =
  //     Type === "New"
  //       ? SUPPORT_TYPE.NEW
  //       : Type === "Closed"
  //       ? SUPPORT_TYPE.CLOSE
  //       : 1;

  //   let requestOptions = {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
  //     },
  //   };

  //   axiosCallAPI(
  //     "get",
  //     Utills.GET_SUPPORT_DATA +
  //       "?roleId=" +
  //       roleId +
  //       "&studentId=" +
  //       studentId +
  //       "&type=" +
  //       type +
  //       "&sectionId=" +
  //       sectionID,
  //     "",
  //     requestOptions,
  //     true,
  //     props.navigation
  //   )
  //     // axiosCallAPI('get', Utills.GET_SUPPORT_DATA, p.toString(), requestOptions, true, props.navigation)
  //     .then((response) => {
  //       setBackgroundLoaderView(false);
  //       console.log(response.result);
  //       if (response !== undefined) {
  //         if (response.result.length > 0) {
  //           setNoData(false);
  //           setListData(response.result);
  //         } else {
  //           setNoData(true);
  //           setListData(response.result);
  //         }

  //         //setLoaderView(false)
  //         // if (JSON.stringify(dataList) != JSON.stringify(response.result))
  //         //     setDataList(response.result)
  //       } else {
  //         setNoData(true);
  //         //setLoaderView(false)
  //       }
  //     })
  //     .catch((error) => {
  //       setBackgroundLoaderView(false);
  //       setLoaderView(false);
  //     });
  // }

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
      const response = await apiSimple.get(Utills.GET_SUPPORT_DATA, {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
        params,
        navigation: props.navigation, // passed to interceptor
      });
      console.log("supportdata", response);
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

  return (
    <View style={{ flex: 1, backgroundColor: color.WHITE, paddingTop: ms(10) }}>
      {console.log("Here is the list data", listData)}
      <FlatList
        data={
          Type == "New"
            ? DATA
            : Type == "Replied"
            ? DATA_1
            : Type == "Closed"
            ? DATA_2
            : null
        }
        // data={listData}
        renderItem={
          (item) => (
            <RenderItemSupport
              createdName={item.item.fullName}
              supportDiscription={item.item.message}
              type={Type}
              NumberDSP={
                item.item.parentId == "0" ? item.item.id : item.item.parentId
              }
              date={moment(item.item.updatedAt, "YYYY-MM-DD HH:mm:ss").format(
                "MMMM DD, YYYY | hh:mm A"
              )}
              std={"(" + item.item.className + " - " + item.item.section + ")"}
              onClick={onSupportClick}
            />
          )

          // Role == 'parent' ? null :
        }
        showsVerticalScrollIndicator={false}
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

export default TeacherSupportTabCommon;
