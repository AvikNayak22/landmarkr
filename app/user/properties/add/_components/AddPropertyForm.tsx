"use client";

import React, { useState } from "react";
import Stepper from "./Stepper";
import Basic from "./Basic";
import { Prisma, PropertyStatus, PropertyType } from "@prisma/client";
import { cn } from "@heroui/react";
import Location from "./Location";
import Features from "./Features";
import Picture from "./Picture";
import Contact from "./Contact";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AddPropertyFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImages } from "../../../../../lib/upload";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveProperty } from "@/lib/actions/property";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

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
  property?: Prisma.PropertyGetPayload<{
    include: {
      location: true;
      contact: true;
      feature: true;
      images: true;
    };
  }>;

  isEdit?: boolean;
}

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyForm = ({ isEdit = false, ...props }: Props) => {
  const methods = useForm<AddPropertyInputType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: {
      contact: props.property?.contact ?? undefined,
      location: props.property?.location ?? undefined,
      propertyFeature: props.property?.feature ?? undefined,
      description: props.property?.description ?? undefined,
      name: props.property?.name ?? undefined,
      price: props.property?.price ?? undefined,
      statusId: props.property?.statusId ?? undefined,
      typeId: props.property?.typeId ?? undefined,
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [step, setStep] = useState(0);

  const { user } = useKindeBrowserClient();

  const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
    const imageUrls = await uploadImages(images);

    try {
      if (user?.id) {
        await saveProperty(data, imageUrls, user.id);
        toast.success("Property Added!");
        redirect("/user/properties");
      } else {
        console.error("User ID is undefined");
      }
    } catch (err) {
      console.error({ err });
    }
  };

  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      <FormProvider {...methods}>
        <form className="mt-3 p-2" onSubmit={methods.handleSubmit(onSubmit)}>
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
      </FormProvider>
    </div>
  );
};

export default AddPropertyForm;
