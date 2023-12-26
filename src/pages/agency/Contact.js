import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import Input from "../../components/formComponent/Input";
import Dropdown from "../../components/formComponent/Dropdown";
import { mdActions } from "../../store/modal-slice";
import { CONTACT_MODAL } from "../../components/customModal/ModalConstants";

const Contact = () => {
  const dispatch = useDispatch();

  const showModalHandler = (e) => {
    e.preventDefault();
    dispatch(mdActions.showModal({type:CONTACT_MODAL}));
  };

  let subOptions = [{ label: "Select subject", value: "SS" }];

  return (
    <Container>
      <div className="panel mt-4">
        <div className="panel_center-top" style={{ border: "none" }}>
          <h3 className="text-h5 mb-sm-4 mb-3">Help / Contact Us</h3>
        </div>
        <div className="contact-form">
          <div className="contact_head">
            <h3 className="text-h4 text-start">Contact Form</h3>
          </div>
          <div className="contact-body">
            <form className="panel_form">
              <Input
                type="text"
                placeholder="Enter your first name"
                label="First name"
                valdefaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter your last name"
                label="Last name"
                valdefaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                className="flex-100"
                type="email"
                placeholder="Enter your email address"
                label="Email"
                valdefaultValue=""
                disabled={false}
                prepend={false}
              />
              <Dropdown
                label="Subject"
                option={subOptions}
                className="flex-100"
              />
              <div className="input-box flex-100">
                <label className="form-labels">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your message"
                  className="flex-100"
                  rows={5}
                />
              </div>
              <div className="mt-5 flex-100">
                <button
                  className="btn_filled btn_xl w-100"
                  onClick={showModalHandler}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
