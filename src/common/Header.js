import PropTypes from "prop-types";

const Header = ({ heading }) => {
  return (
    <>
      <a
        href="#wmnds-main-content"
        title="Skip to main content"
        target="_self"
        className="wmnds-link wmnds-header__skip-link"
      >
        Skip to main content
      </a>
      <header>
        <div className="wmnds-header">
          <div className="wmnds-container wmnds-grid wmnds-grid--align-center wmnds-grid--justify-between">
            <div className="wmnds-header__vertical-align wmnds-col-auto">
              <a
                className="wmnds-header__logo-link"
                href="https://www.tfwm.org.uk/plan-your-journey/ways-to-travel/buses-in-the-west-midlands/on-demand-buses-in-the-west-midlands/"
                title="West Midlands Bus on Demand"
              >
                <img
                  className="wmnds-header__logo"
                  alt="Transport for West Midlands logo"
                  src="https://cloudcdn.wmca.org.uk/staging/rarassets/1.0.0/img/logo.svg"
                />
              </a>
            </div>
            <h1 className="wmnds-header__title wmnds-col-1 wmnds-col-sm-auto">
              {heading}
            </h1>
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  heading: PropTypes.string,
};

export default Header;
