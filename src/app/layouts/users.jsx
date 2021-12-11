import React from "react";
import UserPage from "../components/common/page/userPage";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/common/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <>
            {userId
                ? (
                    <div className="container">
                        <div className="row gutters-sm">
                            <UserPage userId={userId} />{" "}
                        </div>
                    </div>
                )
                : (
                    <UsersListPage />
                )}
        </>
    );
};

export default Users;
