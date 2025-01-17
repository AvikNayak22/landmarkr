import PageTitle from "@/app/components/PageTitle";
import { getUserById } from "@/lib/actions/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const ProfilePage = async () => {
  const { getUser } = await getKindeServerSession();

  const user = await getUser();

  const dbUser = await getUserById(user ? user.id : "");

  return (
    <div>
      <PageTitle title="My Profile" />
    </div>
  );
};

export default ProfilePage;
