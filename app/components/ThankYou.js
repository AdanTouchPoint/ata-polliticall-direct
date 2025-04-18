import React from "react";
import Image from "next/image";
import citizenLogo from "../assets/images/citizen.png";

const ThankYou = ({
  showThankYou,
  setShowFindForm,
  setShowThankYou,
  typData,
  setShowMainContainer,
  colors
}) => {
  const click = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setShowFindForm(false);
    setShowMainContainer(false);
  };
  return (
    <div hidden={showThankYou} className={"container typ-container"}>      
        <div className="typ-content">
          <h3 className="typ-message">
            {typData.data?.docs[0]
              ? typData.data?.docs[0].thankYouMessage
              : typData.thankYouMessage}
          </h3>
          <h5 className="second-typ-message">
            {typData.data?.docs[0]
              ? typData.data?.docs[0].secondThankYouMessage
              : typData.secondThankYouMessage}
          </h5>
          
          <h5 className="share-text">
            {typData.data?.docs[0]
              ? typData.data?.docs[0].shareLabel
              : typData.shareLabel}
          </h5>
          <span
            id="repeatButton-typView"
            onClick={click}
            className="capitalize-style link-simulation do-again-btn"
          >
            Contact More Politicians!
          </span>
          <div className="logo-container">
          <Image width={250} src={citizenLogo} alt="citizen go logo" />
        </div>
        </div>
    </div>
  );
};

export default ThankYou;