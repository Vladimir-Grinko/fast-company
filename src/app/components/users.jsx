import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";

const Users = ({ users: allUsers, length, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return length > 0
        ? (
            <>
                {professions && (
                    <>
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button className="btn btn-dark mt-2" onClick={clearFilter}>
                        Очистить
                        </button>
                    </>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersCrop.map((user) => (
                            <User key={user._id} {...user} {...rest} />
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={length}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </>
        )
        : (
            <></>
        );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    length: PropTypes.number.isRequired
};

export default Users;
