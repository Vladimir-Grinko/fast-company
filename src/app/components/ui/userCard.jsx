import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const UserCard = ({ user, profession }) => {
    const history = useHistory();

    const { currentUser } = useAuth();
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
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
                            {profession}
                        </h5>
                        <div className="text-muted">
                            <p className="text-danger mb-1">Оценка</p>
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <span className="ms-2">{user.rate}</span>
                            <i
                                className="bi bi-caret-up text-secondary ms-2"
                                role="button"
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object,
    profession: PropTypes.string
};

export default UserCard;
