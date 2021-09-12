import React from 'react';

const Bookmark = ({ status, ...rest }) => {
    
    return (          
        <i className = "bi bi-bookmark"
        {...rest}
        >
        </i>
    );
}
 
export default Bookmark;
