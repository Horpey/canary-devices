import React from "react";
import METADATA from "../../constants/metadata";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string.isRequired,
};
const defaultProps = {
  title: "",
};
const Meta = (props) => {
  // const { title } = props;

  return (
    <>
      <meta name="description" content={METADATA.APP_DESCRIPTION} />
      <meta content={METADATA.KEY_WORDS} name="keywords" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={METADATA.APP_NAME} />
      <meta property="og:description" content={METADATA.APP_DESCRIPTION} />
      <meta property="og:locale" content="en_EN" />
      <meta property="og:url" content={METADATA.WEB_URL} />
    </>
  );
};

Meta.propTypes = propTypes;

Meta.defaultProps = defaultProps;

export default Meta;
