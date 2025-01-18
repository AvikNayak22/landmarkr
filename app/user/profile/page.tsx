"use client";

import PageTitle from "@/app/components/PageTitle";
import { getUserById } from "@/lib/actions/user";
import { Avatar, Card } from "@heroui/react";
import SectionTitle from "./_components/SectionTitle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ReactNode, useEffect, useState } from "react";
import { User } from "@prisma/client";
import UploadAvatar from "./_components/UploadAvatar";

const ProfilePage = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [dbUser, setDbUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userData = await getUserById(user.id);
        setDbUser(userData);
      }
    };
    fetchUser();
  }, [user]);

  return (
    <div>
      <PageTitle title="My Profile" linkCaption="Back to homepage" href="/" />
      <Card className="m-4 p-4 ">
        <SectionTitle title="Basic Information" />
        <div className="flex">
          <div className="flex flex-col items-center justify-start">
            <Avatar
              className="w-20 h-20 "
              src={dbUser?.avatarUrl ?? "/profile.png"}
            />
            <UploadAvatar userId={dbUser?.id ?? ""} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Attribute
            title="Name"
            value={`${dbUser?.firstName} ${dbUser?.lastName}`}
          />
          <Attribute title="Email" value={`${dbUser?.email}`} />
          <Attribute
            title="Registered On"
            value={`${dbUser?.createdAt?.toLocaleDateString()}`}
          />
          <Attribute title="Properties posted" value={1} />
        </div>
      </Card>
    </div>
  );
};
export default ProfilePage;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className="flex flex-col text-sm">
      <span className="text-slate-800 font-semibold">{title}</span>
      <span className="text-slate-600 ">{value}</span>
    </div>
  );
};
