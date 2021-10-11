import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
