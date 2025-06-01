import axios from "axios"
import { DollarSignIcon, BriefcaseBusinessIcon, ShoppingCartIcon, UserIcon } from "lucide-react"
import {  useContext, useEffect } from "react"
import { useState } from "react"
import Blocks from "./blocks"
import { ShowContext } from "./context"
import dualRing from "../assets/dualring.svg"


const Dashboard = () => {
const [dashboardItems, setDashboardItems] = useState<any>([]);
const myContext = useContext(ShowContext)

 if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
 const { setUsers , setApi , setMoneyOut , setDeposit , setOrders , theme } = myContext
    async function getDashData() {
      const response = await axios.get('https://api.textflex.net/api/admin-dash')
      const values = Object.values(response.data as Record<string, number>).slice(0, 4);
       console.log(response.data)
      const items = [
        {
          link:'/showbalance/1',
          label: "Total Balance",
          value: `${(Number(values[0])).toLocaleString('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 2
                      }).replace('NGN', '').trim()}`,
          icon: <DollarSignIcon size={30}  className="text-green-600 " />,
        },
        {
          link:'/moneyout/1',
          label: "Total Out",
          value: `${(Number(values[1])).toLocaleString('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 2
                      }).replace('NGN', '').trim()}`,
          icon: <BriefcaseBusinessIcon size={30} className="text-red-600" />,
        },
        {
          link:'/showorders/1',
          label: "Total Orders",
          value: `${values[2]} Orders`,
          icon: <ShoppingCartIcon size={30} className="text-blue-600" />,
        },
        {
          link:'/users/1',
          label: "Total Users",
          value: `${values[3]} Users`,
          icon: <UserIcon size={30} className="text-purple-600" />,
        },
       ];
      
      setDashboardItems(items);
      setApi(response.data.api)
      setMoneyOut(response.data.transac)
      setUsers(response.data.use)
      setDeposit(response.data.deposit)
      setOrders(response.data.rows)
    }

    useEffect(() => {
     const interval = setInterval( async () => {
              await  getDashData()
     }, 2000);
     
    return () => clearInterval(interval)
    },[])
    return(
        <div className={` w-full  mt-32 h-[100vh] md:h-[80vh] overflow-hidden ${theme ? 'bg-[#191919] border-blue-100 text-white' : 'bg-white border-[#5252] text-black'}`}>
            <div className="flex  flex-col w-full items-center md:flex-row md:ml-72 gap-5">
                  {dashboardItems.length >= 1 ? dashboardItems.map((items:any) => (
                        <Blocks
                         icon={items.icon}
                         head={items.value}
                         extra={items.label}
                         link={items.link}
                         theme={theme}
                        />
                    )) :  <img className=" top-40 md:left-[500px] w-20 md:absolute" src={dualRing}/>
                    } 
            </div>
          
        </div>
    )
}

export default Dashboard