import React from "react";
import { Issues } from "./Issues";
export const Repository = ({ repository, fetchmore, onStarRepository }) => {
  return (
    <div>
      <div>
        <strong>In Repository:</strong>
        <a href={repository.url}>{repository.name}</a>
        <button
          type="button"
          onClick={() =>
            onStarRepository(repository.id, repository.viewerHasStarred)
          }
        >
          {repository.viewerHasStarred ? "Unstar" : "Star"}
        </button>
        <h1>Issues</h1>
        <Issues issues={repository.issues} />
        {repository.issues.pageInfo.hasNextPage && (
          <button type="button" onClick={fetchmore}>
            Fetch more
          </button>
        )}
      </div>
    </div>
  );
};
