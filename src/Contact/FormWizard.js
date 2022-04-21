import { useState, useEffect, Children } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";

const FormWizard = ({
  initialValues,
  children,
  onSubmit,
  goToPage,
  setGoToPage,
}) => {
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (goToPage !== null) {
      setPage(goToPage);
    }
  }, [goToPage]);

  const next = (values) => {
    setPage(Math.min(page + 1, children.length - 1));
    setValues(values);
    setGoToPage(null);
  };

  const previous = (e) => {
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
    const isLastPage = page === Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      next(values);
    }
  };

  const activePage = Children.toArray(children)[page];
  const isLastPage = page === Children.count(children) - 1;

  return (
    <>
      <div className="wmrards-col-1 wmrards-col-md-2-3">
        <div className="wmrards-col-1 wmrards-m-b-md">
          {page > 0 && (
            <button
              type="button"
              onClick={previous}
              className="wmrards-btn wmrards-btn--link"
            >
              {`< Back`}
            </button>
          )}
        </div>
      </div>
      <div className="wmrards-p-lg wmrards-bg-white">
        <Form
          initialValues={values}
          onSubmit={handleSubmit}
          validate={validate}
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
};

export default FormWizard;
