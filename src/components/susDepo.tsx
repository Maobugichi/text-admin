import { useContext, useState } from "react";
import { ShowContext } from "./context";

const SusDepo = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { theme, totalDeposit , users } = myContext;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const formatDate = (iso: string) => new Date(iso).toLocaleString();

    const sortedOrders = [...totalDeposit].sort((a: any, b: any) => {
  
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA; 
  });

  const myFiltered = sortedOrders.filter(item => item.amount !== null)
  const filteredDeposits = myFiltered.filter((txn: any) => {
    const q = searchQuery.toLowerCase();

    return (
      txn.transaction_ref.toLowerCase().includes(q) ||
      txn.user_id.toString().includes(q) ||
      txn.status.toLowerCase().includes(q) ||
      txn.source.toLowerCase().includes(q) ||
      txn.note.toLowerCase().includes(q) 
    )
  }) .map((item: any) => {
    
    const user = users.find((u:any) => u.id === item.user_id);
    return {
      ...item,
      email: user?.email || "Unknown",
    };
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeposits = filteredDeposits.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);

  return (
    <div className="p-4 mt-20 md:ml-[250px] md:w-[75%] w-full overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ref, user ID, status, source or note"
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
              <th className="p-3">Ref</th>
              <th className="p-3">Email</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Source</th>
              <th className="p-3">Note</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentDeposits.length ? (
              currentDeposits.map((txn: any) => (
                <tr
                  key={txn.id}
                  className={`border-t  ${theme ? "border-white hover:bg-[#222]" : "hover:bg-gray-50"}`}
                >
                  <td className="p-3 whitespace-nowrap border border-solid">{txn.transaction_ref}</td>
                  <td className="p-3 whitespace-nowrap border border-solid">{txn.email}</td>
                  <td className="p-3 whitespace-nowrap border border-solid">{txn.user_id}</td>
                  <td className="p-3 whitespace-nowrap border border-solid">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap border border-solid">₦{parseFloat(txn.amount).toLocaleString()}</td>
                  <td className="p-3 whitespace-nowrap capitalize border border-solid">{txn.source}</td>
                  <td className="p-3 whitespace-nowrap capitalize border border-solid">{txn.note}</td>
                  <td className="p-3 whitespace-nowrap border border-solid">{formatDate(txn.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center border border-solid text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
          <span>per page</span>
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

export default SusDepo;
