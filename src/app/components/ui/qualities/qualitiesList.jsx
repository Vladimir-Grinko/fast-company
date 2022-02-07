import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualityForUser } = useQualities();
    const qualityForUser = getQualityForUser(qualities);

    if (!isLoading) {
        return (
            <>
                {qualityForUser.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </>
        );
    } else return "Loading....";
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
