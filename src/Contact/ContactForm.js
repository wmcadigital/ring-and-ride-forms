import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormContentWrapper from "../common/FormContentWrapper";
import BreadCrumb from "../common/BreadCrumb";
import FormWizard from "../common/FormWizard";
import EnquiryTypeQuery from "./EnquiryTypeQuery";
import EnquiryDetail from "./EnquiryDetail";
import CheckAnswers from "./CheckAnswers";
import NameEntry from "./NameEntry";
import RegistrationNoEntry from "./RegistrationNoEntry";
import ContactPreferenceEntry from "./ContactPreferenceEntry";
import Header from "../common/Header";
import {
  validateContactPreferences,
  validateCheckAnswers,
  FORM_SUBMIT_ERROR,
} from "../common/validation";
import sendFormData from "../api/sendFormData";

const ContactForm = () => {
  const [goToPage, setGoToPage] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(null);
  const [formSubmitError, setFormSubmitError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setFormSubmitError(null);
      const response = await sendFormData(values, "Ring & Ride Contact Form");
      console.log(response);
      if (response.includes("Version")) {
        navigate("/contactUs/confirmed");
      } else {
        setFormSubmitError(FORM_SUBMIT_ERROR);
      }
    } catch {
      setFormSubmitError(FORM_SUBMIT_ERROR);
    }
  };

  return (
    <>
      <Header heading="Contact us" />
      <FormContentWrapper>
        <BreadCrumb currentPageName="Contact us" />
        <FormWizard
          onSubmit={onSubmit}
          goToPage={goToPage}
          setGoToPage={setGoToPage}
          initialValues={{ formName: "Contact" }}
          disableBackButton={formSubmitting}
        >
          <EnquiryTypeQuery />
          <EnquiryDetail />
          <NameEntry />
          <RegistrationNoEntry />
          <ContactPreferenceEntry validate={validateContactPreferences} />
          <CheckAnswers
            setGoToPage={setGoToPage}
            validate={validateCheckAnswers}
            setFormSubmitting={setFormSubmitting}
            formSubmitError={formSubmitError}
          />
        </FormWizard>
      </FormContentWrapper>
    </>
  );
};

export default ContactForm;
