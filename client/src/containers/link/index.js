import React from "react";

export default function Links(props) {
  const { url } = props;

  return (
    <tr>
      <td>
        <a href={url} target="_blank">
          {url}
        </a>
      </td>
      <td>
        <button>Not a source</button>
        <button>Follow this link</button>
      </td>
    </tr>
  );
}
