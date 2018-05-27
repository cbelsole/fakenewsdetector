import React from "react";

export default function Links(props) {
  const { url } = props;

  return (
    <p>
      <a href={url} target="_blank">
        {url}
      </a>{" "}
      <button>Not a source</button>
    </p>
  );
}
