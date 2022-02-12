import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/user.service";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        if (error) {
            const { message } = error.response.data;
            setError(message);
            setLoading(false);
        }
    }

    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : <h1>Users Loading......</h1>}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
