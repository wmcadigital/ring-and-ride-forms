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
        <div className="wmnds-bg-white wmnds-p-t-md wmnds-p-b-md wmnds-cookies-banner">
          <div className="wmnds-container">
            <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-2-3">
              <h3>Your privacy settings</h3>
              <p>
                We use cookies to help you with journey planning and relevant
                disruptions, remember your login and show you content you might
                be interested in. If you&apos;re happy with the use of cookies
                by West Midlands Combined Authority and our selected partners,
                click &apos;Accept all cookies&apos;. Or click &apos;Manage
                cookies&apos; to learn more.
              </p>
              <div className="wmnds-grid wmnds-grid--justify-between wmnds-cookies-banner__group-buttons">
                <button
                  className="wmnds-btn wmnds-col-1 wmnds-col-sm-1 wmnds-col-md-12-24  wmnds-cookies-banner__accept-all-cookies wmnds-text-align-center"
                  type="button"
                >
                  Accept all cookies
                </button>
                <a
                  href="https://www.tfwm.org.uk/manage-cookies/"
                  title="link title"
                  target="_self"
                  className="wmnds-btn wmnds-btn wmnds-col-1 wmnds-col-sm-1 wmnds-col-md-12-24 wmnds-text-align-center"
                >
                  Manage Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="wmnds-header">
          <div className="wmnds-container wmnds-grid wmnds-grid--align-center wmnds-grid--justify-between">
            <div className="wmnds-header__vertical-align wmnds-col-auto">
              <a
                className="wmnds-header__logo-link"
                href="https://ringandride.org/"
                title="Ring and Ride"
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
