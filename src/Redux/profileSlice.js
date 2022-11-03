import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import customFetch1 from "../axios/axios1";
import {
  addLanguagesToLocalStorage,
  addPostal2ToLocalStorage,
  addPostalToLocalStorage,
  addSpecialitiesToLocalStorage,
  getLanguagesFromLocalStorage,
  getPostal2FromLocalStorage,
  getPostalFromLocalStorage,
  getSpecialitiesFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
  removeLanguagesFromLocalStorage,
  removePostal2FromLocalStorage,
  removePostalFromLocalStorage,
  removeSpecialitiesFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  open: true,
  specialities: getSpecialitiesFromLocalStorage(),
  languages: getLanguagesFromLocalStorage(),
  postalCode: getPostalFromLocalStorage(),
  postalCode2: getPostal2FromLocalStorage(),
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ values, id }, thunkAPI) => {
    console.log("data in updateUser", values);

    const {
      name1,
      line1,
      line2,
      line3,
      pincode1,
      town1,
      name2,
      line11,
      line22,
      line33,
      pincode2,
      town2,
    } = values;
    const { firstName, lastName, email, phone, language_ids, gender } = values;

    const { doctor_speciality_id } = values;

    const { bio, gmc } = values;

    const address = [
      {
        name: name1,
        line1: line1,
        line2: line2,
        line3: line3,
        pincode: pincode1,
        town: town1,
      },
      {
        name: name2,
        line1: line11,
        line2: line22,
        line3: line33,
        pincode: pincode2,
        town: town2,
      },
    ];
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      language_ids,
      gender,
    };
    const profile = { bio, gmc };

    const mainData = { address, profile, doctor_speciality_id, user };
    console.log("mainData", mainData);

    try {
      const resp = await customFetch({
        url: `api/users/${id}.json`,
        method: "PATCH",
        data: mainData,
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("updateUser Data me Kya mila", resp.data);
      return resp.data;
    } catch (error) {
      console.log("Errror me kya mila", error);
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const getSpecialities = createAsyncThunk(
  "user/getSpecialities",
  async (searchedSpeciality, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/doctor/doctors/list_specialities.json",
        method: "GET",
        params: {
          search: searchedSpeciality,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      return resp.data;
    } catch (error) {
      console.log("dggdfdfsdfsdfsd", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getLanguages = createAsyncThunk(
  "user/getLanguages",
  async (searchedLanguages, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/languages.json",
        method: "GET",
        params: {
          search: searchedLanguages,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      return resp.data;
    } catch (error) {
      console.log("dggdfdfsdfsdfsd", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPostal = createAsyncThunk(
  "user/getPostal",
  async (searchedPostal, thunkAPI) => {
    try {
      const resp = await customFetch1({
        url: `/${searchedPostal}`,
        // ?api_key=ak_ja9fkguyeUscgSFot7Wv6BsInQZyg`,
        method: "get",
        params: {
          //   postcode: searchedPostal,
          api_key: "ak_ja9fkguyeUscgSFot7Wv6BsInQZyg",
        },
      });
      return resp.data;
    } catch (error) {
      console.log("dggdfdfsdfsdfsd", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPostal2 = createAsyncThunk(
  "user/getPostal2",
  async (searchedPostal, thunkAPI) => {
    try {
      const resp = await customFetch1({
        url: `/${searchedPostal}`,
        // ?api_key=ak_ja9fkguyeUscgSFot7Wv6BsInQZyg`,
        method: "get",
        params: {
          //   postcode: searchedPostal,
          api_key: "ak_ja9fkguyeUscgSFot7Wv6BsInQZyg",
        },
      });
      console.log("getPostal2 me post", resp.data);
      return resp.data;
    } catch (error) {
      console.log("dggdfdfsdfsdfsd", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (values, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/passwords/change.json",
        method: "POST",
        data: values,
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("changePassword me response", resp.data);
      return resp.data;
    } catch (error) {
      console.log("dggdfdfsdfsdfsd", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeSpeciality: (state) => {
      state.specialities = null;
      removeSpecialitiesFromLocalStorage();
    },
    removeLanguages: (state) => {
      state.languages = null;
      removeLanguagesFromLocalStorage();
    },
    removePostalCode: (state) => {
      state.postalCode = null;
      removePostalFromLocalStorage();
    },
    removePostalCode2: (state) => {
      state.postalCode2 = null;
      removePostal2FromLocalStorage();
    },
  },
  extraReducers: {
    [updateUser.pending]: (state) => {
      //   state.isLoading = true;
    },

    [updateUser.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        console.log("ACTIONS IN updateUser", actions);

        toast.success(`${actions.payload.message}`);
      } else {
        toast.error(`${actions.payload.message}`);
        // state.isLoading = false;
      }
    },
    [updateUser.rejected]: (state, { payload }) => {
      //   state.isLoading = false;
      toast.error(payload.message);
    },
    [getSpecialities.pending]: (state) => {
      //   state.isLoading = true;
    },

    [getSpecialities.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        console.log("ACTIONS IN getSpecialities", actions);
        state.specialities = actions.payload.data;
        addSpecialitiesToLocalStorage(actions.payload.data);
        // state.getId = getSurgeryIDFromLocalStorage();
      } else {
        toast.error(`${actions.payload.message}`);
        // state.isLoading = false;
      }
    },
    [getSpecialities.rejected]: (state, { payload }) => {
      //   state.isLoading = false;
      toast.error(payload.message);
    },
    [getLanguages.pending]: (state) => {
      //   state.isLoading = true;
    },

    [getLanguages.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        console.log("ACTIONS IN getLanguages", actions);
        state.languages = actions.payload.data;
        addLanguagesToLocalStorage(actions.payload.data);
      } else {
        toast.error("This is error");
        // state.isLoading = false;
      }
    },
    [getLanguages.rejected]: (state, { payload }) => {
      //   state.isLoading = false;
      toast.error(payload.message);
    },
    [getPostal.pending]: (state) => {
      //   state.isLoading = true;
    },

    [getPostal.fulfilled]: (state, actions) => {
      if (actions.payload.code === 2000) {
        console.log("ACTIONS IN getPostal", actions);
        state.postalCode = actions.payload.result;
        addPostalToLocalStorage(state.postalCode);
        toast.success(`${actions.payload.message}`);
      } else {
        toast.error(`${actions.payload.message}`);
        // state.isLoading = false;
      }
    },
    [getPostal.rejected]: (state, { payload }) => {
      //   state.isLoading = false;
      toast.error(payload.message);
    },

    [getPostal2.pending]: (state) => {
      state.isLoading = true;
    },

    [getPostal2.fulfilled]: (state, actions) => {
      if (actions.payload.code === 2000) {
        console.log("ACTIONS IN getPostal2", actions);
        state.postalCode2 = actions.payload.result;
        addPostal2ToLocalStorage(state.postalCode2);
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else {
        toast.error(`${actions.payload.message}`);
        state.isLoading = false;
      }
    },
    [getPostal2.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },

    [changePassword.pending]: (state) => {
      state.isLoading = true;
    },

    [changePassword.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        console.log("ACTIONS IN changePassword", actions);
        // state.specialities = actions.payload.data;
        // addSpecialitiesToLocalStorage(actions.payload.data);
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else {
        toast.error(`${actions.payload.message}`);
        state.isLoading = false;
      }
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
  },
});

export const {
  removeSpeciality,
  removeLanguages,
  removePostalCode,
  removePostalCode2,
} = profileSlice.actions;

export default profileSlice.reducer;
