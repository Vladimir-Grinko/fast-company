import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import BookMark from "../common/bookmark";
import Qualities from "../ui/qualities";
import Table from "../common/table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onHandleToggleBookMark,
    onHandleDelete
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    onClick={() => onHandleToggleBookMark(user._id)}
                    status={user.bookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onHandleDelete(user._id)}
                    className="btn bg-danger btn-sm text-white"
                >
                    Delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
        // <Table>(РАБОТАЮТ ОБА МЕТОДА ВЫВОДА ТАБЛИЦЫ, ЧТОБЫ ИСПОЛЬЗОВАТЬ ЗАКОММЕНТИРОВАННЫЙ, НЕ ЗАБУДЬ РАСКОММЕНТИРОВАТЬ ИМПОРТЫ)
        // <TableHeader {...{ onSort, selectedSort, columns }} />
        // <TableBody {...{ columns, data: users }} />
        // </Table>
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onHandleToggleBookMark: PropTypes.func.isRequired,
    onHandleDelete: PropTypes.func.isRequired
};

export default UserTable;
