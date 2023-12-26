import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tenancyData: {},
  applicantData: [],
  propData: {},
  appForm: [1],
};

const tenancySlice = createSlice({
  name: "tenancy",
  initialState: initialState,
  reducers: {
    setTenancyData(state, action) {
      state.tenancyData = action.payload.formData;
    },
    setApplicantData(state, action) {
      state.applicantData = action.payload.appData;
    },
    setPropData(state, action) {
      state.propData = action.payload.data;
    },
    emptyForm(state) {
      state.tenancyData = {};
      state.applicantData = [];
      state.propData = {};
      state.appForm = [1];
    },
    setAppForm(state, action) {
      if (action.payload.type === "ADD") {
        state.appForm.push(1);
      } else if (action.payload.type === "REMOVE") {
        state.appForm.pop();
      } else if (action.payload.type === "SET_FORM") {
        state.appForm = Array.from(
          { length: state.applicantData.length },
          () => 1
        );
      } else {
        state.appForm = [1];
      }
    },
    editAppFormData(state, action) {
      if (action.payload.type === "APP_INCREMENT") {
        const newData = [];
        const increment = action.payload.totalApp - state.applicantData.length;
        const dummyObj = {
            app_f_name: "",
            app_m_name: "",
            app_l_name: "",
            app_email: "",
            app_mobile: null,
            country_code: "",
            app_renew_tenant: null,
        };
        for (let i = 0; i < increment; i++) {
          newData.push({ ...dummyObj });
        }
        state.applicantData = [...state.applicantData, ...newData];
      } else if (action.payload.type === "APP_DECREMENT") {
        state.appForm.length = action.payload.totalApp;
        state.applicantData.length = action.payload.totalApp;
      }
    },
  },
});

export default tenancySlice;
export const tenancyActions = tenancySlice.actions;
