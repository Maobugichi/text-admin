import { Link } from "react-router-dom";


interface BlocksProp { 
    icon:React.ReactNode;
    head:string;
    extra:string;
    link:string;
    theme:boolean
}


const Blocks:React.FC<BlocksProp> = ({ icon , head , extra , link , theme }) => {
   
    return(
        <Link className="w-[90%] md:w-[220px]" to={link}>
             <div className={` shadow-md w-full font-light border-solid border border-gray-700  h-32 flex items-center gap-4 p-4 rounded-md ${theme ? 'bg-[#191919] border-blue-100 text-white' : 'bg-[#EEF4FD] border-[#5252] text-black'}`}>
              {icon}
            <div className="grid gap-1">
                <p className="text-lg font-semibold">{head}</p>
                <span>{extra}</span>
            </div>
            </div>
        
         
        </Link> 
    )
}

export default Blocks