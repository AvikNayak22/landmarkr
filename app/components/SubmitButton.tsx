"use client";

import { Button, ButtonProps } from "@heroui/react";
import { useFormStatus } from "react-dom";

const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending} isLoading={pending}>
      Delete
    </Button>
  );
};

export default SubmitButton;
