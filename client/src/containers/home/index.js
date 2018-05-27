import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import styles from "./index.css";
import { createArticle } from "../../modules/article";
import Spinner from "../spinner";
import Links from "../Links";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderStats = this.renderStats.bind(this);
    this.renderError = this.renderError.bind(this);
    this.authorURL = this.authorURL.bind(this);
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
  authorURL() {
    const {
      article: { author }
    } = this.props;

    return `https://www.google.com/search?q=${author.split(" ").join("+")}`;
  }
  renderStats() {
    const { article } = this.props;

    return (
      <div>
        <h2>Here's what we found</h2>
        <p>
          This article was written by:{" "}
          <strong>
            <a href={this.authorURL()} target="_blank">
              {article.author}
            </a>
          </strong>
        </p>
        <p>
          This website belongs to the corporation:{" "}
          <strong>Turner Broadcasting</strong>{" "}
        </p>
        <Links
          title="These are the outside sources we found in the article"
          links={article.good}
        />
        <Links
          title="These are the sources we found from the same corporation"
          links={article.corps}
        />
      </div>
    );
  }

  renderError() {
    const { error } = this.props;

    return (
      <div>
        <h2>Sorry, it looks like we encountered an error.</h2>
        <p>{error}</p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1 className={styles.appTitle}>
            Welcome to the fake news detector.
          </h1>
        </header>
        <div>
          <p className={styles.appIntro}>{this.state.response}</p>
          <p className={styles.appIntro}>
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
