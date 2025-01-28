"use client";

import { deleteProperty } from "@/lib/actions/property";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

const ModalDeletePropertyPage = ({ params }: Props) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleCancel = () => {
    router.push("/user/properties");
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProperty(+params.id);
      router.push("/user/properties");
      setIsOpen(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleCancel}>
      <ModalContent>
        <ModalHeader>Delete Property</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Property?</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete} color="danger" variant="light">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeletePropertyPage;
