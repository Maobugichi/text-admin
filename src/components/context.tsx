import { useState , createContext , useMemo , useEffect } from "react";
interface ContextProps {
    children: React.ReactNode,
   
}

interface UserContextType {
    userData: any; 
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
      useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
        
      }, [userData]);
    const [ theme , setTheme ] = useState<boolean>(false)  
    const contextValue = useMemo(() => (
        {  theme , setTheme , userData , setUserData}
    ),[theme])
    return(
        <ShowContext.Provider value={contextValue}>
            {children}
        </ShowContext.Provider>
    )
}

export { ShowContext ,   ContextProvider }  