import FileInput from "@/app/components/FileUpload";
import React from "react";
import PictureCard from "./PictureCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PropertyImage } from "@prisma/client";

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
  images: File[];
  setImages: (images: File[]) => void;
  savedImagesUrl?: PropertyImage[];
  setSavedImagesUrl?: (propertyImages: PropertyImage[]) => void;
}

const Picture = (props: Props) => {
  return (
    <div className={`p-3 ${props.className}`}>
      <FileInput
        onSelect={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setImages([...e.target.files!, ...props.images])
        }
      />
      <div className="flex gap-3 flex-wrap mt-4">
        {props.savedImagesUrl &&
          props.setSavedImagesUrl &&
          props.savedImagesUrl.map((image, index) => {
            return (
              <PictureCard
                key={image.id}
                src={image.url}
                index={index}
                onDelete={() =>
                  props.setSavedImagesUrl &&
                  props.setSavedImagesUrl(
                    props.savedImagesUrl!.filter((img) => img.id !== image.id)
                  )
                }
              />
            );
          })}

        {props.images.map((image, index) => {
          const srcUrl = URL.createObjectURL(image);

          return (
            <PictureCard
              key={srcUrl}
              src={srcUrl}
              index={index}
              onDelete={(i) =>
                props.setImages([
                  ...props.images.slice(0, i),
                  ...props.images.slice(i + 1),
                ])
              }
            />
          );
        })}
      </div>

      <div className="flex justify-center col-span-2 gap-3 mt-3">
        <button
          className="flex items-center justify-center w-36 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onClick={props.prev}
        >
          <FaChevronLeft className="w-6 h-6" />
          Previous
        </button>
        <button
          className="flex items-center justify-center w-36 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onClick={props.next}
        >
          Next
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Picture;
