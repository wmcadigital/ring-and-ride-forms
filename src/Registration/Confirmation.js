import Header from "../common/Header";
import BreadCrumb from "../common/BreadCrumb";
import FormContentWrapper from "../common/FormContentWrapper";
import ConfirmationPanel from "../common/ConfirmationPanel";
import Question from "../common/Question";
import CustomerServiceDetails from "../common/CustomerServiceDetails";

const Confirmation = () => (
  <>
    <Header heading="Register for the Ring and Ride service" />
    <FormContentWrapper>
      <BreadCrumb currentPageName="Register" />
      <ConfirmationPanel header="We've received your form" />
      <Question text="What happens next" />
      <p>
        You&apos;ll receive an email to confirm that we have received your
        registration form.
      </p>
      <p>
        It can take up to 2 days to process a registration form. It may take
        longer if we need more information from you.
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
