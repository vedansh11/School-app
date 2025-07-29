import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { color, fonts, icon } from "../../constant";
import { ms } from "react-native-size-matters";

const PaymentSuccess = () => {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.popToTop(); // or navigate to "Orders" or "Home"
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
          <Image
            source={icon.IC_CROSS}
            style={{ width: 14, height: 14, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <View style={styles.iconWrapper}>
          <Image source={icon.IC_PAYMENT_SUCC} style={styles.icon} />
        </View>

        <Text style={styles.text}>Payment done successfully.</Text>
      </View>
    </View>
  );
};

export default PaymentSuccess;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // translucent dark backdrop
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 2,
  },
  iconWrapper: {
    borderRadius: 50,

    marginTop: ms(50),
    marginBottom: ms(30),
  },
  icon: {
    width: ms(140),

    height: ms(100),
    resizeMode: "contain",
  },
  text: {
    fontSize: ms(16),
    color: color.APP_PRIMARY,

    textAlign: "center",
    fontFamily: fonts.INTER_SEMIBOLD,
    marginBottom: ms(90),
  },
});
