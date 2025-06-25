import axios from "axios"
import { DollarSignIcon, BriefcaseBusinessIcon, ShoppingCartIcon, UserIcon, Download, RocketIcon } from "lucide-react"
import {  useContext, useEffect } from "react"
import { useState } from "react"
import Blocks from "./blocks"
import { ShowContext } from "./context"
import dualRing from "../assets/dualring.svg"


const Dashboard = () => {
const [dashboardItems, setDashboardItems] = useState<any>([]);
const myContext = useContext(ShowContext)

 if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
 const { setUsers , setApi , setMoneyOut , setDeposit , setOrders , theme , setTotalDeposit } = myContext
    async function getDashData() {
      const response = await axios.get('https://api.textflex.net/api/admin-dash')
      const values = Object.values(response.data as Record<string, number>).slice(0, 4);
      const depo = response.data.totalDepo[0].total_successful_deposit
      const apiGains = response.data.totalApiGains[0].amount_in_dollars
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
          className:'md:col-span-2'
        },
        {
          link:'/moneyout/1',
          label: "Money Out",
          value: `${(Number(values[1])).toLocaleString('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 2
                      }).replace('NGN', '').trim()}`,
          icon: <BriefcaseBusinessIcon size={30} className="text-red-600" />,
           className:''
        },
        {
          link:'/showorders/1',
          label: "Total Orders",
          value: `${values[2]} Orders`,
          icon: <ShoppingCartIcon size={30} className="text-blue-600" />,
           className:'md:col-span-full'
        },
        {
          link:'/users/1',
          label: "Total Users",
          value: `${values[3]} Users`,
          icon: <UserIcon size={30} className="text-purple-600" />,
        },
        {
          link:'/totaldeposit/1',
          label: "Money In",
          value: `${(Number(depo)).toLocaleString('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 2
                      }).replace('NGN', '').trim()}`,
          icon: <Download size={30} className="text-purple-600" />,
        },
        {
          link:'',
          label: "API gain",
          value: `${(Number(apiGains)).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2
                      }).replace('US', '').trim()}`,
          icon: <RocketIcon size={30} className="text-amber-600" />,
        },
       ];
      setTotalDeposit(response.data.totalSus.rows)
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
        <div className={` w-[90%] md:w-[75%]  mt-32 h-[130vh] md:h-[90vh] md:ml-72 grid rounded-md shadow-md  ${theme ? 'bg-[#191919] border-blue-100 text-white' : 'bg-blue-100 p-5 border-[#5252] text-black'}`}>
            <div className=" w-full items-center grid grid-cols-1 md:grid-cols-3   gap-5">
                  {dashboardItems.length >= 1 ? dashboardItems.map((items:any) => (
                        <Blocks
                         icon={items.icon}
                         head={items.value}
                         extra={items.label}
                         link={items.link}
                         theme={theme}
                         className={items.className}
                        />
                    )) :  <img className=" top-40 md:left-[500px] w-20 md:absolute" src={dualRing}/>
                    } 
            </div>
        </div>
    )
}

export default Dashboard