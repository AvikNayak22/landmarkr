import prisma from "@/lib/prisma";
import PropertyCard from "./components/PropertyCard";
import PropertyContainer from "./components/PropertyContainer";

export default async function Home() {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      images: {
        select: {
          url: true,
        },
      },
      location: {
        select: {
          city: true,
          state: true,
        },
      },
    },
  });

  return (
    <div>
      <PropertyContainer>
        {properties.map((propertyItem) => (
          <PropertyCard key={propertyItem.id} property={propertyItem} />
        ))}
      </PropertyContainer>
    </div>
  );
}
