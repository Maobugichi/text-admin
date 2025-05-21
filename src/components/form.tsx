interface FormProps {
    children:React.ReactNode;
    onSubmit:(e:React.FormEvent<HTMLFormElement>) => void
    header:string;
    height:string
}


const Form:React.FC<FormProps> = ({ children , onSubmit , header , height}) => {
    return(
        <form className={` ${height} bg-[#EEF4FD] flex flex-col text-center justify-center gap-3 w-[35%] mx-auto  pb-5 mb-6 rounded-sm `} onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">{header}</h1>
            {children}
        </form>
    )
}

export default Form