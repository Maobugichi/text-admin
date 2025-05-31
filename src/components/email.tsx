import { useState,  useContext } from "react";
import axios from "axios";
import { ShowContext } from "./context";


const EmailForm = () => {
     const myContext = useContext(ShowContext);

  if (!myContext) {
    throw new Error("ShowContext must be used within a ContextProvider");
  }

  const { users } = myContext;
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    const ress =  await axios.post("https://api.textflex.net/api/send-admin-email", {
        subject,
        content,
        userIds: selectedIds,
      });
      console.log(ress)
      alert("Emails sent!");
      setSubject("");
      setContent("");
      setSelectedIds([]);
    } catch (error) {
      console.error( error);
      alert("Failed to send emails");
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, userId: number) => {
    setSelectedIds(prev =>
      e.target.checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  };

  return (
    <form className=" w-[90%] md:w-[70%] md:ml-[200px] h-fit min-h-[100vh] mt-[150px] md:mt-[500px]" onSubmit={handleSubmit}>
     <div className="flex gap-2 flex-col">
        <input
        className="border h-10 border-solid"
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <textarea
         className="border border-solid h-auto min-h-20"
         placeholder="Message"
         value={content}
         onChange={e => setContent(e.target.value)}
      />
     </div>
     
      <div className="flex flex-col gap-5">
        {users.map((user:any) => (
          <label className="h-10 items-center" key={user.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(user.id)}
              onChange={(e) => handleCheckboxChange(e, user.id)}
            />
            {user.full_name} ({user.email})
          </label>
        ))}
      </div>
      <button className="h-10 bg-blue-600 rounded-md text-xs w-20 text-white" type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
