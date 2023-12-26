import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAPI } from "../../services/api";
import { ADMIN_DELETE_AGENCY } from "../../config/url";
import { toast } from "react-toastify";

const DeleteAgency = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  }
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const deleteAgencyHandler = () => {
    const url = `${ADMIN_DELETE_AGENCY}/${id}?token=${token}`;
    deleteAPI(url, null, setData, setIsLoading);
  }

  useEffect(() => {
    toast.dismiss();
    if (data?.saved) {
      toast.success("Agency deleted successfully!");
      setTimeout(() => {
        hideModalHandler();
        navigate("/admin");
      }, [2000]);
    } else if (data && !data?.saved) {
      toast.error("Failed to delete agency!");
    }
  }, [data]);


  return (
    <div className="custom-modal bg-after">
      <div className="modal_head">
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body">
        <h4 className="text-h4">Are you sure you want to delete the agency?</h4>
      </div>
      <div className="modal_footer d-flex flex-wrap mt-4  justify-content-center gap-3">
        <button className="btn_filled btn_sm" onClick={deleteAgencyHandler} type="button">
          {isLoading && <span className="loader"></span>} Yes
        </button>
        <button className="btn_light btn_sm" onClick={hideModalHandler}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteAgency;
