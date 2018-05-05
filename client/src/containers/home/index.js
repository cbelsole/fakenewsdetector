import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import "./index.css";
import { createArticle } from "../../modules/article";
import Spinner from "../spinner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderStats = this.renderStats.bind(this);
    this.renderError = this.renderError.bind(this);
  }
  state = {
    url: ""
  };

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    const { url } = this.state;
    event.preventDefault();
    event.stopPropagation();
    this.props.createArticle(url);
  }

  renderStats() {
    const { article } = this.props;

    return (
      <div>
        <h2>Here's what we found</h2>
        <p>
          This article was written by:{" "}
          <strong>
            <a href="https://www.google.com/search?q=Faith+Karimi">
              A journalist
            </a>
          </strong>
        </p>
        <p>
          This website belongs to the corporation:{" "}
          <strong>Turner Broadcasting</strong>{" "}
        </p>
        <p>Here are a few sources we found in the article:</p>
        {article.good.map((url, i) => {
          return (
            <p key={i}>
              <a href={url}>{url}</a> <button>Not a source</button>
            </p>
          );
        })}
      </div>
    );
  }

  renderError() {
    const { error } = this.props;

    return (
      <div>
        <h2>Sorry, it looks like we encountered an error.</h2>
        {/* <p>{error}</p> */}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the fake news detector.</h1>
        </header>
        <div>
          <p className="App-intro">{this.state.response}</p>
          <p className="App-intro">
            How real is the article you are looking at?
          </p>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} />
            <button type="submit">Submit </button>
          </form>
        </div>
        {this.props.article && this.renderStats()}
        {this.props.articleLoading && <Spinner />}
        {this.props.error && this.renderError()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.article.article,
    articleLoading: state.article.loading,
    error: state.article.error
  };
};

export default connect(mapStateToProps, { createArticle: createArticle })(Home);
