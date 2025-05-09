"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import ThankYou from "./ThankYou";
import { animateScroll as scroll } from "react-scroll";
import { fetchRepresentatives } from "../assets/petitions/fetchRepresentatives";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import LoadingMainForm from "./LoadingMainForm";
import { sendEmail } from "../assets/petitions/sendEmail";
import { useEffect } from "react";
import Image from "next/image";
import citizenLogo from "../assets/images/citizen.png";
const MainForm = ({
  dataUser,
  setDataUser,
  mp,
  setMp,
  setEmailData,
  emailData,
  clientId,
  states,
  typData,
  mainData,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  senator,
  setSenator,
  allDataIn,
  setAllDataIn,
  colors,
  formFields,
}) => {
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showFindForm, setShowFindForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(true);
  const [tac, setTac] = useState(false);
  const [showListSelect, setShowListSelect] = useState(true);
  const [emails, setEmails] = useState([]);
  const [many, setMany] = useState(false);
  const [showMainContainer, setShowMainContainer] = useState(false);
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  const handleTerms = (e) => {
    if (e.target.checked === true) {
      setTac(true);
    } else {
      setTac(false);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const isValidEmail = (email) => {
    if (!email) {
      return false;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email.trim());
  };

  const click = async (e) => {
    e.preventDefault();
    console.log(dataUser, "dataUser");
    if (
      !isValidEmail(dataUser.emailUser) ||
      tac === false ||
      Object.getOwnPropertyNames(dataUser).length === 0 ||
      dataUser.userName === undefined ||
      dataUser.emailUser === undefined
    ) {
      setError(true);
      return;
    }
    setValidated(true);
    setShowLoadSpin(true);
    setError(false);
    const representatives = await fetchRepresentatives(
      "GET",
      backendURLBase,
      endpoints.toGetRepresentativesByCp,
      clientId,
      `&postcode=${dataUser.postalCode}`,
      setMp,
      setSenator,
      setShowLoadSpin,
      setAllDataIn
    ).catch((error) => console.log("error", error));

    scroll.scrollToBottom();
    if (!mainData) return "loading datos";
    if (!mp) return "loading datos";
    fetchLeads(
      true,
      backendURLBase,
      endpoints,
      clientId,
      dataUser,
      emailData,
      "NA",
      "basic-data-user"
    );
    setShowFindForm(true);
    setShowThankYou(false);
  };
  useEffect(() => {
    if (allDataIn.length === 0) return;
    sendEmail(
      "GET",
      backendURLBaseServices,
      endpoints,
      clientId,
      dataUser,
      emailData,
      allDataIn
    );
  }, [allDataIn]);
  if (!mainData) return "loading datos";
  if (!mp) return "loading datos";
  return (
    <div className={"contenedor main-form-flex-container"}>
      <div className={"container instructions"}></div>
      <div className={"form-container"} hidden={showFindForm}>
        <div className={"container container-content"}>
          {error ? (
            <Alert variant={"danger"}>
              Please fill all fields. Also, please make sure there are no spaces
              before of after your email or postcode.
            </Alert>
          ) : null}
          <Form
            name="fm-find"
            onSubmit={click}
            noValidate
            validated={validated}
            hidden={showFindForm}
          >
            <div className="instructions-container">
              <h3 className="main-texts-color main-text-title">
                {mainData.title}
              </h3>
              <p className="main-texts-color main-text-instruction">
                {mainData.instruction}
              </p>
            </div>
            {/* <h3 className="find-her-mp-text main-texts-color">{mainData.firstFormLabel1}</h3> */}
            <div className="fields-form">
              {formFields.map((field, key) => {
                return field.type !== "state" ? (
                  <Form.Group className="field" key={key}>
                    <Form.Label
                      className="select-label main-texts-color labels-text-format"
                      htmlFor={`emailInput-mainForm${key}`}
                    >
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id={`emailInput-mainForm${key}`}
                      type={field.type === "emailUser" ? "email" : field.type}
                      placeholder={field.placeholder}
                      name={field.type === "name" ? "userName" : field.type}
                      onChange={handleChange}
                      className="input-color main-form-inputs"
                      required
                    />
                  </Form.Group>
                ) : states.length > 0 ? (
                  <Form.Group className={"field"} key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Select
                      aria-label="DefaulValue"
                      required
                      name={field.type}
                      id="stateSelect-mainForm"
                      onChange={handleChange}
                    >
                      <option key={"vacio"} value={""}>
                        {field.placeholder}
                      </option>
                      {states.sort().map((estate) => (
                        <option key={estate} value={estate}>
                          {estate}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                ) : (
                  <Form.Group className="field" key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id="emailInput-mainForm"
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.type}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                );
              })}
            </div>
            <Form.Group
              style={{ textAlign: "justify" }}
              className="field select-styles-form terms-and-cond-input"
              controlId="conditions"
            >
              <Form.Check
                name="conditions"
                onClick={handleTerms}
                className="links-checkboxes-color terms-and-cond-input"
                // bsPrefix="custom-checkbox"
                required
                label={
                  <a
                    target={"_blank"}
                    className="links-checkboxes-color"
                    rel={"noreferrer"}
                    href={mainData.termsAndConditionsURL}
                  >
                    Terms and Conditions
                  </a>
                }
              />
            </Form.Group>
            <Form.Group className="main-find-btn-container">
              <Button
                id="findButton-mainForm"
                type={"submit"}
                variant={"dark"}
                size={"lg"}
                onClick={click}
                className={"u-full-width capitalize-style find-btn-main-form"}
              >
                Continue
              </Button>
            </Form.Group>
            {showLoadSpin ? loading("spinner-containerB") : null}
          </Form>
        </div>
        <div className="logo-container">
          <Image width={300} src={citizenLogo} alt="citizen go logo" />
        </div>
      </div>
      <ThankYou
        emailData={emailData}
        setDataUser={setDataUser}
        setEmailData={setEmailData}
        setShowFindForm={setShowFindForm}
        setShowThankYou={setShowThankYou}
        clientId={clientId}
        typData={typData}
        showThankYou={showThankYou}
        setShowMainContainer={setShowMainContainer}
        colors={colors}
      />
    </div>
  );
};
export default MainForm;
