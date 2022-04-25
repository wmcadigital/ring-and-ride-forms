import { useState } from "react";
import FormWizard from "../common/FormWizard";
import EnquiryTypeQuery from "./EnquiryTypeQuery";
import EnquiryDetail from "./EnquiryDetail";
import CheckAnswers from "./CheckAnswers";
import NameEntry from "./NameEntry";
import RegistrationNoEntry from "./RegistrationNoEntry";
import ContactPreferenceEntry from "./ContactPreferenceEntry";
import { validateContactPreferences, validateCheckAnswers } from "./validation";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const ContactForm = () => {
  const [goToPage, setGoToPage] = useState(null);

  return (
    <FormWizard
      onSubmit={onSubmit}
      goToPage={goToPage}
      setGoToPage={setGoToPage}
    >
      <EnquiryTypeQuery />
      <EnquiryDetail />
      <NameEntry />
      <RegistrationNoEntry />
      <ContactPreferenceEntry validate={validateContactPreferences} />
      <CheckAnswers setGoToPage={setGoToPage} validate={validateCheckAnswers} />
    </FormWizard>
  );
};

export default ContactForm;
