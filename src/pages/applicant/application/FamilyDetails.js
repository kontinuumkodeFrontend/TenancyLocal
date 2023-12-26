import React from "react";
import Input from "../../../components/formComponent/Input";
import Postcode from "../../../components/formComponent/Postcode";

const FamilyDetails = () => {
  return (
    <>
      <div className="panel_center-top pb-4">
        <h5 className="text-h5">Direct Family / Next of Kin Address</h5>
      </div>
      <div className="panel_center-mid my-4">
        <div className="panel_form">
          <Postcode/>
          <Input
            type="text"
            placeholder="Enter street"
            label="Street"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="text"
            placeholder="Enter town or city"
            label="Town/City"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="text"
            placeholder="Enter country"
            label="Country"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="number"
            placeholder="Enter number of years"
            label="How Many Years At This Address"
            value=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="date"
            placeholder=""
            label="Move In Date"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="date"
            placeholder=""
            label="Move Out Date"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          </div>
        </div>
    </>
  );
};

export default FamilyDetails;
