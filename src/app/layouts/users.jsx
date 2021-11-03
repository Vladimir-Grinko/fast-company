import React from "react";
import UserPage from "../components/userPage";
import { useParams } from "react-router-dom";
import UsersList from "../components/usersList";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default Users;
