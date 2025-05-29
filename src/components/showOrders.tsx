import { ShowContext } from "./context";
import { useContext } from "react";

const ShowOrders = () => {
     const myContext = useContext(ShowContext);
      if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
    
      const { users } = myContext;
      console.log(users)
    return (
    <div className="p-4 mt-22">
      <h2 className="text-lg font-semibold mb-4">User Orders</h2>

     
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Balance</th>
             
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.email} className="border-t border-gray-200">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                 <td className="p-2">{ user.purchased_number}</td>
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
              <p className="text-sm">
              <span className="font-semibold">Number:</span> {user.purchased_number}
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}

export default ShowOrders