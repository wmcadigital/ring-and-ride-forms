import { Form } from "react-final-form";
import PropTypes from "prop-types";

const FormWrapper = ({ children }) => (
  <Form onSubmit={() => {}}>{() => <form>{children}</form>}</Form>
);

FormWrapper.propTypes = {
  children: PropTypes.element,
};

export default FormWrapper;
