import { ShowContext } from "./context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const ShowApi = () => {
  const myContext = useContext(ShowContext);
  if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");

  const { api } = myContext;

  const [data, setData] = useState<any[]>([]);

  
  const [editValues, setEditValues] = useState<{ [id: number]: string }>({});

  
  useEffect(() => {
    if (api && Array.isArray(api)) {
      setData(api);
     
      const initialEditValues: { [id: number]: string } = {};
      api.forEach(({ id, key }) => {
        initialEditValues[id] = key;
      });
      setEditValues(initialEditValues);
    }
  }, [api]);

  const handleChange = (id: number, newKey: string) => {
    setEditValues((prev) => ({ ...prev, [id]: newKey }));
  };

  const handleUpdate = async (id: number) => {
    const newKey = editValues[id];
    if (!newKey) {
      alert("Key cannot be empty");
      return;
    }

    try {
      const res = await axios.put(`https://api.textflex.net/api/update-key/${id}`, { key: newKey });
      // Update local data to reflect new key
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, key: newKey } : item))
      );
      alert(res.data.message || `Key updated for service with id ${id}`);
    } catch (error) {
      console.error("Failed to update key:", error);
      alert("Failed to update key. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">API Keys Management</h2>
      <table className="min-w-full border border-gray-300 rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Service</th>
            <th className="p-3 border-b">API Key</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, key, service }) => (
            <tr key={id} className="border-b border-gray-200">
              <td className="p-3">{service}</td>
              <td className="p-3">
                <input
                  type="text"
                  className="border px-2 py-1 w-full"
                  value={editValues[id] ?? key}
                  onChange={(e) => handleChange(id, e.target.value)}
                />
              </td>
              <td className="p-3">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleUpdate(id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowApi;
