import { useEffect, useState , useContext } from "react";
import axios from "axios";
import { ShowContext } from "./context";

type Link = {
  id: number;
  socials: string;
  link: string;
  description: string;
  updated_at?: string;
};

const AdminSocialLinks = () => {
    const myContext = useContext(ShowContext);

    if (!myContext) {
      throw new Error("ShowContext must be used within a ContextProvider");
    }
    const { theme } = myContext;
    const [links, setLinks] = useState<Link[]>([]);
    const [form, setForm] = useState({ socials: "", link: "", description: "" });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get("https://api.textflex.net/api/links");
      setLinks(res.data);
    } catch (err) {
      alert("Failed to fetch links");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.socials || !form.link) {
      alert("Socials and link are required");
      return;
    }

    setLoading(true);
    try {
      if (editingId === null) {
       
        const res = await axios.post("https://api.textflex.net/api/links", form);
        setLinks((prev) => [res.data, ...prev]);
      } else {
       
        await axios.put(`https://api.textflex.net/api/links/${editingId}`, form);
        setLinks((prev) =>
          prev.map((link) => (link.id === editingId ? { ...link, ...form } : link))
        );
      }
      setForm({ socials: "", link: "", description: "" });
      setEditingId(null);
    } catch (err) {
      alert("Failed to save link");
    }
    setLoading(false);
  };

  const startEdit = (link: Link) => {
    setForm({ socials: link.socials, link: link.link, description: link.description || "" });
    setEditingId(link.id);
  };

 
  const cancelEdit = () => {
    setForm({ socials: "", link: "", description: "" });
    setEditingId(null);
  };

  return (
    <div className={`w-full md:w-[70%]  md:ml-72 h-[100vh] md:max-w-4xl mx-auto p-6 mt-20 ${theme ? 'bg-[#1a1a1a] border-white text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-6">Manage Social Links</h1>


      <form onSubmit={handleSubmit} className="mb-6  w-full space-y-4">
        <div>
          <label className="block font-semibold mb-1">Social Platform</label>
          <input
            name="socials"
            value={form.socials}
            onChange={handleChange}
            className={`border ${theme ? 'placeholder:text-white' : 'placeholder:text-black'} px-3 py-2 rounded w-full`}
            placeholder="Facebook, Twitter, Instagram, etc."
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Link URL</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            className={`border px-3 py-2 rounded w-full ${theme ? 'placeholder:text-white' : 'placeholder:text-black'}`}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description (optional)</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`border px-3 py-2 rounded w-full ${theme ? 'placeholder:text-white' : 'placeholder:text-black'}`}
            placeholder="A short description"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId === null ? "Add Link" : "Update Link"}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead>
            <tr className={`${theme ? 'bg-[#1a1a1a] border-white text-white' : 'bg-gray-100 text-black'} text-left`}>
              <th className="p-2 border-b">Social Platform</th>
              <th className="p-2 border-b">Link</th>
              <th className="p-2 border-b">Description</th>
              <th className="p-2 border-b">Last Updated</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No links found.
                </td>
              </tr>
            ) : (
              links.map((link) => (
                <tr key={link.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{link.socials}</td>
                  <td className="p-2">
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {link.link}
                    </a>
                  </td>
                  <td className="p-2">{link.description || "-"}</td>
                  <td className="p-2">
                    {link.updated_at
                      ? new Date(link.updated_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => startEdit(link)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {links.length === 0 ? (
          <div className="text-center text-gray-500">No links found.</div>
        ) : (
          links.map((link) => (
            <div
              key={link.id}
              className={`border rounded p-4 shadow-sm ${theme ? 'bg-[#1a1a1a] text-white border-white' : 'bg-gray-100'}`}
            >
              <p><span className="font-semibold">Social:</span> {link.socials}</p>
              <p className="break-all">
                <span className="font-semibold">Link:</span>{" "}
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link.link}
                </a>
              </p>
              <p><span className="font-semibold">Description:</span> {link.description || "-"}</p>
              <p>
                <span className="font-semibold">Last Updated:</span>{" "}
                {link.updated_at
                  ? new Date(link.updated_at).toLocaleString()
                  : "-"}
              </p>
              <button
                onClick={() => startEdit(link)}
                className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminSocialLinks;
