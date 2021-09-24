import React, { useState, useEffect } from "react";
import Users from "./components/users";
import API from "./api";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    return (
        <div>
            {users && (
                <Users
                    onHandleToggleBookMark={handleToggleBookMark}
                    onHandleDelete={handleDelete}
                    users={users}
                />
            )}
        </div>
    );
};

export default App;
