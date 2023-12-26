import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input";
import Editor from "../textEditor/Editor";
import MergeCode from "../textEditor/MergeCode";

const SendMail = (props) => {
  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };
  const [editorCtn, setEditorCtn] = useState('');
  const editorContentHandler = (text) => {
    setEditorCtn(text);
  }
  console.log(editorCtn, "Editor Content");

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">{props.label}</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <div className="panel_form">
          <Input
            type="email"
            placeholder="Enter email address"
            label="Email"
            defaultValue="jack@example.com"
            disabled={false}
            prepend={false}
            className='flex-100'
          />
          <Input
            type="text"
            placeholder="Enter subject"
            label="Subject"
            defaultValue=""
            disabled={false}
            prepend={false}
            className='flex-100'
          />
          <div className="input-box flex-100 sms-editor">
            <label class="form-labels" htmlFor="note">
              Message
            </label>
            <Editor content={editorContentHandler} />
            {/*<MergeCode />*/}
          </div>
        </div>
      </div>
      <div className="modal_footer mt-4">
        <button className="btn_filled  mx-auto btn_sm" onClick={hideModalHandler}>
          Send Mail
        </button>
      </div>
    </div>
  );
};

export default SendMail;