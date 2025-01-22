import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { Button, Card, cn, Input } from "@heroui/react";
import React from "react";

interface Props {
  prev: () => void;
  className?: string;
}

const Contact = ({ prev, className }: Props) => {
  return (
    <Card
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 p-2", className)}
    >
      <Input label="Contact Name" />
      <Input label="Phone" />
      <Input label="Email" />

      <div className="flex justify-center col-span-3 gap-3">
        <Button
          startContent={<ChevronLeftIcon className="w-6" />}
          color="primary"
          className="w-36"
          onClick={prev}
        >
          Previous
        </Button>
        <Button
          endContent={<PlusCircleIcon className="w-6" />}
          color="secondary"
          className="w-36"
          type="submit"
        >
          Save
        </Button>
      </div>
    </Card>
  );
};

export default Contact;
