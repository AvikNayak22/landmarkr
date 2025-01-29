import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import UserProfilePanel from "./UserProfilePanel";
import prisma from "@/lib/prisma";

const signInPanel = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  if (await isAuthenticated()) {
    const user = await getUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return <>{!!dbUser && <UserProfilePanel user={dbUser} />}</>;
  }

  return (
    <div className="flex gap-3">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <LoginLink>Sign In</LoginLink>
      </button>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        <RegisterLink>Sign Up</RegisterLink>
      </button>
    </div>
  );
};

export default signInPanel;
