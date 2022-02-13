import React from "react";
import UserPage from "../components/common/page/userPage";
import { useParams, Redirect } from "react-router-dom";
import UsersListPage from "../components/common/page/usersListPage";
import UserPageEdit from "../components/common/page/userPageEdit/userPageEdit";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const { currentUser } = useAuth();
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <UserPageEdit />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
