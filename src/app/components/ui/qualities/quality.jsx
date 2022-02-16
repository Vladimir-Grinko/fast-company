import React from "react";
import PropTypes from "prop-types";

const Quality = ({ _id, name, color }) => {
    const dopStyle = {
        color: "#ffffff",
        borderRadius: "4px",
        padding: "3px 5px",
        margin: "3px"
    };
    return (
        <span className={`badge bg-${color}`} key={_id} style={dopStyle}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Quality;
