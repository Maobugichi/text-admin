import { useContext, useState } from "react";
import { ShowContext } from "./context";

const MoneyOut = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { moneyOut, theme , users } = myContext;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
 
  const sortedOrders = [...moneyOut].sort((a: any, b: any) => {
  
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA; 
  });
  const filteredMoneyOut = sortedOrders.filter((item: any) => {
    const q = searchQuery.toLowerCase();
    return (
      item.user_id.toString().includes(q) ||
      item.note.toLowerCase().includes(q) ||
      item.amount.toString().includes(q)
    );
  }).map((item: any) => {
    
    const user = users.find((u:any) => u.id === item.user_id);
    return {
      ...item,
      email: user?.email || "Unknown",
    };
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMoneyOut = filteredMoneyOut.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMoneyOut.length / itemsPerPage);
  
  return (
    <div className={`p-4 mt-20 md:ml-[250px] w-full md:w-[75%] overflow-x-auto`}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user ID, note or amount"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className={`border px-3 py-2 w-full md:w-1/2 rounded ${theme ? "placeholder:text-white bg-[#1a1a1a] text-white" : "placeholder:text-black"}`}
        />
      </div>

      <div
        className={`rounded-lg shadow border overflow-auto ${
          theme ? "bg-[#1a1a1a] text-white border-white" : "bg-white text-black border-gray-200"
        }`}
      >
        <table className="w-full min-w-[600px] text-sm text-left">
          <thead className={`${theme ? "bg-[#111]" : "bg-gray-100"} font-semibold`}>
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">User email</th>
              <th className="p-3">Note</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentMoneyOut.length ? (
              currentMoneyOut.map((item: any) => (
                <tr
                  key={item.id}
                  className={`border-t ${theme ? "border-white hover:bg-[#222]" : "hover:bg-gray-50"}`}
                >
                  <td className="p-3 whitespace-nowrap border border-solid">{item.user_id}</td>
                  <td className="p-3 whitespace-nowrap border border-solid">{item.email}</td>
                  <td className="p-3 whitespace-nowrap border border-solid">{item.note}</td>
                  <td className="p-3 whitespace-nowrap border border-solid">
                    ₦{parseFloat(item.amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 whitespace-nowrap border border-solid">{item.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
      <div className="flex justify-between flex-col md:flex-row gap-5 items-center mt-6 w-full">
        <div className="flex items-center gap-5 space-x-2">
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
          <span>per page</span>
        </div>

        <div className="space-x-2 flex gap-5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-2 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-2 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoneyOut;
