import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  Alert,
  Modal,
  StyleSheet,
  ScrollView,
  BackHandler
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import {
  OutlinedTextField,
} from 'react-native-material-textfield-plus';
import moment from 'moment'
import { normalize, screenHeight, screenWidth, vh, vw } from '../../Utills/dimesnion';
import { axiosCallAPI } from '../../API/axiosCommonService';
import * as Utills from '../../API/Utills';
import * as Preference from '../../storeData/Preference';
import stylesCommon from "../../commonTheme/stylesCommon";
import { AppText, color, fonts, icon, PreferenceKeys, RECEIVER_TYPE } from "../../constant";
import { SchoolDetailHeaderView } from "../../commonTheme/HeaderView";
import axios from 'axios';
import { LoaderViewWithBackground_new, EmptyView } from "../../commonTheme/LoaderView";
// import {
//   DashboardRawDetailMenu,
//   TitileBackgroundView,
//   RenderItemSupport,
// } from "../../commonTheme/CommonView";
import ColorPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import { DashboardRawDetailMenu, TitileBackgroundView, ModelTitleView, ButtonView } from '../../commonTheme/CommonView';
import SelectDropdown from 'react-native-select-dropdown'
const PaymentOrderScreen = ({ navigation }) => {
  const fromFieldRef = useRef();
  const toFieldRef = useRef();
  const modalAmountRef = useRef();
  let Mybooleanvalue = [];
  const [backgroundLoaderView, setBackgroundLoaderView] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [RemainingAmount, setRemainingAmount] = useState(0);
  const [listdata, setListData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isSaveData, setSaveData] = useState()
  const [loaderView, setLoaderView] = useState(false);
  const [noteType, setNoteType] = useState([])
  const [noteTypeSelected, setNoteTypeSelected] = useState('')
  const [isNoteType, setISNoteType] = useState(-1)
  const [noteTypeID, setNoteTypeID] = useState('')
  const [modalAmount, setModalAmount] = useState('');
  const [modalRemark, setModalRemark] = useState('');
  const [noData, setNoData] = useState(false);
  const [dropdownlist, setDropDownlist] = useState([]);
  const [fees, setFees] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isFullPaymentShow, setIsFullPaymentShow] = useState(false)
  const [structureId, setStructureId] = useState('');
  const [yearList, setYearList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classId, setClassId] = useState('');
  const [imagePath, setImagePath] = useState(icon.IC_FEES);
  const [PaymentModalItem, setPaymentModalItem] = useState();

  const Data = {
    tableHead: ['Head', 'Head2'],
    tableData: [
      ['BASIC', '0000'],
      ['HRA', '0000'],
      ['MOBILE', '0000'],
      ['EDUCATION', '0000'],
      ['OTHER ALLOWANCES', '0000'],
      ['GROSS', '0000'],
      ['PF', '0000'],
      ['ESIC', '0000'],
      ['BONUS', '0000'],
      ['CTC', '0000'],
    ],
  };
  
  const [tableState, setTableState] = useState([]);
  // const listdata =[
  //   {"id":1, "name": "Term 1", "date":"1 April, 2023", "status":"PAID", "price":"₹6500"},
  //   {"id":2,"name": "Term 2", "date":"1 March, 2023", "status":"PAID", "price":"₹6500"},
  //   {"id":3,"name": "Term 3", "date":"1 May, 2023", "status":"", "price":"₹6500"},
  //   {"id":4,"name": "Term 4", "date":"1 Jun, 2023", "status":"", "price":"₹6500"},


  // ] ;

  const onIndexChange = (index) => {
    
    setTableState(item =>{
        return item.map((i,j) =>{

            return j=== index ? (i == true ? false : true ) : i
        })
    })
}


  useEffect(() => {
    //CreateOrder();

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // GetPaymentDetails();
    GetClassList();
    CreateYearList();
    CFPaymentGatewayService.setEventSubscriber({
      onReceivedEvent(eventName, map) {
        console.log(
          'Event recieved on screen: ' +
          eventName +
          ' map: ' +
          JSON.stringify(map)
        );
      },
    });
    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        console.log('orderId is :' + orderID);
        SavePayment(orderID);
      },
      onError(error, orderID) {
        clearData()
        Alert.alert("Failed", error.message, [{ text: 'OK', onPress: () => { console.log('Ok Press') } }]);
        console.log(
          'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
        );
      },
    });
    return () => {
      CFPaymentGatewayService.removeCallback();
      CFPaymentGatewayService.removeEventSubscriber();
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    }
  }, [])

  useEffect(() => {

    if (selectedYear.length > 0 && classId.length > 0) {
      Preference.SetData(PreferenceKeys.CLASS_ID, classId);
      GetPaymentDetails();
    }
  }, [classId, selectedYear])

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  const SavePayment = async (order_id) => {
    setBackgroundLoaderView(true)
    const Student_details = JSON.parse(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL));
    const student_id = Student_details.id;
    //const class_id = Student_details.classId;
    var data = new FormData();
    data.append("student_id", student_id);
    data.append("class_id", await Preference.GetData(PreferenceKeys.CLASS_ID));
    data.append("term_id", await Preference.GetData(PreferenceKeys.TERM_ID));
    data.append("amount", await Preference.GetData(PreferenceKeys.AMOUNT));
    data.append("remark", await Preference.GetData(PreferenceKeys.REMARK));
    data.append("structure_id", await Preference.GetData(PreferenceKeys.STRUCTURE_ID));
    data.append("order_id", order_id);
    data.append("order_status", "paid");
    let requestOptions = {
      headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
      }
    };

    axiosCallAPI('post', Utills.SAVE_PAYMENT, data, requestOptions, true, navigation)
      .then(response => {
        console.log(response);
        clearData();
        Preference.ClearSingleData(PreferenceKeys.TERM_ID)
        Preference.ClearSingleData(PreferenceKeys.AMOUNT)
        Preference.ClearSingleData(PreferenceKeys.REMARK)
        Preference.ClearSingleData(PreferenceKeys.STRUCTURE_ID);
        GetPaymentDetails();
      })
      .catch(error => {
        clearData();
        setBackgroundLoaderView(false)
      });
  }
  const GetClassList = async () => {
    let requestOptions = {
      headers: {
        Accept: 'application/json',
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
      }
    };
    const schoolId = JSON.parse(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL)).schoolId;
    axiosCallAPI('get', Utills.GET_CLASS_LIST + schoolId, '', requestOptions, true, navigation)
      .then(response => {
        response.result.reverse();
        response.result.map((item) => {
          item.className = "Class - " + item.className;
        })
        setClassList(response.result);

      })
      .catch(error => {

      })
  }
  const GetPaymentDetails = async () => {
    setBackgroundLoaderView(true)
    let requestOptions = {
      headers: {
        Accept: 'application/json',
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN)
      }
    };
    console.log(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL))
    let ClassId_local;
    let Year_local;
    if (classId === '') {
      ClassId_local = JSON.parse(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL)).classId;
    }
    else {
      ClassId_local = classId;
    }

    if (selectedYear === '') {
      Year_local = await Preference.GetData(PreferenceKeys.SAVE_YEAR);
    }
    else {
      Year_local = selectedYear;
    }

    // const classid = JSON.parse(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL)).classId;
    const studentId = JSON.parse(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL)).id;
    const schoolId = JSON.parse(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL)).schoolId;
    // console.log("_________________________Start Call______________________")
    // console.log(Utills.GET_PAYMENT_LIST + ClassId_local + "&studentId=" + studentId+"&year="+Year_local);
    // console.log("_________________________End Call______________________")
    axiosCallAPI('get', Utills.GET_PAYMENT_LIST + ClassId_local + "&studentId=" + studentId + "&year=" + Year_local + "&schoolId=" + schoolId, '', requestOptions, true, navigation)
      .then(response1 => {

        console.log(response1);
        setBackgroundLoaderView(false)
        var response = response1.data;
        if (response1.status) {
          setImagePath(icon.IC_FEES);
          setPaidAmount(response.result.paid_amount);
          setRemainingAmount(response.result.remain_amount);
          // let sortedCars1 = response.result.sort((a, b) =>
          //   a.due_date.split('-').reverse().join().localeCompare(b.due_date.split('-').reverse().join()));
          // setListData(response.result.data_list);
          var filterArray = [];
          var ListArray = [];
          response.result.data_list.map((item) => {
            if (item.structure_name == "Full") {
              setFees(item.fees);
              setFinalAmount(item.final_amount);

              if (item.discount_value > 0) {
                setIsFullPaymentShow(true);
                if (item.discount_type == 0) {
                  setDiscount(item.discount_value + "%")
                }
                else {
                  setDiscount("₹" + item.discount_value)
                }
              }
              else {
                setIsFullPaymentShow(false);
              }
            }
            if (item.order_status == 'paid') {
              setIsFullPaymentShow(false);
            }


            if (item.structure_name != "Full Payment" || item.order_status == 'paid') {
              ListArray.push(item);

            }

            if (item.order_status != 'paid' && item.structure_name != "Full Payment") {
              filterArray.push(item);
            }
          })
          if (filterArray.length > 0) {
            setImagePath(icon.IC_FEES);
          }
          else {
            setImagePath('');
          }
          Mybooleanvalue = [];
          ListArray.map((item) =>{
            Mybooleanvalue.push(false);
          })
          setTableState(Mybooleanvalue);
          setListData(ListArray);
          setDropDownlist(filterArray);
          
          if (response.result.data_list.length > 0) {
            setNoData(false)
          }
          else {
            setNoData(true)
          }
        }
        else {
          setNoData(true)
          setListData([])
          setDropDownlist([])
          setPaidAmount("0");
          setRemainingAmount("0");
          setImagePath('');
          setIsFullPaymentShow(false);
        }

      }).catch(error => {
        setBackgroundLoaderView(false)
      })

  }
  const CreateYearList = async () => {
    let CurrentYear = moment().year();
    let yearArray = [];
    yearArray.push((CurrentYear - 1) + "-" + (CurrentYear));
    yearArray.push((CurrentYear) + "-" + (CurrentYear + 1));
    yearArray.push((CurrentYear + 1) + "-" + (CurrentYear + 2));
    setSelectedYear(yearArray[1]);
    Preference.GetData(PreferenceKeys.STUDENT_DETAIL).then(data => {
      setSelectedClass("Class - " + JSON.parse(data).className);
    })
    setYearList(yearArray);
    setClassId(JSON.parse(await Preference.GetData(PreferenceKeys.STUDENT_DETAIL)).classId);

  }

  const CreateOrder = async () => {

    var customer_details = {};
    customer_details.customer_id = await Preference.GetData(PreferenceKeys.CURRENT_USERID);
    customer_details.customer_email = JSON.parse(await Preference.GetData(PreferenceKeys.LOGIN_USER_DETAIL)).email;
    customer_details.customer_phone = JSON.parse(await Preference.GetData(PreferenceKeys.LOGIN_USER_DETAIL)).mobileNo;


    // var params = new FormData();
    // params.append("order_amount",1)
    // params.append("order_currency","INR")
    // params.append("order_note","Test Payment")
    // params.append("customer_details", JSON.stringify(customer_details));


    // let requestOptions = {
    //     headers: {
    //         "Accept": 'application/json',
    //         "Content-Type": "application/json",
    //         "Authorization": await Preference.GetData(PreferenceKeys.TOKEN),
    //         "x-api-version":"2022-09-01",
    //         "x-client-Id":"2661289e6fe0f1f4a9fe50a71d821662",
    //         "x-client-Secret":"8971531fe3d2b59b06e97c573b170d3af09acd92"
    //     }

    // };
    // console.log("_________________________")
    // console.log(params);
    // console.log(customer_details);
    // console.log(requestOptions);
    // axiosCallAPI('post', Utills.CREATE_ORDER,params,requestOptions,true,navigation )
    // .then(response => {
    //     console.log(response);            
    // }).catch(error =>{

    // })
    //  var axios = require('axios');
    //  var FormData = require('form-data');
    setBackgroundLoaderView(true)
    var data = new FormData();
    data.append('order_amount', modalAmount);
    data.append('order_currency', 'INR');
    data.append('order_note', modalRemark);
    data.append('customer_details', JSON.stringify(customer_details));



    var config = {
      // method: 'post',
      // url: Utills.CREATE_ORDER,
      headers: {
        'accept': 'application/json',
        "Content-Type": "multipart/form-data",
        'x-api-version': '2022-09-01',
        'x-client-Id': '2661289e6fe0f1f4a9fe50a71d821662',
        'x-client-Secret': '8971531fe3d2b59b06e97c573b170d3af09acd92',
        'Authorization': await Preference.GetData(PreferenceKeys.TOKEN)
      }
      //data: data
    };
    axiosCallAPI('post', Utills.CREATE_ORDER, data, config, true, navigation)
      .then(response => {
        setBackgroundLoaderView(false)
        // console.log(JSON.stringify(response.data));
        Preference.SetData(PreferenceKeys.TERM_ID, noteTypeID);
        Preference.SetData(PreferenceKeys.AMOUNT, modalAmount);
        Preference.SetData(PreferenceKeys.REMARK, modalRemark);
        Preference.SetData(PreferenceKeys.STRUCTURE_ID, structureId);
        Preference.SetData(PreferenceKeys.SAVE_YEAR, selectedYear);
        Preference.SetData(PreferenceKeys.CLASS_ID, classId);
        StartPayment(response.payment_session_id, response.order_id)

      }).catch(error => {
        console.log(error);
        setBackgroundLoaderView(false)
      })

    // console.log(config.data);
    // axios(config)
    //   .then(function (response) {
    //     setBackgroundLoaderView(false)
    //     console.log(JSON.stringify(response.data));
    //     Preference.SetData(PreferenceKeys.TERM_ID, noteTypeID);
    //     Preference.SetData(PreferenceKeys.AMOUNT, modalAmount);
    //     Preference.SetData(PreferenceKeys.REMARK, modalRemark);
    //     StartPayment(response.data.data.payment_session_id, response.data.data.order_id)


    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     setBackgroundLoaderView(false)
    //   });


  }
  function renderCloseClick() {
    clearData()
    setModalVisible(false)
    setPaymentModalVisible(false)
  }
  const saveBtnClick = () => {
    if (noteTypeID != '' || structureId != '') {
      setModalVisible(false);
      CreateOrder();
    }
  }
  const clearData = () => {
    setNoteTypeSelected('');
    if (modalAmountRef.current != null) {
      modalAmountRef.current.setValue();
    }
    setModalAmount('');
    setModalRemark('');
  }
  const InputView = (label, isEnable, image, multiline) => {
    return (
      <View>
        {
          (label == AppText.TERMS) &&
          <View style={stylesCommon.inputMainView}>
            <SelectDropdown
              data={dropdownlist}
              onSelect={(selectedItem, index) => {
                setISNoteType(-1)
                // console.log(selectedItem);
                if (selectedItem.structure_name != 'Full') {
                  setModalAmount(selectedItem.amount);
                  modalAmountRef.current.setValue(selectedItem.amount);
                  console.log(selectedItem.amount);
                  setNoteTypeID(selectedItem.id)
                  setStructureId('')
                }
                else {
                  setModalAmount(selectedItem.final_amount.toString());
                  modalAmountRef.current.setValue(selectedItem.final_amount.toString());
                  setNoteTypeID('')
                  console.log(selectedItem);
                  setStructureId(selectedItem.structure_id);
                }
              }}
              defaultButtonText={(noteTypeSelected === '') ? 'Select Term' : noteTypeSelected}
              //    defaultButtonText={'Select note type'} 
              // defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {

                return selectedItem.label_name;
              }}
              rowTextForSelection={(item, index) => {

                return item.label_name;
              }}
              buttonStyle={isNoteType != 0 ? styles.dropdownBtnStyle : styles.dropdownBtnStyle_error}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <View style={styles.arrowView}>
                  <Image style={stylesCommon.dropImage}
                    source={image}>
                  </Image>
                </View>;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
            />
            {isNoteType == 0 && <Text style={{ color: '#D50000', fontSize: 12, marginTop: -10, marginStart: 10, }}>Please select note type</Text>}
          </View>
        }
        {
          (label == AppText.AMOUNT) &&
          <View style={stylesCommon.inputMainView}>
            <OutlinedTextField
              style={[stylesCommon.textFieldView]}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={label}
              multiline={multiline}
              editable={false}
              returnKeyType='done'
              autoFocus={true}
              tiitle={label}
              value={modalAmount}
              error={(!isSaveData && isSaveData != undefined) && description.length === 0 && AppText.ENTER_DESCRIPTION}
              onChangeText={(text) => { console.log(text) }}
              ref={modalAmountRef}
            />
            {
              (image != '') ?
                <View style={stylesCommon.dropdownView}>
                  <Image style={stylesCommon.dropImage}
                    source={image}>
                  </Image>
                </View> : null
            }

          </View>
        }

        {
          (label == AppText.REMARK) &&
          <View style={stylesCommon.inputMainView}>
            <OutlinedTextField
              style={[stylesCommon.textFieldView, { marginBottom: vh(15), paddingTop: vh(5) }]}
              tintColor={color.APP_PRIMARY}
              selectionColor={color.APP_PRIMARY}
              label={label}
              height={80}
              multiline={multiline}
              editable={isEnable}
              returnKeyType='done'
              autoFocus={false}
              value={modalRemark}
              error={(!isSaveData && isSaveData != undefined) && description.length === 0 && AppText.ENTER_DESCRIPTION}
              onChangeText={(text) => setModalRemark(text)}
            />
            {
              (image != '') ?
                <View style={stylesCommon.dropdownView}>
                  <Image style={stylesCommon.dropImage}
                    source={image}>
                  </Image>
                </View> : null
            }

          </View>
        }
      </View>
    )
  }
  const PaymentDetail = () => {
    return (
      <View>
        <Modal animationType="slide"
          transparent={true}
          visible={paymentModalVisible}
          onRequestClose={() => {
            setModalVisible(!paymentModalVisible);
          }}>
          <View style={styles.centeredView}>

            <View style={styles.modalView}>
            <ModelTitleView
                tiitle={AppText.PAYMENT_DETAIL}
                onPressClose={() => renderCloseClick()} />
              <View style={{width:"100%"}}>
              <View style={{flexDirection:'row'}}>
              <Text style={{textAlign:'left', color:color.BLACK, flex:1}}>{"Order Id : "}</Text>
              <Text style={{textAlign:'left', color:color.BLACK, fontFamily:fonts.LATO_BOLD, fontWeight:'700', flex:2}}>{PaymentModalItem.payment_details.order_no}</Text>  
              </View>
                <View style={{flexDirection:'row', marginTop:10}}>
              <Text style={{textAlign:'left', color:color.BLACK, flex:1}}>{"Status : "}</Text>
              <Text style={{textAlign:'left', color:'#4CB877', fontFamily:fonts.LATO_BOLD, fontWeight:'700', flex:2}}>{"PAID"}</Text>  
              </View>
              {/* "₹" + item.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') */}
              <View style={{flexDirection:'row', marginTop:10}}>
               <Text style={{textAlign:'left', color:color.BLACK,flex:1}}>{"Amount : "}</Text> 
               <Text style={{textAlign:'left', color:'#4CB877',flex:2,fontFamily:fonts.LATO_BOLD, fontWeight:'700',}}>{ "₹" + PaymentModalItem.payment_details.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text> 
               </View>
               <View style={{flexDirection:'row',  marginTop:10}}>
               <Text style={{textAlign:'left', color:color.BLACK,flex:1}}>{"Trasaction Id : "}</Text> 
               <Text style={{textAlign:'left', color:color.BLACK, flex:2, flexWrap:'wrap'}}>{PaymentModalItem.payment_details.order_id}</Text> 
               </View>
               </View>  
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  const PaymentModel = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>

            <View style={styles.modalView}>
              <ModelTitleView
                tiitle={AppText.PAYMENT}
                onPressClose={() => renderCloseClick()} />
              <ScrollView style={{
                width: '100%'
              }}
                keyboardShouldPersistTaps={'always'}
                keyboardDismissMode={'on-drag'}>

                <View style={{
                  marginBottom: 20,
                  width: '100%'
                }}>
                  {InputView(AppText.TERMS, true, icon.IC_DOWN_ARROW, false)}
                  {InputView(AppText.AMOUNT, false, '', false)}
                  {InputView(AppText.REMARK, true, '', true)}
                </View>

                {
                  (loaderView === true) ?
                    <LoaderButtonView />
                    : <ButtonView
                      tiitle={AppText.MAKE_PAYMENT}
                      onClick={() => saveBtnClick()} />

                }
                <View style={{ padding: screenWidth / 4 }} />

              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  function RenderItem  (props) {
    console.log(props);
    let item = props.data;
    let mainArray = [];
    if(item.particulars_data)
    {
    item.particulars_data.map((rowData, index) => {
        const subarray = [];
        subarray.push(rowData.particulars);
        subarray.push("₹"+rowData.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        mainArray.push(subarray);
    })
  }
    //item.status = '';
    // console.log(item);
    //  console.log(moment(item.due_date, "YYYY-MM-DD").format("DD MMMM, YYYY"))
    return (
      <View >
      <View style={{
        backgroundColor: item.order_status === 'paid' ? "#DDFFF1" : "#EBF8FF",
        padding: 16,
        marginTop:13,
        borderRadius: 10, borderColor: item.order_status === 'paid' ? "#4CB877" : "#40A0F9",
        borderWidth: 0.5, margin: 13, elevation: 5,}}>
 <TouchableOpacity onPress={() => {  
        if (item.order_status === 'paid') {
          setPaymentModalItem(item);
          setPaymentModalVisible(true)
        }
      }
      }
        activeOpacity={0.95}>
      
        <View style={{
           flexDirection: 'row'
        }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, color: "#264653", fontWeight: 'bold' }}>{item.label_name}</Text>
            {item.structure_name != "Full" &&
              <Text style={{ fontSize: 14, color: "#5E6A6D", fontWeight: '400', marginTop: 10, fontFamily: fonts.LATO_LIGHT }}>{item.order_status != 'paid' ? "Due Date" : "Payment Date"}</Text>
            }
            {item.structure_name != "Full" &&
              <Text style={{ fontSize: 14, color: "#5E6A6D", fontWeight: 'bold', fontWeight: '700', marginTop: 5 }}>{moment((item.order_status != 'paid' ? item.due_date : item.paid_date), "YYYY-MM-DD").format("DD MMMM, YYYY")}</Text>
            }

          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 28 }}>
            <Text style={{ fontSize: 20, color: item.order_status === 'paid' ? "#4CB877" : "#264653", fontWeight: 'bold' }}>{(item.structure_name != "Full") ? "₹" + item.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "₹" + item.final_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>

          </View>
        </View>
       
      
      </TouchableOpacity> 
     { mainArray.length > 0 &&
 <View style={{alignContent:'center', alignItems:'center', marginTop:10, flex:1}}>
 <TouchableOpacity onPress={() =>{ props.onIndexChange(props.index);} }
 >
 <Image source={props.extraData[props.index] ? icon.IC_UP_ARROW : icon.IC_DOWN_ARROW} style={{height:12, width:12,resizeMode:'contain' }}/>
 </TouchableOpacity> 
    {props.extraData[props.index] && 

     <Table borderStyle={{ borderWidth: 1, borderColor: '#A8BAC2'}}
     style={{ marginTop: 20 , width:'100%' }}
 >
      {
         mainArray.map((rowData, index) => (
             <TableWrapper key={index} style={styles.row}>
                 {
                      rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 0 ? cellData : cellData}
                     textStyle={{ fontSize: 12, fontWeight: "600", padding: 10 }}
                     style={{ backgroundColor: cellIndex === 0 ? color.WHITE : color.WHITE, minHeight: 30 , flex:1}} />
                      ))
                 }
             </TableWrapper>
         ))
     }
 </Table>
 }
 </View>
     }
     
      </View>
      {item.order_status === 'paid' &&
          <View style={{
            position: 'absolute',
            flexDirection: 'row'
          }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1, alignItems: 'flex-end', marginEnd: 48 }}>
              <View style={{
                backgroundColor: "#4cb877",
                height: 26,
                width: 80,
                paddingStart: 20,
                paddingEnd: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15
              }}>
                <Text style={{ color: color.WHITE, fontFamily: fonts.LATO_BOLD, fontWeight: '700' }}>PAID</Text>
              </View>
            </View>
          </View>
        }

      </View>
    )
  }
  const StartPayment = async (sessionID, orderID) => {
    console.log(sessionID);
    console.log(orderID);
    const session = new CFSession(
      sessionID,
      orderID,
      CFEnvironment.SANDBOX
    );

    const paymentModes = new CFPaymentComponentBuilder()
      .add(CFPaymentModes.CARD)
      .add(CFPaymentModes.UPI)
      .add(CFPaymentModes.NB)
      .add(CFPaymentModes.WALLET)
      .add(CFPaymentModes.PAY_LATER)
      .build()
    const theme = new CFThemeBuilder()
      .setNavigationBarBackgroundColor(color.APP_PRIMARY)
      .setNavigationBarTextColor('#FFFFFF')
      .setButtonBackgroundColor(color.APP_PRIMARY)
      .setButtonTextColor('#FFFFFF')
      .setPrimaryTextColor('#212121')
      .setSecondaryTextColor(color.APP_PRIMARY)
      .build();

    try {
      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme
      );
      CFPaymentGatewayService.doPayment(dropPayment);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <SafeAreaView style={{
        flex: 0,
        backgroundColor: color.APP_PRIMARY
      }} />
      <SafeAreaView style={stylesCommon.safeAreaStyle}>
        <StatusBar backgroundColor={color.APP_PRIMARY} />
        <SchoolDetailHeaderView
          type={"parent"}
          navigation={navigation}
          screen={"Payment"}
        />
        <TitileBackgroundView
          titile={"Fee Structure"}
          tagAdd={dropdownlist.length > 0 ? "Pay Now" : undefined}
          image={imagePath}
          // onClick={CreateOrder}
          onClick={() => {
            if (dropdownlist.length > 0) {
              setModalVisible(true)
            }
          }}
        />
        <View style={{
          backgroundColor: color.COLOR_SECONDARY,
          flexDirection: 'row', justifyContent: 'center', paddingBottom: 10
        }}>
          <View style={[stylesCommon.inputMainViewYear, { flex: 1, marginStart: 10, marginEnd: 5 }]}>

            <SelectDropdown
              data={yearList}
              onSelect={(selectedItem, index) => {
                setISNoteType(-1)
                setSelectedYear(selectedItem);
              }}
              defaultButtonText={selectedYear}
              //    defaultButtonText={'Select note type'} 
              // defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {

                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {

                return item;
              }}
              buttonStyle={isNoteType != 0 ? styles.dropdownBtnStyleYear : styles.dropdownBtnStyleYear_error}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <View style={styles.arrowView}>
                  <Image style={stylesCommon.dropImage}
                    source={icon.IC_DOWN_ARROW}>
                  </Image>
                </View>;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
            />
            {isNoteType == 0 && <Text style={{ color: '#D50000', fontSize: 12, marginTop: -10, marginStart: 10, }}>Please select note type</Text>}
          </View>
          <View style={[stylesCommon.inputMainViewYear, { flex: 1, marginStart: 5, marginEnd: 10 }]}>

            <SelectDropdown
              data={classList}
              onSelect={(selectedItem, index) => {
                setISNoteType(-1)
                setClassId(selectedItem.id);
              }}
              defaultButtonText={selectedClass}
              //    defaultButtonText={'Select note type'} 
              // defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {

                return selectedItem.className;
              }}
              rowTextForSelection={(item, index) => {

                return item.className;
              }}
              buttonStyle={isNoteType != 0 ? styles.dropdownBtnStyleYear : styles.dropdownBtnStyleYear_error}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <View style={styles.arrowView}>
                  <Image style={stylesCommon.dropImage}
                    source={icon.IC_DOWN_ARROW}>
                  </Image>
                </View>;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={[styles.dropdownRowTxtStyle, { backgroundColor: color.COLOR_SECONDARY }]}
            />
            {isNoteType == 0 && <Text style={{ color: '#D50000', fontSize: 12, marginTop: -10, marginStart: 10, }}>Please select note type</Text>}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {isFullPaymentShow &&
            <View style={{ backgroundColor: color.APP_PRIMARY, padding: 10, margin: 10, borderRadius: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: color.WHITE, fontFamily: fonts.LATO_BOLD, fontWeight: '700' }}>Full Year Payment</Text>
              <Text style={{ fontSize: 16, marginTop: 10, textAlign: 'center', color: color.WHITE, fontFamily: fonts.LATO_REGULAR, fontWeight: '400' }}>{"Get " + discount + " discount on payment of full year payment."}</Text>
              <Text style={{ marginTop: 5, fontSize: 18, color: color.WHITE, fontFamily: fonts.LATO_BOLD, fontWeight: '700' }}>{"Actual Fee ₹" + fees}</Text>
              <Text style={{ fontSize: 24, marginTop: 10, textAlign: 'center', color: color.WHITE, fontFamily: fonts.LATO_BOLD, fontWeight: '700' }}>{"₹" + finalAmount}</Text>
            </View>
          }
          <FlatList style={{ marginTop: 10 }}
           data={listdata}
            renderItem={({item, index}) => 
            <RenderItem 
            data={item}
            index={index}
            onIndexChange ={onIndexChange}
            extraData={tableState}/>}
          />
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <Text style={{ flex: 1, fontSize: 12, color: color.APP_PRIMARY, fontFamily: fonts.LATO_BOLD }}>{"Paid Amount : ₹" + parseFloat(paidAmount).toFixed(2)}</Text>
            <Text style={{ flex: 1, textAlign: 'right', fontSize: 12, fontFamily: fonts.LATO_BOLD }}>{"Remaining Amount : ₹" + parseFloat(RemainingAmount).toFixed(2)}</Text>
          </View>
          {
            (noData) &&
            <EmptyView />
          }

        </View>
        {
          (backgroundLoaderView) &&
          <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: "#BF000000" }}>
            <LoaderViewWithBackground_new color={color.WHITE} />
          </View>
        }
        {modalVisible && PaymentModel()}
        {paymentModalVisible && PaymentDetail()}

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    marginTop: Platform.OS == 'ios' ? -50 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    top: 20,
    padding: 20,
    width: '90%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  dropdownBtnStyle: {
    width: '100%',
    height: vh(50),
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: vh(15),
    backgroundColor: color.WHITE,
    borderColor: color.GREY,
  },
  dropdownBtnStyleYear: {
    width: '100%',
    height: vh(50),
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: color.COLOR_SECONDARY,
    borderColor: color.GREY,

  },
  // drop down error
  dropdownBtnStyle_error: {
    width: '100%',
    height: vh(50),
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: vh(15),
    backgroundColor: color.WHITE,
    borderColor: '#D50000',
  },
  dropdownBtnStyleYear_error: {
    width: '100%',
    height: vh(50),
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: vh(15),
    backgroundColor: color.WHITE,
    borderColor: '#D50000',
  },
  dropdownBtnTxtStyle: {
    textAlign: 'left',
    fontSize: 20,
    color: color.DARK_TEXT,
    fontFamily: fonts.LATO_BOLD,
  },
  dropdownStyle: {
    backgroundColor: color.WHITE,
  },
  arrowView: {
    resizeMode: 'contain',
    height: '100%',
    paddingEnd: 15,
    justifyContent: 'center',
  },
  dropdownRowStyle: { backgroundColor: color.WHITE, borderBottomWidth: 0, },
  dropdownRowTxtStyle: { color: color.DARK_TEXT, textAlign: 'left', fontFamily: fonts.LATO_REGULAR, paddingHorizontal: vw(10) },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1',  },
});
export default PaymentOrderScreen;