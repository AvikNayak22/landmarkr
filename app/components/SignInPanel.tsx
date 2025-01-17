"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import {
  useKindeBrowserClient,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { User } from "@prisma/client";
import UserProfilePanel from "./UserProfilePanel";

const SignInPanel = () => {
  const { isAuthenticated, getUser } = useKindeBrowserClient();
  const [dbUser, setDbUser] = useState<User | null>(null);

  const user = getUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const response = await fetch("/api/fetch-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.id }),
          });
          if (response.ok) {
            const userData = await response.json();
            setDbUser(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, user?.id]);

  if (isAuthenticated) {
    return <>{dbUser! && <UserProfilePanel user={dbUser} />}</>;
  }

  return (
    <div className="flex gap-3">
      <Button color="primary">
        <LoginLink>Sign In</LoginLink>
      </Button>
      <Button color="primary">
        <RegisterLink>Sign Up</RegisterLink>
      </Button>
    </div>
  );
};

export default SignInPanel;
