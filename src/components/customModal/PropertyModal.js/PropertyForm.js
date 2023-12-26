import React, { useEffect, useState } from "react";
import RadioBtns from "../../formComponent/RadioBtns";
import BtnCheckbox from "../../formComponent/BtnCheckbox";
import Dropdown from "../../formComponent/Dropdown";
import Postcode from "../../formComponent/Postcode";
import FileUpload from "../../formComponent/FileUpload";
import {
  fileBase64,
  fileType,
  generateModifiedFields,
  selectedArray,
} from "../../../services/utils";
import { multiFormInputFields } from "../../formComponent/InputFields";
import {
  propertyStatusOptions,
  rentalArray,
  restrictionArray,
} from "../../../helper/SelectOptions";
import { ViewDownload } from "../../formComponent/ViewDownload";
import { propInputFields } from "../../../helper/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { propertyActions } from "../../../store/multiple-property-slice";

const PropertyForm = ({ formik, errors, index, initialState, formHandler }) => {
  // console.log(files, "24234354345||||||")
  const dispatch = useDispatch();
  const multiFormFiles = useSelector((state) => state.property.files);
  // console.log(
  //     multiFormFiles,
  //     "This one should be updated ABCDEFGHI...",
  // );

  const [mediaFiles, setMediaFiles] = useState({
    gasCerti: null,
    epcCerti: null,
    eicrCerti: null,
    hmoCerti: null,
    fireCerti: null,
  });

  const [postCode, setPostcode] = useState();
  const [postError, setPostError] = useState(null);
  const [dropOption, setDropOption] = useState("");
  const [dropError, setDropError] = useState(null);
  const [isParking, setIsParking] = useState(null);
  const [parkError, setParkError] = useState(null);
  const [parkStatus, setParkStatus] = useState("Secure");
  const [isGas, setIsGas] = useState(false);
  const [hmo, setHmo] = useState(false);
  const [fire, setFire] = useState(false);

  const [gasFile, setGasFile] = useState(null);
  const [gasFileError, setGasFileError] = useState(null);

  const [epcFile, setEpcFile] = useState(null);
  const [epcFileError, setEpcFileError] = useState(null);

  const [eicrFile, setEicrFile] = useState(null);
  const [eicrFileError, setEicrFileError] = useState(null);

  const [hmoFile, setHmoFile] = useState(null);
  const [hmoFileError, setHmoFileError] = useState(null);

  const [fireFile, setFireFile] = useState(null);
  const [fireFileError, setFireFileError] = useState(null);
  const [rentalPrice, setRentalPrice] = useState({
    electricity: false,
    gas: false,
    water: false,
    internet: false,
    insurance: false,
  });

  useEffect(() => {
    setPostcode(initialState.postCode);
    setDropOption(initialState.dropOption);
    setIsParking(initialState.isParking);
    setParkStatus(initialState.parkStatus);
    setRentalPrice({
      electricity: initialState.rentIncludeArray.includes("Electricity"),
      gas: initialState.rentIncludeArray.includes("Gas"),
      water: initialState.rentIncludeArray.includes("Water"),
      internet: initialState.rentIncludeArray.includes("Internet"),
      insurance: initialState.rentIncludeArray.includes("Insurance"),
    });
    setRestrictions({
      pets: initialState.restrictionArray.includes("No Pets"),
      students: initialState.restrictionArray.includes("No Students"),
      families: initialState.restrictionArray.includes("No Families"),
      professionals: initialState.restrictionArray.includes("No Professionals"),
    });
    setIsGas(initialState.isGas);
    setHmo(initialState.hmo);
    setFire(initialState.fire);
    //set the files initial vlaue to file type
    setGasFile(
      multiFormFiles[index].gasCerti ? multiFormFiles[index].gasCerti : null
    );
    setEpcFile(
      multiFormFiles[index].epcCerti ? multiFormFiles[index].epcCerti : null
    );
    setEicrFile(
      multiFormFiles[index].eicrCerti ? multiFormFiles[index].eicrCerti : null
    );
    setHmoFile(
      multiFormFiles[index].hmoCerti ? multiFormFiles[index].hmoCerti : null
    );
    setFireFile(
      multiFormFiles[index].fireCerti ? multiFormFiles[index].fireCerti : null
    );
  }, []);

  useEffect(() => {
    if (initialState.postError === "Postcode is required.")
      setPostError(initialState.postError);
  }, [initialState.postError]);

  useEffect(() => {
    formHandler("dropOption", dropOption, index);
    formHandler("dropError", dropError, index);
  }, [dropOption, dropError]);

  useEffect(() => {
    formHandler("postCode", postCode, index);
    formHandler("postError", postError, index);
  }, [postCode, postError]);

  const rentalPriceHandler = (name, value) => {
    //for multiple checkboxes
    setRentalPrice({
      ...rentalPrice,
      [name]: value,
    });
  };

  useEffect(() => {
    formHandler(
      "rentIncludeArray",
      selectedArray(rentalPrice, rentalArray),
      index
    );
  }, [rentalPrice]);

  const [restrictions, setRestrictions] = useState({
    pets: false,
    students: false,
    families: false,
    professionals: false,
  });

  const restrictionsHandler = (name, value) => {
    //for multiple checkboxes
    setRestrictions({
      ...restrictions,
      [name]: value,
    });
  };

  useEffect(() => {
    formHandler(
      "restrictionArray",
      selectedArray(restrictions, restrictionArray),
      index
    );
  }, [restrictions]);

  const parkingHandler = (event) => {
    setIsParking(event.target.value);
    setParkError(null);
    formik.setFieldValue(`property${index+1}.parkingCost${index+1}`, "");
  };

  useEffect(() => {
    formHandler("isParking", isParking, index);
    formHandler("parkError", parkError, index);
  }, [isParking, parkError]);

  const parkStatusHandler = (event) => {
    setParkStatus(event.target.value);
  };

  useEffect(() => {
    formHandler("parkStatus", parkStatus, index);
  }, [parkStatus]);

  const gasHandler = (event) => {
    setIsGas(event.target.value);
  };

  const hmoHandler = (event) => {
    setHmo(event.target.value);
  };

  const fireHandler = (event) => {
    setFire(event.target.value);
  };

  useEffect(() => {
    formHandler("fire", fire, index);
  }, [fire]);

  useEffect(() => {
    formHandler("isGas", isGas, index);
  }, [isGas]);

  useEffect(() => {
    formHandler("hmo", hmo, index);
  }, [hmo]);

  useEffect(() => {
    //updating the files in respective property form
    formHandler("gasCerti", mediaFiles.gasCerti, index);
    formHandler("gasFileError", gasFileError, index);
  }, [mediaFiles.gasCerti]);

  useEffect(() => {
    formHandler("fireCerti", mediaFiles.fireCerti, index);
    formHandler("fireFileError", fireFileError, index);
  }, [mediaFiles.fireCerti]);

  useEffect(() => {
    formHandler("epcCerti", mediaFiles.epcCerti, index);
    formHandler("epcFileError", epcFileError, index);
  }, [mediaFiles.epcCerti]);

  useEffect(() => {
    formHandler("eicrCerti", mediaFiles.eicrCerti, index);
    formHandler("eicrFileError", eicrFileError, index);
  }, [mediaFiles.eicrCerti]);

  useEffect(() => {
    formHandler("hmoCerti", mediaFiles.hmoCerti, index);
    formHandler("hmoFileError", hmoFileError, index);
  }, [mediaFiles.hmoCerti]);

  const updateMediaFiles = async (file, key) => {
    //convert the files to base64
    try {
      const base64String = await fileBase64(file);
      setMediaFiles((prevMediaFiles) => ({
        ...prevMediaFiles,
        [key]: base64String,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //convert the file to base64
    updateMediaFiles(gasFile, "gasCerti");
    //update the files in redux store (file type is: FILE)
    dispatch(
      propertyActions.replaceFile({
        index: index,
        key: "gasCerti",
        value: gasFile,
      })
    );
  }, [gasFile]);

  useEffect(() => {
    updateMediaFiles(epcFile, "epcCerti");
    dispatch(
      propertyActions.replaceFile({
        index: index,
        key: "epcCerti",
        value: epcFile,
      })
    );
  }, [epcFile]);

  useEffect(() => {
    updateMediaFiles(eicrFile, "eicrCerti");
    dispatch(
      propertyActions.replaceFile({
        index: index,
        key: "eicrCerti",
        value: eicrFile,
      })
    );
  }, [eicrFile]);

  useEffect(() => {
    updateMediaFiles(hmoFile, "hmoCerti");
    dispatch(
      propertyActions.replaceFile({
        index: index,
        key: "hmoCerti",
        value: hmoFile,
      })
    );
  }, [hmoFile]);

  useEffect(() => {
    updateMediaFiles(fireFile, "fireCerti");
    dispatch(
      propertyActions.replaceFile({
        index: index,
        key: "fireCerti",
        value: fireFile,
      })
    );
  }, [fireFile]);

  // useEffect(() => {
  //   //to automatically calculate total amount, holding amount and deposit amount
  //   const monthlyRent = formik.values[`monthlyRent${index + 1}`];
  //   const parkingCost = formik.values[`parkingCost${index + 1}`];
  //   const totalAmount = monthlyRent + (parkingCost || 0);

  //   // Calculate depositAmount (1/2 of totalAmount)
  //   const depositAmount = Math.round(totalAmount / 2);

  //   // Calculate holdingAmount (1/2 of depositAmount)
  //   const holdingAmount = Math.round(depositAmount / 2);

  //   // Update Formik values
  //   formik.setValues({
  //     ...formik.values,
  //     [`totalAmount${index + 1}`]: totalAmount,
  //     [`depositAmount${index + 1}`]: depositAmount,
  //     [`holdingAmount${index + 1}`]: holdingAmount,
  //   });
  // }, [
  //   formik.values[`monthlyRent${index + 1}`],
  //   formik.values[`parkingCost${index + 1}`],
  // ]);

  return (
    <div className="mt-3">
      <h5 className="text-h4">{`Property ${index + 1} Information`}</h5>
      {errors?.includes(index + 1) && (
        <div className="ref-incomplete py-3 my-3">
          This property reference is duplicate to another property!
        </div>
      )}
      <div className="d-flex flex-column gap-3">
        {multiFormInputFields(
          0,
          1,
          formik,
          generateModifiedFields(index, propInputFields, "property")
        )}
        <Dropdown
          label="Property Status"
          option={propertyStatusOptions}
          className="flex-100"
          required={false}
          error={dropError}
          setError={setDropError}
          selectValue={dropOption}
          selectHandler={setDropOption}
        />
        <Postcode
          postCode={postCode}
          postcodeHandler={setPostcode}
          error={postError}
          setError={setPostError}
          formik={formik}
          index={index}
        />
        {multiFormInputFields(
          1,
          2,
          formik,
          generateModifiedFields(index, propInputFields, "property")
        )}
      </div>
      <div className="panel_form form-agency mt-4">
        {multiFormInputFields(
          2,
          4,
          formik,
          generateModifiedFields(index, propInputFields, "property")
        )}
      </div>
      <div className="panel_que-btns mt-3">
        <p className="form-labels required">
          Parking Available <span>*</span>
        </p>
        <div className="btn_group">
          <RadioBtns
            label="Yes"
            name="parkAva1"
            id="park1-yes"
            value="Yes"
            radioOption={isParking}
            onChange={parkingHandler}
          />
          <RadioBtns
            label="No"
            name="parkAva1"
            id="park1-no"
            value="No"
            radioOption={isParking}
            onChange={parkingHandler}
          />
        </div>
        {parkError && <p className="error-text">This field is required.</p>}
      </div>
      {isParking === "Yes" && (
        <div>
          {multiFormInputFields(
            15,
            16,
            formik,
            generateModifiedFields(index, propInputFields, "property")
          )}
          <div className="panel_que-btns mt-3">
            <p className="form-labels required">
              Parking Status<span> *</span>
            </p>
            <div className="btn_group">
              <RadioBtns
                label="Secure"
                name="park1"
                id="park1-secure"
                value="Secure"
                radioOption={parkStatus}
                onChange={parkStatusHandler}
              />
              <RadioBtns
                label="Off-Road"
                name="park1"
                id="park1-offRoad"
                value="Off-Road"
                radioOption={parkStatus}
                onChange={parkStatusHandler}
              />
              <RadioBtns
                label="Street"
                name="park1"
                id="park1-street"
                value="Street"
                radioOption={parkStatus}
                onChange={parkStatusHandler}
              />
              <RadioBtns
                label="Other"
                name="park1"
                id="park1-other"
                value="Other"
                radioOption={parkStatus}
                onChange={parkStatusHandler}
              />
            </div>
            {parkStatus.parkError && (
              <p className="error-text">This field is required.</p>
            )}
          </div>
        </div>
      )}
      <div className="panel_que-btns mt-3">
        <p className="form-labels">Rental Price Includes</p>
        <div className="btn_group">
          <div className="panel_setting d-flex flex-wrap">
            <BtnCheckbox
              label="Electricity"
              name="electricity"
              changeHandler={rentalPriceHandler}
              defaultValue={rentalPrice.electricity}
            />
            <BtnCheckbox
              label="Gas"
              name="gas"
              changeHandler={rentalPriceHandler}
              defaultValue={rentalPrice.gas}
            />
            <BtnCheckbox
              label="Water"
              name="water"
              changeHandler={rentalPriceHandler}
              defaultValue={rentalPrice.water}
            />
            <BtnCheckbox
              label="Internet"
              name="internet"
              changeHandler={rentalPriceHandler}
              defaultValue={rentalPrice.internet}
            />
            <BtnCheckbox
              label="Insurance"
              name="insurance"
              changeHandler={rentalPriceHandler}
              defaultValue={rentalPrice.insurance}
            />
          </div>
        </div>
      </div>
      <div className="panel_que-btns mt-3">
        <p className="form-labels">Restrictions</p>
        <div className="btn_group">
          <div className="panel_setting d-flex flex-wrap">
            <BtnCheckbox
              label="No Pets"
              name="pets"
              changeHandler={restrictionsHandler}
              defaultValue={restrictions.pets}
            />
            <BtnCheckbox
              label="No Students"
              name="students"
              changeHandler={restrictionsHandler}
              defaultValue={restrictions.students}
            />
            <BtnCheckbox
              label="No Families"
              name="families"
              changeHandler={restrictionsHandler}
              defaultValue={restrictions.families}
            />
            <BtnCheckbox
              label="No Professionals"
              name="professionals"
              changeHandler={restrictionsHandler}
              defaultValue={restrictions.professionals}
            />
          </div>
        </div>
      </div>
      <div className="panel_form form-agency mt-4">
        {multiFormInputFields(
          4,
          6,
          formik,
          generateModifiedFields(index, propInputFields, "property")
        )}
      </div>
      <div className="panel_que-btns mt-3">
        <p className="form-labels">Has Gas</p>
        <div className="btn_group">
          <RadioBtns
            label="Yes"
            name="hasGas"
            id="gas-yes"
            value="Yes"
            radioOption={isGas}
            onChange={gasHandler}
          />
          <RadioBtns
            label="No"
            name="hasGas"
            id="gas-no"
            value="No"
            radioOption={isGas}
            onChange={gasHandler}
          />
        </div>
      </div>
      {isGas === "Yes" && (
        <div className="mt-3">
          {multiFormInputFields(
            16,
            undefined,
            formik,
            generateModifiedFields(index, propInputFields, "property")
          )}
          <div className="prop-file">
            <FileUpload
              className={gasFile ? "flex-80" : "flex-100"}
              fileId="gas1"
              label="Gas Certificate"
              text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
              required={false}
              error={gasFileError}
              setError={setGasFileError}
              file={gasFile}
              fileHandler={setGasFile}
              accept={fileType}
            />
            {gasFile && <ViewDownload file={gasFile} />}
          </div>
        </div>
      )}
      <div className="panel_form form-agency mt-4">
        {multiFormInputFields(
          6,
          7,
          formik,
          generateModifiedFields(index, propInputFields, "property")
        )}
        <div className="prop-file">
          <FileUpload
            className={epcFile ? "flex-80" : "flex-100"}
            fileId="epcCerti"
            label="EPC Certificate"
            text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
            required={false}
            error={epcFileError}
            setError={setEpcFileError}
            file={epcFile}
            fileHandler={setEpcFile}
            accept={fileType}
          />
          {epcFile && <ViewDownload file={epcFile} />}
        </div>
        {multiFormInputFields(
          7,
          8,
          formik,
          generateModifiedFields(index, propInputFields, "property")
        )}
        <div className="prop-file">
          <FileUpload
            className={eicrFile ? "flex-80" : "flex-100"}
            fileId="eicrCerti"
            label="EICR Certificate"
            text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
            required={false}
            error={eicrFileError}
            setError={setEicrFileError}
            file={eicrFile}
            fileHandler={setEicrFile}
            accept={fileType}
          />
          {eicrFile && <ViewDownload file={eicrFile} />}
        </div>
      </div>
      <div className="panel_que-btns mt-3 mb-3">
        <p className="form-labels">HMO Certificate Available?</p>
        <div className="btn_group">
          <RadioBtns
            label="Yes"
            name="hmoYes"
            id="hmo-yes"
            value="Yes"
            radioOption={hmo}
            onChange={hmoHandler}
          />
          <RadioBtns
            label="No"
            name="hmoYes"
            id="hmo-no"
            value="No"
            radioOption={hmo}
            onChange={hmoHandler}
          />
        </div>
      </div>
      {hmo === "Yes" && (
        <>
          {multiFormInputFields(
            8,
            9,
            formik,
            generateModifiedFields(index, propInputFields, "property")
          )}
          <div className="prop-file">
            <FileUpload
              className={hmoFile ? "flex-80" : "flex-100"}
              fileId="HMOCerti"
              label="HMO Certificate"
              text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
              required={false}
              error={hmoFileError}
              setError={setHmoFileError}
              file={hmoFile}
              fileHandler={setHmoFile}
              accept={fileType}
            />
            {hmoFile && <ViewDownload file={hmoFile} />}
          </div>
        </>
      )}
      <div className="panel_que-btns mt-3 mb-3">
        <p className="form-labels">Fire Alarm Certificate Available?</p>
        <div className="btn_group">
          <RadioBtns
            label="Yes"
            name="fireYes"
            id="fire-yes"
            value="Yes"
            radioOption={fire}
            onChange={fireHandler}
          />
          <RadioBtns
            label="No"
            name="fireYes"
            id="fire-no"
            value="No"
            radioOption={fire}
            onChange={fireHandler}
          />
        </div>
      </div>
      {fire === "Yes" && (
        <>
          {multiFormInputFields(
            9,
            10,
            formik,
            generateModifiedFields(index, propInputFields, "property")
          )}
          <div className="prop-file">
            <FileUpload
              className={fireFile ? "flex-80" : "flex-100"}
              fileId="fireCerti"
              label="Fire Alarm Certificate"
              text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
              required={false}
              error={fireFileError}
              setError={setFireFileError}
              file={fireFile}
              fileHandler={setFireFile}
              accept={fileType}
            />
            {fireFile && <ViewDownload file={fireFile} />}
          </div>
        </>
      )}
      <div className="panel_form form-agency mt-4">
        {multiFormInputFields(
          10,
          15,
          formik,
          generateModifiedFields(index, propInputFields, "property")
        )}
      </div>
    </div>
  );
};

export default PropertyForm;
