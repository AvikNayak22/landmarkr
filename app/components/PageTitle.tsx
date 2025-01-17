import React from "react";

interface Props {
  title?: string;
  href?: string;
  linkCaption?: string;
}

const PageTitle = (props: Props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

export default PageTitle;
