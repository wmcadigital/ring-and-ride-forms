import { useState, useEffect, Children } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";

import ButtonLink from "./ButtonLink";

const FormWizard = ({
  initialValues,
  children,
  onSubmit,
  goToPage,
  setGoToPage,
}) => {
  const filteredChildren = children.filter((child) => child !== undefined);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (goToPage !== null) {
      setPage(goToPage);
    }
  }, [goToPage]);

  const next = (values) => {
    if (goToPage) {
      setPage(filteredChildren.length - 1);
      setGoToPage(null);
    } else {
      setPage(Math.min(page + 1, filteredChildren.length - 1));
    }
    setValues(values);
  };

  const previous = (e) => {
    if (goToPage) {
      setGoToPage(null);
    }
    e.target.blur();
    setPage(Math.max(page - 1, 0));
  };

  const validate = (values) => {
    if (activePage.props.validate) {
      return activePage.props.validate(values);
    }
    return {};
  };

  const handleSubmit = (values) => {
    const isLastPage = page === Children.count(filteredChildren) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      next(values);
    }
  };

  const activePage = Children.toArray(filteredChildren)[page];
  const isLastPage = page === Children.count(filteredChildren) - 1;

  return (
    <>
      <div className="wmrards-col-1 wmrards-col-md-2-3">
        <div className="wmrards-col-1 wmrards-m-b-md">
          {page > 0 && <ButtonLink callback={previous}>{`< Back`}</ButtonLink>}
        </div>
      </div>
      <div className="wmrards-p-lg wmrards-bg-white">
        <Form
          initialValues={values}
          onSubmit={handleSubmit}
          validate={validate}
          mutators={{
            setFormAttribute: (
              [fieldName, fieldVal],
              state,
              { changeValue }
            ) => {
              changeValue(state, fieldName, () => fieldVal);
            },
          }}
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              {activePage}
              <div>
                {!isLastPage && (
                  <button
                    type="submit"
                    className="wmrards-btn"
                    onClick={(e) => e.target.blur()}
                  >
                    Continue
                  </button>
                )}
                {isLastPage && (
                  <button
                    className="wmrards-btn wmrards-btn--start"
                    type="submit"
                    disabled={submitting}
                  >
                    Accept and send
                    <svg className="wmrards-btn__icon wmrards-btn__icon--right ">
                      <use
                        xlinkHref="#wmrards-general-chevron-right"
                        href="#wmrards-general-chevron-right"
                      ></use>
                    </svg>
                  </button>
                )}
              </div>

              <div style={{ marginTop: "5rem", display: "none" }}>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </div>
            </form>
          )}
        </Form>
      </div>
    </>
  );
};

FormWizard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  children: PropTypes.array,
  goToPage: PropTypes.number,
  setGoToPage: PropTypes.func,
};

FormWizard.defaultProps = {
  initialValues: {},
  children: [],
  goToPage: null,
  setGoToPage: () => {},
};

export default FormWizard;
