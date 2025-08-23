import { useEffect, useState , useContext } from "react";
import axios from "axios";
import { ShowContext } from "./context";

interface Rate {
  id: number;
  rate: string | number;
  cryptomin: number;
  squadmin: number;
}

const RateEditor: React.FC = () => {
   const myContext = useContext(ShowContext);
    if (!myContext) {
      throw new Error("ShowContext must be used within a ContextProvider");
    }
    const { theme } = myContext;
    const [formValues, setFormValues] = useState<Partial<Rate>>({});
    const [editId, setEditId] = useState<number | null>(null);
    const [rates, setRates] = useState<Rate[]>([]);


    useEffect(() => {
      fetchRates();
    }, []);

  const fetchRates = async () => {
    const { data } = await axios.get<Rate[]>("https://api.textflex.net/api/rates");
   
    setRates(data);
  };

const startEdit = (rate: Rate) => {
  setEditId(rate.id);
  setFormValues({
    rate: rate.rate,
    cryptomin: rate.cryptomin,
    squadmin: rate.squadmin,
  });
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormValues((prev) => ({
    ...prev,
    [name]: value
  }));
};
const saveEdit = async (id: number) => {
  try {
    await axios.put(`https://api.textflex.net/api/rates/${id}`, {
      rate: parseFloat(formValues.rate as any),
      min_crypto: parseFloat(formValues.cryptomin as any),
      min_naira: parseFloat(formValues.squadmin as any),
    });
    await fetchRates();
    setEditId(null);
  } catch (err) {
    console.error("Update failed", err);
  }
};

  return (
    <div className={`${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'} h-[100vh] w-[95%] mt-22 md:ml-42 overflow-visible`}>
     <table className="md:w-[65%] w-[90%] mx-auto border border-collapse mt-24">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Rate</th>
          <th className="border p-2">Min Crypto</th>
          <th className="border p-2">Min Naira</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <tr key={rate.id}>
            <td className="border p-2">{rate.id}</td>

            {/* Rate */}
            <td className="border p-2">
              {editId === rate.id ? (
                <input
                  name="rate"
                  type="number"
                  value={formValues.rate ?? ""}
                  onChange={handleChange}
                  className="border w-20 p-1"
                />
              ) : (
                rate.rate
              )}
            </td>

            {/* Min Crypto */}
            <td className="border p-2">
              {editId === rate.id ? (
                <input
                  name="cryptomin"
                  type="number"
                  value={formValues.cryptomin ?? ""}
                  onChange={handleChange}
                  className="border w-7 p-1"
                />
              ) : (
                rate.cryptomin
              )}
            </td>

            {/* Min Naira */}
            <td className="border p-2">
              {editId === rate.id ? (
                <input
                  name="squadmin"
                  type="number"
                  value={formValues.squadmin ?? ""}
                  onChange={handleChange}
                  className="border w-14 p-1"
                />
              ) : (
                rate.squadmin
              )}
            </td>

            {/* Action */}
            <td className="border p-2">
              {editId === rate.id ? (
                <button className="text-blue-600" onClick={() => saveEdit(rate.id)}>
                  Save
                </button>
              ) : (
                <button className="text-green-600" onClick={() => startEdit(rate)}>
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
     </table>

    </div> 
  );
};

export default RateEditor;
