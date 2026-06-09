import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Add this function to safely get data from localStorage
const getInitialState = () => {
  // Check if window is defined (client-side only)
  if (typeof window !== "undefined") {
    try {
      const isUserAuth = localStorage.getItem("isUserAuth");
      const userData = localStorage.getItem("userData");
      const user_Address = localStorage.getItem("user_Address");
      const current_Address = localStorage.getItem("current_Address");
      const login_token = localStorage.getItem("login_token");

      return {
        isUserAuth: isUserAuth ? JSON.parse(isUserAuth) : false,
        userData: userData ? JSON.parse(userData) : null,
        user_Address: user_Address ? JSON.parse(user_Address) : [],
        current_Address: current_Address ? JSON.parse(current_Address) : "",
        login_token: login_token || "",
        login_otp: "",
        login_otp_hash: "",
        login_number: "",
        mobileNumber: "",
        setting_details: "",
        setting_detailsLoading: true,
        issetting_detailsAvailable: false,
        firstlogin: false,
      };
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }

  return {
    isUserAuth: false,
    userData: null,
    login_otp: "",
    login_otp_hash: "",
    login_number: "",
    login_token: "",
    current_Address: "",
    user_Address: [],
    mobileNumber: "",
    setting_details: "",
    setting_detailsLoading: true,
    issetting_detailsAvailable: false,
    firstlogin: false,
  };
};

const initialState = getInitialState();

export const create_login_token = createAsyncThunk(
  "Authentication/create_login_token",
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const url = `${BaseUrl}/api/v1/user/send-jsw-token`;
      const resp = await axios.post(url, formData, config);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("user Not create");
    }
  },
);

export const verify_otp = createAsyncThunk(
  "Authentication/verify_otp",
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const url = `${BaseUrl}/api/v1/sendotp/verify-otp`;
      console.log(url, "url");

      const resp = await axios.post(url, formData, config);
      console.log(resp.data, "ksksksk");

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

export const get_protected_data = createAsyncThunk(
  "Authentication/get_protected_data",
  async (token, thunkAPI) => {
    try {
      const config = {
        headers: {
          authorization: `${token}`,
        },
      };
      const url = `${BaseUrl}/api/v1/user/get-protected-user-data`;
      const resp = await axios.post(url, null, config);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("user Not get");
    }
  },
);

export const user_address_update = createAsyncThunk(
  "Authentication/user_address_update",
  async (formdata, thunkAPI) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const url = `${BaseUrl}/api/v1/user/add-address`;
      const resp = await axios.put(url, formdata, config);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("user Not get");
    }
  },
);

export const send_otp = createAsyncThunk(
  "Authentication/send_otp",
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      // FIXED: Changed URL to correct endpoint
      const url = `${BaseUrl}/api/v1/sendotp/send-otp`;
      console.log(url, "url");

      const resp = await axios.post(url, formData, config);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const create_user = createAsyncThunk(
  "Authentication/create_user",
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const url = `${BaseUrl}/api/v1/user/users`;
      const resp = await axios.post(url, formData, config);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create user",
      );
    }
  },
);

export const validateEmail = createAsyncThunk(
  "Authentication/validateEmail",
  async (data, thunkAPI) => {
    try {
      const url = `${BaseUrl}/api/v1/user/email/${data}`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);

export const validateMobile = createAsyncThunk(
  "Authentication/validateMobile",
  async (data, thunkAPI) => {
    try {
      const url = `${BaseUrl}/api/v1/user/mobile/${data}`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);

export const get_setting_details = createAsyncThunk(
  "Authentication/get_setting_details",
  async (data, thunkAPI) => {
    try {
      const url = `${BaseUrl}/api/v1/settings/all`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
);

// const initialState = {
//   isUserAuth: false,
//   userData: null,
//   login_otp: "",
//   login_otp_hash: "",
//   login_number: "",
//   login_token: "",
//   current_Address: "",
//   user_Address: [],
//   mobileNumber: "",
//   setting_details: "",
//   setting_detailsLoading: true,
//   issetting_detailsAvailable: false,
//   firstlogin: false,
// };
export const loadUserFromStorage = createAsyncThunk(
  "Authentication/loadUserFromStorage",
  async (_, thunkAPI) => {
    try {
      const isUserAuth = await localStorage.getItem("isUserAuth");
      const userData = await localStorage.getItem("userData");
      const user_Address = await localStorage.getItem("user_Address");
      const current_Address = await localStorage.getItem("current_Address");
      const token = await localStorage.getItem("login_token");

      return {
        isUserAuth: JSON.parse(isUserAuth),
        userData: JSON.parse(userData),
        user_Address: JSON.parse(user_Address) || [],
        current_Address: JSON.parse(current_Address),
        login_token: token || "",
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load storage");
    }
  },
);

export const checkEmailExists = async (emailId) => {
  try {
    const normalizedEmail = emailId.trim().toLowerCase();
    const response = await fetch(
      `${BaseUrl}/api/v1/user/email/${encodeURIComponent(normalizedEmail)}`,
    );
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    return false;
  }
};

// Check mobile exists function
export const checkMobileExists = async (phone) => {
  try {
    const response = await fetch(`${BaseUrl}/api/v1/user/mobile/${phone}`);
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    return false;
  }
};
const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    setMobileNumber(state, action) {
      state.mobileNumber = action.payload;
    },
    restaurant_auth(state, action) {
      state.isUserAuth = action.payload.isUserAuth;
      state.userData = action.payload;

      let address = [];
      if (action.payload?.address?.length > 0) {
        address = action.payload?.address;
      }

      state.user_Address = address;
      if (state.user_Address.length > 0) {
        state.current_Address = action.payload.address[0];
      } else {
        state.current_Address = "";
      }
      localStorage.setItem("isUserAuth", JSON.stringify(state.isUserAuth));
      localStorage.setItem("userData", JSON.stringify(state.userData));
      localStorage.setItem("user_Address", JSON.stringify(state.user_Address));
      localStorage.setItem(
        "current_Address",
        JSON.stringify(state.current_Address),
      );
    },
    logout(state, action) {
      state.isUserAuth = false;
      state.userData = null;
      state.user_Address = [];
      state.current_Address = "";
      state.login_token = "";
      localStorage.removeItem("isUserAuth");
      localStorage.removeItem("userData");
      localStorage.removeItem("user_Address");
      localStorage.removeItem("current_Address");
    },
    setlogin_number(state, action) {
      state.login_otp = action.payload.login_otp;
      state.login_number = action.payload.login_number;
      state.login_token = action.payload.login_token;
      state.login_otp_hash = action.payload.login_otp_hash;
    },
    firstlogin(state, action) {
      state.firstlogin = action.payload;
    },
    update_user_address(state, action) {
      state.user_Address = action.payload;
      if (state.user_Address.length > 0) {
        const prime_Address = state.user_Address.find(
          (data) => data?.prime === true,
        );
        state.current_Address =
          prime_Address?.prime === true ? prime_Address : action.payload[0];
      } else {
        state.current_Address = null;
      }

      localStorage.setItem("user_Address", JSON.stringify(state.user_Address));
      localStorage.setItem(
        "current_Address",
        JSON.stringify(state.current_Address),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_setting_details.pending, (state) => {
        state.setting_detailsLoading = true;
      })
      .addCase(get_setting_details.fulfilled, (state, action) => {
        state.setting_details = action.payload?.settings;
        state.setting_detailsLoading = false;
        state.issetting_detailsAvailable = true;
      })
      .addCase(get_setting_details.rejected, (state) => {
        state.setting_detailsLoading = false;
      })
      // .addCase(verify_otp.fulfilled, (state, action) => {
      //   if (action.payload?.success) {
      //     // console.log(action.payload,"action.payload");
      //     state.isUserAuth = true;
      //     state.userData = action.payload?.data;
      //     state.login_token = action.payload?.token || "";
      //     // Save to localStorage
      //     localStorage.setItem("isUserAuth", JSON.stringify(true));
      //     localStorage.setItem(
      //       "userData",
      //       JSON.stringify(action.payload?.data),
      //     );
      //     if (action.payload?.token) {
      //       localStorage.setItem("login_token", action.payload.token);
      //     }
      //   }
      // })

      // FIXED AuthenticationSlice.js
      .addCase(verify_otp.fulfilled, (state, action) => {
        if (action.payload?.success) {
          const userData = action.payload?.data;
          // Check if user already has a name (existing user)
          const isExistingUser =
            userData && userData.name && userData.name.trim() !== "";

          if (isExistingUser) {
            // ONLY set authenticated for existing users
            state.isUserAuth = true;
            state.userData = userData;
            state.login_token = action.payload?.token || "";

            localStorage.setItem("isUserAuth", JSON.stringify(true));
            localStorage.setItem("userData", JSON.stringify(userData));
            if (action.payload?.token) {
              localStorage.setItem("login_token", action.payload.token);
            }
          }
          // For new users (no name), DON'T set isUserAuth - let the registration form show
        }
      })
      .addCase(create_user.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.isUserAuth = true;
          state.userData = action.payload?.user;
          // Save to localStorage
          localStorage.setItem("isUserAuth", JSON.stringify(true));
          localStorage.setItem(
            "userData",
            JSON.stringify(action.payload?.user),
          );
        }
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.isUserAuth = action.payload.isUserAuth || false;
        state.userData = action.payload.userData || null;
        state.user_Address = action.payload.user_Address || [];
        state.current_Address = action.payload.current_Address || "";
        state.login_token = action.payload.login_token || "";
      });
  },
});

export const {
  restaurant_auth,
  setlogin_number,
  setMobileNumber,
  update_user_address,
  logout,
  firstlogin,
} = AuthenticationSlice.actions;
export const authActions = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
