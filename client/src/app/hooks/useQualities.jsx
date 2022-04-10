import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [allQualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.fetchAll();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    return (
        <QualitiesContext.Provider value={{ allQualities, isLoading }}>
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
