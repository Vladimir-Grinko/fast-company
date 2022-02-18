import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Comments from "../../../ui/comments";
import UserCard from "../../../ui/userCard";
import QualitiesCard from "../../../ui/qualitiesCard";
import MeetingsCard from "../../../ui/meetingsCard";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsIoadingStatus
} from "../../../../store/professions";
import { getUserById } from "../../../../store/users";

const UserPage = ({ userId }) => {
    const history = useHistory();

    const user = useSelector(getUserById(userId));
    const isLoading = useSelector(getProfessionsIoadingStatus());
    const profession = useSelector(getProfessionById(user.profession));

    const handleAllUsers = () => {
        history.push("/users");
    };

    if (!user && isLoading) {
        return "Loading......";
    }
    return (
        <div className="container">
            <div className="row gutters-sm">
                <button
                    className="btn btn-primary m-3 w-100"
                    onClick={() => handleAllUsers()}
                >
                    Все пользователи
                    <i className="bi bi-people ms-2"></i>
                </button>

                <div className="col-md-4 mb-3">
                    <UserCard user={user} profession={profession.name} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingsCard value={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
