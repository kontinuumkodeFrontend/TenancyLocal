import React, { useState, useEffect } from "react";
import Dropdown from "../formComponent/Dropdown";
import Editor from "../textEditor/Editor";
import MergeCode from "../textEditor/MergeCode";
import { defaultEmailOptions } from "../../helper/SelectOptions";
import { ADMIN_DEFAULT_MAIL_TEMPLATE } from "../../config/url";
import { get, post } from "../../services/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../../store/update-slice";

const DefaultEmail = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dropOption, setDropOption] = useState("");
  const [postData, setPostData] = useState();
  const [defaultContent, setDefaultContent] = useState(null);
  const [editorContent, setEditorContent] = useState();
  const url = `${ADMIN_DEFAULT_MAIL_TEMPLATE}?token=${token}`;
  const dispatch = useDispatch();
  const isDataUpdated = useSelector(state => state.update.isUpdated);

  useEffect(() => {
    if (token) {
      get(url, setData, setIsLoading);
    }
  }, [isDataUpdated]);

  console.log(data, "This is default email");

  useEffect(() => {
    if (data?.saved) {

    }
  }, [data]);

  const editorContentHandler = (value) => {
    console.log(value, "This is editor content 000000000000000000000");
    setEditorContent(value);
  }

  useEffect(() => {
    if (data?.template?.length > 0 && dropOption) {
      const currentEmailTemplate = data.template.filter((item) => item.mail_code === dropOption)
      console.log(currentEmailTemplate, "+{+++++++++++++++++++++")
      setDefaultContent(currentEmailTemplate[0]);
    }
  }, [dropOption]);

  console.log(postData, "This is post data");

  const submitContentHandler = () => {
    if (editorContent && dropOption) {
      const body = {
        mail_code: dropOption,
        mail_data: {
          header: {
            text: editorContent
          }
        }
      }
      post(url, body, null, setPostData, setIsLoading);
    }
  }

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
  }, [postData])

  return (
    <>
      <div className="row  mt-4 row-fh">
        <div className="col-lg-8">
          <Dropdown
            label=""
            option={defaultEmailOptions}
            className="flex_100 mb-4"
            required={false}
            selectValue={dropOption}
            selectHandler={setDropOption}
          />
          <Editor defaultContent={defaultContent} editorHandler={editorContentHandler} />
        </div>
        <div className="col-lg-4" ><MergeCode /></div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn_filled btn_lg" onClick={submitContentHandler}>{isLoading && <span className="loader"></span>}Save Changes</button>
      </div>
    </>

  );
};

export default DefaultEmail;
