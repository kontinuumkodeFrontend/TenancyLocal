import React from "react";
import { Container } from "react-bootstrap";

const ThanksPage = () => {
  return (
    <div className="panel_main-wrapper" style={{height: '100vh'}}>
      <Container>
        <div className="panel_center-sec center">
          <div className="panel_center-mid">
            <h3 className="mb-4 text-h3">
              This ia a demo text and its editable via customization part.
            </h3>
            <p className="para1">
              Lorem Ipsum was originally taken from a Latin text by the Roman
              philosopher Cicero. But it has gone through significant changes
              over the centuries, with words being taken out, shortened, and
              added in. The word ‘lorem’, for example, isn’t a real Latin word,
              it’s a shortened version of the word ‘dolorem’, meaning pain.
              Lorem Ipsum was originally taken from a Latin text by the Roman
              philosopher Cicero.{" "}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ThanksPage;
