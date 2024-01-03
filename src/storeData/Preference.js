import DefaultPreference from "react-native-default-preference";

export const SetData = (key, value) => {
  console.log("The key for setting here is ---", key, value);
  DefaultPreference.set(key, value);
};

export const GetData = (key) => {
  let result = DefaultPreference.get(key);
  console.log("KEY", key);
  console.log("Result...", result);
  return result;
};
export const ClearSingleData = (key) => {
  DefaultPreference.clear(key);
};

export const ClearData = () => {
  DefaultPreference.clearAll();
};
