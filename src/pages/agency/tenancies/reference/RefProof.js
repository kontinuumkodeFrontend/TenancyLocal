import React, { useState } from 'react'

const RefProof = () => {
    const [proofBtn, setProofBtn] = useState("");

    return (
        <div className="mt-3 flex-100">
            <div className="panel_setting d-flex gap-md-4 gap-3 flex-wrap mb-4">
                <button
                    className={
                        proofBtn === "ACCEPT" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setProofBtn("ACCEPT");
                    }}
                >
                    Accept
                </button>
                <button
                    className={
                        proofBtn === "DECLINE" ? "btn_danger btn_sm" : "bnt_light-danger btn_sm"
                    }
                    onClick={() => {
                        setProofBtn("DECLINE");
                    }}
                >
                    Decline
                </button>
                <button
                    className={
                        proofBtn === "MORE" ? "btn_blue-filled btn_sm" : "btn_blue-stroke btn_sm"
                    }
                    onClick={() => {
                        setProofBtn("MORE");
                    }}
                >
                    Need More Details
                </button>
            </div>
            <div class="input-box">
                <textarea
                    name="note"
                    placeholder="Type your message"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales."
                    className=" proof-note"
                    rows={3}
                />
            </div>
        </div>
    )
}

export default RefProof