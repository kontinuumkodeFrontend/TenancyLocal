import React from "react";
import { Tab, Tabs } from "react-bootstrap";

export const Progress = () => {
  return (
     <><div className="bg_filled mt-md-5 mt-4">
          <p className="text_xsm">Application Progress</p>
      </div>
    <div className="app_details app_progress mt-3">
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Steve Andrewson">
          <div className="mt-4">
            <div className="px-m-5 py-4">
              <div className="row mb-4">
                <div className="col-lg-3 col-12"></div>
                <div className="col">
                  <p className="fw-500">Application</p>
                </div>
                <div className="col">
                  <p className="fw-500">Agency Decision</p>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>

              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Landlord Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status comp">
                    <p>Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Guarantor Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status comp">
                    <p>Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Employment Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Tenancy Agreement Signed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="second" title="Andrewson">
          <div className="mt-4">
            <div className="px-m-5 py-4">
              <div className="row mb-4">
                <div className="col-lg-3 col-12"></div>
                <div className="col">
                  <p className="fw-500">Application</p>
                </div>
                <div className="col">
                  <p className="fw-500">Agency Decision</p>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>

              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Landlord Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status comp">
                    <p>Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Guarantor Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status comp">
                    <p>Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Employment Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Tenancy Agreement Signed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="third" title="Lily Bright">
          <div className="mt-4">
           
            <div className="px-m-5 py-4">
              <div className="row mb-4">
                <div className="col-lg-3 col-12"></div>
                <div className="col">
                  <p className="fw-500">Application</p>
                </div>
                <div className="col">
                  <p className="fw-500">Agency Decision</p>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>

              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Landlord Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status comp">
                    <p>Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Guarantor Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status comp">
                    <p>Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Employment Reference</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-12">
                  <div className="d-flex justify-content-lg-end justify-content-center align-items-center h-100 mb-lg-0 mb-3">
                    <p>Tenancy Agreement Signed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 mt-sm-0 mt-3">
                  <div className="progress-status">
                    <p>Pending</p>
                  </div>
                </div>
                <div className="col-lg-1 col-0"></div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
    </>
  );
};
