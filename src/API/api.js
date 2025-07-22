import axios from "axios";
import { getAuthContextToken } from "./authHelpers";
import { showAlert } from "./AlertService";
import * as Preference from "../storeData/Preference"; // Your Preference wrapper
import { StackActions } from "@react-navigation/native";
import { BASE_URL } from "./Utills";

// 🔁 Global navigation handler
let globalNavigation = null;
 const setNavigationRef = (nav) => {
  globalNavigation = nav;
};

// 🔧 Axios base config
const baseConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
};

// ✅ Two axios instances
const apiFull = axios.create(baseConfig);   // Full response
const apiSimple = axios.create(baseConfig); // Returns only .data

// 🔐 Auth and error interceptor setup
const setAuthInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use(async (config) => {
    const token = await getAuthContextToken();
    if (token) config.headers.Authorization = `${token}`;
    config.headers.Accept = "application/json";
    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response) {
        const status = error.response.status;
        const data = error.response.data;
        const errors = data?.errors;

        if (status === 400 && errors) {
          Object.keys(errors).forEach((key) => {
            showAlert(errors[key]);
          });
          if (data?.message) showAlert(data.message);
        } else if (status === 404) {
          showAlert("API request not found");
        } else if (status === 401) {
          showAlert("Unauthorized: Logging out");
          await Preference.SetData("isLogin", "false");
          await Preference.SetData("token", "");
          if (globalNavigation) {
            globalNavigation.dispatch(StackActions.replace("LoginScreen"));
          }
        } else {
          showAlert(data?.message || "Something went wrong");
        }
      } else {
        showAlert("Network error");
      }

      return Promise.reject(error);
    }
  );
};

// 🔁 Apply interceptors to both instances
setAuthInterceptor(apiFull);
setAuthInterceptor(apiSimple);

// ✅ apiSimple returns only response.data
apiSimple.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// 📤 Export all
export { apiFull, apiSimple, setNavigationRef };
