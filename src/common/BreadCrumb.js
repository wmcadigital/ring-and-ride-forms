import PropTypes from "prop-types";

const BreadCrumb = ({ currentPageName }) => (
  <nav aria-label="Main example breadcrumbs" className="wmnds-breadcrumb">
    <ol className="wmnds-breadcrumb__list">
      <li className="wmnds-breadcrumb__list-item">
        <a href="https://www.tfwm.org.uk/plan-your-journey/ways-to-travel/buses-in-the-west-midlands/on-demand-buses-in-the-west-midlands/" className="wmnds-breadcrumb__link">
          Home
        </a>
      </li>
      <li className="wmnds-breadcrumb__list-item">
        <a
          href="#"
          className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
          aria-current="page"
        >
          {currentPageName}
        </a>
      </li>
    </ol>
  </nav>
);

BreadCrumb.propTypes = {
  currentPageName: PropTypes.string,
};

export default BreadCrumb;
