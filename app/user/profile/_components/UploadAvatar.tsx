"use client";

import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import FileInput from "@/app/components/FileUpload";
import { uploadAvatar } from "@/lib/upload";
import { updateUserAvatar } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UploadAvatar = ({ userId }: { userId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!image) {
      handleClose();
      return;
    }

    const avatarUrl = await uploadAvatar(image);
    await updateUserAvatar(avatarUrl, userId);
    router.refresh();
    setIsSubmitting(false);
    handleClose();
  };

  return (
    <div>
      <button className="p-2 rounded-md hover:bg-gray-100" onClick={handleOpen}>
        <MdModeEdit
          size={24}
          className="w-6 text-slate-400 hover:text-teal-500 transition-colors"
        />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Upload Avatar</h2>

              <div className="space-y-4">
                <FileInput
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.files?.[0])
                  }
                />
                {image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="image preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Change Avatar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
