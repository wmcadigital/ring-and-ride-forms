import { Form } from "react-final-form";
import PropTypes from "prop-types";

const FormWrapper = ({ initialValues, mutators, children }) => (
  <Form onSubmit={() => {}} initialValues={initialValues} mutators={mutators}>
    {() => <form>{children}</form>}
  </Form>
);

FormWrapper.propTypes = {
  initialValues: PropTypes.object,
  mutators: PropTypes.object,
  children: PropTypes.node,
};

export default FormWrapper;
