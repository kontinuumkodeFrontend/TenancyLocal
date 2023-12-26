import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/formComponent/Dropdown";
import MergeCode from "../../../components/textEditor/MergeCode";
import Editor from "../../../components/textEditor/Editor";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_CUSTOM_EMAIL } from "../../../config/url";
import { updateActions } from "../../../store/update-slice";
import { toast } from "react-toastify";
import { get, post } from "../../../services/api";
import { customEmailOptions } from "../../../helper/SelectOptions";

const Custom = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dropOption, setDropOption] = useState("");
  const [defaultContent, setDefaultContent] = useState(null);
  const [editorContent, setEditorContent] = useState();
  const [postData, setPostData] = useState();
  const url = `${ADMIN_CUSTOM_EMAIL}?token=${token}`;
  const dispatch = useDispatch();
  const isDataUpdated = useSelector((state) => state.update.isUpdated);

  useEffect(() => {
    if (token) {
      get(url, setData, setIsLoading);
    }
  }, [isDataUpdated]);

  console.log(data, "This is default email");

  const editorContentHandler = (value) => {
    setEditorContent(value);
  };

  useEffect(() => {
    if (data?.saved) {
    }
  }, [data]);

  const submitContentHandler = () => {
    if (editorContent && dropOption) {
      const body = {
        mail_code: dropOption,
        mail_data: {
          header: {
            text: editorContent,
          },
        },
      };
      post(url, body, null, setPostData, setIsLoading);
    }
  };

  useEffect(() => {
    if (data?.template?.length > 0 && dropOption) {
      const currentEmailTemplate = data.template.filter(
        (item) => item.mail_code === dropOption
      );
      // console.log(currentEmailTemplate, "+{+++++++++++++++++++++");
      setDefaultContent(currentEmailTemplate[0]);
    }
  }, [dropOption]);

  useEffect(() => {
    if (!postData) return;
    else {
      if (postData.saved) {
        toast.success("Template updated successfully!");
        dispatch(updateActions.setUpdation());
      } else {
        toast.error("Something went wrong!");
      }
    }
  }, [postData]);

  return (
    <div className="panel_center-mid mt-5">
      <div className="panel_setting d-flex justify-content-center gap-4">
        <button className="btn_filled btn_sm">Emails</button>
      </div>
      <div className="row mt-5 row-fh">
        <div className="col-8">
          <Dropdown
            label=""
            option={customEmailOptions}
            className="flex_100 mb-4"
            required={false}
            selectValue={dropOption}
            selectHandler={setDropOption}
          />
          <Editor
            defaultContent={defaultContent}
            editorHandler={editorContentHandler}
          />
        </div>
        <div className="col-4">
          <MergeCode />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn_filled btn_lg" onClick={submitContentHandler}>
          {isLoading && <span className="loader"></span>}Create Default Template
        </button>
      </div>
    </div>
  );
};

export default Custom;
