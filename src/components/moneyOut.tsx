import { useContext } from "react";
import { ShowContext } from "./context";

const MoneyOut = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { moneyOut } = myContext;

  return (
    <div className="overflow-x-auto mt-10 px-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">User ID</th>
            <th className="text-left px-4 py-2 border-b">Note</th>
            <th className="text-left px-4 py-2 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {moneyOut.map((item: any) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{item.user_id}</td>
              <td className="px-4 py-2 border-b">{item.note}</td>
              <td className="px-4 py-2 border-b">₦{parseFloat(item.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoneyOut;
