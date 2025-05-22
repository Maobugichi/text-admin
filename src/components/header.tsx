import { Menu } from "lucide-react";


interface HeaderProps {
     setIsShow: React.Dispatch<React.SetStateAction<any>>;
     show?:boolean;
     
     theme?:boolean;
    
}

const Header:React.FC<HeaderProps> = ({ setIsShow ,  theme  }) => {
    
    function openNav() {
        setIsShow(true)
    }
    return(
        <header className={`fixed w-full top-0 h-16 grid place-items-center ${theme ? 'bg-[#191919] border-blue-100 text-white' : 'bg-white border-[#5252] text-black'} border-b border-solid  z-20`}>
            <div className="flex items-center h-[80%] w-[95%] justify-between pl-3 md:justify-end gap-5">
                <Menu className="md:hidden" onClick={openNav}/>
            </div>
           
        </header>
    )
}

export default Header