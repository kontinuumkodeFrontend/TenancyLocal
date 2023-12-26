import React from "react";
import Input from "../../../../components/formComponent/Input";
import AddIcon from "../../../../assets/images/add-icon.svg";

const PrevAddress = () => {
  return (
    <div className="px-xl-5 px-3">
      <div className="row mt-4">
        <div className="col-lg-6 pe-xl-4 px-2">
          <div
            className="contact-form"
            style={{ maxWidth: "100%", height: "100%" }}
          >
            <div className="contact_head">
              <h3 className="text_lg-green text-start m-0">Forwarding Address</h3>
            </div>
            <div className="contact-body">
              <div className="panel_form form-agency">
                <Input
                  type="text"
                  placeholder="Enter postcode"
                  label="Postcode"
                  value="E34NA"
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="text"
                  placeholder="Enter street name"
                  label="Street"
                  value="Flat 15 Wellington Buildings Wellington Way London"
                  disabled={true}
                  prepend={false}
                  className="flex-100"
                />
                <Input
                  type="text"
                  placeholder="Enter town/city name"
                  label="Town / City"
                  value="London"
                  disabled={true}
                  prepend={false}
                  className="flex-100"
                />
                <Input
                  type="text"
                  placeholder="Enter country name"
                  label="Country"
                  value="England"
                  disabled={true}
                  prepend={false}
                  className="flex-100"
                />
                {/* <Input
                  type="text"
                  placeholder="Enter move-in date"
                  label="Move In Date"
                  value="01-04-2023"
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="text"
                  placeholder="Enter move-out date"
                  label="Move Out Date"
                  value="01-04-2025"
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="number"
                  placeholder="Enter years"
                  label="How Many Years at This Address"
                  value="5"
                  disabled={true}
                  prepend={false}
                /> */}
              </div>
              <div className="mt-5 d-flex justify-content-center gap-3">
                <button className="bnt_light-danger btn_sm">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 ps-xl-4 px-2 mt-lg-0 mt-5">
          <div className="panel_form form-agency px-4">
            <button className="btn_filled btn_lg">Add<img src={AddIcon} className='ms-2 icon-15' alt="add-icon" /></button>
            <div class="input-box flex-100">
              <label class="form-labels" htmlFor="note">
                Notes
              </label>
              <textarea
                id="note"
                name="note"
                placeholder="Type your message"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales."
                className="flex-100"
              />
            </div>
            <button className="btn_light2 mx-auto btn_sm mt-5">Update Forwarding Address</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevAddress;
