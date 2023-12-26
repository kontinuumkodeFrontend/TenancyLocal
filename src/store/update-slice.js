import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUpdated: false,
}

const updateSlice = createSlice({
    name: "update",
    initialState: initialState,
    reducers: {
        setUpdation(state) {
            state.isUpdated = !state.isUpdated;
        },
    }
})

export default updateSlice;
export const updateActions = updateSlice.actions;