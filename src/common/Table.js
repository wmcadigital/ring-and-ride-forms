import PropTypes from "prop-types";

const Table = ({ children }) => (
  <table className="wmrards-table wmrards-m-b-xl wmrards-table--without-header">
    <tbody>{children}</tbody>
  </table>
);

Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
