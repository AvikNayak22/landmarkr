import PageTitle from "@/app/components/PageTitle";
import { getUserById } from "@/lib/actions/user";
import Image from "next/image";
import SectionTitle from "./_components/SectionTitle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ReactNode } from "react";
import UploadAvatar from "./_components/UploadAvatar";

const ProfilePage = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const dbUser = await getUserById(user ? user.id : "");

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageTitle title="My Profile" linkCaption="Back to Home Page" href="/" />
      <div className="mx-2 mt-4 p-6 bg-white rounded-xl shadow-lg flex flex-col gap-6">
        <SectionTitle title="Basic Information" />
        <div className="flex justify-center md:justify-start">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-slate-200 shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src={dbUser?.avatarUrl ?? "/profile.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <UploadAvatar userId={dbUser?.id ?? ""} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Attribute
            title="Name"
            value={`${dbUser?.firstName} ${dbUser?.lastName}`}
          />
          <Attribute title="Email" value={dbUser?.email} />
          <Attribute
            title="Registered On"
            value={dbUser?.createdAt.toLocaleDateString()}
          />
          <Attribute title="Properties Posted" value={1} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className="flex flex-col text-sm p-4 bg-gray-100 rounded-lg shadow-sm">
      <span className="text-slate-800 font-semibold">{title}</span>
      <span className="text-slate-600">{value}</span>
    </div>
  );
};
