const WMCA_COUNTY = "WEST MIDLANDS";

const checkInsideWmca = (addresses) =>
  addresses[0].county.trim().toUpperCase() === WMCA_COUNTY;

export default checkInsideWmca;
