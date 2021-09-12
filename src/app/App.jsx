import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  
  const handleToggleBookMark = (id) => {
    const classBookMark = document.getElementById(id);
    if (classBookMark.className === "bi bi-bookmark") {
      classBookMark.className = "bi bi-bookmark-fill" ;
    } else {
      classBookMark.className = "bi bi-bookmark"
    }
  };
  return(
    <>
        <SearchStatus length = {users.length}/>
        <Users
          onHandleToggleBookMark = {handleToggleBookMark}
          onHandleDelete = {handleDelete}
          users={users}
          length = {users.length}
        />
    </> 
  );
};

export default App;
