import { ShowContext } from "./components/context";
import { useContext, useState } from "react";
import axios from "axios";

const ShowBalance = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { users } = myContext;
  const [editValues, setEditValues] = useState<any>({});

  const handleChange = (id: number, value: string) => {
    setEditValues((prev: any) => ({ ...prev, [id]: value }));
  };

  //console.log(users)

  const updateBalance = async (id: number) => {
    try {
      const newBalance = editValues[id];
      await axios.put(`https://api.textflex.net/api/update-balance/${id}`, { balance: newBalance });
      alert(`Updated balance for user ID ${id}`);
    } catch (error) {
      console.error("Error updating balance", error);
      alert("Failed to update balance");
    }
  };

  return (
    <div className="p-4 mt-22">
      <h2 className="text-lg font-semibold mb-4">User Balances</h2>

     
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Balance</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.email} className="border-t border-gray-200">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <input
                    type="number"
                    className="border px-2 py-1 w-24"
                    value={editValues[user.id] ?? user.balance}
                    onChange={(e) => handleChange(user.id, e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => updateBalance(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-4">
        {users.map((user: any) => (
          <div key={user.email} className="border rounded p-4 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="number"
                className="border px-2 py-1 w-24"
                value={editValues[user.id] ?? user.balance}
                onChange={(e) => handleChange(user.id, e.target.value)}
              />
              <button
                onClick={() => updateBalance(user.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowBalance;
