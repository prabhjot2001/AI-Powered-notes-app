import { useAuthContext } from "@/hooks/useAuthContext";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      toast.error("Unauthorized, Please login");
      navigate("/demo");
      return;
    }
  }, [user]);
  return (
    <div>
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
        Profile Details
      </h1>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Title
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Username
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {user.name}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Email
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {user.email}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Joined on
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {user.createdAt.slice(0, 10)}
              </td>
            </tr>

            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Last updated on
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {user.updatedAt.slice(0, 10)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfilePage;
