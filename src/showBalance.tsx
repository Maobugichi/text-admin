import { ShowContext } from "./components/context";
import { useContext, useState } from "react";
import axios from "axios";

const ShowBalance = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { users, theme } = myContext;
  const [editValues, setEditValues] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleChange = (id: number, value: string) => {
    setEditValues((prev: any) => ({ ...prev, [id]: value }));
  };

  const addToBalance = async (id: number) => {
    try {
      const amountToAdd = parseFloat(editValues[id]);
      if (isNaN(amountToAdd) || amountToAdd <= 0) {
        alert("Please enter a valid amount greater than 0");
        return;
      }
      await axios.put(`https://api.textflex.net/api/update-balance/${id}`, { balance: amountToAdd });
      alert(`Added ₦${amountToAdd} to user ID ${id}`);
      setEditValues((prev: any) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error adding to balance", error);
      alert("Failed to update balance");
    }
  };

  const filteredUsers = users.filter((user: any) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className={`p-4 mt-22 ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'} overflow-scroll w-full md:w-[75%] md:ml-72`}>
      <h2 className="text-lg font-semibold mb-4">User Balances</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className={`border px-3 py-2 w-full rounded ${theme ? 'placeholder:text-white' : 'placeholder:text-black'}`}
        />
      </div>

    
      <div className="w-full overflow-x-scroll">
        <table className="w-full min-w-[600px] border border-gray-300 rounded">
          <thead>
            <tr className={`text-left ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-black'}`}>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Balance (₦)</th>
              <th className="p-2">Add Amount</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user: any) => (
              <tr key={user.email} className="border-t border-gray-200">
                <td className="p-2 whitespace-nowrap border border-solid">{user.username}</td>
                <td className="p-2 whitespace-nowrap border border-solid">{user.email}</td>
                <td className="p-2 whitespace-nowrap border border-solid">₦{parseFloat(user.balance).toFixed(2)}</td>
                <td className="p-2 whitespace-nowrap border border-solid">
                  <input
                    type="number"
                    className="border px-2 py-1 w-24"
                    placeholder="₦"
                    value={editValues[user.id] ?? ""}
                    onChange={(e) => handleChange(user.id, e.target.value)}
                  />
                </td>
                <td className="p-2 whitespace-nowrap border border-solid">
                  <button
                    onClick={() => addToBalance(user.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center mt-6">
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

export default ShowBalance;
