import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input";
import RadioBtn from "../formComponent/RadioBtn";
import Checkbox from "../formComponent/Checkbox";
import TelInput from "../formComponent/TelInput";
import { ADD_TENANCY_MODAL, TENANCY_SUMMARY_MODAL } from "./ModalConstants";
import RadioBtns from "../formComponent/RadioBtns";
import { useFormik } from "formik";
import { renderInputFields } from "../formComponent/InputFields";
import { post } from "../../services/api";
import { AGENCY_TENANCY_SECOND_STEP } from "../../config/url";


const inputFields = [
  {
    name: "firstName",
    label: "Applicant First Name",
    placeholder: "Enter applicant first name",
    type: "text",
    required: true,
  },
  {
    name: "middleName",
    label: "Applicant Middle Name",
    placeholder: "Enter applicant middle name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Applicant Last Name",
    placeholder: "Enter applicant last name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Applicant Email",
    placeholder: "Enter applicant email",
    type: "text",
    required: true,
  },

];

const AddTenants = () => {
  const tenancyData = useSelector(state => state.modal.data);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState();
  const [totalApplicants, setTotalApplicants] = useState(2);
  const [counter, setCounter] = useState([1]);
  const [removeAppBtn, setRemoveAppBtn] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState({
    phone: null,
    countryCode: null,
  });
  const [checkValue, setCheckValue] = useState(false);
  const [checkError, setCheckError] = useState(null);
  const [existingApp, setExistingApp] = useState(null);
  const [existingError, setExistingError] = useState(null);

  const renewAppHandler = (event) => {
    setExistingApp(event.target.value);
    setExistingError(null);
  };

  useEffect(() => {
    if (tenancyData) {
      setTotalApplicants(tenancyData?.no_applicant)
    }
  }, [tenancyData]);

  console.log(tenancyData, totalApplicants, "this is modal data");

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  const prevHandler = () => {
    dispatch(mdActions.showModal({ type: ADD_TENANCY_MODAL }));
  };

  const summaryHandler = () => {
    dispatch(mdActions.showModal({ type: TENANCY_SUMMARY_MODAL }));
  };

  const addBtnHandler = () => {
    setRemoveAppBtn(true);
    setCounter(prevCounter => [...prevCounter, 1]);
  };

  const removeBtnHandler = () => {
    if (counter?.length === 1) {
      // Handle the case where there's only one item
    } else {
      setCounter(prevCounter => prevCounter.slice(0, -1));
    }
  };

  useEffect(() => {
    console.log(counter, "Updated Counter");
  }, [counter]);

  const AddNewAppBtn = () => {
    return (
      <div className="mt-5">
        <button className="btn_filled btn_sm mx-auto" onClick={addBtnHandler}>Add New Applicant</button>
      </div>
    );
  };

  const RemoveAppBtn = () => {
    return (
      <div className="mt-5">
        <button className="btn_danger btn_sm mx-auto" onClick={removeBtnHandler}>Remove Applicant</button>
      </div>
    );
  };

  const formik = useFormik({
    initialValues: {
    },
    onSubmit: (values) => {
      const url = `${AGENCY_TENANCY_SECOND_STEP}?token=${token}`
      const body = {
        tenancyData: {
          ...tenancyData.tenancyData,
          applicants: [
            {
              app_f_name: values.firstName,
              app_m_name: values.middleName,
              app_l_name: values.lastName,
              app_email: values.email,
              app_mobile: phoneNumber.phoneNumber,
              country_code: phoneNumber.countryCode,
              app_renew_tenant: existingApp === "Yes" ? 1 : 2,
            },
          ],
        },
      };
      console.log(body);
      post(url, body, null, setPostData, setIsLoading);
    },
  });


  useEffect(() => {
    if (postData) {
      if (postData.saved) {

      } else if (postData.errors.app_email) {

      }
    }
  }, [postData])
  const handleCheckboxChange = () => {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    setCheckError(null);
  };


  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Add Applicants to Tenancy</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="modal_body mt-5">
          <div className="app_details position-relative">
            <div className="panel_form form-agency mt-4">
              {renderInputFields(0, undefined, formik, inputFields)}
              <TelInput
                className="flex-100"
                phoneNumber={phoneNumber}
                phoneHandler={setPhoneNumber}
                error={phoneError}
                setError={setPhoneError}
              />
              <div className="panel_que-btns input-box flex-100 text-center">
                <p className="form-labels">Existing Applicant?</p>
                <div className="btn_group justify-content-center">
                  <RadioBtns
                    label="Yes"
                    name="exeApp"
                    id="exeApp-yes"
                    value="Yes"
                    radioOption={existingApp}
                    onChange={renewAppHandler}
                  />
                  <RadioBtns
                    value="No"
                    label="No"
                    name="exeApp"
                    id="exeApp-no"
                    radioOption={existingApp}
                    onChange={renewAppHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Checkbox
          className="mt-5 checkbox-modal"
          id="checkbox1"
          label="Do you agree that all information provided by you is correct."
          changeHandler={handleCheckboxChange}
          isChecked={checkValue}
          checkError={checkError}
        />
        <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
          <button className="btn_filled btn_sm" onClick={prevHandler}>
            Previous
          </button>
          <button className="btn_filled btn_sm" type="submit">
            Tenancy Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTenants;



//Applicant form to add applicants/tenants
// const AppForm = () => {
//   const [existingApp, setExistingApp] = useState(null);
//   const [existingError, setExistingError] = useState(null);
//   const parkingHandler = (event) => {
//     setExistingApp(event.target.value);
//     setExistingError(null);
//   };
//   return (
//     <div className="app_details position-relative">
//       <div className="panel_form form-agency mt-4">
//         <Input
//           type="text"
//           placeholder="Enter applicant first name"
//           label="Applicant First Name"
//           defaultValue=""
//           disabled={false}
//           prepend={false}
//         />
//         <Input
//           type="text"
//           placeholder="Enter applicant middle name"
//           label="Applicant Middle Name"
//           defaultValue=""
//           disabled={false}
//           prepend={false}
//         />
//         <Input
//           type="text"
//           placeholder="Enter applicant last name"
//           label="Applicant Last Name"
//           defaultValue=""
//           disabled={false}
//           prepend={false}
//         />
//         <Input
//           type="email"
//           placeholder="Enter applicant email"
//           label="Applicant Email"
//           defaultValue=""
//           disabled={false}
//           prepend={false}
//         />
//         <TelInput
//           className="flex-100"
//           phoneNumber={phoneNumber}
//           phoneHandler={setPhoneNumber}
//           error={phoneError}
//           setError={setPhoneError}
//         />
//         <div className="panel_que-btns input-box">
//           <p className="form-labels">Existing Applicant?</p>
//           <div className="btn_group">
//             <RadioBtns
//               label="Yes"
//               name="exeApp"
//               id="exeApp-yes"
//               value="Yes"
//               radioOption={isParking}
//               onChange={parkingHandler}
//             />
//             <RadioBtns
//               value="No"
//               label="No"
//               name="exeApp"
//               id="exeApp-no"
//               radioOption={isParking}
//               onChange={parkingHandler}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//This component should be deleted