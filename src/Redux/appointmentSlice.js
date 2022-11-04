import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  addAppointmentsToLocalStorage,
  addBookPatientsToLocalStorage,
  addCardsDetailToLocalStorage,
  addDoctorsToLocalStorage,
  getAppointmentsFromLocalStorage,
  getBookPatientsFromLocalStorage,
  getCardsDetailFromLocalStorage,
  getDoctorsFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
  removeBookPatientsFromLocalStorage,
  removeCardsDetailFromLocalStorage,
  removeDoctorsFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  showAppoint: true,
  isLoading: false,
  appointments: getAppointmentsFromLocalStorage(),
  getTotal: null,
  bookPatient: getBookPatientsFromLocalStorage(),
  doctors: getDoctorsFromLocalStorage(),
  cardsDetail: getCardsDetailFromLocalStorage(),
  got: false,
};

export const getAppointments = createAsyncThunk(
  "user/getAppointments",
  async (page, thunkAPI) => {
    // console.log("page kya milraha hai yaha", page1);
    // console.log("search", searchedText);
    try {
      const resp = await customFetch({
        url: "/api/appointments.json",
        method: "GET",
        params: {
          page: page,
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
      console.log("getAppointments Response.....", Obj.respData);
      console.log("OBJECT", Obj);
      return Obj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPatients = createAsyncThunk(
  "user/getPatients",
  async (searchedPatient, thunkAPI) => {
    console.log("getPatients kya milraha hai yaha", searchedPatient);

    try {
      const resp = await customFetch({
        url: "/api/users",
        method: "GET",
        params: {
          role: "patient",
          search: searchedPatient,
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
      console.log("response.....in getPatients", Obj.respData);
      console.log("OBJECT", Obj);
      return Obj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCards = createAsyncThunk(
  "user/getCards",
  async ({ patient_id, corporate_id }, thunkAPI) => {
    console.log("getCards kya milraha hai yaha", patient_id);

    try {
      const resp = await customFetch({
        url: "/api/cards",
        method: "GET",
        params: {
          patient_id: patient_id,
          corp_id: corporate_id,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });

      const result = resp.headers["x-pagination"];
      let Pagination = result ? JSON.parse(result) : null;

      let Obj = {
        pageData: Pagination,
        respDataData: resp.data.common,
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

export const getDoctors = createAsyncThunk(
  "user/getDoctors",
  async ({ searchedDoctor, patient_id }, thunkAPI) => {
    console.log("getPatients kya milraha hai yaha", searchedDoctor);

    try {
      const resp = await customFetch({
        url: "/api/priory/patient/appointments/list_for_priory_cs_doctors.json",
        method: "GET",
        params: {
          search: searchedDoctor,
          patient_id: patient_id,
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

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    cancle: (state) => {
      state.showAppoint = false;
    },
    openModal: (state) => {
      state.showAppoint = true;
    },
    removePateint: (state) => {
      state.bookPatient = null;
      state.cardsDetail = null;
      state.got = false;
      removeBookPatientsFromLocalStorage();
      removeCardsDetailFromLocalStorage();
    },
    removeDoctor: (state) => {
      state.doctors = null;
      state.got = false;
      removeDoctorsFromLocalStorage();
    },
  },
  extraReducers: {
    [getAppointments.pending]: (state) => {
      state.isLoading = true;
    },
    [getAppointments.fulfilled]: (state, { payload }) => {
      console.log("Payload me kya mila", payload);
      const { pageData, respDataData, respData } = payload;
      console.log("Payload Destructure", respData);
      console.log("Response data data", respDataData);

      if (respData.status === 200) {
        state.show = true;
        console.log("Appointments Data", payload);
        console.log("ACtions in getAppointments", respData);
        // state.userData = respDataData;
        state.appointments = respDataData;
        state.totalPages = pageData.total_pages;
        state.getTotal = pageData.total;
        addAppointmentsToLocalStorage(state.appointments);
        state.showAppoint = true;
        toast.success(`${respData.message}`);
        state.isLoading = false;
      } else {
        toast.error(`${respData.message}`);
        state.isLoading = false;
      }
    },
    [getAppointments.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
    [getPatients.pending]: (state) => {
      state.isLoading = true;
    },
    [getPatients.fulfilled]: (state, { payload }) => {
      console.log("Payload me kya mila", payload);
      const { pageData, respDataData, respData } = payload;
      console.log("Payload Destructure", respData);
      console.log("Response data data", respDataData);

      if (respData.status === 200) {
        state.show = true;
        console.log("Appointments Data", payload);
        console.log("ACtions in getPatients", respData);
        // state.userData = respDataData;
        state.bookPatient = respDataData;
        state.totalPages = pageData.total_pages;
        // state.getTotal = pageData.total;
        addBookPatientsToLocalStorage(state.bookPatient);
        state.showAppoint = true;
        toast.success(`${respData.message}`);
        state.isLoading = false;
        state.got = true;
      } else {
        toast.error(`${respData.message}`);
        state.isLoading = false;
      }
    },
    [getPatients.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
    [getCards.pending]: (state) => {
      state.isLoading = true;
    },
    [getCards.fulfilled]: (state, { payload }) => {
      console.log("getCards Payload me kya mila", payload);
      const { pageData, respDataData, respData } = payload;
      console.log(" getCards Payload Destructure", respData);
      console.log(" getCards Response data data", respDataData);

      if (respData.status === 200) {
        state.show = true;
        console.log("getCards cards Data", payload);
        console.log("ACtions in getCards", respData);
        // state.userData = respDataData;
        state.cardsDetail = respDataData;
        addCardsDetailToLocalStorage([state.cardsDetail]);
        state.showAppoint = true;
        toast.success(`${respData.message}`);
        state.isLoading = false;
      } else {
        toast.error(`${respData.message}`);
        state.isLoading = false;
      }
    },
    [getCards.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
    [getAppointments.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
    [getDoctors.pending]: (state) => {
      state.isLoading = true;
    },
    [getDoctors.fulfilled]: (state, { payload }) => {
      console.log("Payload me kya mila", payload);
      const { pageData, respDataData, respData } = payload;
      console.log("Payload Destructure", respData);
      console.log("Response data data", respDataData);

      if (respData.status === 200) {
        state.show = true;
        console.log("Appointments Data", payload);
        console.log("ACtions in getDoctors", respData);
        // state.userData = respDataData;
        state.doctors = respDataData;
        addDoctorsToLocalStorage(state.doctors);
        state.showAppoint = true;
        toast.success(`${respData.message}`);
        state.isLoading = false;
        state.got = true;
      } else {
        toast.error(`${respData.message}`);
        state.isLoading = false;
      }
    },
    [getDoctors.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
  },
});

export const { cancle, openModal, removePateint, updateId, removeDoctor } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
