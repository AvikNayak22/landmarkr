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
      <div className="mx-2 mt-6 p-8 bg-white border rounded-2xl shadow-md">
        <SectionTitle title="Basic Information" />

        <div className="flex flex-col md:flex-row items-center gap-16 mt-8">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-slate-200 shadow-lg transition-transform duration-300 hover:scale-110">
              <Image
                src={dbUser?.avatarUrl ?? "/profile.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <UploadAvatar userId={dbUser?.id ?? ""} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
    </div>
  );
};

export default ProfilePage;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className="flex flex-col gap-1 bg-gray-100 p-4 border rounded-xl shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md">
      <span className="text-slate-800 font-medium text-base">{title}</span>
      <span className="text-slate-600 text-sm">{value}</span>
    </div>
  );
};
