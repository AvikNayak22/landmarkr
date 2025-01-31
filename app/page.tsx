import prisma from "@/lib/prisma";
import PropertyCard from "./components/PropertyCard";
import PropertyContainer from "./components/PropertyContainer";
import Search from "./components/Search";

const PAGE_SIZE = 8;

interface Props {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const pagenum = (await searchParams).pagenum ?? 0;

  const query = (await searchParams).query ?? "";

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
    ...(query && {
      where: {
        name: {
          contains: String(query),
        },
      },
    }),
    skip: Number(pagenum) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPropertiesPromise = prisma.property.count({
    ...(query && {
      where: {
        name: {
          contains: String(query),
        },
      },
    }),
  });

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);

  const totalPages = Math.floor(totalProperties / PAGE_SIZE);

  return (
    <div>
      <Search />
      <PropertyContainer totalPages={totalPages} currentPage={Number(pagenum)}>
        {properties.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-semibold mb-2">No Properties Found</h2>
          </div>
        ) : (
          properties.map((propertyItem) => (
            <PropertyCard key={propertyItem.id} property={propertyItem} />
          ))
        )}
      </PropertyContainer>
    </div>
  );
}
