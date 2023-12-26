import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { deleteAPI, get } from "../../services/api";
import { AGENCY_DELETE_TENANCY } from "../../config/url";
import { toast } from "react-toastify";
import { updateActions } from "../../store/update-slice";

const DeleteTenancy = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
    sessionStorage.clear();
  };
  const tenancyId = sessionStorage.getItem("tenancyId");

  console.log(tenancyId, "this is tenant");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState(false);

  const deleteTenancyHandler = () => {
    const url = `${AGENCY_DELETE_TENANCY}/${tenancyId}?token=${token}`;
    if (tenancyId && token) {
      deleteAPI(url, null, setIsData, setIsLoading);
    }
  }

  useEffect(() => {
    if (!data) return;
    if (data?.saved) {
      toast.success("Tenancy deleted successfully!");
      dispatch(updateActions.setUpdation());
      setTimeout(() => {
        hideModalHandler();
      }, 1000);
    } else {
      toast.error("Something went wrong!");
    }
  }, [data]);

  console.log(data, "this is deleted")

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Delete Tenancy</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <h4 className="text-h4" style={{ fontWeight: '500' }}>Are you sure want to delete this tenancy?</h4>
      </div>
      <div className="modal_footer mt-4">
        <button className="btn_danger btn_sm mx-auto" onClick={deleteTenancyHandler}>
          {isLoading && <span className="loader"></span>} Delete Tenancy
        </button>
      </div>
    </div>
  );
};

export default DeleteTenancy;