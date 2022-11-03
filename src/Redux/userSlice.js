import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  addAuthTokenToLocalStorage,
  addEmailToLocalStorage,
  addPatientToLocalStorage,
  addUserDataToLocalStorage,
  addUserToLocalStorage,
  addVerifyAuthTokenToLocalStorage,
  getEmailFromLocalStorage,
  getPatientsFromLocalStorage,
  getUserDataFromLocalStorage,
  getUserFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
  removeAuthTokenFromLocalStorage,
  removeEmailFromLocalStorage,
  removePatientsFromLocalStorage,
  removePostalFromLocalStorage,
  removePostal2FromLocalStorage,
  removeUserDataFromLocalStorage,
  removeUserFromLocalStorage,
  removeVerifyAuthTokenFromLocalStorage,
  removeAppointmentsFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  auth: getVerifyAuthTokenFromLocalStorage(),
  showNav: true,
  // userData: getPatientsFromLocalStorage(),
  patientData: getPatientsFromLocalStorage(),
  showPatient: false,
  searchValue: "",
  email: getEmailFromLocalStorage(),
  totalPages: null,
  total: null,
  show: false,
  userData: getUserDataFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    console.log("data in regis", user);
    console.log("firstName in registerUser", user.firstName);
    const formData = new FormData();

    formData.append("user[first_name]", user.firstName);
    formData.append("user[last_name]", user.lastName);
    formData.append("user[email]", user.email);
    formData.append("user[phone]", user.phone);
    formData.append("user[password]", user.password);
    formData.append("user[gender]", user.gender);
    formData.append("user[role]", user.role);
    formData.append("device_detail[device_type]", user.deviceType);
    formData.append("device_detail[player_id]", user.player_id);

    try {
      const resp = await customFetch({
        url: `api/users/sign_up.json`,
        method: "POST",
        data: formData,
      });
      console.log("Register Data me Kya mila", resp.data);
      return resp.data;
    } catch (error) {
      console.log("Errror me kya mila", error);
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ page1, searchedText }, thunkAPI) => {
    console.log("page kya milraha hai yaha", page1);
    console.log("search", searchedText);
    try {
      const resp = await customFetch({
        url: "/api/doctor/patients.json",
        method: "GET",
        params: {
          search: searchedText,
          page: page1,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });

      const result = resp.headers["x-pagination"];
      let Pagination = result ? JSON.parse(result) : null;

      let Obj = {
        pageData: Pagination,
        respDataData: resp.data.data,
        respData: resp.data,
      };
      console.log("response.....", Obj.respData);
      console.log("OBJECT", Obj);
      return Obj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (user, thunkAPI) => {
//     console.log("login", user);
//     addEmailToLocalStorage(user.email);

//     // Extra work for Role Change
// const { email, password } = user;

//     const data = {
//       device_detail: {
//         device_type: user.device_type,
//         player_id: user.player_id,
//       },
//       user: { email: user.email, password: user.password },
//     };

//     try {
//       const resp = await customFetch({
//         url: "/api/users/sign_in.json",
//         method: "POST",
//         data: data,
//       });
//       console.log("loginUser me data", resp.data);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.resp.message);
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user1, thunkAPI) => {
    console.log("login", user1);
    addEmailToLocalStorage(user1.email);

    // Extra work for Role Change
    const { email, password } = user1;

    const data = {
      role: "customer_support",
      user: { email: user1.email, password: user1.password },
    };

    try {
      const resp = await customFetch({
        url: "/api/users/sign_in.json",
        method: "POST",
        data: data,
      });
      console.log("loginUser1 me data", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/users/verify_doctor.json",
        method: "POST",
        data: user,
      });
      console.log("Verifying user me data", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/users/sign_out.json",
        method: "DELETE",
        headers: {
          AUTH_TOKEN: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("logOutUser me data", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      const logOutUser = getUserFromLocalStorage();
      state.user = null;
      removeUserFromLocalStorage();
      toast.success(`Thank you ${logOutUser.firstName}`);
    },
    searchBased: (state, actions) => {
      console.log("searchedText in reducer", actions.payload);
      state.patientData = null;
      state.userData = getUserDataFromLocalStorage();
      state.totalPages = null;
      state.total = null;
      state.show = false;
      removePatientsFromLocalStorage();
    },
    notVerified: (state) => {
      state.user = null;
      state.showNav = true;
      state.email = null;
      removeEmailFromLocalStorage();
      removeUserFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, actions) => {
      console.log("ACtions in register", actions.payload.status);

      if (actions.payload.status === 200) {
        state.showNav = false;
        const authToken = actions?.payload?.data?.user?.auth_token;
        addAuthTokenToLocalStorage(authToken);
        const user1 = actions?.meta?.arg;
        state.user = user1;
        addUserToLocalStorage(user1);
        toast.success(`Welcome ${user1.firstName}  ${user1.lastName}`);
        state.isLoading = false;
      } else if (actions.payload.status !== 200) {
        state.isLoading = false;
        toast.error(`${actions.payload.message}`);
      }
    },
    [registerUser.rejected]: (state, actions) => {
      state.isLoading = false;
      toast.error(actions.payload);
    },
    [verifyUser.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyUser.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        console.log("verifyUser.fulfilled USER DATA", actions.payload.data);
        state.showNav = true;
        const gettingUserData = actions.payload.data.user;
        const {
          id,
          first_name,
          last_name,
          email,
          gender,
          phone,
          role,
          address,
        } = gettingUserData;
        console.log("gettingUserData me address", address);
        const { line1, line2, name, pincode, town } = address;
        addUserDataToLocalStorage({
          id,
          first_name,
          last_name,
          email,
          gender,
          phone,
          role,
          line1,
          line2,
          name,
          pincode,
          town,
        });
        state.userData = {
          id,
          first_name,
          last_name,
          email,
          gender,
          phone,
          role,
          line1,
          line2,
          name,
          pincode,
          town,
        };
        console.log("gettingUserData ", gettingUserData);
        const verifyAuthToken = actions.payload?.data.user.auth_token;
        addVerifyAuthTokenToLocalStorage(verifyAuthToken);
        state.auth = verifyAuthToken;
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else {
        state.isLoading = false;
        toast.error(`${actions.payload.message}`);
      }
    },
    [verifyUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        state.showNav = true;
        const user = actions.payload.data;
        console.log("user kya mila sign in me", actions);
        state.user = user;
        state.email = getEmailFromLocalStorage();
        addUserToLocalStorage(user);
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else if (actions.payload.status !== 200) {
        state.isLoading = false;
        removeEmailFromLocalStorage();
        toast.error(`${actions.payload.message}`);
      }
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [logOutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logOutUser.fulfilled]: (state, actions) => {
      console.log("logOutUser.fulfilled", actions);
      if (actions.payload.status === 200) {
        state.user = null;
        state.auth = null;
        state.userData = null;
        state.email = null;
        removeEmailFromLocalStorage();
        removeAuthTokenFromLocalStorage();
        removeUserFromLocalStorage();
        removeVerifyAuthTokenFromLocalStorage();
        removePatientsFromLocalStorage();
        removeUserDataFromLocalStorage();
        removePostalFromLocalStorage();
        removePostal2FromLocalStorage();
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else {
        state.user = null;
        state.auth = null;
        state.userData = null;
        state.email = null;
        removeEmailFromLocalStorage();
        removeAuthTokenFromLocalStorage();
        removeUserFromLocalStorage();
        removeVerifyAuthTokenFromLocalStorage();
        removePatientsFromLocalStorage();
        removeUserDataFromLocalStorage();
        removePostalFromLocalStorage();
        removePostal2FromLocalStorage();
        removeAppointmentsFromLocalStorage();
        toast.error(`${actions.payload.message}`);
        state.isLoading = false;
      }
    },
    [logOutUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      console.log("Payload me kya mila", payload);
      const { pageData, respDataData, respData } = payload;
      console.log("Payload Destructure", respData);

      if (respData.status === 200) {
        state.show = true;
        console.log("User Data", payload);
        console.log("ACtions in get user", respData);
        // state.userData = respDataData;
        state.patientData = respDataData;

        state.totalPages = pageData.total_pages;
        state.total = pageData.total;
        addPatientToLocalStorage(state.patientData);
        state.showPatient = true;
        toast.success(`${respData.message}`);
        state.isLoading = false;
      } else {
        toast.error(`${respData.message}`);
        state.isLoading = false;
      }
    },
    [getUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
  },
});

export const { logoutUser, searchBased, notVerified } = userSlice.actions;

export default userSlice.reducer;
