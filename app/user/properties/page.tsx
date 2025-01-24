import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PropertiesTable from "./_components/PropertiesTable";

const PAGE_SIZE = 10;

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const PropertiesPage = async ({ searchParams }: Props) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const pageNum = searchParams.pagenum ?? 0;

  const propertiesPromise = prisma.property.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      type: true,
      status: true,
    },
    skip: +pageNum * PAGE_SIZE,
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

  return (
    <PropertiesTable
      properties={properties}
      totalPages={totalPages}
      currentPage={+pageNum}
    />
  );
};

export default PropertiesPage;
