import NavItems from "./navItems";
import { motion , AnimatePresence } from "motion/react";
import { X } from 'lucide-react';
import { useEffect, useState  , useContext} from "react";
import { ShowContext } from "../context";



interface SideNavProps {
    show?:boolean;
    
    setIsShow:React.Dispatch<React.SetStateAction<boolean>>
} 

const SideNav:React.FC<SideNavProps> = ({show , setIsShow }) => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 500);
    const myContext = useContext(ShowContext);
    if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
    const { theme } = myContext
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 500);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    function closeNav() {
        setIsShow(false)
    }
    
    return(
        <AnimatePresence>
         {
            
            ( isMobile ?  
            (show && <motion.nav
                initial={{x: -500 }}
                animate={show ? { x: [-500, -300, 0] } : {}}
                exit={{ x: -500}}
                className={`fixed z-20 w-[60%] md:w-[20%] md:fixed h-[100vh] top-0 md:flex flex-col gap-5  border-r border-solid  ${theme ? 'bg-[#242424] border-blue-100' : 'bg-[#f9fbfd] border-[#5252]'}`}>
                   <div className={`h-16 flex items-center justify-end pr-4 border-b border-solid border-[#5252] ${theme ? 'border-blue-100': 'border-[#5252]'}`}>
                       <X onClick={closeNav} className="md:hidden"/>
                   </div>
                   
                   <div className={`h-[85%] ${theme ? 'text-gray-200' : 'text-black'} mt-8`}>
                        <NavItems
                        closeNav={closeNav}
                        />

                       
                    </div>
               </motion.nav>) :
                (<nav
                className={`fixed z-20 md:w-[20%] h-[100vh] top-0 md:flex flex-col gap-5  border-r border-solid  ${theme ? 'bg-[#242424] border-blue-100' : 'bg-[#f9fbfd] border-[#5252]'}`}>
                    
                    <div className={`h-[95%] ${theme ? 'text-gray-200' : 'text-black'}`}>
                        <NavItems
                        closeNav={closeNav}
                        />
                    </div>
                   
                </nav> )   
            )
           
         }
        </AnimatePresence>
    )
}

export default SideNav