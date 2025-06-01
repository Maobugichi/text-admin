import { ShowContext } from "./context";
import { useContext, useState } from "react";
import axios from "axios";

const ShowUsers = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { users , theme } = myContext;
  const [localUsers, setLocalUsers] = useState(users);
  const [loadingIds, setLoadingIds] = useState<number[]>([]); // track loading per user
  const [searchTerm, setSearchTerm] = useState("");

  const blockUser = async (email: string, id: number) => {
    setLoadingIds((prev) => [...prev, id]);
    try {
      await axios.post(`https://api.textflex.net/api/block-user/`, { userEmail: email });
      setLocalUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
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
      setLocalUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
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

  const filteredUsers = localUsers.filter(
    (user: any) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-4 mt-22  ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">Users</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 w-full  rounded"
        />
      </div>

     
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead>
            <tr className={` text-left  ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-black'}`}>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Blocked</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user: any) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: any) => (
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
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowUsers;
