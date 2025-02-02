import Link from "next/link";
import React from "react";

interface Props {
  title?: string;
  href?: string;
  linkCaption?: string;
}

const PageTitle = (props: Props) => {
  return (
    <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 flex justify-between items-center shadow-md">
      <h1 className="text-white text-xl md:text-2xl font-semibold">
        {props.title}
      </h1>
      {props.href && (
        <button className="px-4 py-2.5 bg-white text-emerald-600 rounded-lg font-medium shadow-sm hover:bg-emerald-50 transition-colors duration-200">
          <Link href={props.href}>{props.linkCaption}</Link>
        </button>
      )}
    </div>
  );
};

export default PageTitle;
