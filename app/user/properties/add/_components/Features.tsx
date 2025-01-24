import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button, Card, Checkbox, cn, Input } from "@heroui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}

const Features = (props: Props) => {
  const {
    register,
    formState: { errors },
    control,
    trigger,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (
      await trigger([
        "propertyFeature.bedrooms",
        "propertyFeature.bathrooms",
        "propertyFeature.parkingSpots",
        "propertyFeature.area",
      ])
    )
      props.next();
  };

  return (
    <Card
      className={cn(
        "p-2 grid grid-cols-1 md:grid-cols-2 gap-3",
        props.className
      )}
    >
      <Input
        {...register("propertyFeature.bedrooms")}
        errorMessage={errors.propertyFeature?.bedrooms?.message}
        isInvalid={!!errors.propertyFeature?.bedrooms}
        label="Bedrooms"
      />
      <Input
        {...register("propertyFeature.bathrooms")}
        errorMessage={errors.propertyFeature?.bathrooms?.message}
        isInvalid={!!errors.propertyFeature?.bathrooms}
        label="Bathrooms"
      />
      <Input
        {...register("propertyFeature.parkingSpots")}
        errorMessage={errors.propertyFeature?.parkingSpots?.message}
        isInvalid={!!errors.propertyFeature?.parkingSpots}
        label="Parking Spots"
      />
      <Input
        {...register("propertyFeature.area")}
        errorMessage={errors.propertyFeature?.area?.message}
        isInvalid={!!errors.propertyFeature?.area}
        label="Area"
      />
      <div className="flex items-center justify-between">
        <Controller
          control={control}
          name="propertyFeature.hasSwimmingPool"
          render={({ field }) => (
            <Checkbox onChange={field.onChange} onBlur={field.onBlur}>
              Has Swimming Pool
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name="propertyFeature.hasGardenYard"
          render={({ field }) => (
            <Checkbox onChange={field.onChange} onBlur={field.onBlur}>
              Has Garden/Yard
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name="propertyFeature.hasBalcony"
          render={({ field }) => (
            <Checkbox onChange={field.onChange} onBlur={field.onBlur}>
              Has Balcony
            </Checkbox>
          )}
        />
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
