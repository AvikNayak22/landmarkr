import prisma from "@/lib/prisma";
import PropertyCard from "./components/PropertyCard";
import PropertyContainer from "./components/PropertyContainer";
import Search from "./components/Search";
import { TbHomeCancel } from "react-icons/tb";

const PAGE_SIZE = 6;

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
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
            <TbHomeCancel className="h-24 w-24 text-gray-400 mb-4" />

            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-3">
              No Properties Found
            </h2>
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
