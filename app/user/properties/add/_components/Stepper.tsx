import React from "react";

interface Props {
  items: { label: string }[];
  activeItem: number;
  setActiveItem: (index: number) => void;
  className?: string;
}

const Stepper = ({ items, activeItem, setActiveItem, className }: Props) => {
  return (
    <div className={`flex items-center justify-around ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full w-6 h-6 flex justify-center items-center transition cursor-pointer 
                ${index === activeItem ? "bg-emerald-500 text-white" : ""} 
                ${index > activeItem ? "bg-gray-400 text-white" : ""} 
                ${index < activeItem ? "bg-emerald-700 text-white" : ""}
              `}
              onClick={() => index < activeItem && setActiveItem(index)}
            >
              {index + 1}
            </div>
            <p>{item.label}</p>
          </div>

          {index !== items.length - 1 && (
            <div
              className={`border h-0 w-full -mt-5 relative 
                after:absolute after:left-0 after:top-0 after:border 
                after:transition-all after:duration-300 after:ease-in
                ${
                  index < activeItem
                    ? "after:w-full after:border-emerald-500"
                    : "after:w-0"
                }
              `}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
