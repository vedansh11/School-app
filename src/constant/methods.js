import { Alert } from "react-native";

export const AlertMesaage = (title, message, positiveOption, nagativeOption, positiveOptionAction) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: nagativeOption,
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: positiveOption, onPress: positiveOptionAction }
        ]
    );
}
