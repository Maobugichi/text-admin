import { useEffect, useState , useContext } from "react";
import axios from "axios";
import { ShowContext } from "./context";

interface Rate {
  id: number;
  rate: string | number;
}

const RateEditor: React.FC = () => {
   const myContext = useContext(ShowContext);
    if (!myContext) {
      throw new Error("ShowContext must be used within a ContextProvider");
    }
    const { theme } = myContext;
  const [rates, setRates] = useState<Rate[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [newRate, setNewRate] = useState<string | number>("");

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    const { data } = await axios.get<Rate[]>("https://api.textflex.net/api/rates");
    setRates(data);
  };

  const startEdit = (rate: Rate) => {
    setEditId(rate.id);
    setNewRate(rate.rate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRate(e.target.value);
  };

  console.log('hello')
  const saveEdit = async (id: number) => {
    try {
      await axios.put(`https://api.textflex.net/api/rates/${id}`, { rate: parseFloat(newRate as string) });
      await fetchRates();
      setEditId(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className={`${theme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'} h-[100vh] w-[70%] mt-22 md:ml-42`}>
    <table className={`md:w-[65%]  w-[90%]  border border-collapse mt-24 `}>
      <thead>
        <tr className={`${theme ? 'bg-[#1a1a1a] text-white' : 'bg-gray-200 text-black'}`}>
          <th className="border p-2">ID</th>
          <th className="border p-2">Rate</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <tr key={rate.id}>
            <td className="border p-2">{rate.id}</td>
            <td className="border p-2">
              {editId === rate.id ? (
                <input
                  name="rate"
                  type="number"
                  value={newRate}
                  onChange={handleChange}
                  className="border p-1"
                />
              ) : (
                rate.rate
              )}
            </td>
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
