import { TrashIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  index: number;
  onDelete: (index: number) => void;
}

const PictureCard = ({ src, onDelete, index }: Props) => {
  return (
    <div className="flex flex-col items-center border border-gray-200 p-4 rounded-md shadow-md">
      <div className="w-36 h-36 relative">
        <Image src={src} className="object-contain" alt="Property Image" fill />
      </div>

      <button className="mt-2" onClick={() => onDelete(index)}>
        <TrashIcon className="text-red-500 w-6 h-6" />
      </button>
    </div>
  );
};

export default PictureCard;
