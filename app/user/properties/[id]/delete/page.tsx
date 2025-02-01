import SubmitButton from "@/app/components/SubmitButton";
import { deleteProperty } from "@/lib/actions/property";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const DeletePropertyPage = async ({ params }: Props) => {
  const { getUser } = getKindeServerSession();

  const { id } = await params;

  const PropertyPromise = prisma.property.findUnique({
    where: {
      id: Number(id),
    },
  });

  const [property, user] = await Promise.all([PropertyPromise, getUser()]);

  if (!property) return notFound();

  if (!user || property.userId !== user.id) redirect("/unauthorized");

  const deleteAction = async () => {
    "use server";

    try {
      await deleteProperty(Number(id));
      redirect("/user/properties");
    } catch (error) {
      throw error;
    }
  };

  return (
    <form
      action={deleteAction}
      className="mt-9 flex flex-col items-center justify-center gap-3"
    >
      <p>Are you sure you want to delete this property?</p>
      <p>
        <span className="text-slate-400 ">Name: </span>{" "}
        <span className="text-slate-700">{property.name}</span>
      </p>
      <div className="flex justify-center gap-3 ">
        <Link href="/user/properties">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Cancel
          </button>
        </Link>
        <SubmitButton
          type="submit"
          color="danger"
          className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
        />
      </div>
    </form>
  );
};

export default DeletePropertyPage;
