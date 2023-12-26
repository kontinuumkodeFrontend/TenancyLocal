import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

const Signature = (props) => {
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
    <>
      <label className="form-labels mb-3">{props.label}</label>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ className: "signature" }}
        ref={sigRef}
        onEnd={handleSignatureEnd}
      />
      <button onClick={clearSignature} className="btn_filled1 btn_md mt-3 mx-auto">
        Clear Signature
      </button>
    </>
  );
};

export default Signature;
