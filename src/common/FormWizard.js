import { useState, useEffect, Children } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

import ButtonLink from "./ButtonLink";

const FormWizard = ({
  initialValues,
  children,
  onSubmit,
  goToPage,
  setGoToPage,
  externalPage,
  setExternalPage,
  disableBackButton,
}) => {
  const filteredChildren = children.filter((child) => child !== undefined);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  useEffect(() => {
    if (goToPage !== null) {
      setPage(goToPage);
    }
  }, [goToPage]);

  useEffect(() => {
    if (externalPage) {
      setPage(externalPage);
    }
  }, [externalPage]);

  const next = (values) => {
    if (goToPage) {
      setPage(filteredChildren.length - 1);
      setGoToPage(null);
    } else {
      setPage(Math.min(page + 1, filteredChildren.length - 1));
    }
    setExternalPage(null);
    setValues(values);
  };

  const previous = (e) => {
    if (goToPage) {
      setGoToPage(null);
    }
    e.target.blur();
    setExternalPage(null);
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
      // If we're on the TransportQuestion page and the user answered "no",
      // navigate directly to the outside WMCA page instead of advancing the wizard.
      const active = Children.toArray(filteredChildren)[page];
      const activeName = active?.type?.name || "";
      if (
        activeName === "TransportQuestion" &&
        values?.difficultToUsePublicTransport === "no"
      ) {
        navigate("/registration/dontneedtoregister");
        return;
      }

      next(values);
    }
  };

  const activePage = Children.toArray(filteredChildren)[page];
  const isLastPage = page === Children.count(filteredChildren) - 1;

  return (
    <>
      <div className="wmnds-col-1 wmnds-col-md-2-3">
        <div className="wmnds-col-1 wmnds-m-b-md">
          {page > 0 && (
            <ButtonLink
              callback={previous}
              disabled={disableBackButton ? true : undefined}
            >{`< Back`}</ButtonLink>
          )}
        </div>
      </div>
      <div className="wmnds-p-lg wmnds-bg-white">
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
                {!isLastPage && !activePage.props.hideSubmit && (
                  <button
                    type="submit"
                    className="wmnds-btn"
                    onClick={(e) => e.target.blur()}
                  >
                    Continue
                  </button>
                )}
                {isLastPage && !activePage.props.hideSubmit && (
                  <button
                    className={`wmnds-btn wmnds-btn--start ${
                      submitting ? "wmnds-btn--disabled" : null
                    }`}
                    type="submit"
                    disabled={submitting ? "disabled" : undefined}
                  >
                    Accept and send
                    <svg className="wmnds-btn__icon wmnds-btn__icon--right ">
                      <use
                        xlinkHref="#wmnds-general-chevron-right"
                        href="#wmnds-general-chevron-right"
                      ></use>
                    </svg>
                    {submitting ? (
                      <div
                        className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
                        role="alert"
                        aria-live="assertive"
                      >
                        <p className="wmnds-loader__content"></p>
                      </div>
                    ) : null}
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
  externalPage: PropTypes.number,
  setExternalPage: PropTypes.func,
  disableBackButton: PropTypes.bool,
};

FormWizard.defaultProps = {
  initialValues: {},
  children: [],
  goToPage: null,
  setGoToPage: () => {},
  setExternalPage: () => {},
};

export default FormWizard;
