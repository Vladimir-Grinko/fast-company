import React from "react";
import UserPage from "../components/common/page/userPage";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/common/page/usersListPage";
import UserPageEdit from "../components/common/page/userPageEdit/userPageEdit";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            <UserProvider>
                {userId
                    ? (
                        edit
                            ? (
                                <UserPageEdit />
                            )
                            : (
                                <UserPage userId={userId} />
                            )
                    )
                    : (
                        <UsersListPage />
                    )}
            </UserProvider>
        </>
    );
};

export default Users;
