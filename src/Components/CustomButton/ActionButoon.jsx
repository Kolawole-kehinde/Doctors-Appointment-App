
import React from "react";

const ActionButton = ({ type = "button", text, className }) => (
  <button type={type} className={`px-6 py-2 rounded ${className} transition`}>
    {text}
  </button>
);

export default ActionButton;
