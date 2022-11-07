import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  addAppointmentsToLocalStorage,
  addBookPatientsToLocalStorage,
  addCardsDetailToLocalStorage,
  addDoctorsToLocalStorage,
  addStartTimeToLocalStorage,
  addStatusLogToLocalStorage,
  addTimeSlotToLocalStorage,
  getAppointmentsFromLocalStorage,
  getBookPatientsFromLocalStorage,
  getCardsDetailFromLocalStorage,
  getDoctorsFromLocalStorage,
  getStartTimeFromLocalStorage,
  getStatusLogFromLocalStorage,
  getTimeSlotFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
  removeBookPatientsFromLocalStorage,
  removeCardsDetailFromLocalStorage,
  removeDoctorsFromLocalStorage,
  removeStartTimeFromLocalStorage,
  removeStatusLogFromLocalStorage,
  removeTimeSlotFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  showAppoint: true,
  isLoading: false,
  appointments: getAppointmentsFromLocalStorage(),
  getTotal: null,
  bookPatient: getBookPatientsFromLocalStorage(),
  doctors: getDoctorsFromLocalStorage(),
  cardsDetail: getCardsDetailFromLocalStorage(),
  timeSlot: getTimeSlotFromLocalStorage(),
  startTime: getStartTimeFromLocalStorage(),
  statusLogData: getStatusLogFromLocalStorage(),
  StatusId: null,

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
      // console.log("getAppointments Response.....", Obj.respData);
      // console.log("OBJECT", Obj);
      return Obj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPatients = createAsyncThunk(
  "user/getPatients",
  async (searchedPatient, thunkAPI) => {
    // console.log("getPatients kya milraha hai yaha", searchedPatient);

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
      // console.log("response.....in getPatients", Obj.respData);
      // console.log("OBJECT", Obj);
      return Obj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCards = createAsyncThunk(
  "user/getCards",
  async ({ patient_id, corporate_id }, thunkAPI) => {
    // console.log("getCards kya milraha hai yaha", patient_id);

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
        respDataData: resp.data.data,
        respData: resp.data,
      };
      // console.log("response.....", Obj.respData);
      // console.log("OBJECT", Obj);
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

export const getTimeSlot = createAsyncThunk(
  "user/getTimeSlot",
  async ({ date, docId }, thunkAPI) => {
    // console.log("getPatients kya milraha hai yaha", );
    try {
      const resp = await customFetch({
        url: "/api/doctor/appointments/slot_for_clinicians.json",
        method: "GET",
        params: {
          date: date,
          doctor_id: docId,
          zone: 19800,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });

      const result = resp.headers["x-pagination"];
      let Pagination = result ? JSON.parse(result) : null;

      let Obj = {
        pageData: Pagination,
        respDataCommon: resp.data.common,
        respDataData: resp.data.data,
        respData: resp.data,
      };
      console.log("response..... in getTimeSlot", Obj.respData);
      console.log("OBJECT in getTimeSlot", Obj);
      return Obj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const getAppoinmentsLog = createAsyncThunk(
  "user/getAppoinmentsLog",
  async (appointment_id, thunkAPI) => {
    console.log("getAppoinmentsLog kya milraha hai yaha", appointment_id);
    try {
      const resp = await customFetch({
        url: "/api/appointments/log_entries.json",
        method: "GET",
        params: {
          appointment_id: appointment_id,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("response.....in getAppoinmentsLog", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const postBookAppointmentData = createAsyncThunk(
  "user/postBookAppointmentData",
  async ({ values, value, selectedPatientId }, thunkAPI) => {
    const { doctor_id, duration, start_time, cardIdentifier } = values;
    const appointment_type = value;
    const patient_id = selectedPatientId.id;
    const appointment = { appointment_type, doctor_id, duration, start_time };
    const organization_id = selectedPatientId.c_id;
    const cardIdentifier1 = cardIdentifier;

    try {
      const resp = await customFetch({
        url: "/api/priory/patient/appointments.json",
        method: "POST",
        data: {
          appointment: appointment,
          cardIdentifier: cardIdentifier1,
          organization_id: organization_id,
          patient_id: patient_id,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("response.....in getAppoinmentsLog", resp.data);
      return resp.data;
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
    cancleAppLog: (state) => {
      state.StatusId = null;
      removeStatusLogFromLocalStorage();
    },
    addingStatusId: (state, actions) => {
      state.StatusId = actions.payload;
      console.log("actions addingStatusId", actions.payload);
    },
    openModal: (state) => {
      state.showAppoint = true;
    },
    removePateint: (state) => {
      state.bookPatient = null;
      state.cardsDetail = null;
      state.timeSlot = null;
      state.startTime = null;
      state.got = false;
      removeBookPatientsFromLocalStorage();
      removeCardsDetailFromLocalStorage();
      removeTimeSlotFromLocalStorage();
      removeStartTimeFromLocalStorage();
    },
    removeDoctor: (state) => {
      state.doctors = null;
      state.timeSlot = null;
      state.startTime = null;
      state.got = false;
      removeDoctorsFromLocalStorage();
      removeStartTimeFromLocalStorage();
      removeTimeSlotFromLocalStorage();
    },
  },
  extraReducers: {
    [getAppointments.pending]: (state) => {
      state.isLoading = true;
    },
    [getAppointments.fulfilled]: (state, { payload }) => {
      // console.log("Payload me kya mila", payload);
      const { pageData, respDataData, respData } = payload;
      // console.log("Payload Destructure", respData);
      // console.log("Response data data", respDataData);

      if (respData.status === 200) {
        state.show = true;
        // console.log("Appointments Data", payload);
        // console.log("ACtions in getAppointments", respData);
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
      // console.log(" getCards Payload Destructure", respData);
      console.log(" getCards Response data data", respDataData);

      if (respData.status === 200) {
        state.show = true;
        // console.log("getCards cards Data", payload);
        // console.log("ACtions in getCards", respData);
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
      // console.log("Payload me kya mila", payload);
      const { pageData, respDataData, respData } = payload;
      // console.log("Payload Destructure", respData);
      // console.log("Response data data", respDataData);

      if (respData.status === 200) {
        state.show = true;
        // console.log("Appointments Data", payload);
        // console.log("ACtions in getDoctors", respData);
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
    [getTimeSlot.pending]: (state) => {
      state.isLoading = true;
    },
    [getTimeSlot.fulfilled]: (state, { payload }) => {
      const { pageData, respDataData, respData, respDataCommon } = payload;
      if (respData.status === 200) {
        if (respData.message === "Time slots available for this date.") {
          state.show = true;
          // console.log("Appointments Data", payload);
          // console.log("ACtions in getTimeSlot", respData);
          state.timeSlot = respDataCommon;
          state.startTime = respDataData;
          state.showAppoint = true;
          toast.success(`${respData.message}`);
          state.isLoading = false;
          state.got = true;
          addTimeSlotToLocalStorage([state.timeSlot]);
          addStartTimeToLocalStorage(state.startTime);
        } else if (respData.message === "No time slots available.") {
          state.isLoading = false;
          state.timeSlot = null;
          state.startTime = null;
          toast.error(`${respData.message}`);
        }
      } else {
        toast.error(`${respData.message}`);
        state.isLoading = false;
      }
    },
    [getTimeSlot.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<

    [getAppoinmentsLog.pending]: (state) => {
      state.isLoading = true;
    },
    [getAppoinmentsLog.fulfilled]: (state, { payload }) => {
      console.log("Payload me kya mila", payload);
      const { data, message, status } = payload;
      console.log("Response in getAppoinmentsLog", data);

      if (status === 200) {
        state.statusLogData = data;
        addStatusLogToLocalStorage(state.statusLogData);
        toast.success(`${message}`);
        state.isLoading = false;
      } else {
        toast.error(`${message}`);
        state.isLoading = false;
      }
    },
    [getAppoinmentsLog.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<

    [postBookAppointmentData.pending]: (state) => {
      state.isLoading = true;
    },
    [postBookAppointmentData.fulfilled]: (state, { payload }) => {
      console.log("Payload me kya mila", payload);
      const { data, message, status } = payload;

      if (status === 200) {
        state.bookPatient = null;
        state.doctors = null;
        state.cardsDetail = null;
        state.timeSlot = null;
        state.startTime = null;
        state.statusLogData = null;
        state.StatusId = null;

        removeCardsDetailFromLocalStorage();
        removeTimeSlotFromLocalStorage();
        removeStartTimeFromLocalStorage();
        removeStatusLogFromLocalStorage();
        removeBookPatientsFromLocalStorage();
        removeDoctorsFromLocalStorage();
        toast.success(`${message}`);
        state.isLoading = false;

        if (status === 801) {
          state.bookPatient = null;
          state.doctors = null;
          state.cardsDetail = null;
          state.timeSlot = null;
          state.startTime = null;
          state.statusLogData = null;
          state.StatusId = null;

          removeCardsDetailFromLocalStorage();
          removeTimeSlotFromLocalStorage();
          removeStartTimeFromLocalStorage();
          removeStatusLogFromLocalStorage();
          removeBookPatientsFromLocalStorage();
          removeDoctorsFromLocalStorage();
        }
      } else {
        state.bookPatient = null;
        state.doctors = null;
        state.cardsDetail = null;
        state.timeSlot = null;
        state.startTime = null;
        state.statusLogData = null;
        state.StatusId = null;

        removeCardsDetailFromLocalStorage();
        removeTimeSlotFromLocalStorage();
        removeStartTimeFromLocalStorage();
        removeStatusLogFromLocalStorage();
        removeBookPatientsFromLocalStorage();
        removeDoctorsFromLocalStorage();
        toast.error(`${message}`);
        state.isLoading = false;
      }
    },
    [postBookAppointmentData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
  },
});

export const {
  cancle,
  openModal,
  removePateint,
  updateId,
  removeDoctor,
  cancleAppLog,
  addingStatusId,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
