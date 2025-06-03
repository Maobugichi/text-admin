import { useContext } from "react";
import { ShowContext } from "./context";

const SusDepo = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { theme, totalDeposit } = myContext;
  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div className="p-4 mt-20  md:ml-[250px] w-[70%]">
      <div
        className={`rounded-lg shadow  border overflow-hidden ${
          theme ? "bg-[#1a1a1a] text-white border-white" : "bg-white text-black border-gray-200"
        }`}
      >
       
        <div className="hidden md:block overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className={`${theme ? "bg-[#111]" : "bg-gray-100"} font-semibold`}>
              <tr>
                <th className="p-3">Ref</th>
                <th className="p-3">User ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Source</th>
                <th className="p-3">Note</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {totalDeposit.length ? (
                totalDeposit.map((txn: any) => (
                  <tr
                    key={txn.id}
                    className={`border-t ${theme ? "border-white hover:bg-[#222]" : "hover:bg-gray-50"}`}
                  >
                    <td className="p-3">{txn.transaction_ref}</td>
                    <td className="p-3">{txn.user_id}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        {txn.status}
                      </span>
                    </td>
                    <td className="p-3">₦{parseFloat(txn.amount).toLocaleString()}</td>
                    <td className="p-3 capitalize">{txn.source}</td>
                    <td className="p-3 capitalize">{txn.note}</td>
                    <td className="p-3">{formatDate(txn.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div className="md:hidden grid gap-5">
          {totalDeposit.length ? (
            totalDeposit.map((txn: any) => (
              <div
                key={txn.id}
                className={`border-b p-4 ${theme ? "border-white" : "border-gray-200"} `}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Ref:</span>
                  <span>{txn.transaction_ref}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">User ID:</span>
                  <span>{txn.user_id}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Status:</span>
                  <span className="text-green-600 font-medium">{txn.status}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Amount:</span>
                  <span>₦{parseFloat(txn.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Source:</span>
                  <span className="capitalize">{txn.source}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Note:</span>
                  <span className="capitalize">{txn.note}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Date:</span>
                  <span>{formatDate(txn.created_at)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No transactions found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SusDepo;
