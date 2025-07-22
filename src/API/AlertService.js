import { Alert } from "react-native";

export const showAlert = (message = "Something went wrong") => {
  Alert.alert("Alert", message, [{ text: "OK" }], { cancelable: true });
};
