import Header from "../common/Header";
import BreadCrumb from "../common/BreadCrumb";
import FormContentWrapper from "../common/FormContentWrapper";
import ConfirmationPanel from "../common/ConfirmationPanel";
import Question from "../common/Question";
import CustomerServiceDetails from "../common/CustomerServiceDetails";

const Confirmation = () => (
  <>
    <Header heading="Book a Ring and Ride journey" />
    <FormContentWrapper>
      <BreadCrumb currentPageName="Booking" />
      <ConfirmationPanel header="We've received your form" />
      <Question text="What happens next" />
      <p>
        You&apos;ll receive an email to confirm that we have received your 
        booking request.
      </p>
      <p>
        Journey requests need to be received by 2.30pm on the day prior to your preferred journey. 
        We will then email you to confirm your booking by 4pm that day.
      </p>
      <Question text="Give us a call" />
      <CustomerServiceDetails />
    </FormContentWrapper>
  </>
);

export default Confirmation;
