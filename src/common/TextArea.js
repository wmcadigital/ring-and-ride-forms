import { Field } from "react-final-form";
import PropTypes from "prop-types";

const TextArea = ({ fieldName, validation }) => (
  <Field name={fieldName} validate={validation}>
    {({ input }) => <textarea {...input} className="wmrards-fe-textarea" />}
  </Field>
);

TextArea.propTypes = {
  fieldName: PropTypes.string.isRequired,
  validation: PropTypes.func,
};

export default TextArea;
