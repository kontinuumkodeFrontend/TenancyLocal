import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    files: [],
    propFormData: []
}

const multiplePropertySlice = createSlice({
    name: "property",
    initialState: initialState,
    reducers: {
        appendFile(state, action) {
            state.files.push(action.payload.newFile);
        },
        replaceFile(state, action) {
            const { index, key, value } = action.payload;
            // Find the object in the array based on the index
            const updatedFiles = state.files.map((file, i) => {
                if (i === index) {
                    // Update the specific key-value pair
                    return { ...file, [key]: value };
                }
                return file;
            });

            // Replace the entire array with the updated one
            state.files = updatedFiles;
        },
        appendPropertyData(state, action) {
            state.propFormData.push(action.payload.newForm);
        },
        replacePropertyData(state, action) {
            state.propFormData = action.payload.newForm;
        },
        emptyForm(state) {
            state.files = [];
            state.propFormData = [];
        }
    }
});

export default multiplePropertySlice;
export const propertyActions = multiplePropertySlice.actions;