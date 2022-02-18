import React, { useState, useEffect } from "react";
import Pagination from "../../pagination";
import { paginate } from "../../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../groupList";
import SearchStatus from "../../../ui/searchStatus";
import UserTable from "../../../ui/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsIoadingStatus
} from "../../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../../store/users";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchUser, setSearchUser] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;

    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsIoadingStatus());

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchUser]);

    const handleProfessionSelect = (item) => {
        if (searchUser !== "") setSearchUser("");
        setSelectedProf(item._id);
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

    function filterUsers(data) {
        const filteredUsers = searchUser
            ? data.filter(
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
            : data;
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button className="btn btn-dark mt-2" onClick={clearFilter}>
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
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
