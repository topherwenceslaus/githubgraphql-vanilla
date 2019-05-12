import React from "react";

export const Issues = ({ issues }) => {
  return (
    <ul>
      {issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>
        </li>
      ))}
    </ul>
  );
};
