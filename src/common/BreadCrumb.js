import PropTypes from "prop-types";

const BreadCrumb = ({ currentPageName }) => (
  <nav aria-label="Main example breadcrumbs" className="wmrards-breadcrumb">
    <ol className="wmrards-breadcrumb__list">
      <li className="wmrards-breadcrumb__list-item">
        <a href="https://dev-wmca.euwest01.umbraco.io/ring-and-ride/" className="wmrards-breadcrumb__link">
          Home
        </a>
      </li>
      <li className="wmrards-breadcrumb__list-item">
        <a
          href="#"
          className="wmrards-breadcrumb__link wmrards-breadcrumb__link--current"
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
