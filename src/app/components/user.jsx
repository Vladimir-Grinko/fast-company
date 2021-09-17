import React from 'react';
import Quality from './quality';
import BookMark from './bookmark';

const User = ({ _id, name, profession, completedMeetings, rate, bookmark, onHandleDelete, qualities, onHandleToggleBookMark }) => {
    return (  
        <tr >
          <td>{name}</td>
          <td>
          {qualities.map((quality) => (
                  <Quality
                  key={quality._id}
                  {...quality}
                  />
          ))}          
          </td>
          <td>{profession.name}</td>
          <td>{completedMeetings}</td>
          <td>{rate}/5</td>
          <td>
              <BookMark
              onClick = {() => onHandleToggleBookMark(_id)}
              status={bookmark}
              />
          </td>
          <td>
            <button
              onClick = {() => onHandleDelete(_id)} 
              className = 'btn bg-danger btn-sm text-white'
              >
              Delete
            </button>
          </td>
        </tr>
    );
}
 
export default User;
