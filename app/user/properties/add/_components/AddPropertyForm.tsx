"use client";

import React, { useState } from "react";
import Stepper from "./Stepper";
import Basic from "./Basic";
import {
  Prisma,
  PropertyImage,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";
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
import { editProperty, saveProperty } from "@/lib/actions/property";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
  const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(
    props.property?.images ?? []
  );

  const [step, setStep] = useState(4);

  const { user } = useKindeBrowserClient();

  const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
    const imageUrls = await uploadImages(images);

    try {
      if (user?.id) {
        if (isEdit && props.property) {
          const deletedImageIDs = props.property?.images
            .filter((item) => !savedImagesUrl.includes(item))
            .map((item) => item.id);

          await editProperty(
            props.property?.id,
            data,
            imageUrls,
            deletedImageIDs
          );

          toast.success("Property Updated!");
        } else {
          await saveProperty(data, imageUrls, user.id);
          toast.success("Property Added!");
        }
      } else {
        console.error("User ID is undefined");
      }
    } catch (err) {
      console.error({ err });
    } finally {
      router.push("/user/properties");
    }
  };

  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      <FormProvider {...methods}>
        <form className="mt-3 p-2" onSubmit={methods.handleSubmit(onSubmit)}>
          <Basic
            className={step !== 0 ? "hidden" : ""}
            next={() => setStep((prev) => prev + 1)}
            types={props.types}
            statuses={props.statuses}
          />
          <Location
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={step !== 1 ? "hidden" : ""}
          />
          <Features
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={step !== 2 ? "hidden" : ""}
          />
          <Picture
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={step !== 3 ? "hidden" : ""}
            images={images}
            setImages={setImages}
            {...(!!props.property && {
              savedImagesUrl: savedImagesUrl,
              setSavedImagesUrl: setSavedImagesUrl,
            })}
          />
          <Contact
            prev={() => setStep((prev) => prev - 1)}
            className={step !== 4 ? "hidden" : ""}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddPropertyForm;
