import { ShowContext } from "./components/context";
import { useContext, useState } from "react";
import axios from "axios";

const ShowBalance = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { users, theme } = myContext;
  const [editValues, setEditValues] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");

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
      console.log(amountToAdd)
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

  return (
    <div className={`p-4 mt-22 ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">User Balances</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border px-3 py-2 w-full rounded ${theme ? 'placeholder:text-white' : 'placeholder:text-black'}`}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
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
            {filteredUsers.map((user: any) => (
              <tr key={user.email} className="border-t border-gray-200">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">₦{parseFloat(user.balance).toFixed(2)}</td>
                <td className="p-2">
                  <input
                    type="number"
                    className="border px-2 py-1 w-24"
                    placeholder="₦"
                    value={editValues[user.id] ?? ""}
                    onChange={(e) => handleChange(user.id, e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => addToBalance(user.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user: any) => (
          <div key={user.email} className="border rounded p-4 shadow-sm">
            <p className="text-sm"><span className="font-semibold">Username:</span> {user.username}</p>
            <p className="text-sm"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-sm mt-2"><span className="font-semibold">Balance:</span> ₦{parseFloat(user.balance).toFixed(2)}</p>
            
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="number"
                className="border px-2 py-1 w-24"
                placeholder="₦"
                value={editValues[user.id] ?? ""}
                onChange={(e) => handleChange(user.id, e.target.value)}
              />
              <button
                onClick={() => addToBalance(user.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowBalance;
