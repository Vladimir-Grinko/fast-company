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

    console.log(allQualities);

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

    function getQualityForUser(qualitiesForUser) {
        const endQualities = [];
        for (const qualForUser of qualitiesForUser) {
            for (const qualOfAll of allQualities) {
                if (qualOfAll._id === qualForUser) {
                    endQualities.push(qualOfAll);
                }
            }
        }

        return endQualities;
    }

    function errorCatcher(error) {
        const { message } = error.responce.data;
        setError(message);
        setLoading(false);
    }

    return (
        <QualitiesContext.Provider
            value={{ isLoading, getQualityForUser }}
        >
            { children }
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
