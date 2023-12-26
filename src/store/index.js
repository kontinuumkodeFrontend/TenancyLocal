import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal-slice";
import agreeSlice from "./agreement-slice";
import commentSlice from "./comment-slice";
import userSlice from "./user-slice";
import updateSlice from "./update-slice";
import multiplePropertySlice from "./multiple-property-slice";
import tenancySlice from "./tenancy-slice";
import workdaySlice from "./workday-slice";
import editPropertySlice from "./edit-property-slice";

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        agreement: agreeSlice.reducer,
        comment: commentSlice.reducer,
        user: userSlice.reducer,
        update: updateSlice.reducer,
        property: multiplePropertySlice.reducer,
        tenancy: tenancySlice.reducer,
        workday: workdaySlice.reducer,
        editProp: editPropertySlice.reducer
    }
});

export default store;