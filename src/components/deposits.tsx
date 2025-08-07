import { useContext, useState } from "react";
import { ShowContext } from "./context";
import { Banknote } from "lucide-react";
import axios from "axios";

const Deposits = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { deposit , theme } = myContext;
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  const filteredDeposits = deposit.filter(
    (dep: any) =>
      dep.transaction_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dep.user_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkSuccessful = async (id: number) => {
    try {
      const res = await axios.patch(`https://api.textflex.net/api/transactions/${id}/status`, {
        newStatus: "successful",
      });

      if (res.data.success) {
        alert("Transaction marked as successful and user credited.");
        
      } else {
        alert(`Error: ${res.data.error}`);
      }
    } catch (error: any) {
      console.error(error);
      alert("Something went wrong while updating the transaction.");
    }
};

const handleDeleteDeposit = async (id: number) => {
  const confirm = window.confirm("Are you sure you want to delete this deposit?");
  if (!confirm) return;

  try {
    const res = await axios.delete(`https://api.textflex.net/api/transactions/${id}`);
    if (res.data.success) {
      alert("Deposit deleted successfully.");
     
    } else {
      alert(`Error: ${res.data.error}`);
    }
  } catch (error: any) {
    console.error(error);
    alert("Something went wrong while deleting the deposit.");
  }
};



  return (
    <div className="w-[80%]  p-4 md:ml-[100px] mt-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Banknote className="w-5 h-5 text-green-600" />
        Deposits
      </h2>

     
      <div className="mb-4 mx-auto w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search by Ref or User ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border rounded px-3 py-2 w-full border-solid ${theme ? 'border-white placeholder:text-white' : 'border-black '} `}
        />
      </div>

      
      <div className={`w-[70%] hidden md:block overflow-auto rounded-lg border border-gray-200  shadow ml-[200px]  ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}>
        <table className="min-w-full text-sm text-left">
          <thead className={`${theme ? 'bg-[#1a1a1a]' : 'bg-gray-100 text-gray-700'}  font-semibold`}>
            <tr>
              <th className="p-3">Ref</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeposits.length > 0 ? (
              filteredDeposits.map((dep: any) => (
                <tr key={dep.id} className={`border-t ${theme ? 'bg-[#1a1a1a]' : 'hover:bg-gray-50 text-gray-700'}  `}>
                  <td className="p-3 border border-solid">{dep.transaction_ref}</td>
                  <td className="p-3 border border-solid">{dep.user_id}</td>
                 <td className="p-3 flex flex-col items-center gap-4 border border-solid">
                    <span
                      className={`w-full text-center px-2 py-1 rounded-full text-xs font-medium ${
                        dep.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : dep.status === "successful"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {dep.status}
                    </span>
                   <div className="flex flex-col gap-1 items-center">
                    {dep.status !== "successful" && (
                      <button
                        onClick={() => handleMarkSuccessful(dep.id)}
                        className="inline-block px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                      >
                        Mark as Successful
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteDeposit(dep.id)}
                      className="inline-block px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                  </td>

                  <td className="p-3 border border-solid">
                    {dep.amount ? `₦${parseFloat(dep.amount).toLocaleString()}` : "-"}
                  </td>
                  <td className="p-3">{formatDate(dep.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 border border-solid text-center text-gray-500">
                  No deposits found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      <div className="md:hidden space-y-4">
        {filteredDeposits.length > 0 ? (
          filteredDeposits.map((dep: any) => (
            <div
              key={dep.id}
              className={`border rounded-lg p-4  shadow-sm space-y-1 ${theme ? 'bg-[#1a1a1a] border-white text-white' : 'bg-white text-black'}`}
            >
              <div className="text-xs text-gray-500">{formatDate(dep.created_at)}</div>
              <div className="font-semibold text-sm">Ref: {dep.transaction_ref}</div>
              <div className="text-sm">User ID: {dep.user_id}</div>
              <div className="text-sm flex items-center gap-1">
                Status:{" "}
                <span
                  className={`font-medium ${
                    dep.status === "pending"
                      ? "text-yellow-600"
                      : dep.status === "successful"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {dep.status}
                </span>
                <div className="flex flex-col gap-2 mt-1">
                {dep.status !== "successful" && (
                  <button
                    onClick={() => handleMarkSuccessful(dep.id)}
                    className="inline-block px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                  >
                    Mark as Successful
                  </button>
                )}
                <button
                  onClick={() => handleDeleteDeposit(dep.id)}
                  className="inline-block px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>

              </div>
              <div className="text-sm">
                Amount:{" "}
                <span className="font-medium">
                  {dep.amount ? `₦${parseFloat(dep.amount).toLocaleString()}` : "-"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No deposits found.</p>
        )}
      </div>
    </div>
  );
};

export default Deposits;
