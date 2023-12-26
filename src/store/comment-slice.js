import { createSlice } from "@reduxjs/toolkit";

//for hadling switch btn in inspection table
const initialState = {
    isCommentSaved: false,
}
const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {
        setComment(state) {
            state.isCommentSaved = !state.isCommentSaved;
        },
    }


});

export default commentSlice;
export const commentAtions = commentSlice.actions;    