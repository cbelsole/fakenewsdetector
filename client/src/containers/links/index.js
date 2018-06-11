import React from "react";
import PropTypes from "prop-types";
import Link from "../link";

export default class Links extends React.Component {
  render() {
    const { title, links } = this.props;

    if (links.length === 0) {
      return null;
    }

    return (
      <div>
        <p>{title}:</p>
        <table>
          <thead />
          <tbody>{links.map((url, i) => <Link key={i} url={url} />)}</tbody>
        </table>
      </div>
    );
  }
}

Links.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
};
