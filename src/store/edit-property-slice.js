import { createSlice } from '@reduxjs/toolkit';
import { BASE64, EICR_FILE, EPC_FILE, FIRE_FILE, GAS_FILE, HMO_FILE } from '../helper/constants/ViewTenancyConstant';


const initialState = {
    gasFile: null,
    fireFile: null,
    hmoFile: null,
    epcFile: null,
    eicrFile: null,
};

const fileTypesMap = {
    [GAS_FILE]: 'gasFile',
    [FIRE_FILE]: 'fireFile',
    [HMO_FILE]: 'hmoFile',
    [EPC_FILE]: 'epcFile',
    [EICR_FILE]: 'eicrFile',
};

const editPropertySlice = createSlice({
    name: 'editPropertyFile',
    initialState,
    reducers: {
        setFile(state, action) {
            const { type, fileType, file } = action.payload;
            const propertyName = fileTypesMap[fileType];
            if (propertyName) {
                state[propertyName] = type === BASE64 ? file : file;
            }
        },
        emptyFiles(state) {
            Object.keys(state).forEach((key) => {
                state[key] = null;
            });
        },
    },
});



export const editPropActions = editPropertySlice.actions;
export default editPropertySlice;
