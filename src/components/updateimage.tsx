import { useEffect, useState } from "react";
import axios from "axios";

interface FormDataState {
  content: string;
  image: File | null;
  link: string;
}

const ManageAds = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<number[]>([]);
  const [editingAdId, setEditingAdId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormDataState>({ content: "", image: null, link: "" });
  const [preview, setPreview] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get("https://api.textflex.net/api/ads");
      setAds(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const deleteAd = async (id: number) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    setLoadingDelete((prev) => [...prev, id]);
    try {
      await axios.delete(`https://api.textflex.net/api/ads/${id}`);
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    } catch (error) {
      console.error("Error deleting ad:", error);
    } finally {
      setLoadingDelete((prev) => prev.filter((item) => item !== id));
    }
  };

  const startEditing = (ad: any) => {
    setEditingAdId(ad.id);
    setFormData({ content: ad.content || "", image: null, link: ad.link });
    setPreview(ad.url);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitUpdate = async () => {
    try {
      const payload = new FormData();
      payload.append("content", formData.content);
      payload.append("link", formData.link);
      if (formData.image) payload.append("image", formData.image);

      const res = await axios.put(`https://api.textflex.net/api/ads/${editingAdId}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedAd = res.data;
      setAds((prev) => prev.map((ad) => (ad.id === editingAdId ? updatedAd : ad)));
      setEditingAdId(null);
      setFormData({ content: "", image: null, link: "" });
      setPreview("");
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  const addNewAd = async () => {
    try {
      const payload = new FormData();
      payload.append("content", formData.content);
      payload.append("link", formData.link);
      if (formData.image) payload.append("images", formData.image);
      payload.append("identifier", "admin");

      const res = await axios.post("https://api.textflex.net/api/admin-img", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newAds = res.data.uploaded;
      setAds((prev) => [...newAds, ...prev]);
      setFormData({ content: "", image: null, link: "" });
      setPreview("");
    } catch (error) {
      console.error("Error adding ad:", error);
    }
  };

  const filteredAds = ads.filter((ad) =>
    (ad.content || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);

  return (
    <div className="p-4 lg:ml-[250px] mt-20 md:w-[75%] w-[98%] overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Manage Ads</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          name="content"
          placeholder="Ad content"
          value={formData.content}
          onChange={handleEditChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="link"
          placeholder="Ad link"
          value={formData.link}
          onChange={handleEditChange}
          className="p-2 border rounded w-full"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded w-full" />
        <button onClick={addNewAd} className="px-4 py-2 bg-blue-600 text-white rounded">Add Ad</button>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search ads by content"
        className="p-2 w-full md:w-1/2 border rounded mb-4"
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Content</th>
              <th className="p-3">Image</th>
              <th className="p-3">Link</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAds.map((ad) => (
              <tr key={ad.id} className="border-t">
                <td className="p-3">{ad.id}</td>
                <td className="p-3">
                  {editingAdId === ad.id ? (
                    <input
                      type="text"
                      name="content"
                      value={formData.content}
                      onChange={handleEditChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    ad.content
                  )}
                </td>
                <td className="p-3">
                  {editingAdId === ad.id ? (
                    <div>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-1" />
                      {preview && <img src={preview} alt="Preview" className="w-20 h-auto" />}
                    </div>
                  ) : (
                    <img src={ad.url} alt="Ad" className="w-20 h-auto" />
                  )}
                </td>
                <td className="p-3">
                  {editingAdId === ad.id ? (
                    <input
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleEditChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    <a href={ad.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{ad.link}</a>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {editingAdId === ad.id ? (
                    <>
                      <button onClick={submitUpdate} className="px-2 py-1 bg-green-600 text-white rounded">Save</button>
                      <button onClick={() => setEditingAdId(null)} className="px-2 py-1 bg-gray-400 text-white rounded">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(ad)} className="px-2 py-1 bg-yellow-600 text-white rounded">Edit</button>
                      <button
                        disabled={loadingDelete.includes(ad.id)}
                        onClick={() => deleteAd(ad.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        {loadingDelete.includes(ad.id) ? "Deleting..." : "Delete"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between flex-col gap-5 md:flex-row items-center mt-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span>ads per page</span>
        </div>

        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAds;
