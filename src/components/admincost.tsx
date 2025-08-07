import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";


interface Cost {
  id: number;
  low_cost: number;
  high_cost: number;
}

const AdminCostsTable = () => {
  const [costs, setCosts] = useState<Cost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{ low_cost: string; high_cost: string }>({
    low_cost: "",
    high_cost: "",
  });

  useEffect(() => {
    axios.get<Cost[]>("https://api.textflex.net/api/costs").then((res) => setCosts(res.data));
  }, []);


  useEffect(() => {
    console.log(costs)
  },[costs])

  const handleEdit = (cost: Cost) => {
    setEditingId(cost.id);
    setFormData({
      low_cost: cost.low_cost.toString(),
      high_cost: cost.high_cost.toString(),
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (id: number) => {
    const updatedData = {
      low_cost: parseFloat(formData.low_cost),
      high_cost: parseFloat(formData.high_cost),
    };

    await axios.put(`https://api.textflex.net/api/costs/${id}`, updatedData);

    const updatedCosts = costs.map((c) =>
      c.id === id ? { ...c, ...updatedData } : c
    );
    setCosts(updatedCosts);
    setEditingId(null);
  };

  return (
    <div className="p-4 overflow-auto md:w-[50%] w-[90%] mt-20">

      <h2 className="text-xl font-bold mb-4">Cost Management</h2>
      <table className="min-w-full table-auto  border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Low Cost</th>
            <th className="border p-2">High Cost</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {costs?.map((cost) => (
            <tr key={cost.id}>
              <td className="border p-2">{cost.id}</td>
              <td className="border p-2">
                {editingId === cost.id ? (
                  <input
                    type="number"
                    name="low_cost"
                    value={formData.low_cost}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  cost.low_cost
                )}
              </td>
              <td className="border p-2">
                {editingId === cost.id ? (
                  <input
                    type="number"
                    name="high_cost"
                    value={formData.high_cost}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  cost.high_cost
                )}
              </td>
              <td className="border p-2">
                {editingId === cost.id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleSave(cost.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(cost)}
                  >
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

export default AdminCostsTable;
