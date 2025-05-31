import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [ notification , setNotifications ] = useState<any>([])
   const [open, setOpen] = useState(false);
  async function getNotifs() {
  const { data } = await axios.get('https://api.textflex.net/api/admin/notifications');
  setNotifications(data.notifications)
  return data.notifications;
}


useEffect(() => {
  getNotifs()
},[])

useEffect(() => {
  console.log(notification)
},[notification])

//await axios.post('/api/admin/notifications/mark-as-seen');
  const unseenCount = notification?.filter((n:any) => !n.seen).length;

  const handleOpen = async () => {
    setOpen(true);
    if (unseenCount > 0) {
      await axios.post('https://api.textflex.net/api/notifications/mark-as-seen');
      getNotifs(); 
    }
  };

  return (
    <div className={`relative w-[90%] md:w-[70%] md:ml-[200px]  h-fit min-h-screen  ${open ? 'md:mt-72 mt-[500px]' : ' mt-24'}`}>
      <button className="relative" onClick={handleOpen}>
        <Bell className="w-6 h-6" />
        {unseenCount > 0 && (
          <span className="absolute top-0 -right-1 bg-red-500 text-white text-[10px] px-0.5 py-0.2 rounded-full">
            {unseenCount}
          </span>
        )}
      </button>

      {open && (
  <div className="mt-4 w-full overflow-x-auto">
    {notification.length === 0 ? (
      <div className="p-4 text-gray-500 text-sm">No notifications</div>
    ) : (
      <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 text-sm font-medium">#</th>
            <th className="text-left px-4 py-2 text-sm font-medium">Message</th>
            <th className="text-left px-4 py-2 text-sm font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {notification.map((notif: any, index: number) => (
            <tr key={notif.id} className={`${notif.seen ? "text-gray-500" : "text-black"} border-b`}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{notif.message}</td>
              <td className="px-4 py-2">
                {notif.seen ? "Seen" : <span className="text-red-500 font-semibold">Unseen</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}

    </div>
  );
};

export default Notifications;
