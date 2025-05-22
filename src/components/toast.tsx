import { AnimatePresence, motion } from "motion/react";

interface ToastProps {
    errorMssg:string;
    show:boolean;
    color:string
}


const Toast:React.FC<ToastProps> = ({ errorMssg , show , color }) => {

    return(
        <AnimatePresence>
            {
                show && (

                    <motion.div
                     initial={{ y: -200 }}
                     animate={{ y: 0 }}
                     exit={{ y: -200}}
                     className={`absolute md:w-[30%] w-[90%] md:left-[450px] top-15 md:top-10 text-center h-24 rounded-md border  text-white  grid place-items-center ${color}`}>
                       <p >{errorMssg}</p>
                    </motion.div>
                )
            }
            
        </AnimatePresence>
        
    )
}

export default Toast