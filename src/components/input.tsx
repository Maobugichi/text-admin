interface InputProps {
    placeholder:string;
    value:string;
    name:string;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    type:string
}


const Input:React.FC<InputProps> = ({ placeholder , value , name , handleChange , type}) => {
    return(
        <input className="bg-white h-12 w-[90%] pl-5 mx-auto border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" onChange={handleChange} placeholder={placeholder} value={value} name={name} type={type}/>
    )
}

export default Input