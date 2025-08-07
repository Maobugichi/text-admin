import { Link } from "react-router-dom";


interface BlocksProp { 
    icon:React.ReactNode;
    head:string;
    extra:string;
    link:string;
    theme:boolean;
    className:boolean
}


const Blocks:React.FC<BlocksProp> = ({ icon , head , extra , link , theme , className }) => {
   
    return(
        <Link className={`${className}  break-inside-avoid h-32 `} to={link}>
             <div className={` shadow-md w-full font-light border-solid border border-gray-700  h-full flex items-center gap-4 p-4 rounded-md ${theme ? 'bg-[#191919] border-blue-100 text-white' : 'bg-[#172A3A] border-[#5252] text-white '}`}>
              {icon}
            <div className="grid ">
                <p className="text-2xl font-semibold">{head}</p>
                <span>{extra}</span>
            </div>
            </div>
        
         
        </Link> 
    )
}

export default Blocks