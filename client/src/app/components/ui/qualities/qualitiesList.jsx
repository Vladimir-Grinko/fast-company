import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    getQualitiesById,
    getQualitiesIoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    const isLoading = useSelector(getQualitiesIoadingStatus());

    const qualitiesList = useSelector(getQualitiesById(qualities));

    if (isLoading) return "Loading....";

    return (
        <>
            {qualitiesList.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
