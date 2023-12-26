import { createSlice } from "@reduxjs/toolkit";

//for generating an agreement 
const initialState = {
    isAgreement: false,
}

const agreeSlice = createSlice({
    name: "agreement",
    initialState: initialState,
    reducers: {
        showAgreement(state) {
            state.isAgreement = true;
        },
    }
});

export default agreeSlice;
export const agreeActions = agreeSlice.actions;    