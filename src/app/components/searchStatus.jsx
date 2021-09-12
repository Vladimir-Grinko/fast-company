import React from 'react';

const SearchStatus = ({ length }) => {
    if (length > 4 || length === 1)
      return (
        <span className="badge bg-primary m-2 fs-4">
          {length} человек тусанет с тобой сегодня
        </span>
      );
    if (length < 5 && length > 1)
      return (
        <span className="badge bg-primary m-2 fs-4">
          {length} человека тусанут с тобой сегодня
        </span>
      );
    if (length === 0)
      return(
      <span className="badge bg-danger text-white m-2 fs-4">Никто с тобой не тусанет</span>      
    )
};

export default SearchStatus;


