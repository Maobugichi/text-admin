import { ShowContext } from "./context";
import { useContext, useState } from "react";
import axios from "axios";

const ShowUsers = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { users, theme } = myContext;
  const [localUsers, setLocalUsers] = useState(users);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      setLoadingDelete((prev: any) => [...prev, id]);
      const res = await axios.delete(`https://api.textflex.net/api/users/${id}`);
      if (res) {
        setLocalUsers((prev: any) => prev.filter((user: any) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setLoadingDelete((prev: any) => prev.filter((item: any) => item !== id));
    }
  };

  const filteredUsers = localUsers.filter(
    (user: any) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className={`md:ml-20 p-4 mt-22 ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'} overflow-x-auto w-full`}>
      <h2 className="text-lg font-semibold mb-4">Users</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[80%] border border-gray-300 rounded">
          <thead>
            <tr className={`${theme ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-black'}`}>
              <th className="p-2 text-left">id</th>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Blocked</th>
              <th className="p-2 text-left">Block</th>
              <th className="p-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user: any) => (
                <tr key={user.email} className="border-t border-gray-200">
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.blocked ? "Yes" : "No"}</td>
                  <td className="p-2 space-x-2">
                    {!user.blocked ? (
                      <button
                        disabled={loadingIds.includes(user.id)}
                        onClick={() => blockUser(user.email, user.id)}
                        className="px-3 py-1 rounded text-white bg-yellow-600 hover:bg-yellow-700"
                      >
                        {loadingIds.includes(user.id) ? "Processing..." : "Block"}
                      </button>
                    ) : (
                      <button
                        disabled={loadingIds.includes(user.id)}
                        onClick={() => unblockUser(user.email, user.id)}
                        className="px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700"
                      >
                        {loadingIds.includes(user.id) ? "Processing..." : "Unblock"}
                      </button>
                    )}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      disabled={loadingDelete.includes(user.id)}
                      onClick={() => deleteUser(user.id)}
                      className="px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700"
                    >
                      {loadingDelete.includes(user.id) ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span>users per page</span>
        </div>

        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowUsers;
