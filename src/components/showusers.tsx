import { ShowContext } from "./context";
import { useContext, useState } from "react";
import axios from "axios";

const ShowUsers = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { users } = myContext;
  const [localUsers, setLocalUsers] = useState(users);
  const [loadingIds, setLoadingIds] = useState<number[]>([]); // track loading per user


  const blockUser = async (email: string, id: number) => {
    setLoadingIds((prev) => [...prev, id]);
    try {
      await axios.post(`https://api.textflex.net/api/block-user/`, { userEmail: email });
      setLocalUsers((prevUsers:any) =>
        prevUsers.map((user:any) =>
          user.id === id ? { ...user, blocked: true } : user
        )
      );
    } catch (error) {
      console.error("Error blocking user:", error);
      alert("Failed to block user");
    } finally {
      setLoadingIds((prev) => prev.filter((userId) => userId !== id));
    }
  };

  const unblockUser = async (email: string, id: number) => {
    setLoadingIds((prev) => [...prev, id]);
    try {
      await axios.post(`https://api.textflex.net/api/unblock-user/`, { userEmail: email });
      setLocalUsers((prevUsers:any) =>
        prevUsers.map((user:any) =>
          user.id === id ? { ...user, blocked: false } : user
        )
      );
    } catch (error) {
      console.error("Error unblocking user:", error);
      alert("Failed to unblock user");
    } finally {
      setLoadingIds((prev) => prev.filter((userId) => userId !== id));
    }
  };

  console.log(users)

  return (
    <div className="p-4 mt-22">
      <h2 className="text-lg font-semibold mb-4">Users</h2>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Blocked</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localUsers.map((user: any) => (
              <tr key={user.email} className="border-t border-gray-200">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.blocked ? "Yes" : "No"}</td>
                <td className="p-2 space-x-2">
                  {!user.blocked && (
                    <button
                      disabled={loadingIds.includes(user.id)}
                      onClick={() => blockUser(user.email, user.id)}
                      className="px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700"
                    >
                      {loadingIds.includes(user.id) ? "Processing..." : "Block"}
                    </button>
                  )}
                  {user.blocked && (
                    <button
                      disabled={loadingIds.includes(user.id)}
                      onClick={() => unblockUser(user.email, user.id)}
                      className="px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700"
                    >
                      {loadingIds.includes(user.id) ? "Processing..." : "Unblock"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-4">
        {localUsers.map((user: any) => (
          <div key={user.email} className="border rounded p-4 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Blocked:</span> {user.blocked ? "Yes" : "No"}
            </p>
            <div className="mt-2 space-x-2">
              {!user.blocked && (
                <button
                  disabled={loadingIds.includes(user.id)}
                  onClick={() => blockUser(user.email, user.id)}
                  className="px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700"
                >
                  {loadingIds.includes(user.id) ? "Processing..." : "Block"}
                </button>
              )}
              {user.blocked && (
                <button
                  disabled={loadingIds.includes(user.id)}
                  onClick={() => unblockUser(user.email, user.id)}
                  className="px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700"
                >
                  {loadingIds.includes(user.id) ? "Processing..." : "Unblock"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUsers;
