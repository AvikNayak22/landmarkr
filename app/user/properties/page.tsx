import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PropertiesTable from "./_components/PropertiesTable";

const PAGE_SIZE = 10;

interface Props {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const PropertiesPage = async ({ searchParams }: Props) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const pageNum = (await searchParams).pagenum ?? 0;

  const propertiesPromise = prisma.property.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      type: true,
      status: true,
    },
    skip: Number(pageNum) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPropertiesPromise = prisma.property.count({
    where: {
      userId: user?.id,
    },
  });

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);

  const totalPages = Math.floor(totalProperties / PAGE_SIZE);

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-2">No Properties Found</h2>
        <p className="text-gray-600">
          You haven&apos;t added any properties yet.
        </p>
      </div>
    );
  }

  return (
    <PropertiesTable
      properties={properties}
      totalPages={totalPages}
      currentPage={Number(pageNum)}
    />
  );
};

export default PropertiesPage;
