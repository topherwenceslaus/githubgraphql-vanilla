import React from "react";

export const Organization = ({ organization, errors }) => {
  if (errors) {
    return <div>{errors.map(error => error.message).join(" ")}</div>;
  }
  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
    </div>
  );
};
