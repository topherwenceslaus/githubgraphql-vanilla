import React from "react";

class Form extends React.Component {
  state = {
    path: "the-road-to-learn-react/the-road-to-learn-react"
  };
  submit = e => {
    this.props.onSubmit(this.state.path);
    e.preventDefault();
    return false;
  };

  onChange = e => {
    const value = e.target.value;
    this.setState({ path: value });
  };
  render() {
    const { path } = this.state;
    return (
      <div>
        <form onSubmit={this.submit}>
          <input
            id="url"
            type="text"
            value={path}
            style={{ width: "300px" }}
            onChange={this.onChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Form;
