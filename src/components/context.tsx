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
    const [userData, setUserData] = useState<any>(() => {
        const saved = localStorage.getItem("userData");
        return saved ? JSON.parse(saved) : {};
       });
      const [users, setUsers] = useState<any>(() => {
        const saved = localStorage.getItem("users");
        return saved ? JSON.parse(saved) : [];
      });
       const [api, setApi] = useState<any>(() => {
        const saved = localStorage.getItem("api");
        return saved ? JSON.parse(saved) : [];
      });
      const [ moneyOut , setMoneyOut ] = useState<any>(() => {
        const saved = localStorage.getItem("moneyout");
        return saved ? JSON.parse(saved) : [];
      })
      const [ deposit , setDeposit ] = useState<any>(() => {
        const saved = localStorage.getItem("deposit");
        return saved ? JSON.parse(saved) : [];
      })
      const [ orders , setOrders ] = useState<any>(() => {
        const saved = localStorage.getItem("orders");
        return saved ? JSON.parse(saved) : [];
      })
      const [ theme , setTheme ] = useState<boolean>(false)  
      useEffect(() => {
         localStorage.removeItem('users')
         localStorage.setItem("userData", JSON.stringify(userData));
         localStorage.setItem("users" , JSON.stringify(users))
         localStorage.setItem("api" , JSON.stringify(api))
         localStorage.setItem("moneyout" , JSON.stringify(moneyOut))
         localStorage.setItem("deposit" , JSON.stringify(deposit))
         localStorage.setItem("orders" , JSON.stringify(orders))
      }, [userData , users ,api , moneyOut , deposit]);
 
    const contextValue = useMemo(() => (
        {  theme , setTheme , userData , setUserData , users , setUsers , api , setApi , moneyOut , setMoneyOut , deposit , setDeposit , orders , setOrders}
    ),[theme , userData , users , api , moneyOut , orders])
    return(
        <ShowContext.Provider value={contextValue}>
            {children}
        </ShowContext.Provider>
    )
}

export { ShowContext ,   ContextProvider }  