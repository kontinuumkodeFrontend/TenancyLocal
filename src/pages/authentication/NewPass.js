import React from 'react'
import Input from '../../components/formComponent/Input'
const NewPass = () => {
    return (
        <React.Fragment>
            <div className="mt-lg-5 mt-3">
                <p className="text_lg-green text-center">Reset Your Password</p>
            </div>
            <div className="mt-4">
                <form>
                    <div className="d-flex flex-column gap-4">
                        <Input
                            type="password"
                            value=""
                            placeholder="Enter new password"
                            label="New Password"
                            disabled={false}
                            prepend={false}
                        />
                        <Input
                            type="password"
                            value=""
                            placeholder="Re-enter new password"
                            label="Confirm New Password"
                            disabled={false}
                            prepend={false}
                        />
                    </div>
                    <button className="btn_dark btn_lg w-100 mt-5">Submit</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default NewPass