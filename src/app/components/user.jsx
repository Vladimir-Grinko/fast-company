import React from 'react';
import Quality from './quality';
import BookMark from './bookmark';

const User = ({ _id, name, profession, completedMeetings, rate, onHandleDelete, qualities, onHandleToggleBookMark, valueStatus }) => {
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
          <button>
              <BookMark
              onClick = {() => onHandleToggleBookMark(_id)}
              id = {_id}
              />
            </button>
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
