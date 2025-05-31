import { ShowContext } from "./context";
import { useContext } from "react";

const ShowOrders = () => {
  const myContext = useContext(ShowContext);

  if (!myContext) {
    throw new Error("ShowContext must be used within a ContextProvider");
  }

  const { orders } = myContext;

  if (!orders || orders.length === 0) {
    return (
      <div className="p-4 lg:ml-[250px]">
        <h2 className="text-lg font-semibold mb-4">User Orders</h2>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:ml-[250px] lg:mr-4">
      <h2 className="text-lg font-semibold mb-4">User Orders</h2>

      
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100">
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
            {orders.map((user: any) => (
              <tr key={user.email + user.order_date} className="border-t">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.purchased_number}</td>
                <td className="p-3">{user.order_date}</td>
                <td className="p-3">{user.status}</td>
                <td className="p-3">{user.country}</td>
                <td className="p-3">{user.service}</td>
                <td className="p-3">{user.provider}</td>
                <td className="p-3">${user.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="md:hidden space-y-4 mt-20">
        {orders.map((user: any) => (
          <div key={user.email + user.order_date} className="bg-white border rounded-lg p-4 shadow-sm text-sm">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Number:</strong> {user.purchased_number}</p>
            <p><strong>Order Date:</strong> {user.order_date}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>Service:</strong> {user.service}</p>
            <p><strong>Provider:</strong> {user.provider}</p>
            <p><strong>Amount:</strong> ₦{user.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowOrders;
