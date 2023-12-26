import React, { useEffect, useState } from "react";
import Dropdown from "../formComponent/Dropdown";
import Editor from "../textEditor/Editor";
import MergeCode from "../textEditor/MergeCode";
import { get, post } from "../../services/api";
import { ADMIN_DEFAULT_TEXT } from "../../config/url";
import { defaultTextOptions } from "../../helper/SelectOptions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../../store/update-slice";

const Text = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dropOption, setDropOption] = useState("");
  const [defaultContent, setDefaultContent] = useState(null);
  const [editorContent, setEditorContent] = useState();
  const [postData, setPostData] = useState();
  const url = `${ADMIN_DEFAULT_TEXT}?token=${token}`;
  const dispatch = useDispatch();
  const isDataUpdated = useSelector(state => state.update.isUpdated);

  useEffect(() => {
    if (token) {
      get(url, setData, setIsLoading);
    }
  }, [isDataUpdated]);

  console.log(data, "This is default email");

  const editorContentHandler = (value) => {
    setEditorContent(value);
  }

  useEffect(() => {
    if (data?.saved) {

    }
  }, [data]);

  const submitContentHandler = () => {
    if (editorContent && dropOption) {
      const body = {
        text_code: dropOption,
        text_data: {
          header: {
            text: editorContent
          }
        }
      }
      post(url, body, null, setPostData, setIsLoading);
    }
  }

  useEffect(() => {
    if (data?.text_area?.length > 0 && dropOption) {
      const currentEmailTemplate = data.text_area.filter((item) => item.text_code === dropOption)
      console.log(currentEmailTemplate, "+{+++++++++++++++++++++")
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
  }, [postData])

  return (
    <>
      <div className="row mt-4 row-fh">
        <div className="col-lg-8" >
          <Dropdown
            label=""
            option={defaultTextOptions}
            className="flex_100 mb-4"
            required={false}
            selectValue={dropOption}
            selectHandler={setDropOption}
          />
          <Editor defaultContent={defaultContent} editorHandler={editorContentHandler} />
        </div>
        <div className="col-lg-4"><MergeCode /></div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn_filled btn_lg" onClick={submitContentHandler}>{isLoading && <span className="loader"></span>}Create Default Template</button>
      </div>
    </>
  );
};

export default Text;
