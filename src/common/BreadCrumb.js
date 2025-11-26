import PropTypes from "prop-types";

const BreadCrumb = ({ currentPageName }) => (
  <nav aria-label="Main example breadcrumbs" className="wmnds-breadcrumb">
    <ol className="wmnds-breadcrumb__list">
      <li className="wmnds-breadcrumb__list-item">
        <a href="https://ringandride.org/" className="wmnds-breadcrumb__link">
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
