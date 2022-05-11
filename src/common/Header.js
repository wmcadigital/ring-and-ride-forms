import PropTypes from "prop-types";

const Header = ({ heading }) => {
  return (
    <>
      <a
        href="#wmrards-main-content"
        title="Skip to main content"
        target="_self"
        className="wmrards-link wmrards-header__skip-link"
      >
        Skip to main content
      </a>
      <header>
        <div className="wmrards-bg-white wmrards-p-t-md wmrards-p-b-md wmrards-cookies-banner">
          <div className="wmrards-container">
            <div className="wmrards-col-1 wmrards-col-md-3-4 wmrards-col-lg-2-3">
              <h3>Your privacy settings</h3>
              <p>
                We use cookies to help you with journey planning and relevant
                disruptions, remember your login and show you content you might
                be interested in. If you&apos;re happy with the use of cookies
                by West Midlands Combined Authority and our selected partners,
                click &apos;Accept all cookies&apos;. Or click &apos;Manage
                cookies&apos; to learn more.
              </p>
              <div className="wmrards-grid wmrards-grid--justify-between wmrards-cookies-banner__group-buttons">
                <button
                  className="wmrards-btn wmrards-col-1 wmrards-col-sm-1 wmrards-col-md-12-24  wmrards-cookies-banner__accept-all-cookies wmrards-text-align-center"
                  type="button"
                >
                  Accept all cookies
                </button>
                <a
                  href="https://www.tfwm.org.uk/manage-cookies/"
                  title="link title"
                  target="_self"
                  className="wmrards-btn wmrards-btn wmrards-col-1 wmrards-col-sm-1 wmrards-col-md-12-24 wmrards-text-align-center"
                >
                  Manage Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="wmrards-header">
          <div className="wmrards-container wmrards-grid wmrards-grid--align-center wmrards-grid--justify-between">
            <div className="wmrards-header__vertical-align wmrards-col-auto">
              <a
                className="wmrards-header__logo-link"
                href="/"
                title="Transport for West Midlands Design System"
              >
                <img
                  className="wmrards-header__logo"
                  alt="Transport for West Midlands logo"
                  src="https://cloudcdn.wmca.org.uk/staging/rarassets/1.0.0/img/logo.svg"
                />
              </a>
            </div>
            <h1 className="wmrards-header__title wmrards-col-1 wmrards-col-sm-auto">
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
