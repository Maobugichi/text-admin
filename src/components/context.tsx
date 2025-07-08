import { useState , createContext , useMemo , useEffect } from "react";
interface ContextProps {
    children: React.ReactNode,
}

interface UserContextType {
    userData: any; 
    users:any;
    api:any;
    moneyOut:any;
    deposit:any;
    orders:any;
    totalDeposit:any;
    setTotalDeposit:React.Dispatch<React.SetStateAction<any>>;
    setOrders:React.Dispatch<React.SetStateAction<any>>;
    setDeposit:React.Dispatch<React.SetStateAction<any>>;
    setMoneyOut:React.Dispatch<React.SetStateAction<any>>;
    setApi:React.Dispatch<React.SetStateAction<any>>;
    setUsers: React.Dispatch<React.SetStateAction<any>>;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    theme:boolean;
    setTheme:React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowContext =  createContext<UserContextType | undefined>(undefined);

const  ContextProvider:React.FC<ContextProps> = ({ children }) => {
      const safeParse = (key: string, fallback: any) => {
      const saved = localStorage.getItem(key);
      try {
        return saved && saved !== "undefined" ? JSON.parse(saved) : fallback;
      } catch (e) {
        console.warn(`Error parsing ${key}:`, e);
        return fallback;
      }
    };

    const [userData, setUserData] = useState<any>(() => safeParse("userData", {}));
    const [users, setUsers] = useState<any>(() => safeParse("users", []));
    const [api, setApi] = useState<any>(() => safeParse("api", []));
    const [moneyOut, setMoneyOut] = useState<any>(() => safeParse("moneyout", []));
    const [deposit, setDeposit] = useState<any>(() => safeParse("deposit", []));
    const [orders, setOrders] = useState<any>(() => safeParse("orders", []));
    const [totalDeposit, setTotalDeposit] = useState<any>(() => safeParse("totaldeposit", []));

      const [ theme , setTheme ] = useState<boolean>(false)  
      useEffect(() => {
         localStorage.removeItem('users')
         localStorage.setItem("userData", JSON.stringify(userData));
         localStorage.setItem("users" , JSON.stringify(users))
         localStorage.setItem("api" , JSON.stringify(api))
         localStorage.setItem("moneyout" , JSON.stringify(moneyOut))
         localStorage.setItem("deposit" , JSON.stringify(deposit))
         localStorage.setItem("orders" , JSON.stringify(orders))
         localStorage.setItem("totaldeposit" , JSON.stringify(totalDeposit))
      }, [userData , users ,api , moneyOut , deposit]);
 
    const contextValue = useMemo(() => (
        {  theme , setTheme , userData , setUserData , users , setUsers , api , setApi , moneyOut , setMoneyOut , deposit , setDeposit , orders , setOrders , totalDeposit , setTotalDeposit}
    ),[theme , userData , users , api , moneyOut , orders])
    return(
        <ShowContext.Provider value={contextValue}>
            {children}
        </ShowContext.Provider>
    )
}

export { ShowContext ,   ContextProvider }  