import { Menu } from "lucide-react";
import Theme from "../UI/theme";

interface HeaderProps {
     setIsShow: React.Dispatch<React.SetStateAction<any>>;
     show?:boolean;
      theme:boolean;
     setTheme:React.Dispatch<React.SetStateAction<boolean>>;
}

const Header:React.FC<HeaderProps> = ({ setIsShow ,  theme , setTheme  }) => {
    const listItem = ['Light' , 'Dark' , 'System']
    function openNav() {
        setIsShow(true)
    }
    return(
        <header className={`fixed w-full top-0 h-16 flex justify-end items-center ${theme ? 'bg-[#191919] border-blue-100 text-white' : 'bg-white border-[#5252] text-black'} border-b border-solid  z-20`}>
            <div className="flex items-center h-[80%] w-[95%] justify-between pl-3 md:justify-end gap-5">
                <Menu className="md:hidden" onClick={openNav}/>
            </div>
            <div className="w-[800px] md:w-[90%] text-2xl text-blue-500 font-semibold">
                <h1>Admin Textflex</h1>
            </div>
           <Theme
            listItem={listItem}
            theme={theme}
            setTheme={setTheme}
            />
        </header>
    )
}

export default Header