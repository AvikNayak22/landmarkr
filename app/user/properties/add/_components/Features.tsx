import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button, Card, Checkbox, cn, Input } from "@heroui/react";
import React from "react";

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}

const Features = (props: Props) => {
  const handleNext = () => props.next();

  return (
    <Card
      className={cn(
        "p-2 grid grid-cols-1 md:grid-cols-2 gap-3",
        props.className
      )}
    >
      <Input label="Bedrooms" />
      <Input label="Bathrooms" />
      <Input label="Parking Spots" />
      <Input label="Area" />
      <div className="flex items-center justify-between">
        <Checkbox>Has Swimming Pool</Checkbox>
        <Checkbox>Has Garden/Yard</Checkbox>
        <Checkbox>Has Balcony</Checkbox>
      </div>

      <div className="flex justify-center col-span-2 gap-3">
        <Button
          startContent={<ChevronLeftIcon className="w-6" />}
          color="primary"
          className="w-36"
          onClick={props.prev}
        >
          Previous
        </Button>
        <Button
          endContent={<ChevronRightIcon className="w-6" />}
          color="primary"
          className="w-36"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default Features;
