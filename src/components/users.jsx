import React, { useState } from "react";
import API from "../api";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  };

  const dopStyle = {
    color: '#ffffff',
    borderRadius: '4px',
    padding: '3px 5px',
    margin: '3px',
  };

  const renderPhrase = () => {
    if (users.length > 4 || users.length === 1)
      return (
        <span className="badge bg-primary">
          {users.length} человек тусанет с тобой сегодня
        </span>
      );
    if (users.length < 5 && users.length > 1)
      return (
        <span className="badge bg-primary">
          {users.length} человека тусанут с тобой сегодня
        </span>
      );
    if (users.length === 0)
      return(
      <span className="badge bg-danger text-white">Никто с тобой не тусанет</span>      
    )
  };

  const renderTable = () => {
    if(users.length !== 0) return(
      <table className ="table">
      <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился раз</th>
        <th scope="col">Оценка</th>
        <th scope="col"></th>
      </tr>
      </thead>  
      <tbody>
        
        {users.map((user) => {
        return(
        <tr key = {user._id}>
          <td>{user.name}</td>
          <td>
            {user.qualities.map((quality) => {
              return(
                <span class = {`badge bg-${quality.color}`}
                key = {quality._id}
                style = {dopStyle}
                >
                  {quality.name}
                </span>
              )
            })}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}/5</td>
          <td>
            <button
              onClick = {() => handleDelete(user._id)} 
              className = 'btn bg-danger btn-sm'
              style = {dopStyle}
              >
              Delete
            </button>
          </td>
        </tr>
      );
    })
    }
    </tbody>
  </table>
  )
  };

  return (
  <>
    <h2>{renderPhrase()}</h2>
    {renderTable()}  
  </> 
  )
};

export default Users;
