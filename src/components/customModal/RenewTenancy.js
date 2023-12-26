import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input";
import RadioBtn from "../formComponent/RadioBtn";
import BtnCheckbox from "../formComponent/BtnCheckbox";
import Checkbox from "../formComponent/Checkbox";


//Additional Question for parking
const EQ1 = (props) => {
    return (
      <div>
        <Input
          type="number"
          placeholder="Enter parking cost"
          label="Additional Parking Cost"
          value="100"
          disabled={true}
          prepend={true}
          className="flex-100 mt-3"
        />
        <div className="panel_que-btns mt-3">
          <p className="form-labels">Parking Status</p>
          <div className="btn_group">
            <RadioBtn
              label="Secure"
              name={props.name}            
              id={`${props.name}-secure`}
              defaultValue={true}
            />
            <RadioBtn
              label="Off-Road"
              name={props.name}   
              id={`${props.name}-offRoad`}
              defaultValue={false}
            />
            <RadioBtn
              label="Street"
              name={props.name}   
              id={`${props.name}-street`}
              defaultValue={false}
            />
            <RadioBtn
              label="Other"
              name={props.name}   
              id={`${props.name}-other`}
              defaultValue={false}
            />
          </div>
        </div>
      </div>
    );
  };

const RenewTenancy = () => {
    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };

    const [isParking, setIsParking] = useState(false);

    const parkingHandler = (value) => {
      setIsParking(value);
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Renew Tenancy</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <Input
                    type="text"
                    placeholder="Enter property address"
                    label="Property Address"
                    value="Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN"
                    disabled={true}
                    prepend={false}
                    className="flex-100"
                />
                <div className="panel_que-btns mt-3">
                    <p className="form-labels">Parking Available</p>
                    <div className="btn_group">
                        <RadioBtn
                            label="Yes"
                            name="parkAva"
                            id="park-yes"
                            defaultValue={true}
                            clickAction={parkingHandler}
                        />
                        <RadioBtn
                            label="No"
                            name="parkAva"
                            id="park-no"
                            defaultValue={false}
                            clickAction={parkingHandler}
                        />
                    </div>
                </div>
                {isParking && <EQ1 name='park1'/>}
                <div className="panel_que-btns mt-3">
                    <p className="form-labels">Rental Price Includes</p>
                    <div className="btn_group">
                        <div className="panel_setting d-flex flex-wrap">
                            <BtnCheckbox label="Electricity" />
                            <BtnCheckbox label="Gas" />
                            <BtnCheckbox label="Water" />
                            <BtnCheckbox label="Internet" />
                            <BtnCheckbox label="Insurance" />
                        </div>
                    </div>
                </div>
                <div className="panel_que-btns mt-3">
                    <p className="form-labels">Restrictions</p>
                    <div className="btn_group">
                        <div className="panel_setting d-flex flex-wrap">
                            <BtnCheckbox label="No Pets" />
                            <BtnCheckbox label="No Students" />
                            <BtnCheckbox label="No Families" />
                            <BtnCheckbox label="No Professionals" />
                        </div>
                    </div>
                </div>
                <div className="panel_form form-agency mt-4">
                    <Input
                        type="number"
                        placeholder="Enter rental amount"
                        label="Monthly Rental Amount"
                        value="1000"
                        disabled={true}
                        prepend={true}
                    />
                    <Input
                        type="number"
                        placeholder="Enter total amount"
                        label="Total Amount"
                        value="1000"
                        disabled={true}
                        prepend={true}
                    />
                    <Input
                        type="number"
                        placeholder="Enter total amount"
                        label="Deposit Amount"
                        value="1000"
                        disabled={true}
                        prepend={true}
                    />
                    <Input
                        type="number"
                        placeholder="Enter number of applicants"
                        label="Holding Amount"
                        value="155"
                        disabled={true}
                        prepend={true}
                    />
                    <Input
                        type="date"
                        placeholder="Enter tenancy start date"
                        label="Tenancy Start Date"
                        value="2023-06-05"
                        disabled={true}
                        prepend={false}
                    />
                    <Input
                        type="date"
                        placeholder="Enter tenancy end date"
                        label="Tenancy End Date"
                        value="2023-06-05"
                        disabled={true}
                        prepend={false}
                    />
                    <Input
                        type="text"
                        placeholder="Enter landlord name"
                        label="Landlord"
                        value="Simon Smith"
                        disabled={true}
                        prepend={false}
                    />
                    <Input
                        type="number"
                        placeholder="Enter number of applicants"
                        label="Number Of Applicants"
                        value="4"
                        disabled={true}
                        prepend={false}
                    />
                </div>
            </div>
            <Checkbox className="mt-sm-5 mt-4 checkbox-modal"
                id="checkbox1"
                label="Do you agree that all information provided by you is correct."
            />
            <div className="modal_footer text-center mt-4">
                <button className="btn_light btn_sm" onClick={hideModalHandler}>
                    Renew Tenancy
                </button>
            </div>
        </div>
    );
};

export default RenewTenancy;
