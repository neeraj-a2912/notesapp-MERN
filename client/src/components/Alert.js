import React from "react";

export default function Alert(props) {
  return (
    <div className="alert">
      <p>{props.message}</p>
    </div>
  );
}
