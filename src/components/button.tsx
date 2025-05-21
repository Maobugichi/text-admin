import interwind from "../assets/Interwind.svg"

interface ButtonProps {
    content:string;
    type: 'submit'
    showLoader:boolean
}

const Button:React.FC<ButtonProps> = ({content , type , showLoader}) => {
    return(
        <button className="w-[90%] grid place-items-center mx-auto bg-[#0032a5] text-white h-12 rounded-md" type={type}>{showLoader ?  <img className="h-10" src={interwind} alt="loader" /> : content } </button>
        
    )
}

export default Button