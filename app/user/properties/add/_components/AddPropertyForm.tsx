"use client";

import React, { useState } from "react";
import {
  Prisma,
  PropertyImage,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";
import Stepper from "./Stepper";
import Location from "./Location";
import Features from "./Features";
import Picture from "./Picture";
import Contact from "./Contact";
import Basic from "./Basic";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AddPropertyFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImages } from "@/lib/upload";
import { editProperty, saveProperty } from "@/lib/actions/property";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Define the steps for the property addition form
const steps = [
  { label: "Basic" },
  { label: "Location" },
  { label: "Features" },
  { label: "Pictures" },
  { label: "Contact" },
];

// Interface for component props
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

// Type inference for form input using Zod schema
export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyForm = ({ isEdit = false, ...props }: Props) => {
  // Initialize router for navigation
  const router = useRouter();

  // Set up form methods with Zod validation and default values
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

  // State for managing images and form steps
  const [images, setImages] = useState<File[]>([]);
  const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(
    props.property?.images ?? []
  );
  const [step, setStep] = useState(0);

  // Get current user information
  const { user } = useKindeBrowserClient();

  // Form submission handler
  const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
    // Upload images to storage
    const imageUrls = await uploadImages(images);
    try {
      // Handle property edit or creation
      if (isEdit && props.property) {
        // Identify images to be deleted
        const deletedImageIDs = props.property.images
          .filter((item) => !savedImagesUrl.includes(item))
          .map((item) => item.id);

        // Edit existing property
        await editProperty(props.property.id, data, imageUrls, deletedImageIDs);
        toast.success("Property Updated!");
      } else {
        // Save new property
        await saveProperty(data, imageUrls, user?.id as string);
        toast.success("Property Added!");
      }
    } catch (error) {
      // Handle submission errors
      console.error({ error });
      toast.error("Something went wrong!");
    } finally {
      // Navigate back to properties list
      router.push("/user/properties");
    }
  };

  return (
    <div>
      {/* Stepper component to show current form step */}
      <Stepper
        className="m-2"
        items={steps}
        activeItem={step}
        setActiveItem={setStep}
      />
      {/* Form provider for react-hook-form */}
      <FormProvider {...methods}>
        <form className="mt-3 p-2" onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Conditional rendering of form steps */}
          {step === 0 && (
            <Basic
              next={() => setStep((prev) => prev + 1)}
              types={props.types}
              statuses={props.statuses}
            />
          )}
          {step === 1 && (
            <Location
              next={() => setStep((prev) => prev + 1)}
              prev={() => setStep((prev) => prev - 1)}
            />
          )}
          {step === 2 && (
            <Features
              next={() => setStep((prev) => prev + 1)}
              prev={() => setStep((prev) => prev - 1)}
            />
          )}
          {step === 3 && (
            <Picture
              next={() => setStep((prev) => prev + 1)}
              prev={() => setStep((prev) => prev - 1)}
              images={images}
              setImages={setImages}
              savedImagesUrl={savedImagesUrl}
              setSavedImagesUrl={setSavedImagesUrl}
            />
          )}
          {step === 4 && <Contact prev={() => setStep((prev) => prev - 1)} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default AddPropertyForm;
