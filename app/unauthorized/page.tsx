import { IoBan } from "react-icons/io5";

const UnauthorizedPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="capitalize ">You are not authorized to do this action.</p>
      <IoBan className="w-36 text-red-500 " />
    </div>
  );
};

export default UnauthorizedPage;
