import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useSelector } from "react-redux";
import commentSlice from "../../store/comment-slice";
//Switch button
const SwitchBtn = styled(Switch)(() => ({
    //custom mui switch with different color
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#03565A",
        "&:hover": {
            backgroundColor: alpha("#03565A"),
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#03565A",
    },
}));

const CustomSwitch = (props) => {
    const [isChecked, setChecked] = React.useState(props.isChecked);
    const isCommentSaved = useSelector(state => state.comment.isCommentSaved);

    const handleChange = (event) => {
        console.log(isCommentSaved);
        if (props.handlerFun) {
            if (!isChecked) {
                //To show Alert Modal
                props.handlerFun();
               
            }
            setChecked(event.target.checked);
        }
        else {
            setChecked(event.target.checked);
        }
    };
    return (
        <>
            <SwitchBtn
                color="secondary"
                checked={isChecked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
            />
        </>
    );
};
export default CustomSwitch;
