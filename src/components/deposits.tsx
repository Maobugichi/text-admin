import { useContext } from "react";
import { ShowContext } from "./context";
import { Banknote } from "lucide-react";

const Deposits = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { deposit } = myContext;

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div className="w-full p-4 md:ml-[200px] mt-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Banknote className="w-5 h-5 text-green-600" />
        Deposits
      </h2>

      {/* Desktop table */}
      <div className="w-[70%] hidden md:block overflow-auto rounded-lg border border-gray-200 bg-white shadow ml-[200px]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">Ref</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {deposit.map((dep: any) => (
              <tr key={dep.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{dep.transaction_ref}</td>
                <td className="p-3">{dep.user_id}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dep.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : dep.status === "successful"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {dep.status}
                  </span>
                </td>
                <td className="p-3">
                  {dep.amount ? `₦${parseFloat(dep.amount).toLocaleString()}` : "-"}
                </td>
                <td className="p-3">{formatDate(dep.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="md:hidden space-y-4">
        {deposit.map((dep: any) => (
          <div
            key={dep.id}
            className="border rounded-lg p-4 bg-white shadow-sm space-y-1"
          >
            <div className="text-xs text-gray-500">{formatDate(dep.created_at)}</div>
            <div className="font-semibold text-sm">Ref: {dep.transaction_ref}</div>
            <div className="text-sm">User ID: {dep.user_id}</div>
            <div className="text-sm">
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
            </div>
            <div className="text-sm">
              Amount:{" "}
              <span className="font-medium">
                {dep.amount ? `₦${parseFloat(dep.amount).toLocaleString()}` : "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deposits;
