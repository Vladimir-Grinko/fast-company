import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../api";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log(user);
    const handleAllUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h1>
                        Имя:<b>{user.name}</b>
                    </h1>
                </div>

                <p>
                    <b>Профессия:</b>{user.profession.name}
                </p>
                <p>
                    <b>Качества:</b><QualitiesList qualities= {user.qualities} />
                </p>
                <p>
                    <b>Встретился раз:</b>{user.completedMeetings}
                </p>
                <p>
                    <b>Оценка:</b>{user.rate}
                </p>
                <button
                    className="btn btn-primary m-3"
                    onClick={() => handleAllUsers()}
                >
                    Все пользователи
                </button>
            </>
        );
    } else {
        return "Loading......";
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
