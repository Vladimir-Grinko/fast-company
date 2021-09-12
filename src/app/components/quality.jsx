import React from "react";

const Quality = ({ name, color }) => {
    const dopStyle = {
        color: '#ffffff',
        borderRadius: '4px',
        padding: '3px 5px',
        margin: '3px',
    };
  return (
    <span
      className ={`badge bg-${color}`}
      style={dopStyle}
    >
    {name}
    </span>
  )
};

export default Quality;
