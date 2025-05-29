import { Link } from "react-router-dom";


interface BlocksProp { 
    icon:React.ReactNode;
    head:string;
    extra:string;
    link:string
}


const Blocks:React.FC<BlocksProp> = ({ icon , head , extra , link }) => {
   
    return(
        <Link className="w-[90%] md:w-[230px]" to={link}>
             <div className="bg-[#EEF4FD] shadow-sm  w-full font-light border-solid border border-gray-700  h-32 flex items-center gap-4 p-4 rounded-md">
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