import React from "react";
import "./App.css";
import { githubClient } from "./axios";
import Form from "./Form";
import { Organization } from "./Organization";
import { Repository } from "./Repository";
import {
  ADD_STAR,
  REMOVE_STAR,
  GET_ISSUES_OF_REPOSITORY_REACTIONS,
  getIssuesOfRepositoryQuery
} from "./Queries";

const addStarToRepository = repositoryId => {
  return githubClient.post("", {
    query: ADD_STAR,
    variables: { repositoryId }
  });
};

const removeStar = repositoryId => {
  return githubClient.post("", {
    query: REMOVE_STAR,
    variables: { repositoryId }
  });
};

const resolveAddStarMutation = mutationResult => state => {
  const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;
  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred
      }
    }
  };
};

const resolveRemoveStarMutation = mutationResult => state => {
  const { viewerHasStarred } = mutationResult.data.data.removeStar.starrable;
  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred
      }
    }
  };
};

class App extends React.Component {
  state = {
    organization: null,
    errors: null,
    path: "the-road-to-learn-react/the-road-to-learn-react"
  };
  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }
  onSubmit = path => {
    console.log(path);
    this.setState({ path }, () => {
      this.onFetchFromGitHub(this.state.path);
    });
  };
  onFetchFromGitHub(path, cursor) {
    const [organization, repository] = path.split("/");
    // const query = getIssuesOfRepositoryQuery(organization, repository);
    githubClient
      .post("", {
        query: GET_ISSUES_OF_REPOSITORY_REACTIONS,
        variables: { organization, repository, cursor }
      })
      .then(result => {
        console.log(result);
        this.setState({
          organization: result.data.data.organization,
          errors: result.data.errors
        });
      });
  }
  fetchmore = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;
    this.onFetchFromGitHub(this.state.path, endCursor);
  };

  onStarRepository = (id, isStarred) => {
    if (isStarred) {
      removeStar(id).then(mutationResult =>
        this.setState(resolveRemoveStarMutation(mutationResult))
      );
    } else {
      addStarToRepository(id).then(mutationResult =>
        this.setState(resolveAddStarMutation(mutationResult))
      );
    }
  };
  render() {
    const { organization, errors } = this.state;
    return (
      <div className="App">
        <Form onSubmit={this.onSubmit} />
        {organization ? (
          <div>
            <Organization organization={organization} errors={errors} />
            <Repository
              repository={organization.repository}
              fetchmore={this.fetchmore}
              onStarRepository={this.onStarRepository}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
