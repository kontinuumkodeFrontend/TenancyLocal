import React, { useState, useEffect } from "react";
import MergeCode from "../textEditor/MergeCode";
import Editor from "../textEditor/Editor";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import { ADMIN_DEFAULT_TEXT } from "../../config/url";
import { RESET_AGREEMENT_MODAL } from "../customModal/ModalConstants";
import Dropdown from "../formComponent/Dropdown";
import { get, post } from "../../services/api";
import { agreementTypeOptions } from "../../helper/SelectOptions";
import { toast } from "react-toastify";
import { updateActions } from "../../store/update-slice";

let textOptions = [
  { label: "Select Template", value: "ST" },
  { label: "Create New Template", value: "NEW_TEMPLATE" },
];

const getTemplateName = (value, options) => {
  return options?.filter((item) => item.value === value);
};

const mergeItem = [
  "{{today_date}}",
  "{{signing_date}}",
  "{{generated_date}}",
  "{{agency.name}}",
  "{{tenancy.reference}}",
  "{{property.address}}",
  "{{property.address}}",
  "{{tenancy.start_date}}",
  "{{tenancy.end_date}}",
  "{{tenancy.total_rent}}",
  "{{tenancy.parking_cost}}",
  "{{tenancy.monthly_amount}}",
  "{{tenancy.deposit_amount}}",
  "{{tenancy.holding_amount}}",
  "{{tenancy.total_applicant}}",
  "{{tenancy.negotiator_name}}",
];

const Agreement = () => {
  const token = localStorage.getItem("token");
  const [dropOption, setDropOption] = useState(""); //for setting selected drop value for specific type of agreement
  const [agreementType, setAgreementType] = useState("tenancy"); //for setting agreement type
  const [data, setData] = useState();
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [defaultContent, setDefaultContent] = useState(null);
  const [editorContent, setEditorContent] = useState();
  const [contentError, setContentError] = useState("");
  const [postData, setPostData] = useState();
  const [agreeOptions, setAgreeOptions] = useState(textOptions); //for setting templates dropdown option
  const url = `${ADMIN_DEFAULT_TEXT}?token=${token}`;
  const dispatch = useDispatch();
  const isDataUpdated = useSelector((state) => state.update.isUpdated);

  // Custom validation function
  const validateTemplateName = (input) => {
    const regex = /^[a-zA-Z0-9\s]+$/; // Allow letters, numbers, and spaces
    const minLength = 5;
    const maxLength = 40;
    if (!input) {
      return "Template name is required.";
    }
    if (!regex.test(input)) {
      return "Only letters, numbers, and spaces are allowed.";
    }
    if (input.length < minLength || input.length > maxLength) {
      return `Name should be between ${minLength} and ${maxLength} characters.`;
    }
    return "";
  };

  const resetAgreeHandler = () => {
    dispatch(mdActions.showModal({ type: RESET_AGREEMENT_MODAL }));
  };

  useEffect(() => {
    if (token) {
      get(url, setData, setIsLoading);
    }
  }, [isDataUpdated]);

  useEffect(() => {
    if (!data) return;

    if (data.saved && data.text_area) {
      // Filter text_area based on agreementType
      const newOptions = data.text_area
        .filter((item) => agreementType === item.type)
        .map((item) => ({
          label: item.name,
          value: item.text_code,
        }));

      console.log(newOptions, "these options");

      // Set agreeOptions to the unique set of options
      setAgreeOptions((prev) => {
        // Use a Set to ensure uniqueness
        const uniqueOptions = new Set([...textOptions, ...newOptions]);
        // Convert the Set back to an array
        return Array.from(uniqueOptions);
      });
    }
  }, [data, agreementType, textOptions]);

  useEffect(() => {
    //When agreement type is changed set dropOption to "Select type"
    setDropOption("ST");
  }, [agreementType]);

  useEffect(() => {
    if (data?.text_area?.length > 0 && dropOption !== "NEW_TEMPLATE") {
      const currentEmailTemplate = data.text_area.filter(
        (item) => item.text_code === dropOption
      );
      console.log(currentEmailTemplate, "+{+++++++++++++++++++++");
      setDefaultContent(currentEmailTemplate[0]);
    } else if (dropOption === "NEW_TEMPLATE") {
      setDefaultContent(null);
    }
    setNewTemplate("");
  }, [dropOption]);

  const editorContentHandler = (value) => {
    setEditorContent(value);
  };

  const createTemplateHandler = () => {
    if (!editorContent) {
      setContentError("Template can't be empty.");
    } else {
      setContentError("");
    }
    if (!newTemplate.name) {
      setNewTemplate((prev) => ({
        ...prev,
        error: "Template name is required.",
      }));
    } else {
      setNewTemplate((prev) => ({ ...prev, error: "" }));
    }
    if (editorContent && agreementType && newTemplate.name) {
      const body = {
        name: newTemplate.name,
        type: agreementType,
        text_code: "",
        text_data: {
          header: {
            text: editorContent,
          },
        },
      };
      post(url, body, null, setPostData, setIsLoading);
    }
  };

  const updateTemplateHandler = () => {
    if (editorContent && agreementType && dropOption) {
      const body = {
        name: getTemplateName(dropOption, agreeOptions)[0].label,
        type: agreementType,
        text_code: dropOption,
        text_data: {
          header: {
            text: editorContent,
          },
        },
      };
      post(url, body, null, setPostData, setIsLoading);
    }
  };

  useEffect(() => {
    if (!postData) return;
    else {
      if (dropOption === "NEW_TEMPLATE") {
        if (postData.saved) {
          toast.success("New Template Created Successfully!");
          dispatch(updateActions.setUpdation());
          setDropOption("ST");
          setDefaultContent(null);
        } else {
          toast.error("Something went wrong.");
        }
      } else {
        if (postData.saved) {
          toast.success("Template Updated Successfully!");
          dispatch(updateActions.setUpdation());
        } else {
          toast.error("Something went wrong.");
        }
      }
    }
  }, [postData]);

  console.log(postData, "this is post data");
  return (
    <div className="row mt-4 row-fh">
      <div className="col-lg-8">
        <h5 className="text-h4 text-start mb-2">Select Agreement Type</h5>
        <Dropdown
          label=""
          option={agreementTypeOptions}
          className="flex_100 mb-4"
          required={false}
          selectValue={agreementType}
          selectHandler={setAgreementType}
        />
        <h5 className="text-h4 text-start mb-2">Edit Agreement</h5>
        <Dropdown
          label=""
          option={agreeOptions}
          className="flex_100 mb-2"
          required={false}
          selectValue={dropOption}
          selectHandler={setDropOption}
        />
        {dropOption === "NEW_TEMPLATE" && (
          <div className="input-box mb-3">
            <input
              type="text"
              placeholder="Enter Template Name"
              className={newTemplate.error && "input-error"}
              value={newTemplate.name}
              onChange={(e) => {
                const inputValue = e.target.value;
                const error = validateTemplateName(inputValue);
                setNewTemplate({ name: inputValue, error });
              }}
            />
            {newTemplate.error && (
              <p className="error-text">{newTemplate.error}</p>
            )}
          </div>
        )}
        <Editor
          defaultContent={defaultContent}
          editorHandler={editorContentHandler}
        />
        {contentError && <p className="error-text mt-2">{contentError}</p>}
      </div>
      <div className="col-lg-4">
        <MergeCode mergeItems={mergeItem}/>
      </div>
      <div className="col-12 mt-4">
        <h5 className="text-h4 text-start mb-4">Preview Agreement</h5>
        <div className="preview-agree-doc">
          {dropOption !== "NEW_TEMPLATE" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: editorContent || defaultContent,
              }}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: editorContent }} />
          )}
        </div>
      </div>
      <div className="d-flex mt-md-5 mt-4 justify-content-center gap-3 flex-wrap">
        {dropOption === "NEW_TEMPLATE" ? (
          <button className="btn_filled btn_sm" onClick={createTemplateHandler}>
            {isLoading && <span className="loader"></span>} Create Template
          </button>
        ) : (
          <button className="btn_filled btn_sm" onClick={updateTemplateHandler}>
            {isLoading && <span className="loader"></span>} Update Template
          </button>
        )}
        {/*<button className="btn_filled btn_sm" onClick={resetAgreeHandler}>
          Reset Tenancy Agreement
      </button>*/}
      </div>
    </div>
  );
};

export default Agreement;
