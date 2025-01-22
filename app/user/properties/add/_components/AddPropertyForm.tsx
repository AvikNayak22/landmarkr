"use client";

import React, { useState } from "react";
import Stepper from "./Stepper";
import Basic from "./Basic";
import { PropertyStatus, PropertyType } from "@prisma/client";
import { cn } from "@heroui/react";
import Location from "./Location";
import Features from "./Features";
import Picture from "./Picture";
import Contact from "./Contact";

const steps = [
  {
    label: "Basic",
  },
  {
    label: "Location",
  },
  {
    label: "Features",
  },
  {
    label: "Pictures",
  },
  {
    label: "Contact",
  },
];

interface Props {
  types: PropertyType[];
  statuses: PropertyStatus[];
}

const AddPropertyForm = (props: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [step, setStep] = useState(0);

  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      <form className="mt-3 p-2">
        <Basic
          className={cn({ hidden: step !== 0 })}
          next={() => setStep((prev) => prev + 1)}
          types={props.types}
          statuses={props.statuses}
        />
        <Location
          next={() => setStep((prev) => prev + 1)}
          prev={() => setStep((prev) => prev - 1)}
          className={cn({ hidden: step !== 1 })}
        />
        <Features
          next={() => setStep((prev) => prev + 1)}
          prev={() => setStep((prev) => prev - 1)}
          className={cn({ hidden: step !== 2 })}
        />
        <Picture
          next={() => setStep((prev) => prev + 1)}
          prev={() => setStep((prev) => prev - 1)}
          className={cn({ hidden: step !== 3 })}
          images={images}
          setImages={setImages}
        />
        <Contact
          prev={() => setStep((prev) => prev - 1)}
          className={cn({ hidden: step !== 4 })}
        />
      </form>
    </div>
  );
};

export default AddPropertyForm;
