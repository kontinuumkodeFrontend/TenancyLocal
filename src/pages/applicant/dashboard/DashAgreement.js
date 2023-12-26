import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const DashAgreement = () => {
  const sigRef = useRef();
  const [signature, setSignature] = useState(null);
  const handleSignatureEnd = () => {
    setSignature(sigRef.current.toDataURL());
  };
  const clearSignature = () => {
    sigRef.current.clear();
    setSignature(null);
  };
  useEffect(() => {
    console.log(signature);
  }, [signature]);

  return (
    <Container className="pt-5">
      <div className="app_db-agreement mb-md-5 mb-4 ">
        <div className="text-center">
          <button className="agree_btn btn_lg">Tenancy Agreement</button>
        </div>
        <div className="mt-md-5 mt-4">
          <object
            data="https://www.newline.co/fullstack-react/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf"
            type="application/pdf"
            width="100%"
            className="agreement_file"
            aria-label="This object displays an PDF file"
          />
        </div>
        <div className="text-center mt-md-5 mt-4">
          <label className="form-labels mb-3 fw-600">Applicant's signature</label>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ className: "signature-agree" }}
            ref={sigRef}
            onEnd={handleSignatureEnd}
          />
          <div className="d-flex gap-3 flex-wrap justify-content-center mt-4 flex-wrap">
            <button onClick={clearSignature} className="btn_filled btn_md mt-3">
              Clear Signature
            </button>
            <button className="btn_filled btn_md mt-3">Submit</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashAgreement;
