import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

function File({ file }) {
  return (
    <a className="File" href={file.url}>
      <FileIcon
        extension={file.type}
        {...defaultStyles[file.type]}
        className="icon"
      />
      <span>{file.name}</span>
    </a>
  );
}

export default File;
