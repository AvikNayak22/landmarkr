import { use } from "react";
import { deleteProperty } from "@/lib/actions/property";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const ModalDeletePropertyPage = ({ params }: Props) => {
  const router = useRouter();
  const { id } = use(params); // Resolves the Promise to get the id
  const [isOpen, setIsOpen] = useState(true);

  const handleCancel = () => {
    setIsOpen(false);
    router.push("/user/properties");
  };

  const handleDelete = async () => {
    try {
      await deleteProperty(Number(id));
      setIsOpen(false);
      router.push("/user/properties");
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-xl font-semibold mb-4">Delete Property</div>
        <div className="mb-6">
          <p>Are you sure you want to delete this Property?</p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletePropertyPage;
