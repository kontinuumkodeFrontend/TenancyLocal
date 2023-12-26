import React from 'react'
import Input from '../../../components/formComponent/Input';
import TelInput from '../../../components/formComponent/TelInput';

const PreviousAdd = () => {
  return (
    <>
      <div className="panel_center-top pb-4">
        <h5 className="text-h5">Details of Previous Addresses</h5>
      </div>
      <div className="panel_center-mid my-sm-5 my-4">
        <div className="panel_form">
          <Input
            type="text"
            placeholder="Enter name"
            label="Landlord/Agent Name"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <TelInput label='Landlord/Agent Phone Number' />
          <Input
            type="email"
            placeholder="Enter email address"
            label="Landlord/Agent Email Address"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="email"
            placeholder="Enter email address"
            label="Confirm Landlord/Agent Email Address"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="text"
            placeholder="Enter year of graduation"
            label="Address whilst renting with this Landlord/Agent"
            valdefaultValueue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="date"
            placeholder=""
            label="Date your Tenancy started with this Landlord/Agent"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="date"
            placeholder=""
            label="Date your Tenancy will end with this Landlord/Agent"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
        </div>
      </div>
    </>
  )
}

export default PreviousAdd