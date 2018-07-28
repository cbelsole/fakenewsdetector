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
    this.author = this.author.bind(this);
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
  author() {
    const {
      article: { authors }
    } = this.props;

    if (!authors.length) {
      return null;
    }

    return (
      <div>
        Written by:{" "}
        {authors.reduce((accum, author) => {
          const url = `https://www.google.com/search?q=${author
            .split(" ")
            .join("+")}`;

          if (accum.length === 0) {
            accum.push(
              <p key={author}>
                <a href={url} target="_blank">
                  {author}
                </a>
              </p>
            );
          } else {
            accum.push(
              <p key={author}>
                <a href={url} target="_blank">
                  {author}
                </a>
              </p>
            );
          }

          return accum;
        }, [])}
      </div>
    );
  }
  renderStats() {
    const {
      links: { good, corps },
      corporation,
      title
    } = this.props.article;

    return (
      <div>
        <h2>{title}</h2>
        <div>
          <div className={styles.leftSection}>
            {this.author()}
            {corporation && (
              <div>
                <p> Under the umbrella of: </p>
                <p>
                  <a href={corporation.info} target="_blank">
                    {corporation.name}
                  </a>
                </p>
              </div>
            )}
          </div>
          <div className={styles.rightSection}>
            <Links title="Outside Sources" links={good} />
            <Links title="Corporate Sources" links={corps} />
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  { createArticle: createArticle }
)(Home);
