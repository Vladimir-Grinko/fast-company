import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../../../../api";
import PropTypes from "prop-types";
import Qualities from "../../../ui/qualities";
import Comments from "../../comments/comments";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    localStorage.setItem("selectedUser", JSON.stringify(user));

    const handleAllUsers = () => {
        history.push("/users");
    };

    if (!user) {
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
                    <div className="card mb-3">
                        <div className="card-body">
                            <Link to={"/users/" + userId + "/edit"}>
                                <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                    <i className="bi bi-gear"></i>
                                </button>
                            </Link>
                            <div className="d-flex flex-column align-items-center text-center position-relative">
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle shadow-1-strong me-3"
                                    alt="avatar"
                                    width="150"
                                    height="150"
                                />
                                <div className="mt-3">
                                    <h4>
                                        {user.name}
                                        <i className="bi bi-check-square ms-2"></i>
                                    </h4>
                                    <h5 className="text-secondary mb-1">
                                        {user.profession.name}
                                    </h5>
                                    <div className="text-muted">
                                        <p className="text-danger mb-1">
                                            Оценка
                                            <i className="bi bi-graph-up ms-2"></i>
                                        </p>
                                        <i
                                            className="bi bi-caret-down-fill text-primary"
                                            role="button"
                                        ></i>
                                        <span className="ms-2">
                                            {user.rate}
                                        </span>
                                        <i
                                            className="bi bi-caret-up text-secondary ms-2"
                                            role="button"
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className=" card-body d-flex flex-column justify-content-center text-center">
                            <h5 className="card-title">
                                <span>Качества</span>
                            </h5>
                            <p className="card-text">
                                <Qualities qualities={user.qualities} />
                            </p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body d-flex flex-column justify-content-center text-center">
                            <h5 className="card-title">
                                <span>Встретился раз</span>
                            </h5>

                            <h1 className="display-1">
                                {user.completedMeetings}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <Comments userId={userId} />
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
