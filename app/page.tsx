import prisma from "@/lib/prisma";
import PropertyCard from "./components/PropertyCard";
import PropertyContainer from "./components/PropertyContainer";

const PAGE_SIZE = 10;

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Home({ searchParams }: Props) {
  const pagenum = searchParams.pagenum ?? 0;

  const propertiesPromise = prisma.property.findMany({
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
    skip: +pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPropertiesPromise = prisma.property.count();

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);

  const totalPages = Math.floor(totalProperties / PAGE_SIZE);

  return (
    <div>
      <PropertyContainer totalPages={totalPages} currentPage={+pagenum}>
        {properties.map((propertyItem) => (
          <PropertyCard key={propertyItem.id} property={propertyItem} />
        ))}
      </PropertyContainer>
    </div>
  );
}
