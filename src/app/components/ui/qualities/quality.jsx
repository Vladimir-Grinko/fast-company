import React from "react";
import PropTypes from "prop-types";

const Quality = ({ name, color }) => {
    const dopStyle = {
        color: "#ffffff",
        borderRadius: "4px",
        padding: "3px 5px",
        margin: "3px"
    };
    return (
        <span className={`badge bg-${color}`} style={dopStyle}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Quality;
