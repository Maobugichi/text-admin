import { ShowContext } from "./context";
import { useContext, useState } from "react";

const ShowOrders = () => {
  const myContext = useContext(ShowContext);

  if (!myContext) {
    throw new Error("ShowContext must be used within a ContextProvider");
  }

  const { orders, theme } = myContext;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredOrders = orders?.filter((order: any) => {
    const query = searchQuery.toLowerCase();
    return (
      order.username?.toLowerCase().includes(query) ||
      order.email?.toLowerCase().includes(query) ||
      order.purchased_number?.toLowerCase().includes(query) ||
      order.service?.toLowerCase().includes(query)
    );
  }) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  if (!orders || orders.length === 0) {
    return (
      <div className="p-4 lg:ml-[250px]">
        <h2 className="text-lg font-semibold mb-4">User Orders</h2>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className={`p-4 lg:ml-[250px] w-full mt-20 grid gap-3 ${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">User Orders</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by username, email, number, or service"
        className={`p-2 w-full md:w-1/2 border rounded ${theme ? 'placeholder:text-white' : 'placeholder:text-black'}`}
      />

      <div className="w-full overflow-auto">
        <table className="w-full min-w-[800px] text-sm text-left whitespace-nowrap border border-gray-200 rounded">
          <thead className={`${theme ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-black'}`}>
            <tr>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Number</th>
              <th className="p-3">Order Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Country</th>
              <th className="p-3">Service</th>
              <th className="p-3">Provider</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order: any, idx: number) => (
              <tr key={idx} className="border-t">
                <td className="p-3 whitespace-nowrap">{order.username}</td>
                <td className="p-3 whitespace-nowrap">{order.email}</td>
                <td className="p-3 whitespace-nowrap">{order.purchased_number}</td>
                <td className="p-3 whitespace-nowrap">{order.order_date}</td>
                <td className="p-3 whitespace-nowrap">{order.status}</td>
                <td className="p-3 whitespace-nowrap">{order.country}</td>
                <td className="p-3 whitespace-nowrap">{order.service}</td>
                <td className="p-3 whitespace-nowrap">{order.provider}</td>
                <td className="p-3 whitespace-nowrap">₦{order.amount}</td>
              </tr>
            ))}
            {currentOrders.length === 0 && (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No matching orders found.
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
          <span>orders per page</span>
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

export default ShowOrders;
