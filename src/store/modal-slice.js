import { createSlice } from "@reduxjs/toolkit";

const initialModalState = { // initial state of modal
    isModal: false,
    type: '',
    data: null,
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initialModalState,
    reducers: {
        showModal(state, action) {
            state.isModal = true;
            state.type = action.payload.type;
            state.data = action.payload.data || null;
        },
        hideModal(state) {
            state.isModal = false;
            state.type = '';
            state.data = null;
        }
    }
});

export default modalSlice;
export const mdActions = modalSlice.actions;     
