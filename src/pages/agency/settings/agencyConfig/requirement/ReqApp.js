import React from 'react'
import CustomSwitch from '../../../../../components/formComponent/CustomSwitch'

const ReqApp = () => {
    return (
        <div className='text-center'>
            <h4 className='text-h4'>List of Applicant Requirements</h4>
            <div className="mt-4">
                <label className="form-labels">Must be Over 18</label>
                <CustomSwitch isChecked={false} />
            </div>
            <button className='btn_filled btn_sm mt-4 mx-auto'>Save Requirements</button>
        </div>
    )
}

export default ReqApp