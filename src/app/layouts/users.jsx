import React from "react";
import UserPage from "../components/common/page/userPage";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/common/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
