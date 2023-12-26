import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scheduleTime: [
        {
            day: "monday",
            openingTime: "",
            closingTime: "",
            isChecked: false,
        },
        {
            day: "tuesday",
            openingTime: "",
            closingTime: "",
            isChecked: false,
        },
        {
            day: "wednesday",
            openingTime: "",
            closingTime: "",
            isChecked: false,
        },
        {
            day: "thursday",
            openingTime: "",
            closingTime: "",
            isChecked: false,
        },
        {
            day: "friday",
            openingTime: "",
            closingTime: "",
            isChecked: false,
        },
        {
            day: "saturday",
            openingTime: "",
            closingTime: "",
            isChecked: false,
        },
        {
            day: "sunday",
            openingTime: "",
            closingTime: "",
            isChecked: false,
        }
    ],
}

const workdaySlice = createSlice({
    name: "workday",
    initialState: initialState,
    reducers: {
        setInitialState(state, action) {
            const workArray = action.payload.workday;
            console.log(workArray, "}}}}}}}}}}}}}}}}")
            // Map the received data to the scheduleTime array
            state.scheduleTime = state.scheduleTime.map((scheduleItem) => {
                const data = workArray.find(
                    (item) => item.day === scheduleItem.day
                );
                if (data) {
                    // Set openingTime and closingTime if data is available
                    scheduleItem.openingTime = data.opening_time;
                    scheduleItem.closingTime = data.closing_time;
                    if (data.opening_time && data.closing_time) {
                        scheduleItem.isChecked = true
                    }
                }

                return scheduleItem;
            })
        },
        updateCheck(state, action) {
            state.scheduleTime = state.scheduleTime.map((item) => {
                if (action.payload.day === item.day) {
                    return { ...item, isChecked: !item.isChecked }
                } else return item
            });
        },
        updateTime(state, action) {
            state.scheduleTime = state.scheduleTime.map((item) => {
                if (action.payload.day === item.day) {
                    if (action.payload.time === "OPEN") {
                        return {
                            ...item, openingTime: action.payload.openTime, error: "",
                        }
                    } else {
                        return {
                            ...item, closingTime: action.payload.closeTime, error: "",
                        }
                    }

                }
                else return item;
            })
        },
        setEmpty(state) {
            state.scheduleTime = initialState;
        }
    }
})

export default workdaySlice;
export const workdayActions = workdaySlice.actions;