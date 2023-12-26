import React, { useState } from "react";
import Input from "../../../components/formComponent/Input";
import MultiSelect from "../../../components/formComponent/MultiSelect";
import Editor from "../../../components/textEditor/Editor";
import MergeCode from "../../../components/textEditor/MergeCode";
import PreviewImg from "../../../assets/images/editor_preview.png";

const EmailSMS = () => {
  const [editorCtn, setEditorCtn] = useState('');
  const editorContentHandler = (text) => {
    setEditorCtn(text);
  }
  console.log(editorCtn, "Editor Content");

  return (
    <div className="px-xl-5 px-3">
      <div className="row mt-4">
        <div className="col-lg-5 pe-xl-4 px-2">
          <div
            className="contact-form"
            style={{ maxWidth: "100%", height: "100%" }}
          >
            <div className="contact-body">
              <div className="panel_form form-agency">
                <div className="input-box flex-100 multi-select">
                  <label class="form-labels" htmlFor="note">
                    Email
                  </label>
                  <MultiSelect />
                </div>
                <Input
                  type="text"
                  placeholder="Enter subject"
                  label="Subject"
                  value=""
                  disabled={false}
                  prepend={false}
                  className="flex-100"
                />
                <div className="input-box flex-100 sms-editor">
                  <label class="form-labels" htmlFor="note">
                    Message
                  </label>
                  <Editor content={editorContentHandler} />
                </div>
                <button className="btn_filled btn_lg flex-100">
                  Send Message
                </button>
                <MergeCode className="flex-100" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 ps-xl-4 px-2 mt-xl-0 mt-4">
          <div className="contact-form" style={{ maxWidth: "100%", height: '100%' }}>
            <div className="contact-body">
              <h3 className="text-h3 text-center m-0">Email Preview</h3>
              <div className="editor_preview mt-4 text-center">
                {editorCtn.length !== 0 && <div dangerouslySetInnerHTML={{ __html: editorCtn }} className="text-start"></div>}
                {editorCtn.length === 0 && <img src={PreviewImg} alt="img" className="preview-img1" />}

              </div>
              <div className="email-text border-bb pb-sm-5 pb-4 mt-4">
                <p className="para1" style={{ fontWeight: "500" }}>
                  Boost your emails with Blush! Create dope emails easy and
                  fast! Install the Blush plugin to customize all the
                  illustrations!
                </p>
                <p className="para1 mt-3" style={{ fontWeight: "500" }}>
                  Create the coolest emails!
                </p>
              </div>
              <div className="email-footer mt-4 p-sm-4 p-3">
                <p className="para1" style={{ fontWeight: "600" }}>
                  Email : harmantester061@gmail.com
                </p>
                <p className="para1" style={{ fontWeight: "600" }}>
                  Web : https://access.tenancyhive.co.uk
                </p>
                <p className="para1" style={{ fontWeight: "600" }}>
                  Phone : 07788008888
                </p>

                <p className="para1 mt-5" style={{ fontWeight: "600" }}>
                  Powered By Tenancy Application
                  <br /> Help | Contact Us | Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSMS;
