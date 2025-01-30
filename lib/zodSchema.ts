import { z } from "zod";
import validator from "validator";

export const AddPropertyFormSchema = z.object({
  name: z.string().min(1, "Please Enter The Name"),
  description: z.string().min(2, "Enter the description"),
  typeId: z.number().min(1, "Select the type of your property"),
  statusId: z.number().min(1, "Select the status of your property"),
  price: z.number().min(1, "Enter the price"),
  location: z.object({
    streetAddress: z.string().min(1, "Enter the street address"),
    city: z.string().min(1, "Enter the city name"),
    state: z.string().min(1, "Enter the state name"),
    zip: z
      .string()
      .refine(
        (data) => validator.isPostalCode(data, "IN"),
        "Please Enter a valid zip code"
      ),
    region: z.string().min(1, "Enter the region"),
    landmark: z.string().min(1, "Enter the landmark"),
  }),
  propertyFeature: z.object({
    bedrooms: z.number().min(1, "Please enter number of the bedrooms"),
    bathrooms: z.number().min(1, "Please enter number of the bathrooms"),
    parkingSpots: z.number().min(1, "Please enter number of parking spots"),
    area: z.number().min(1, "Please enter the area"),
    hasSwimmingPool: z.boolean(),
    hasGardenYard: z.boolean(),
    hasBalcony: z.boolean(),
  }),
  contact: z.object({
    name: z.string().min(1, "Please enter the contact name"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    email: z.string().email(),
  }),
});
