import { useEffect, useState } from "react";
import axios from "axios";

interface Link {
  id: number;
  name: string;
  url: string;
  description: string;
}

const AdminLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  useEffect(() => {
    axios.get("/api/admin/links").then(res => setLinks(res.data));
  }, []);

  const handleEdit = (link: Link) => setEditingLink(link);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingLink) return;
    setEditingLink({ ...editingLink, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editingLink) return;

    await axios.put(`/api/admin/links/${editingLink.id}`, editingLink);
    setLinks(prev => prev.map(l => (l.id === editingLink.id ? editingLink : l)));
    setEditingLink(null);
  };

  return (
    <div>
      <h2>Admin Links</h2>
      {links.map(link => (
        <div key={link.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <strong>{link.name}</strong> — <a href={link.url} target="_blank">{link.url}</a>
          <p>{link.description}</p>
          <button onClick={() => handleEdit(link)}>Edit</button>
        </div>
      ))}

      {editingLink && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit Link</h3>
          <input name="name" value={editingLink.name} onChange={handleChange} />
          <input name="url" value={editingLink.url} onChange={handleChange} />
          <textarea name="description" value={editingLink.description} onChange={handleChange} />
          <button onClick={handleUpdate}>Save</button>
        </div>
      )}
    </div>
  );
};

export default AdminLinks;
