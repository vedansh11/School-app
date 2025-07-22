import * as Preference from "../storeData/Preference";
import { PreferenceKeys } from "../constant";

export const getAuthContextToken = async () => {
  try {
    const token = await Preference.GetData(PreferenceKeys.TOKEN);
    return token || "";
  } catch (error) {
    console.error("Error fetching auth token", error);
    return "";
  }
};
