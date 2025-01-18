"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  useDisclosure,
} from "@heroui/react";

import { PencilIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import FileInput from "@/app/components/FileUpload";
import { uploadAvatar } from "@/lib/upload";
import { updateUserAvatar } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div>
      <Button variant="light" onPress={onOpen}>
        <PencilIcon className="w-6 text-slate-400 hover:text-primary transition-colors" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Avatar
              </ModalHeader>
              <ModalBody>
                <FileInput
                  onChange={(e) => setImage((e as any).target.files[0])}
                />
                {image && (
                  <Image src={URL.createObjectURL(image)} alt="image preview" />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  color="primary"
                  onPress={async () => {
                    setIsSubmitting(true);

                    if (!image) {
                      onClose();
                      return;
                    }

                    const avatarUrl = await uploadAvatar(image);

                    const result = await updateUserAvatar(avatarUrl, userId);

                    router.refresh();

                    setIsSubmitting(false);

                    onClose();
                  }}
                >
                  Change Avatar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UploadAvatar;
