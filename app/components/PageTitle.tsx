import Link from "next/link";
import React from "react";

interface Props {
  title?: string;
  href?: string;
  linkCaption?: string;
}

const PageTitle = (props: Props) => {
  return (
    <div className="p-6 bg-gradient-to-br from-teal-500 to-cyan-600 flex justify-between items-center shadow-md">
      <h1 className="text-white text-2xl font-semibold">{props.title}</h1>
      {props.href && (
        <Link
          className="text-white text-lg font-medium hover:underline transition-colors duration-200 ease-in-out"
          href={props.href}
        >
          {props.linkCaption}
        </Link>
      )}
    </div>
  );
};

export default PageTitle;
