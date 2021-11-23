import React, { useState, useEffect } from "react";
import Pagination from "../../pagination";
import { paginate } from "../../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../groupList";
import API from "../../../../api";
import SearchStatus from "../../../ui/searchStatus";
import UserTable from "../../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchUser, setSearchUser] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;

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

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchUser]);

    const handleProfessionSelect = (item) => {
        if (searchUser !== "") setSearchUser("");
        setSelectedProf(item);
    };

    const handleSearchUser = ({ target }) => {
        setSelectedProf(undefined);
        setSearchUser(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = searchUser
            ? users.filter(
                (user) =>
                    user.name
                        .toUpperCase()
                        .indexOf(searchUser.toUpperCase()) !== -1
            )
            : selectedProf
                ? users.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                )
                : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-dark mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        className="w-100 my-2"
                        type="text"
                        name="searchUser"
                        placeholder="Search...."
                        value={searchUser}
                        onChange={handleSearchUser}
                    />
                    {count > 0 && (
                        <div className="d-flex flex-column">
                            <UserTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onHandleDelete={handleDelete}
                                onHandleToggleBookMark={handleToggleBookMark}
                            />
                        </div>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading......";
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
UsersListPage.propTypes = {
    users: PropTypes.array.isRequired
};

export default UsersListPage;