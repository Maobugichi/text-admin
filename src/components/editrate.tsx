import { useEffect, useState } from "react";
import axios from "axios";

interface Rate {
  id: number;
  rate: string | number;
}

const RateEditor: React.FC = () => {
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
    <table className="md:w-[65%] w-[90%] md:ml-32 border border-collapse">
      <thead>
        <tr className="bg-gray-200">
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
  );
};

export default RateEditor;
