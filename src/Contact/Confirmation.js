import Header from "../common/Header";
import BreadCrumb from "../common/BreadCrumb";
import FormContentWrapper from "../common/FormContentWrapper";
import ConfirmationPanel from "../common/ConfirmationPanel";
import Question from "../common/Question";
import CustomerServiceDetails from "../common/CustomerServiceDetails";

const Confirmation = () => (
  <>
    <Header heading="Contact us" />
    <FormContentWrapper>
      <BreadCrumb currentPageName="Contact us" />
      <ConfirmationPanel header="We've received your enquiry" />
      <Question text="What happens next" />
      <p>Thank you for contacting West Midlands Bus on Demand.</p>
      <p>
        We will acknowledge your query and keep you updated on progress until it
        is resolved.
      </p>
      <p>
        Our Customer Services Centre aim to respond to enquiries within 10
        working days. However, there may be occasions where this takes longer,
        as we may need to liase with a third party.
      </p>
      <p>
        If you have not received a response within 10 working days, please
        contact our Customer Services team.
      </p>
      <Question text="Give us a call" />
      <CustomerServiceDetails />
    </FormContentWrapper>
  </>
);

export default Confirmation;
