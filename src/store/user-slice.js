import { createSlice } from "@reduxjs/toolkit";
import { ADMIN, AGENCY, APPLICANT_DASHBOARD, APPLICANT_PANEL, GUARANTOR, LANDLORD, EMPLOYER } from "../helper/constants/UserConstant";

const utype = localStorage.getItem("authRole");
console.log(utype, "USER ", typeof (utype));
let initialUser = undefined;

switch (utype) {
    case "1":
        initialUser = AGENCY;
        break;
    case "2":
        initialUser = ADMIN;
        break;
    default:
        initialUser = null;
        break;
}

const initalState = {
    userType: initialUser,
}
const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {
        setUser(state, action) {
            state.userType = action.payload;
        }
    }
});

export default userSlice;
export const userActions = userSlice.actions;